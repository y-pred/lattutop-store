import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

// Landing point for the signup-confirmation email link. Exchanges the
// PKCE `?code=` for a session server-side (see app/auth/reset/route.js for
// why this must happen server-side, not in the browser) and sends the now
// signed-in user to their account.
export async function GET(request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return NextResponse.redirect(`${origin}/account`);
    }
  }

  return NextResponse.redirect(`${origin}/account?error=invalid-link`);
}
