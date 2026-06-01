import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();
  if (!email || !password) return NextResponse.json({ message: "Dados incompletos." }, { status: 400 });

  const supabase = createAdminClient();
  const normalizedEmail = email.toLowerCase().trim();

  // Criar usuário no Supabase Auth
  const { data: user, error } = await supabase.auth.admin.createUser({
    email: normalizedEmail,
    password,
    email_confirm: true,
  });

  if (error) {
    if (error.message.includes("already registered") || error.message.includes("already been registered")) {
      return NextResponse.json({ message: "Este e-mail já possui uma conta. Use a opção Entrar." }, { status: 409 });
    }
    return NextResponse.json({ message: "Erro ao criar conta. Tente novamente." }, { status: 500 });
  }

  // Criar registro de assinatura ativa automaticamente
  await supabase.from("customer_subscriptions").insert({
    email: normalizedEmail,
    customer_name: normalizedEmail.split("@")[0],
    transaction_id: "direct-" + user.user!.id.slice(0, 8),
    plan: "basic",
    payment_status: "approved",
    subscription_status: "active",
    auth_user_id: user.user!.id,
  });

  return NextResponse.json({ ok: true });
}
