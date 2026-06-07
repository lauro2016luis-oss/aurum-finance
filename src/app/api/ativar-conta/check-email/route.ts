import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const { email } = await req.json();
  if (!email || typeof email !== "string") {
    return NextResponse.json({ allowed: false, message: "E-mail não informado." }, { status: 400 });
  }
  if (email.length > 254) {
    return NextResponse.json({ allowed: false, message: "E-mail inválido." }, { status: 400 });
  }

  const supabase = createAdminClient();
  const { data } = await supabase
    .from("customer_subscriptions")
    .select("subscription_status, payment_status, auth_user_id")
    .eq("email", email.toLowerCase().trim())
    .maybeSingle();

  if (!data) {
    return NextResponse.json({ allowed: false, message: "E-mail não encontrado. Realize sua compra primeiro." }, { status: 403 });
  }

  if (data.payment_status !== "approved") {
    return NextResponse.json({ allowed: false, message: "Pagamento ainda não aprovado. Aguarde ou entre em contato." }, { status: 403 });
  }

  if (data.auth_user_id) {
    return NextResponse.json({ allowed: false, message: "Conta já criada. Use a opção Entrar." }, { status: 409 });
  }

  return NextResponse.json({ allowed: true });
}
