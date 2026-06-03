"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, ArrowLeftRight, TrendingUp, Receipt,
  CreditCard, Landmark, LineChart, Target, Shield,
  CalendarClock, RefreshCcw, BarChart3, Sparkles,
  Settings, HelpCircle, ChevronRight, Building2, LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useNav } from "@/lib/nav-context";
import { useTheme } from "@/lib/theme-context";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

const navSections = [
  {
    label: "Principal",
    items: [
      { href: "/dashboard",   label: "Dashboard",   icon: LayoutDashboard },
      { href: "/transacoes",  label: "Transações",  icon: ArrowLeftRight  },
    ],
  },
  {
    label: "Finanças",
    items: [
      { href: "/receitas",     label: "Receitas",        icon: TrendingUp  },
      { href: "/gastos-fixos", label: "Gastos Fixos",    icon: Receipt     },
      { href: "/cartoes",      label: "Cartões",          icon: CreditCard  },
      { href: "/contas",       label: "Contas Bancárias", icon: Landmark    },
    ],
  },
  {
    label: "Patrimônio",
    items: [
      { href: "/investimentos", label: "Investimentos",        icon: LineChart    },
      { href: "/metas",         label: "Metas Financeiras",    icon: Target       },
      { href: "/reserva",       label: "Reserva de Emergência",icon: Shield       },
      { href: "/planejamento",  label: "Planejamento",         icon: CalendarClock},
      { href: "/assinaturas",   label: "Assinaturas",          icon: RefreshCcw   },
    ],
  },
  {
    label: "Inteligência",
    items: [
      { href: "/ia-financeira", label: "IA Financeira", icon: Sparkles, badge: "PRO" },
      { href: "/relatorios",    label: "Relatórios",    icon: BarChart3  },
      { href: "/empresa",       label: "Modo Empresa",  icon: Building2  },
    ],
  },
];

const bottomItems = [
  { href: "/configuracoes", label: "Configurações", icon: Settings  },
  { href: "/suporte",       label: "Suporte",       icon: HelpCircle},
];

export function Sidebar() {
  const pathname = usePathname();
  const { sidebarOpen, closeSidebar } = useNav();
  const { theme } = useTheme();
  const isLight = theme === "light";
  const [userName, setUserName] = useState("Usuário");
  const [userInitial, setUserInitial] = useState("U");

  useEffect(() => {
    createClient().auth.getUser().then(({ data }) => {
      if (!data.user) return;
      const meta = data.user.user_metadata;
      const name = meta?.name || meta?.full_name || data.user.email?.split("@")[0] || "Usuário";
      setUserName(name);
      setUserInitial(name.charAt(0).toUpperCase());
    });

    const handler = (e: Event) => {
      const name = (e as CustomEvent).detail?.name;
      if (name) { setUserName(name); setUserInitial(name.charAt(0).toUpperCase()); }
    };
    window.addEventListener("aurum:profile-updated", handler);
    return () => window.removeEventListener("aurum:profile-updated", handler);
  }, []);

  // In light mode the sidebar goes dark charcoal for luxury contrast
  const SB = {
    bg:         isLight ? "#1A1710" : "#111111",
    bgHover:    isLight ? "#252218" : "#1F1F1F",
    bgActive:   isLight ? "rgba(212,175,55,0.10)" : "rgba(212,175,55,0.08)",
    border:     isLight ? "rgba(212,175,55,0.12)" : "#1E1E1E",
    borderLine: isLight ? "rgba(212,175,55,0.1)" : "#1E1E1E",
    textPrimary:isLight ? "#F5F0E8" : "#FFFFFF",
    textMuted:  isLight ? "#C8BFA0" : "#52525B",
    textLabel:  isLight ? "#8A8070" : "#3F3F46",
    gold:       "#D4AF37",
  };

  const content = (
    <aside
      className="w-[260px] h-screen flex flex-col overflow-hidden relative"
      style={{ background: SB.bg, borderRight: `1px solid ${SB.border}` }}
    >
      {/* Gold top line */}
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg,transparent,rgba(212,175,55,0.4),transparent)" }} />

      {/* Logo */}
      <div className="px-5 pt-6 pb-4 flex-shrink-0 flex items-center justify-between">
        <Link href="/dashboard" className="flex items-center gap-3 group" onClick={closeSidebar}>
          <div className="w-9 h-9 rounded-xl flex items-center justify-center"
            style={{ background:"linear-gradient(135deg,#D4AF37,#B8952A)", boxShadow:"0 0 16px rgba(212,175,55,0.35)" }}>
            <span className="text-black font-bold text-base leading-none"
              style={{ fontFamily:"'Instrument Sans',sans-serif", letterSpacing:"-0.02em" }}>A</span>
          </div>
          <div>
            <h1 className="text-[18px] leading-none"
              style={{ fontFamily:"'Instrument Sans',sans-serif", fontWeight:500, letterSpacing:"0.08em", color: SB.textPrimary }}>AURUM</h1>
            <p className="text-[9.5px] mt-[3px] leading-none"
              style={{ fontFamily:"'Instrument Sans',sans-serif", fontWeight:500, letterSpacing:"0.22em", textTransform:"uppercase", color: SB.textLabel }}>Finance</p>
          </div>
        </Link>
      </div>

      {/* Profile */}
      <div className="px-3 mb-4 flex-shrink-0">
        <div className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl cursor-pointer group transition-all"
          style={{ border: `1px solid ${SB.border}`, background: "transparent" }}
          onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.background = SB.bgHover; }}
          onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.background = "transparent"; }}
        >
          <div className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-semibold text-black flex-shrink-0"
            style={{ background:"linear-gradient(135deg,#D4AF37,#B8952A)" }}>{userInitial}</div>
          <div className="flex-1 min-w-0">
            <p className="text-[13px] font-medium truncate leading-none"
              style={{ fontFamily:"'Instrument Sans',sans-serif", color: SB.textPrimary }}>{userName}</p>
            <p className="text-[11px] mt-0.5 leading-none"
              style={{ fontFamily:"'Instrument Sans',sans-serif", color: SB.textMuted }}>Pessoal</p>
          </div>
          <ChevronRight size={13} style={{ color: SB.textLabel }} className="transition-colors flex-shrink-0" />
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto sidebar-scroll px-3 pb-4 space-y-5">
        {navSections.map((section) => (
          <div key={section.label}>
            <p className="px-3 mb-1.5 text-[9.5px]"
              style={{ fontFamily:"'Instrument Sans',sans-serif", fontWeight:600, letterSpacing:"0.14em", textTransform:"uppercase", color: SB.textLabel }}>
              {section.label}
            </p>
            <div className="space-y-0.5">
              {section.items.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
                return (
                  <Link key={item.href} href={item.href} onClick={closeSidebar}>
                    <motion.div
                      className="flex items-center gap-[10px] px-3 py-2 rounded-[10px] cursor-pointer transition-all text-[13px]"
                      style={{
                        background: isActive ? SB.bgActive : "transparent",
                        color: isActive ? SB.gold : SB.textMuted,
                        fontFamily: "'Instrument Sans',sans-serif",
                        fontWeight: isActive ? 600 : 500,
                        position: "relative",
                      }}
                      onMouseEnter={e => { if (!isActive) (e.currentTarget as HTMLDivElement).style.background = SB.bgHover; (e.currentTarget as HTMLDivElement).style.color = isActive ? SB.gold : SB.textPrimary; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.background = isActive ? SB.bgActive : "transparent"; (e.currentTarget as HTMLDivElement).style.color = isActive ? SB.gold : SB.textMuted; }}
                      whileHover={{ x: 1 }} transition={{ duration: 0.15 }}
                    >
                      {isActive && (
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-[60%] rounded-r-full"
                          style={{ background: SB.gold, boxShadow: "0 0 8px rgba(212,175,55,0.6)" }} />
                      )}
                      <Icon size={15} className="flex-shrink-0" style={{ color: isActive ? SB.gold : SB.textMuted }} />
                      <span className="flex-1 truncate">{item.label}</span>
                      {"badge" in item && item.badge && (
                        <span className="text-[9px] font-semibold px-1.5 py-0.5 rounded tracking-wider"
                          style={{ background:"rgba(212,175,55,0.15)", color:"#D4AF37", border:"1px solid rgba(212,175,55,0.25)" }}>
                          {item.badge}
                        </span>
                      )}
                    </motion.div>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Bottom */}
      <div className="flex-shrink-0 px-3 pb-5">
        <div className="h-px mb-3"
          style={{ background: `linear-gradient(90deg,transparent,${SB.border},transparent)` }} />
        <div className="space-y-0.5">
          {bottomItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link key={item.href} href={item.href} onClick={closeSidebar}>
                <div
                  className="flex items-center gap-[10px] px-3 py-2 rounded-[10px] cursor-pointer transition-all text-[13px]"
                  style={{
                    background: isActive ? SB.bgActive : "transparent",
                    color: isActive ? SB.gold : SB.textMuted,
                    fontFamily: "'Instrument Sans',sans-serif",
                    fontWeight: 500,
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.background = SB.bgHover; (e.currentTarget as HTMLDivElement).style.color = SB.textPrimary; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.background = isActive ? SB.bgActive : "transparent"; (e.currentTarget as HTMLDivElement).style.color = isActive ? SB.gold : SB.textMuted; }}
                >
                  <Icon size={15} className="flex-shrink-0" style={{ color: isActive ? SB.gold : SB.textMuted }} />
                  <span>{item.label}</span>
                </div>
              </Link>
            );
          })}
          <button
            className="flex items-center gap-[10px] px-3 py-2 rounded-[10px] cursor-pointer transition-all text-[13px] w-full text-left"
            style={{ color: SB.textMuted, fontFamily: "'Instrument Sans',sans-serif", fontWeight: 500, background: "transparent" }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = SB.bgHover; (e.currentTarget as HTMLButtonElement).style.color = "#EF4444"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = "transparent"; (e.currentTarget as HTMLButtonElement).style.color = SB.textMuted; }}
            onClick={async () => {
              const { createClient } = await import("@/lib/supabase/client");
              const supabase = createClient();
              await supabase.auth.signOut();
              window.location.href = "/login";
            }}>
            <LogOut size={15} className="flex-shrink-0" />
            <span>Sair</span>
          </button>
        </div>
      </div>
    </aside>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <div className="hidden lg:flex fixed left-0 top-0 h-screen w-[260px] z-50 flex-col">
        {content}
      </div>

      {/* Mobile drawer — slides in from left */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            {/* Overlay */}
            <motion.div
              className="lg:hidden fixed inset-0 z-[55] bg-black/60"
              style={{ backdropFilter: "blur(4px)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeSidebar}
            />
            {/* Drawer */}
            <motion.div
              className="lg:hidden fixed left-0 top-0 h-screen w-[280px] z-[56] flex flex-col"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
            >
              {content}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
