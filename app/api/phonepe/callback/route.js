import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/server";
import { getPhonePeClient } from "@/lib/phonepe";

// PhonePe calls this endpoint server-to-server whenever a payment's status
// changes. Register this URL (https://yourdomain.com/api/phonepe/callback)
// in the PhonePe Business Dashboard, along with the username/password set
// in PHONEPE_WEBHOOK_USERNAME / PHONEPE_WEBHOOK_PASSWORD.
//
// This is the source of truth for "did the payment actually succeed" —
// the browser redirect after checkout is only a UX nicety and must never
// be trusted on its own to mark an order as paid.

export async function POST(request) {
  const rawBody = await request.text();
  const authorizationHeader = request.headers.get("authorization") || "";

  let callback;
  try {
    const client = getPhonePeClient();
    callback = client.validateCallback(
      process.env.PHONEPE_WEBHOOK_USERNAME,
      process.env.PHONEPE_WEBHOOK_PASSWORD,
      authorizationHeader,
      rawBody
    );
  } catch (err) {
    console.error("phonepe webhook: signature validation failed", err);
    return NextResponse.json({ error: "Invalid callback" }, { status: 401 });
  }

  const { type, payload } = callback;
  const merchantOrderId = payload?.originalMerchantOrderId || payload?.merchantOrderId;

  if (!merchantOrderId) {
    console.error("phonepe webhook: no merchantOrderId in payload", payload);
    return NextResponse.json({ ok: true }); // ack anyway — nothing we can match this to
  }

  const admin = createAdminClient();

  if (type === "CHECKOUT_ORDER_COMPLETED") {
    await admin
      .from("orders")
      .update({ status: "paid", payment_status: "paid", phonepe_order_id: payload.orderId ?? null })
      .eq("id", merchantOrderId);
  } else if (type === "CHECKOUT_ORDER_FAILED") {
    await admin
      .from("orders")
      .update({ status: "failed", payment_status: "failed" })
      .eq("id", merchantOrderId);
  }
  // PG_REFUND_* events would be handled here too once refunds are wired up.

  // PhonePe expects a fast 2xx acknowledgment.
  return NextResponse.json({ ok: true });
}
