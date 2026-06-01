import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();
  if (!email || !password) return NextResponse.json({ message: "Dados incompletos." }, { status: 400 });

  const supabase = createAdminClient();
  const normalizedEmail = email.toLowerCase().trim();

  // Verificar elegibilidade novamente (segurança)
  const { data: sub } = await supabase
    .from("customer_subscriptions")
    .select("id, payment_status, auth_user_id, customer_name")
    .eq("email", normalizedEmail)
    .maybeSingle();

  if (!sub || sub.payment_status !== "approved") {
    return NextResponse.json({ message: "Acesso não autorizado." }, { status: 403 });
  }
  if (sub.auth_user_id) {
    return NextResponse.json({ message: "Conta já existe. Use a opção Entrar." }, { status: 409 });
  }

  // Criar usuário no Supabase Auth
  const { data: user, error } = await supabase.auth.admin.createUser({
    email: normalizedEmail,
    password,
    email_confirm: true,
    user_metadata: { name: sub.customer_name },
  });

  if (error || !user.user) {
    return NextResponse.json({ message: "Erro ao criar conta. Tente novamente." }, { status: 500 });
  }

  // Atualizar subscription com auth_user_id e status ativo
  await supabase
    .from("customer_subscriptions")
    .update({
      auth_user_id: user.user.id,
      subscription_status: "active",
      activation_token: null,
      activation_expires_at: null,
    })
    .eq("email", normalizedEmail);

  return NextResponse.json({ ok: true });
}
