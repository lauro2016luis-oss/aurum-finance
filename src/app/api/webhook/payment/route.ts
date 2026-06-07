import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { sendActivationEmail } from "@/lib/email/send-activation";
import crypto from "crypto";

export const runtime = "nodejs";

/* ── helpers ────────────────────────────────────────────── */

function generateToken(): string {
  return crypto.randomUUID() + "-" + crypto.randomBytes(16).toString("hex");
}

function tokenExpiresAt(): string {
  const d = new Date();
  d.setHours(d.getHours() + 24);
  return d.toISOString();
}

/**
 * Valida assinatura HMAC do webhook.
 * Adapte conforme o gateway (Kiwify, Hotmart, Stripe, Pagar.me…).
 * Por padrão espera header "x-webhook-signature" com HMAC-SHA256.
 */
function validateSignature(body: string, req: NextRequest): boolean {
  const secret = process.env.WEBHOOK_SECRET;
  // If no secret is configured, skip validation (only acceptable in local dev).
  // In production, always set WEBHOOK_SECRET.
  if (!secret) {
    if (process.env.NODE_ENV === "production") {
      // Reject all requests in production when secret is not configured
      console.error("[webhook] WEBHOOK_SECRET is not set in production — rejecting request");
      return false;
    }
    return true;
  }

  const header =
    req.headers.get("x-webhook-signature") ||
    req.headers.get("x-hub-signature-256") ||
    req.headers.get("x-signature") ||
    "";

  const received = header.replace(/^sha256=/, "");

  const expected = crypto
    .createHmac("sha256", secret)
    .update(body)
    .digest("hex");

  // Both buffers must be same length for timingSafeEqual
  if (received.length !== expected.length) return false;

  try {
    return crypto.timingSafeEqual(
      Buffer.from(expected, "hex"),
      Buffer.from(received, "hex")
    );
  } catch {
    return false;
  }
}

/**
 * Normaliza o payload para um formato interno único.
 * Adicione aqui os formatos de outros gateways.
 */
function parsePayload(body: Record<string, unknown>): {
  email: string;
  customer_name: string;
  transaction_id: string;
  plan: string;
  status: string;
} | null {
  // ── Kiwify ──────────────────────────────────────────────
  if (body.order_id && body.Customer) {
    const c = body.Customer as Record<string, string>;
    return {
      email:          c.email,
      customer_name:  c.full_name || c.name || "Cliente",
      transaction_id: String(body.order_id),
      plan:           String(((body as Record<string, unknown>).Product as Record<string,string>|undefined)?.name ?? "basic"),
      status:         String(body.order_status ?? ""),
    };
  }

  // ── Hotmart ─────────────────────────────────────────────
  if (body.data && (body as Record<string, unknown>).event) {
    const d = body.data as Record<string, unknown>;
    const buyer = (d.buyer ?? {}) as Record<string, string>;
    const purchase = (d.purchase ?? {}) as Record<string, unknown>;
    return {
      email:          buyer.email,
      customer_name:  buyer.name || "Cliente",
      transaction_id: String(purchase.transaction ?? purchase.order_date ?? ""),
      plan:           String((d.product as Record<string, string>)?.name ?? "basic"),
      status:         String(purchase.status ?? ""),
    };
  }

  // ── Stripe ──────────────────────────────────────────────
  if (body.type && (body.type as string).startsWith("payment_intent")) {
    const obj = (body.data as Record<string, unknown>)?.object as Record<string, unknown> ?? {};
    const meta = (obj.metadata ?? {}) as Record<string, string>;
    return {
      email:          meta.email ?? String((obj.receipt_email ?? "")),
      customer_name:  meta.customer_name ?? "Cliente",
      transaction_id: String(obj.id ?? ""),
      plan:           meta.plan ?? "basic",
      status:         String(obj.status ?? ""),
    };
  }

  // ── Pagar.me ────────────────────────────────────────────
  if (body.object === "transaction") {
    const customer = (body.customer ?? {}) as Record<string, string>;
    return {
      email:          customer.email,
      customer_name:  customer.name || "Cliente",
      transaction_id: String(body.id),
      plan:           "basic",
      status:         String(body.status ?? ""),
    };
  }

  // ── Generic fallback ────────────────────────────────────
  if (body.email) {
    return {
      email:          String(body.email),
      customer_name:  String(body.customer_name ?? body.name ?? "Cliente"),
      transaction_id: String(body.transaction_id ?? body.order_id ?? crypto.randomUUID()),
      plan:           String(body.plan ?? "basic"),
      status:         String(body.status ?? "approved"),
    };
  }

  return null;
}

const APPROVED_STATUSES = new Set([
  "approved", "complete", "paid", "succeeded",
  "APPROVED", "COMPLETE", "PAID", "COMPLETE",
]);

/* ── POST handler ───────────────────────────────────────── */

export async function POST(req: NextRequest) {
  const rawBody = await req.text();
  const supabase = createAdminClient();

  // 1. log da chegada
  const logPayload = async (status: string, error?: string) => {
    await supabase.from("webhook_logs").insert({
      source:  "payment_gateway",
      event:   "payment.webhook",
      payload: JSON.parse(rawBody),
      status,
      error,
    });
  };

  // 2. validar assinatura
  if (!validateSignature(rawBody, req)) {
    await logPayload("rejected", "invalid_signature");
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: Record<string, unknown>;
  try {
    body = JSON.parse(rawBody);
  } catch {
    await logPayload("rejected", "invalid_json");
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  // 3. normalizar payload
  const data = parsePayload(body);
  if (!data) {
    await logPayload("skipped", "unrecognized_payload");
    return NextResponse.json({ ok: true, skipped: true });
  }

  // 4. verificar se é pagamento aprovado
  if (!APPROVED_STATUSES.has(data.status)) {
    await logPayload("skipped", `status_not_approved: ${data.status}`);
    return NextResponse.json({ ok: true, skipped: true });
  }

  const email = data.email?.toLowerCase().trim();
  if (!email) {
    await logPayload("error", "missing_email");
    return NextResponse.json({ error: "Missing email" }, { status: 400 });
  }

  try {
    // 5. verificar se registro já existe para este e-mail
    const { data: existing } = await supabase
      .from("customer_subscriptions")
      .select("id, subscription_status, auth_user_id")
      .eq("email", email)
      .maybeSingle();

    // 6a. já existe e está ativo → apenas atualiza plano
    if (existing?.subscription_status === "active") {
      await supabase
        .from("customer_subscriptions")
        .update({ plan: data.plan, payment_status: "approved" })
        .eq("email", email);

      await logPayload("ok_updated");
      return NextResponse.json({ ok: true, action: "plan_updated" });
    }

    // 6b. existe mas pendente → gera novo token
    const token   = generateToken();
    const expires = tokenExpiresAt();

    if (existing) {
      await supabase
        .from("customer_subscriptions")
        .update({
          plan:                  data.plan,
          payment_status:        "approved",
          subscription_status:   "pending_activation",
          activation_token:      token,
          activation_expires_at: expires,
          transaction_id:        data.transaction_id,
        })
        .eq("email", email);
    } else {
      // 6c. não existe → cria registro
      await supabase.from("customer_subscriptions").insert({
        email,
        customer_name:         data.customer_name,
        transaction_id:        data.transaction_id,
        plan:                  data.plan,
        payment_status:        "approved",
        subscription_status:   "pending_activation",
        activation_token:      token,
        activation_expires_at: expires,
      });
    }

    // 7. enviar e-mail de ativação
    await sendActivationEmail({
      to:    email,
      name:  data.customer_name,
      token,
    });

    await logPayload("ok_activation_sent");
    return NextResponse.json({ ok: true, action: "activation_email_sent" });

  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    await logPayload("error", msg);
    console.error("[webhook/payment]", msg);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
