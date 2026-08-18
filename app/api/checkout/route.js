import { NextResponse } from "next/server";
import { StandardCheckoutPayRequest } from "@phonepe-pg/pg-sdk-node";
import { createAdminClient, createClient } from "@/lib/supabase/server";
import { getPhonePeClient } from "@/lib/phonepe";
import { notifyNewOrder } from "@/lib/notify";

const FREE_SHIPPING_THRESHOLD = 1500;
const FLAT_SHIPPING = 79;

function isValidAddress(address) {
  return Boolean(
    address &&
      address.name &&
      address.phone &&
      address.line1 &&
      address.city &&
      address.pincode
  );
}

export async function POST(request) {
  const body = await request.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "Invalid request body" }, { status: 400 });

  const { items, address, paymentMethod, guestEmail } = body;

  if (!Array.isArray(items) || items.length === 0) {
    return NextResponse.json({ error: "Your cart is empty." }, { status: 400 });
  }
  if (!isValidAddress(address)) {
    return NextResponse.json({ error: "Please fill in a complete shipping address." }, { status: 400 });
  }
  if (!["phonepe", "cod"].includes(paymentMethod)) {
    return NextResponse.json({ error: "Choose a valid payment method." }, { status: 400 });
  }
  // Belt-and-suspenders: the checkout UI already hides/disables PhonePe
  // unless NEXT_PUBLIC_PHONEPE_LIVE is set, but reject it server-side too
  // so nobody can force a PhonePe order via a raw API request while we're
  // still on sandbox credentials.
  if (paymentMethod === "phonepe" && process.env.NEXT_PUBLIC_PHONEPE_LIVE !== "true") {
    return NextResponse.json({ error: "PhonePe isn't available yet. Please choose Cash on Delivery." }, { status: 400 });
  }

  // Who's checking out? (optional — guest checkout is allowed)
  const userClient = await createClient();
  const {
    data: { user },
  } = await userClient.auth.getUser();

  const admin = createAdminClient();

  // --- Recompute prices server-side. Never trust totals sent by the client. ---
  const productIds = items.map((i) => i.productId);
  const { data: products, error: productsError } = await admin
    .from("products")
    .select("id, name, price")
    .in("id", productIds)
    .eq("active", true);

  if (productsError) {
    console.error("checkout: failed to load products", productsError);
    return NextResponse.json({ error: "Could not verify your cart. Please try again." }, { status: 500 });
  }

  const productMap = new Map(products.map((p) => [p.id, p]));
  const orderItems = [];
  let subtotal = 0;

  for (const item of items) {
    const product = productMap.get(item.productId);
    const qty = Number(item.qty);
    if (!product || !Number.isFinite(qty) || qty < 1) {
      return NextResponse.json({ error: "One of the items in your cart is no longer available." }, { status: 400 });
    }
    subtotal += product.price * qty;
    orderItems.push({ product_id: product.id, product_name: product.name, unit_price: product.price, qty });
  }

  const shipping = subtotal > FREE_SHIPPING_THRESHOLD || subtotal === 0 ? 0 : FLAT_SHIPPING;
  const total = subtotal + shipping;

  // --- Create the order (status starts pending; the webhook / COD branch below finalizes it) ---
  const { data: order, error: orderError } = await admin
    .from("orders")
    .insert({
      user_id: user?.id ?? null,
      guest_email: user ? null : guestEmail || null,
      payment_method: paymentMethod,
      payment_status: paymentMethod === "cod" ? "not_required" : "pending",
      status: "pending",
      subtotal,
      shipping,
      total,
      shipping_address: address,
    })
    .select("id")
    .single();

  if (orderError) {
    console.error("checkout: failed to create order", orderError);
    return NextResponse.json({ error: "Could not create your order. Please try again." }, { status: 500 });
  }

  const { error: itemsError } = await admin
    .from("order_items")
    .insert(orderItems.map((i) => ({ ...i, order_id: order.id })));

  if (itemsError) {
    console.error("checkout: failed to create order items", itemsError);
    return NextResponse.json({ error: "Could not save your order items. Please try again." }, { status: 500 });
  }

  if (paymentMethod === "cod") {
    await admin.from("orders").update({ status: "cod_confirmed" }).eq("id", order.id);
    await notifyNewOrder(
      { id: order.id, payment_method: "cod", subtotal, shipping, total, shipping_address: address },
      orderItems
    );
    return NextResponse.json({ orderId: order.id, redirectUrl: `/checkout/complete?order=${order.id}` });
  }

  // --- PhonePe: create the payment on their side, get back the checkout URL ---
  try {
    const client = getPhonePeClient();
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || new URL(request.url).origin;

    const payRequest = StandardCheckoutPayRequest.builder()
      .merchantOrderId(order.id)
      .amount(total * 100) // PhonePe expects the amount in paise
      .redirectUrl(`${siteUrl}/checkout/complete?order=${order.id}`)
      .build();

    const phonepeResponse = await client.pay(payRequest);

    await admin
      .from("orders")
      .update({ phonepe_merchant_order_id: order.id, phonepe_order_id: phonepeResponse.orderId ?? null })
      .eq("id", order.id);

    return NextResponse.json({ orderId: order.id, redirectUrl: phonepeResponse.redirectUrl });
  } catch (err) {
    console.error("checkout: PhonePe pay() failed", err);
    await admin.from("orders").update({ status: "failed", payment_status: "failed" }).eq("id", order.id);
    return NextResponse.json(
      { error: "We couldn't start the PhonePe payment. Please try again or choose Cash on Delivery." },
      { status: 502 }
    );
  }
}
