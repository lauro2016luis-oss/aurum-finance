"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, ArrowLeftRight, TrendingUp,
  Receipt, LineChart, Sparkles, MoreHorizontal, X,
  CreditCard, Landmark, Target, Shield, CalendarClock,
  RefreshCcw, BarChart3, Building2, Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/lib/theme-context";

// Main 5 items always visible in the bar
const mainItems = [
  { href: "/dashboard",    label: "Início",       icon: LayoutDashboard },
  { href: "/receitas",     label: "Fluxo",        icon: TrendingUp      },
  { href: "/transacoes",   label: "Transações",   icon: ArrowLeftRight  },
  { href: "/investimentos",label: "Investimentos",icon: LineChart       },
  { href: "/ia-financeira",label: "IA",           icon: Sparkles        },
];

// All other items shown in "More" sheet
const moreItems = [
  { href: "/gastos-fixos", label: "Gastos Fixos",     icon: Receipt      },
  { href: "/cartoes",      label: "Cartões",           icon: CreditCard   },
  { href: "/contas",       label: "Contas",            icon: Landmark     },
  { href: "/metas",        label: "Metas",             icon: Target       },
  { href: "/reserva",      label: "Reserva",           icon: Shield       },
  { href: "/planejamento", label: "Planejamento",      icon: CalendarClock},
  { href: "/assinaturas",  label: "Assinaturas",       icon: RefreshCcw   },
  { href: "/relatorios",   label: "Relatórios",        icon: BarChart3    },
  { href: "/empresa",      label: "Empresa",           icon: Building2    },
  { href: "/configuracoes",label: "Configurações",     icon: Settings     },
];

export function BottomNav() {
  const pathname = usePathname();
  const [showMore, setShowMore] = useState(false);
  const { theme } = useTheme();
  const isLight = theme === "light";

  const gold        = isLight ? "#A07810" : "#D4AF37";
  const textInactive = isLight ? "#6B6860" : "#52525B";
  const textLabel    = isLight ? "#A8A598" : "#3F3F46";
  const bgBar        = isLight ? "rgba(255,255,255,0.97)" : "rgba(13,13,13,0.97)";
  const borderTop    = isLight ? "#DDD9CC" : "#1E1E1E";
  const bgSheet      = isLight ? "#FFFFFF" : "#131313";
  const borderSheet  = isLight ? "#DDD9CC" : "#1E1E1E";
  const bgHandle     = isLight ? "#D0CEC0" : "#2A2A2A";
  const bgItemDefault = isLight ? "#F2F0E8" : "#1A1A1A";
  const borderItem   = isLight ? "#DDD9CC" : "#222222";
  const bgIconDefault = isLight ? "#EEECe4" : "#242424";
  const textItemLabel = isLight ? "#3D3B32" : "#A1A1AA";

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  const anyMoreActive = moreItems.some((i) => isActive(i.href));

  return (
    <>
      {/* Bottom bar */}
      <nav
        className="lg:hidden fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around px-2"
        style={{
          height: "64px",
          background: bgBar,
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          borderTop: `1px solid ${borderTop}`,
          boxShadow: isLight
            ? "0 -4px 24px rgba(0,0,0,0.08)"
            : "0 -8px 32px rgba(0,0,0,0.4)",
        }}
      >
        {mainItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex flex-col items-center gap-0.5 py-1 px-3 rounded-xl transition-all active:scale-95"
              style={{ minWidth: 52 }}
            >
              <div
                className="w-8 h-8 flex items-center justify-center rounded-xl transition-all duration-200"
                style={{
                  background: active
                    ? isLight ? "rgba(160,120,10,0.1)" : "rgba(212,175,55,0.12)"
                    : "transparent",
                }}
              >
                <Icon size={18} style={{ color: active ? gold : textInactive }} />
              </div>
              <span
                className="text-[9.5px] leading-none tracking-wide transition-colors"
                style={{
                  color: active ? gold : textLabel,
                  fontFamily: "'Instrument Sans', sans-serif",
                  fontWeight: active ? 600 : 400,
                }}
              >
                {item.label}
              </span>
              {active && (
                <motion.div
                  layoutId="bottomNavIndicator"
                  className="absolute bottom-0 w-8 h-0.5 rounded-full"
                  style={{ background: `linear-gradient(90deg, ${gold}, ${isLight ? "#7A5C08" : "#B8952A"})` }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
            </Link>
          );
        })}

        {/* More button */}
        <button
          onClick={() => setShowMore(true)}
          className="flex flex-col items-center gap-0.5 py-1 px-3 rounded-xl transition-all active:scale-95"
          style={{ minWidth: 52 }}
        >
          <div
            className="w-8 h-8 flex items-center justify-center rounded-xl transition-all duration-200"
            style={{
              background: anyMoreActive
                ? isLight ? "rgba(160,120,10,0.1)" : "rgba(212,175,55,0.12)"
                : "transparent",
            }}
          >
            <MoreHorizontal size={18} style={{ color: anyMoreActive ? gold : textInactive }} />
          </div>
          <span
            className="text-[9.5px] leading-none tracking-wide"
            style={{
              color: anyMoreActive ? gold : textLabel,
              fontFamily: "'Instrument Sans', sans-serif",
              fontWeight: anyMoreActive ? 600 : 400,
            }}
          >
            Mais
          </span>
        </button>
      </nav>

      {/* "More" bottom sheet */}
      <AnimatePresence>
        {showMore && (
          <>
            {/* Overlay */}
            <motion.div
              className="lg:hidden fixed inset-0 z-50 bg-black/60"
              style={{ backdropFilter: "blur(4px)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowMore(false)}
            />

            {/* Sheet */}
            <motion.div
              className="lg:hidden fixed bottom-0 left-0 right-0 z-[60] rounded-t-3xl overflow-hidden"
              style={{
                background: bgSheet,
                border: `1px solid ${borderSheet}`,
                borderBottom: "none",
                boxShadow: isLight
                  ? "0 -8px 40px rgba(0,0,0,0.12)"
                  : "0 -20px 60px rgba(0,0,0,0.6)",
              }}
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
            >
              {/* Handle */}
              <div className="flex justify-center pt-3 pb-2">
                <div className="w-10 h-1 rounded-full" style={{ background: bgHandle }} />
              </div>

              {/* Header */}
              <div className="flex items-center justify-between px-5 pb-3">
                <div>
                  <p
                    className="text-[10px] uppercase tracking-[0.14em]"
                    style={{ color: isLight ? "#6B6860" : "#52525B", fontFamily: "'Instrument Sans', sans-serif" }}
                  >
                    Navegação
                  </p>
                  <h3
                    className="text-[17px] font-light"
                    style={{ color: isLight ? "#1C1A14" : "#FFFFFF", fontFamily: "'Cormorant SC', serif" }}
                  >
                    Todas as Seções
                  </h3>
                </div>
                <button
                  onClick={() => setShowMore(false)}
                  className="w-9 h-9 flex items-center justify-center rounded-xl transition-all"
                  style={{
                    background: isLight ? "#EEECe4" : "#1A1A1A",
                    border: `1px solid ${isLight ? "#DDD9CC" : "#262626"}`,
                  }}
                >
                  <X size={15} style={{ color: isLight ? "#6B6860" : "#52525B" }} />
                </button>
              </div>

              {/* Grid of items */}
              <div className="grid grid-cols-4 gap-2 px-4 pb-6">
                {moreItems.map((item) => {
                  const Icon = item.icon;
                  const active = isActive(item.href);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setShowMore(false)}
                      className="flex flex-col items-center gap-2 p-3 rounded-2xl transition-all active:scale-95"
                      style={{
                        background: active
                          ? isLight ? "rgba(160,120,10,0.07)" : "rgba(212,175,55,0.08)"
                          : bgItemDefault,
                        border: active
                          ? `1px solid ${isLight ? "rgba(160,120,10,0.2)" : "rgba(212,175,55,0.2)"}`
                          : `1px solid ${borderItem}`,
                      }}
                    >
                      <div
                        className="w-10 h-10 flex items-center justify-center rounded-xl"
                        style={{
                          background: active
                            ? isLight ? "rgba(160,120,10,0.1)" : "rgba(212,175,55,0.12)"
                            : bgIconDefault,
                        }}
                      >
                        <Icon size={18} style={{ color: active ? gold : textInactive }} />
                      </div>
                      <span
                        className="text-[10px] text-center leading-tight"
                        style={{
                          color: active ? gold : textItemLabel,
                          fontFamily: "'Instrument Sans', sans-serif",
                          fontWeight: active ? 600 : 400,
                        }}
                      >
                        {item.label}
                      </span>
                    </Link>
                  );
                })}
              </div>

              {/* Safe area spacer */}
              <div style={{ height: "env(safe-area-inset-bottom, 8px)" }} />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
