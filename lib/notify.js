import "server-only";
import { Resend } from "resend";

// Fires an email to the store owner whenever a new B2B lead or order comes
// in, so nobody has to babysit the Supabase dashboard. Uses Resend's shared
// sending domain (onboarding@resend.dev) — no domain verification needed
// since we're only ever sending to the owner's own inbox (NOTIFY_EMAIL).
//
// Every function here swallows its own errors: a broken/missing Resend key
// should never take down a checkout or a lead submission, it should just
// mean no email goes out (logged to the server console).

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;
const NOTIFY_EMAIL = process.env.NOTIFY_EMAIL;
const FROM = "lattuTop <onboarding@resend.dev>";

async function sendNotification(subject, html) {
  if (!resend || !NOTIFY_EMAIL) {
    console.warn("notify: RESEND_API_KEY or NOTIFY_EMAIL not set — skipping email:", subject);
    return;
  }
  try {
    await resend.emails.send({ from: FROM, to: NOTIFY_EMAIL, subject, html });
  } catch (err) {
    console.error("notify: failed to send email", err);
  }
}

export function notifyNewLead({ org_name, org_type, contact_name, phone, email, estimated_qty, message }) {
  const html = `
    <h2>New B2B enquiry</h2>
    <p><strong>${org_name}</strong> (${org_type || "Other"})</p>
    <p>Contact: ${contact_name}<br/>Phone: ${phone}<br/>Email: ${email}</p>
    ${estimated_qty ? `<p>Estimated quantity: ${estimated_qty}</p>` : ""}
    ${message ? `<p>Message: ${message}</p>` : ""}
  `;
  return sendNotification(`New B2B lead: ${org_name}`, html);
}

export function notifyNewOrder(order, items = []) {
  const addr = order.shipping_address || {};
  const itemsHtml = items
    .map((i) => `<li>${i.product_name} × ${i.qty} — ₹${(i.unit_price * i.qty).toLocaleString("en-IN")}</li>`)
    .join("");
  const methodLabel = order.payment_method === "cod" ? "Cash on Delivery" : "PhonePe (paid)";
  const html = `
    <h2>New order — ${methodLabel}</h2>
    <p>Order ID: ${order.id}</p>
    <p>${addr.name || ""} — ${addr.phone || ""}<br/>${addr.line1 || ""}, ${addr.city || ""}, ${addr.state || ""} ${addr.pincode || ""}</p>
    <ul>${itemsHtml}</ul>
    <p>Subtotal: ₹${order.subtotal} · Shipping: ${order.shipping ? "₹" + order.shipping : "Free"}<br/>
    <strong>Total: ₹${order.total}</strong></p>
  `;
  return sendNotification(`New order: ₹${order.total} (${methodLabel})`, html);
}
