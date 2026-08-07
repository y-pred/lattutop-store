"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Package, Smartphone } from "lucide-react";
import { useCart } from "@/components/cart-context";
import { createClient } from "@/lib/supabase/client";
import { inr } from "@/lib/format";

const FREE_SHIPPING_THRESHOLD = 1500;
const FLAT_SHIPPING = 79;

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart();
  const router = useRouter();

  const [user, setUser] = useState(undefined); // undefined = still loading
  const [step, setStep] = useState("address");
  const [address, setAddress] = useState({ name: "", phone: "", line1: "", city: "", state: "", pincode: "" });
  const [guestEmail, setGuestEmail] = useState("");
  const [payMethod, setPayMethod] = useState("phonepe");
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user ?? null);
      if (data.user) setAddress((a) => ({ ...a, name: a.name || data.user.user_metadata?.name || "" }));
    });
  }, []);

  const shipping = subtotal > FREE_SHIPPING_THRESHOLD || subtotal === 0 ? 0 : FLAT_SHIPPING;
  const total = subtotal + shipping;
  const addressValid = address.name && address.phone && address.line1 && address.city && address.pincode;

  if (items.length === 0) {
    return (
      <section className="lt-section" style={{ maxWidth: 480, textAlign: "center" }}>
        <p className="lt-eyebrow">Checkout</p>
        <h1 className="lt-modal-title">Your cart is empty</h1>
        <p className="lt-story-text">Add something from Kids Dolls or Collectibles first.</p>
        <Link href="/" className="lt-btn lt-btn-primary" style={{ marginTop: 16 }}>
          Continue shopping
        </Link>
      </section>
    );
  }

  const pay = async () => {
    setProcessing(true);
    setError("");
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((i) => ({ productId: i.id, qty: i.qty })),
          address,
          paymentMethod: payMethod,
          guestEmail: user ? undefined : guestEmail,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong. Please try again.");

      clearCart();

      if (payMethod === "phonepe") {
        window.location.href = data.redirectUrl; // full navigation to PhonePe's hosted checkout
      } else {
        router.push(data.redirectUrl);
      }
    } catch (err) {
      setError(err.message);
      setProcessing(false);
    }
  };

  return (
    <section className="lt-section" style={{ maxWidth: 480 }}>
      {step === "address" && (
        <>
          <p className="lt-eyebrow">Step 1 of 2</p>
          <h1 className="lt-modal-title">Shipping address</h1>

          {user === null && (
            <p className="lt-story-text" style={{ marginBottom: 8 }}>
              Checking out as a guest.{" "}
              <Link href="/account" className="lt-link-btn">
                Sign in
              </Link>{" "}
              for order history.
            </p>
          )}

          <div className="lt-form">
            {user === null && (
              <label>
                Email (for order updates)
                <input type="email" value={guestEmail} onChange={(e) => setGuestEmail(e.target.value)} placeholder="you@email.com" />
              </label>
            )}
            <label>
              Full name
              <input value={address.name} onChange={(e) => setAddress({ ...address, name: e.target.value })} />
            </label>
            <label>
              Phone number
              <input
                value={address.phone}
                onChange={(e) => setAddress({ ...address, phone: e.target.value })}
                placeholder="10-digit mobile"
              />
            </label>
            <label>
              Address
              <input
                value={address.line1}
                onChange={(e) => setAddress({ ...address, line1: e.target.value })}
                placeholder="House no, street, area"
              />
            </label>
            <div className="lt-form-row">
              <label>
                City
                <input value={address.city} onChange={(e) => setAddress({ ...address, city: e.target.value })} />
              </label>
              <label>
                State
                <input value={address.state} onChange={(e) => setAddress({ ...address, state: e.target.value })} />
              </label>
              <label>
                Pincode
                <input value={address.pincode} onChange={(e) => setAddress({ ...address, pincode: e.target.value })} />
              </label>
            </div>
          </div>
          <button className="lt-btn lt-btn-primary lt-w-full" disabled={!addressValid} onClick={() => setStep("payment")}>
            Continue to payment
          </button>
        </>
      )}

      {step === "payment" && (
        <>
          <button className="lt-back-link" onClick={() => setStep("address")}>
            <ArrowLeft size={14} /> Address
          </button>
          <p className="lt-eyebrow">Step 2 of 2</p>
          <h1 className="lt-modal-title">Payment</h1>

          <div className="lt-order-summary">
            {items.map((i) => (
              <div className="lt-summary-row" key={i.id}>
                <span>
                  {i.name} × {i.qty}
                </span>
                <span>{inr(i.price * i.qty)}</span>
              </div>
            ))}
            <div className="lt-summary-row">
              <span>Shipping</span>
              <span>{shipping === 0 ? "Free" : inr(shipping)}</span>
            </div>
            <div className="lt-summary-row lt-summary-total">
              <span>Total</span>
              <span>{inr(total)}</span>
            </div>
          </div>

          <div className="lt-pay-methods">
            <label className={"lt-pay-option" + (payMethod === "phonepe" ? " lt-active" : "")}>
              <input type="radio" name="pay" checked={payMethod === "phonepe"} onChange={() => setPayMethod("phonepe")} />
              <Smartphone size={16} /> PhonePe — UPI, Card, Net Banking
            </label>
            <label className={"lt-pay-option" + (payMethod === "cod" ? " lt-active" : "")}>
              <input type="radio" name="pay" checked={payMethod === "cod"} onChange={() => setPayMethod("cod")} />
              <Package size={16} /> Cash on Delivery
            </label>
          </div>

          {error && <p className="lt-form-error">{error}</p>}

          <button className="lt-btn lt-btn-primary lt-w-full" onClick={pay} disabled={processing}>
            {processing ? "Processing…" : `Pay ${inr(total)}`}
          </button>
          <p className="lt-fineprint">
            PhonePe payments are handled entirely server-side — your card and UPI details never touch this site's
            code, only PhonePe's own hosted checkout.
          </p>
        </>
      )}
    </section>
  );
}
