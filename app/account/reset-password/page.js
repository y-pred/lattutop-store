"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
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
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const supabase = createClient();

    // Normal path: the recovery link went through /auth/confirm, which
    // already exchanged the code for a session server-side and set the
    // cookies — so by the time we land here there should just be a session
    // waiting for us.
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) {
        setReady(true);
        return;
      }

      // Fallback: a `?code=` landed here directly (e.g. an old/bookmarked
      // link from before /auth/confirm existed). Try exchanging it
      // client-side as a best effort.
      const code = new URL(window.location.href).searchParams.get("code");
      if (code) {
        supabase.auth.exchangeCodeForSession(code).then(({ error: exchangeError }) => {
          if (exchangeError) {
            setError("This reset link is invalid or has expired. Please request a new one.");
          } else {
            setReady(true);
          }
        });
      } else {
        setError("This reset link is invalid or has expired. Please request a new one.");
      }
    });

    // Also handle older/implicit-flow links, which land with a hash
    // fragment instead and get picked up automatically, firing this event.
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") setReady(true);
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
        <h1 className="lt-modal-title">{error ? "Link expired" : "Checking your link…"}</h1>
        <p className="lt-story-text">
          {error
            ? error
            : "If this doesn't move on in a few seconds, the link may have expired — go back to the sign-in page and request a new one."}
        </p>
        {error && (
          <a href="/account" className="lt-btn lt-btn-primary" style={{ marginTop: 12 }}>
            Back to sign in
          </a>
        )}
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
          <div className="lt-input-wrap">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
            <button
              type="button"
              className="lt-input-eye"
              onClick={() => setShowPassword((s) => !s)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              tabIndex={-1}
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </label>
        <label>
          Confirm new password
          <div className="lt-input-wrap">
            <input
              type={showConfirm ? "text" : "password"}
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              placeholder="••••••••"
            />
            <button
              type="button"
              className="lt-input-eye"
              onClick={() => setShowConfirm((s) => !s)}
              aria-label={showConfirm ? "Hide password" : "Show password"}
              tabIndex={-1}
            >
              {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </label>
        {error && <p className="lt-form-error">{error}</p>}
        <button className="lt-btn lt-btn-primary lt-w-full" type="submit" disabled={submitting}>
          {submitting ? "Saving…" : "Save new password"}
        </button>
      </form>
    </section>
  );
}
