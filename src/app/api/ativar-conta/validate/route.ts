import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token");

  if (!token) {
    return NextResponse.json({ error: "Token obrigatório" }, { status: 400 });
  }

  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from("customer_subscriptions")
    .select("id, customer_name, email, activation_expires_at, subscription_status")
    .eq("activation_token", token)
    .maybeSingle();

  if (error || !data) {
    return NextResponse.json({ error: "Token inválido" }, { status: 404 });
  }

  // já ativado
  if (data.subscription_status === "active") {
    return NextResponse.json({ error: "Token já utilizado" }, { status: 410 });
  }

  // expirado
  if (data.activation_expires_at && new Date(data.activation_expires_at) < new Date()) {
    return NextResponse.json({ error: "Token expirado" }, { status: 410 });
  }

  return NextResponse.json({
    customer_name: data.customer_name,
    email:         data.email,
  });
}
