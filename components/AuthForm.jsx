"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function AuthForm({ redirectTo = "/account/orders" }) {
  const [mode, setMode] = useState("signin");
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setInfo("");
    setSubmitting(true);
    const supabase = createClient();

    try {
      if (mode === "signup") {
        if (!form.name || !form.email || !form.password) {
          setError("Please fill in every field.");
          return;
        }
        const { data, error: signUpError } = await supabase.auth.signUp({
          email: form.email,
          password: form.password,
          options: { data: { name: form.name } },
        });
        if (signUpError) {
          setError(signUpError.message);
          return;
        }
        if (!data.session) {
          // Email confirmation is likely enabled on the Supabase project.
          setInfo("Check your email to confirm your account, then sign in.");
          setMode("signin");
          return;
        }
      } else {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email: form.email,
          password: form.password,
        });
        if (signInError) {
          setError(signInError.message);
          return;
        }
      }
      router.push(redirectTo);
      router.refresh();
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="lt-auth">
      <div className="lt-auth-tabs">
        <button className={mode === "signin" ? "lt-active" : ""} onClick={() => setMode("signin")} type="button">
          Sign in
        </button>
        <button className={mode === "signup" ? "lt-active" : ""} onClick={() => setMode("signup")} type="button">
          Create account
        </button>
      </div>
      <form className="lt-form" onSubmit={submit}>
        {mode === "signup" && (
          <label>
            Full name
            <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Anjali Rao" />
          </label>
        )}
        <label>
          Email
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="you@email.com"
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            placeholder="••••••••"
          />
        </label>
        {error && <p className="lt-form-error">{error}</p>}
        {info && <p className="lt-story-text">{info}</p>}
        <button className="lt-btn lt-btn-primary lt-w-full" type="submit" disabled={submitting}>
          {submitting ? "Please wait…" : mode === "signup" ? "Create account" : "Sign in"}
        </button>
      </form>
    </div>
  );
}
