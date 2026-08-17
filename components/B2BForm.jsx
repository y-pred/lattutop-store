"use client";

import { useState } from "react";
import { Check } from "lucide-react";

const initialForm = { org: "", type: "School", contact: "", phone: "", email: "", qty: "", message: "" };

export default function B2BForm() {
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    if (!form.org || !form.contact || !form.phone || !form.email) {
      setError("Please fill in organisation, contact, phone and email.");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/b2b", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Something went wrong. Please try again.");
      setSubmitted(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="lt-success">
        <div className="lt-success-icon">
          <Check size={26} />
        </div>
        <h3 className="lt-modal-title">Enquiry received</h3>
        <p className="lt-story-text">
          Thank you, {form.contact.split(" ")[0]}. Our team will reach out to {form.email} within 2 business days
          with pricing and next steps.
        </p>
        <button
          className="lt-btn lt-btn-outline"
          onClick={() => {
            setSubmitted(false);
            setForm(initialForm);
          }}
        >
          Submit another enquiry
        </button>
      </div>
    );
  }

  return (
    <form className="lt-form" onSubmit={submit}>
      <label>
        Organisation name
        <input
          value={form.org}
          onChange={(e) => setForm({ ...form, org: e.target.value })}
          placeholder="e.g. Sunrise Public School"
        />
      </label>
      <label>
        Organisation type
        <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
          <option>School</option>
          <option>Office</option>
          <option>Restaurant / Hospitality</option>
          <option>Event / Festival</option>
          <option>Other</option>
        </select>
      </label>
      <div className="lt-form-row">
        <label>
          Contact person
          <input value={form.contact} onChange={(e) => setForm({ ...form, contact: e.target.value })} />
        </label>
        <label>
          Phone
          <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
        </label>
      </div>
      <label>
        Email
        <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
      </label>
      <label>
        Estimated quantity
        <input value={form.qty} onChange={(e) => setForm({ ...form, qty: e.target.value })} placeholder="e.g. 100 units" />
      </label>
      <label>
        Tell us more
        <textarea
          rows={3}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          placeholder="What are you looking for?"
        />
      </label>
      {error && <p className="lt-form-error">{error}</p>}
      <button className="lt-btn lt-btn-primary lt-w-full" type="submit" disabled={submitting}>
        {submitting ? "Sending…" : "Send enquiry"}
      </button>
    </form>
  );
}
