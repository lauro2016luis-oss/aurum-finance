/**
 * This endpoint is disabled in production.
 *
 * The legitimate account creation flow is:
 *   payment webhook → /api/webhook/payment → activation email → /api/ativar-conta/activate
 *
 * Direct registration bypasses payment verification and must not be exposed publicly.
 */
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST() {
  // Always return 404 so the endpoint is not discoverable.
  return NextResponse.json({ error: "Not found" }, { status: 404 });
}
