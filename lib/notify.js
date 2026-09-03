import "server-only";
import { Resend } from "resend";

// Two kinds of email live here:
//  1. Owner notifications (new lead / new order) — sent via Resend's shared
//     sending domain (onboarding@resend.dev). That domain only works for
//     mail TO the account's own address, which is exactly what NOTIFY_EMAIL
//     is, so no domain verification is required for these.
//  2. Customer order confirmations — these go to arbitrary customer
//     addresses, which onboarding@resend.dev is NOT allowed to send to
//     (Resend restricts it to your own account email). Sending these
//     requires a verified domain in Resend (resend.com/domains) and its
//     address set as RESEND_ORDER_FROM_EMAIL below. Until that env var is
//     set, notifyCustomerOrderConfirmation() no-ops safely.
//
// Every function here swallows its own errors: a broken/missing Resend key
// should never take down a checkout or a lead submission, it should just
// mean no email goes out (logged to the server console).

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;
const NOTIFY_EMAIL = process.env.NOTIFY_EMAIL;
const FROM = "lattuTop <onboarding@resend.dev>";
// e.g. "lattuTop <orders@lattutop.com>" — must be on a domain verified in Resend.
const CUSTOMER_FROM = process.env.RESEND_ORDER_FROM_EMAIL;

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

async function sendCustomerEmail(to, subject, html) {
  if (!resend || !CUSTOMER_FROM) {
    console.warn(
      "notify: RESEND_API_KEY or RESEND_ORDER_FROM_EMAIL not set — skipping customer email:",
      subject
    );
    return;
  }
  if (!to) {
    console.warn("notify: no customer email address available — skipping:", subject);
    return;
  }
  try {
    await resend.emails.send({ from: CUSTOMER_FROM, to, subject, html });
  } catch (err) {
    console.error("notify: failed to send customer email", err);
  }
}

// Resolves the email to send a customer notification to: the guest email
// they typed at checkout, or — for a signed-in user — their account email
// (not stored on the order row itself, so this looks it up via the admin
// API). Pass the service-role Supabase client already in use by the caller.
export async function getCustomerEmail(admin, order) {
  if (order.guest_email) return order.guest_email;
  if (order.user_id) {
    try {
      const { data, error } = await admin.auth.admin.getUserById(order.user_id);
      if (!error) return data?.user?.email || null;
    } catch (err) {
      console.error("notify: failed to look up customer email", err);
    }
  }
  return null;
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

// Confirmation email to the customer themselves, sent once when an order is
// placed (COD) or confirmed paid (PhonePe webhook / status-check fallback).
// No-ops safely if RESEND_ORDER_FROM_EMAIL isn't set yet or no email address
// could be resolved for this order — see getCustomerEmail() above.
export function notifyCustomerOrderConfirmation(order, items = [], customerEmail) {
  const addr = order.shipping_address || {};
  const itemsHtml = items
    .map((i) => `<li>${i.product_name} × ${i.qty} — ₹${(i.unit_price * i.qty).toLocaleString("en-IN")}</li>`)
    .join("");
  const methodLabel = order.payment_method === "cod" ? "Cash on Delivery" : "Paid via PhonePe";
  const shortId = order.id.slice(0, 8).toUpperCase();
  const html = `
    <h2>Thanks for your order, ${addr.name || "there"}!</h2>
    <p>We've received your lattuTop order <strong>#${shortId}</strong> and it's now being prepared for shipping.</p>
    <ul>${itemsHtml}</ul>
    <p><strong>Total: ₹${order.total}</strong> (${methodLabel})</p>
    <p>Delivering to:<br/>${addr.name || ""}<br/>${addr.line1 || ""}, ${addr.city || ""}, ${addr.state || ""} ${addr.pincode || ""}</p>
    <p>We'll be in touch if anything needs your attention. Thanks for shopping with lattuTop!</p>
  `;
  return sendCustomerEmail(customerEmail, `Your lattuTop order is confirmed — #${shortId}`, html);
}
