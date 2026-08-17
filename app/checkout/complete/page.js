import Link from "next/link";
import { Check, X } from "lucide-react";
import { createAdminClient } from "@/lib/supabase/server";
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
  const { data: order } = await admin
    .from("orders")
    .select("id, status, payment_method, total")
    .eq("id", orderId)
    .maybeSingle();

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
