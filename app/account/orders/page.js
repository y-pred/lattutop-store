import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { inr, formatDate } from "@/lib/format";

export const metadata = { title: "My orders — lattuTop" };

const STATUS_LABEL = {
  pending: "Payment pending",
  paid: "Paid",
  failed: "Payment failed",
  cod_confirmed: "Confirmed (Cash on Delivery)",
  cancelled: "Cancelled",
};

// Fulfillment is tracked separately from payment status (see migration
// 0008) — only shown once payment has actually gone through, since
// "processing" doesn't mean anything for an order that hasn't been paid.
const FULFILLMENT_LABEL = {
  processing: "Processing",
  shipped: "Shipped",
  delivered: "Delivered",
  cancelled: "Cancelled",
};
const FULFILLMENT_CLASS = {
  processing: "lt-fulfill-processing",
  shipped: "lt-fulfill-shipped",
  delivered: "lt-fulfill-delivered",
  cancelled: "lt-fulfill-cancelled",
};

export default async function OrdersPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/account");

  const { data: orders, error } = await supabase
    .from("orders")
    .select(
      "id, status, fulfillment_status, payment_method, total, created_at, order_items(product_name, unit_price, qty)"
    )
    .order("created_at", { ascending: false });

  return (
    <section className="lt-section" style={{ maxWidth: 640 }}>
      <p className="lt-eyebrow">Order history</p>
      <h1 className="lt-modal-title">My orders</h1>

      {error && <p className="lt-form-error">Could not load your orders right now.</p>}

      {!error && (!orders || orders.length === 0) ? (
        <p className="lt-story-text">No orders yet — your placed orders will show up here.</p>
      ) : (
        <div className="lt-orders-list">
          {orders.map((o) => {
            const isPaid = o.status === "paid" || o.status === "cod_confirmed";
            return (
              <div className="lt-order-card" key={o.id}>
                <div className="lt-order-head">
                  <span>#{o.id.slice(0, 8).toUpperCase()}</span>
                  <span>{inr(o.total)}</span>
                </div>
                <p className="lt-order-date">{formatDate(o.created_at)}</p>
                <p className="lt-order-items">
                  {o.order_items.map((i) => `${i.product_name} × ${i.qty}`).join(", ")}
                </p>
                <p className="lt-order-pay">
                  {o.payment_method === "phonepe" ? "Paid via PhonePe" : "Cash on Delivery"} ·{" "}
                  {STATUS_LABEL[o.status] || o.status}
                  {isPaid && (
                    <>
                      {" · "}
                      <span className={"lt-fulfill-badge " + (FULFILLMENT_CLASS[o.fulfillment_status] || "")}>
                        {FULFILLMENT_LABEL[o.fulfillment_status] || o.fulfillment_status}
                      </span>
                    </>
                  )}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
