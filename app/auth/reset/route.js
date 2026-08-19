import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

// Landing point for the password-reset email link specifically — kept
// separate from app/auth/confirm/route.js (rather than sharing it with a
// `?next=` query param) because a redirectTo URL containing its own query
// string appears to get mangled somewhere in how Supabase builds the
// verification link, dropping everything after the nested `?`. A plain,
// query-string-free path per flow sidesteps that entirely.
export async function GET(request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return NextResponse.redirect(`${origin}/account/reset-password`);
    }
  }

  return NextResponse.redirect(`${origin}/account?error=invalid-link`);
}
