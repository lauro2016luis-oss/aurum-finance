import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const { token, password } = await req.json();

  if (!token || !password) {
    return NextResponse.json({ error: "Token e senha obrigatórios" }, { status: 400 });
  }

  if (typeof token !== "string" || token.length > 256) {
    return NextResponse.json({ error: "Token inválido" }, { status: 400 });
  }

  if (typeof password !== "string") {
    return NextResponse.json({ error: "Senha inválida" }, { status: 400 });
  }

  if (password.length < 8) {
    return NextResponse.json({ error: "Senha muito curta" }, { status: 400 });
  }

  if (password.length > 128) {
    return NextResponse.json({ error: "Senha muito longa" }, { status: 400 });
  }

  const supabase = createAdminClient();

  // 1. buscar registro pelo token
  const { data: record, error: fetchErr } = await supabase
    .from("customer_subscriptions")
    .select("id, email, customer_name, subscription_status, activation_expires_at, auth_user_id")
    .eq("activation_token", token)
    .maybeSingle();

  if (fetchErr || !record) {
    return NextResponse.json({ error: "Token inválido" }, { status: 404 });
  }

  if (record.subscription_status === "active") {
    return NextResponse.json({ error: "Conta já ativada" }, { status: 409 });
  }

  if (record.activation_expires_at && new Date(record.activation_expires_at) < new Date()) {
    return NextResponse.json({ error: "Link expirado" }, { status: 410 });
  }

  // 2. criar usuário no Supabase Auth (ou atualizar senha se já existir)
  let authUserId: string;

  if (record.auth_user_id) {
    // Usuário já existe — apenas atualiza a senha
    const { error: updateErr } = await supabase.auth.admin.updateUserById(
      record.auth_user_id,
      { password, email_confirm: true }
    );
    if (updateErr) {
      return NextResponse.json({ error: "Erro ao atualizar senha" }, { status: 500 });
    }
    authUserId = record.auth_user_id;
  } else {
    // criar novo usuário
    const { data: newUser, error: createErr } = await supabase.auth.admin.createUser({
      email:         record.email,
      password,
      email_confirm: true,
      user_metadata: {
        full_name: record.customer_name,
      },
    });

    if (createErr || !newUser?.user) {
      return NextResponse.json({ error: "Erro ao criar usuário" }, { status: 500 });
    }
    authUserId = newUser.user.id;
  }

  // 3. atualizar registro: associar auth_user_id, limpar token, marcar como ativo
  const { error: updateErr } = await supabase
    .from("customer_subscriptions")
    .update({
      auth_user_id:          authUserId,
      subscription_status:   "active",
      activation_token:      null,   // invalida o token (não pode ser reutilizado)
      activation_expires_at: null,
    })
    .eq("id", record.id);

  if (updateErr) {
    return NextResponse.json({ error: "Erro ao ativar conta" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
