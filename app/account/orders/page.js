import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { inr } from "@/lib/format";

export const metadata = { title: "My orders — lattuTop" };

const STATUS_LABEL = {
  pending: "Payment pending",
  paid: "Paid",
  failed: "Payment failed",
  cod_confirmed: "Confirmed (Cash on Delivery)",
  cancelled: "Cancelled",
};

export default async function OrdersPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/account");

  const { data: orders, error } = await supabase
    .from("orders")
    .select("id, status, payment_method, total, created_at, order_items(product_name, unit_price, qty)")
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
          {orders.map((o) => (
            <div className="lt-order-card" key={o.id}>
              <div className="lt-order-head">
                <span>#{o.id.slice(0, 8).toUpperCase()}</span>
                <span>{inr(o.total)}</span>
              </div>
              <p className="lt-order-items">
                {o.order_items.map((i) => `${i.product_name} × ${i.qty}`).join(", ")}
              </p>
              <p className="lt-order-pay">
                {o.payment_method === "phonepe" ? "Paid via PhonePe" : "Cash on Delivery"} ·{" "}
                {STATUS_LABEL[o.status] || o.status}
              </p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
