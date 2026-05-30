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
          background: "rgba(13,13,13,0.97)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          borderTop: "1px solid #1E1E1E",
          boxShadow: "0 -8px 32px rgba(0,0,0,0.4)",
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
                  background: active ? "rgba(212,175,55,0.12)" : "transparent",
                }}
              >
                <Icon
                  size={18}
                  style={{ color: active ? "#D4AF37" : "#52525B" }}
                />
                {active && item.href === "/ia-financeira" && (
                  <span
                    className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full"
                    style={{ background: "#D4AF37" }}
                  />
                )}
              </div>
              <span
                className="text-[9.5px] leading-none tracking-wide transition-colors"
                style={{
                  color: active ? "#D4AF37" : "#3F3F46",
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
                  style={{ background: "linear-gradient(90deg, #D4AF37, #B8952A)" }}
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
              background: anyMoreActive ? "rgba(212,175,55,0.12)" : "transparent",
            }}
          >
            <MoreHorizontal
              size={18}
              style={{ color: anyMoreActive ? "#D4AF37" : "#52525B" }}
            />
          </div>
          <span
            className="text-[9.5px] leading-none tracking-wide"
            style={{
              color: anyMoreActive ? "#D4AF37" : "#3F3F46",
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
                background: "#131313",
                border: "1px solid #1E1E1E",
                borderBottom: "none",
                boxShadow: "0 -20px 60px rgba(0,0,0,0.6)",
              }}
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
            >
              {/* Handle */}
              <div className="flex justify-center pt-3 pb-2">
                <div className="w-10 h-1 rounded-full" style={{ background: "#2A2A2A" }} />
              </div>

              {/* Header */}
              <div className="flex items-center justify-between px-5 pb-3">
                <div>
                  <p
                    className="text-[10px] text-[#52525B] uppercase tracking-[0.14em]"
                    style={{ fontFamily: "'Instrument Sans', sans-serif" }}
                  >
                    Navegação
                  </p>
                  <h3
                    className="text-[17px] text-white font-light"
                    style={{ fontFamily: "'Cormorant SC', serif" }}
                  >
                    Todas as Seções
                  </h3>
                </div>
                <button
                  onClick={() => setShowMore(false)}
                  className="w-9 h-9 flex items-center justify-center rounded-xl transition-all"
                  style={{ background: "#1A1A1A", border: "1px solid #262626" }}
                >
                  <X size={15} className="text-[#52525B]" />
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
                        background: active ? "rgba(212,175,55,0.08)" : "#1A1A1A",
                        border: active
                          ? "1px solid rgba(212,175,55,0.2)"
                          : "1px solid #222222",
                      }}
                    >
                      <div
                        className="w-10 h-10 flex items-center justify-center rounded-xl"
                        style={{
                          background: active
                            ? "rgba(212,175,55,0.12)"
                            : "#242424",
                        }}
                      >
                        <Icon
                          size={18}
                          style={{ color: active ? "#D4AF37" : "#52525B" }}
                        />
                      </div>
                      <span
                        className="text-[10px] text-center leading-tight"
                        style={{
                          color: active ? "#D4AF37" : "#A1A1AA",
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
