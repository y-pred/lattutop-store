import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

// Landing point for every Supabase email link (password recovery, signup
// confirmation, etc.) — they all arrive here with a PKCE `?code=`.
//
// This exchange has to happen server-side, using the cookie-based server
// client. Doing it in the browser instead depends on a code_verifier cookie
// set at the moment the flow was started, and that cookie doesn't reliably
// survive the trip through an email client's link handling (redirects,
// link-scanning/prefetching, opening in a fresh tab, etc.) — which is what
// caused reset-password links to show as "expired" even seconds after
// being issued. The server-side exchange has no such dependency.
export async function GET(request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") || "/account";

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  return NextResponse.redirect(`${origin}/account?error=invalid-link`);
}
