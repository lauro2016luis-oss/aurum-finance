import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";

/* rotas públicas — não precisam de auth */
const PUBLIC_PATHS = [
  "/login",
  "/ativar-conta",
  "/acesso-bloqueado",
  "/api/webhook",
  "/api/ativar-conta",
  "/_next",
  "/favicon",
];

function isPublic(pathname: string): boolean {
  return PUBLIC_PATHS.some(p => pathname.startsWith(p));
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // sempre libera rotas públicas e assets
  if (isPublic(pathname)) return NextResponse.next();

  const res = NextResponse.next();

  // criar cliente Supabase com os cookies da request
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => req.cookies.getAll(),
        setAll: (cookies: { name: string; value: string; options?: Record<string,unknown> }[]) => {
          cookies.forEach(({ name, value, options }) => {
            res.cookies.set(name, value, options);
          });
        },
      },
    }
  );

  // 1. verificar sessão
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    const loginUrl = req.nextUrl.clone();
    loginUrl.pathname = "/login";
    return NextResponse.redirect(loginUrl);
  }

  // 2. verificar assinatura ativa
  const { data: subscription } = await supabase
    .from("customer_subscriptions")
    .select("subscription_status, payment_status")
    .eq("auth_user_id", user.id)
    .maybeSingle();

  const hasAccess =
    subscription?.subscription_status === "active" &&
    subscription?.payment_status === "approved";

  if (!hasAccess) {
    const blockedUrl = req.nextUrl.clone();
    blockedUrl.pathname = "/acesso-bloqueado";
    return NextResponse.redirect(blockedUrl);
  }

  return res;
}

export const config = {
  matcher: [
    /*
     * Proteger tudo exceto:
     * - _next/static  (arquivos estáticos)
     * - _next/image   (otimização de imagens)
     * - favicon.ico
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
