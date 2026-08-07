import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import AuthForm from "@/components/AuthForm";

export const metadata = { title: "Your account — lattuTop" };

export default async function AccountPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) redirect("/account/orders");

  return (
    <section className="lt-section" style={{ maxWidth: 420 }}>
      <p className="lt-eyebrow">Welcome</p>
      <h1 className="lt-modal-title">Your account</h1>
      <AuthForm />
    </section>
  );
}
