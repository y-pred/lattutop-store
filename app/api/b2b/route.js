import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/server";

export async function POST(request) {
  const body = await request.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "Invalid request body" }, { status: 400 });

  const { org, type, contact, phone, email, qty, message } = body;
  if (!org || !contact || !phone || !email) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const supabase = createAdminClient();
  const { error } = await supabase.from("b2b_leads").insert({
    org_name: org,
    org_type: type || "Other",
    contact_name: contact,
    phone,
    email,
    estimated_qty: qty || null,
    message: message || null,
  });

  if (error) {
    console.error("b2b lead insert failed", error);
    return NextResponse.json({ error: "Could not save your enquiry. Please try again." }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
