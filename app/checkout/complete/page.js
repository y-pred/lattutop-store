import Link from "next/link";
import { Check, X } from "lucide-react";
import { createAdminClient } from "@/lib/supabase/server";
import { getPhonePeClient } from "@/lib/phonepe";
import { notifyNewOrder } from "@/lib/notify";
import { inr } from "@/lib/format";
import OrderStatusPoll from "@/components/OrderStatusPoll";

export const metadata = { title: "Order status — lattuTop" };
export const dynamic = "force-dynamic";

export default async function CheckoutCompletePage({ searchParams }) {
  const { order: orderId } = await searchParams;

  if (!orderId) {
    return (
      <section className="lt-section" style={{ maxWidth: 480, textAlign: "center" }}>
        <h1 className="lt-modal-title">No order specified</h1>
        <Link href="/" className="lt-btn lt-btn-primary">
          Back to home
        </Link>
      </section>
    );
  }

  const admin = createAdminClient();
  let { data: order } = await admin.from("orders").select("*").eq("id", orderId).maybeSingle();

  if (!order) {
    return (
      <section className="lt-section" style={{ maxWidth: 480, textAlign: "center" }}>
        <h1 className="lt-modal-title">We couldn't find that order</h1>
        <Link href="/" className="lt-btn lt-btn-primary">
          Back to home
        </Link>
      </section>
    );
  }

  // The PhonePe webhook is the primary way orders get marked paid/failed,
  // but PhonePe's own docs say it isn't guaranteed to arrive (some sandbox
  // failure simulations never send one at all). So if we land here still
  // "pending" on a PhonePe order, actively ask PhonePe for the definitive
  // status instead of leaving the customer staring at "Confirming payment…"
  // forever.
  if (order.status === "pending" && order.payment_method === "phonepe") {
    try {
      const client = getPhonePeClient();
      const statusResponse = await client.getOrderStatus(order.id);
      const state = statusResponse?.state;

      if (state === "COMPLETED") {
        await admin
          .from("orders")
          .update({ status: "paid", payment_status: "paid", phonepe_order_id: statusResponse.orderId ?? null })
          .eq("id", order.id);
        order = { ...order, status: "paid", payment_status: "paid" };

        const { data: items } = await admin.from("order_items").select("*").eq("order_id", order.id);
        await notifyNewOrder(order, items || []);
      } else if (state === "FAILED") {
        await admin.from("orders").update({ status: "failed", payment_status: "failed" }).eq("id", order.id);
        order = { ...order, status: "failed", payment_status: "failed" };
      }
      // state === "PENDING" (or anything unexpected): leave as-is, OrderStatusPoll will retry.
    } catch (err) {
      console.error("checkout/complete: getOrderStatus fallback failed", err);
      // Leave status as pending — the webhook (or a later page load) may still resolve it.
    }
  }

  const isPaid = order.status === "paid" || order.status === "cod_confirmed";
  const isFailed = order.status === "failed";
  const isPending = order.status === "pending";

  return (
    <section className="lt-section" style={{ maxWidth: 480 }}>
      <div className="lt-success">
        <div className="lt-success-icon" style={isFailed ? { background: "#F3D9D9", color: "#B23429" } : undefined}>
          {isFailed ? <X size={26} /> : <Check size={26} />}
        </div>
        <h1 className="lt-modal-title">
          {isPaid && "Order placed!"}
          {isFailed && "Payment failed"}
          {isPending && "Confirming your payment…"}
        </h1>
        <p className="lt-story-text">
          Order <strong>#{order.id.slice(0, 8).toUpperCase()}</strong> · {inr(order.total)}
          {isPaid && " — a hand-painted parcel will be on its way soon."}
          {isFailed && " — you were not charged. Please try again or choose Cash on Delivery."}
        </p>
        <OrderStatusPoll pending={isPending} />
        <Link href="/" className="lt-btn lt-btn-primary">
          Continue shopping
        </Link>
      </div>
    </section>
  );
}
