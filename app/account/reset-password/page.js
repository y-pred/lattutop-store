"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

// Landing page for the link in Supabase's "Reset Password" email
// (see AuthForm.jsx's resetPasswordForEmail call). Following that link
// establishes a temporary recovery session and fires a PASSWORD_RECOVERY
// auth event — that's our signal it's safe to show the "set a new
// password" form.
export default function ResetPasswordPage() {
  const [ready, setReady] = useState(false);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const supabase = createClient();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") setReady(true);
    });

    // In case the event already fired before we subscribed.
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) setReady(true);
    });

    return () => subscription.unsubscribe();
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (password !== confirm) {
      setError("Passwords don't match.");
      return;
    }
    setSubmitting(true);
    const supabase = createClient();
    const { error: updateError } = await supabase.auth.updateUser({ password });
    setSubmitting(false);
    if (updateError) {
      setError(updateError.message);
      return;
    }
    setDone(true);
    setTimeout(() => router.push("/account/orders"), 1500);
  };

  if (done) {
    return (
      <section className="lt-section" style={{ maxWidth: 420 }}>
        <p className="lt-eyebrow">Password updated</p>
        <h1 className="lt-modal-title">You're all set</h1>
        <p className="lt-story-text">Taking you to your account…</p>
      </section>
    );
  }

  if (!ready) {
    return (
      <section className="lt-section" style={{ maxWidth: 420 }}>
        <p className="lt-eyebrow">Reset password</p>
        <h1 className="lt-modal-title">Checking your link…</h1>
        <p className="lt-story-text">
          If this doesn't move on in a few seconds, the link may have expired — go back to the{" "}
          <a href="/account" className="lt-link-btn">
            sign-in page
          </a>{" "}
          and request a new one.
        </p>
      </section>
    );
  }

  return (
    <section className="lt-section" style={{ maxWidth: 420 }}>
      <p className="lt-eyebrow">Reset password</p>
      <h1 className="lt-modal-title">Choose a new password</h1>
      <form className="lt-form" onSubmit={submit}>
        <label>
          New password
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" />
        </label>
        <label>
          Confirm new password
          <input type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} placeholder="••••••••" />
        </label>
        {error && <p className="lt-form-error">{error}</p>}
        <button className="lt-btn lt-btn-primary lt-w-full" type="submit" disabled={submitting}>
          {submitting ? "Saving…" : "Save new password"}
        </button>
      </form>
    </section>
  );
}
