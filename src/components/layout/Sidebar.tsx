"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  ArrowLeftRight,
  TrendingUp,
  Receipt,
  CreditCard,
  Landmark,
  LineChart,
  Target,
  Shield,
  CalendarClock,
  RefreshCcw,
  BarChart3,
  Sparkles,
  Settings,
  HelpCircle,
  ChevronRight,
  Building2,
  User,
  Bell,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navSections = [
  {
    label: "Principal",
    items: [
      { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
      { href: "/transacoes", label: "Transações", icon: ArrowLeftRight },
    ],
  },
  {
    label: "Finanças",
    items: [
      { href: "/receitas", label: "Receitas", icon: TrendingUp },
      { href: "/gastos-fixos", label: "Gastos Fixos", icon: Receipt },
      { href: "/cartoes", label: "Cartões", icon: CreditCard },
      { href: "/contas", label: "Contas Bancárias", icon: Landmark },
    ],
  },
  {
    label: "Patrimônio",
    items: [
      { href: "/investimentos", label: "Investimentos", icon: LineChart },
      { href: "/metas", label: "Metas Financeiras", icon: Target },
      { href: "/reserva", label: "Reserva de Emergência", icon: Shield },
      { href: "/planejamento", label: "Planejamento", icon: CalendarClock },
      { href: "/assinaturas", label: "Assinaturas", icon: RefreshCcw },
    ],
  },
  {
    label: "Inteligência",
    items: [
      { href: "/ia-financeira", label: "IA Financeira", icon: Sparkles, badge: "PRO" },
      { href: "/relatorios", label: "Relatórios", icon: BarChart3 },
      { href: "/empresa", label: "Modo Empresa", icon: Building2 },
    ],
  },
];

const bottomItems = [
  { href: "/configuracoes", label: "Configurações", icon: Settings },
  { href: "/suporte", label: "Suporte", icon: HelpCircle },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside
      className="fixed left-0 top-0 h-screen w-[260px] flex flex-col z-50"
      style={{ background: "var(--bg-sidebar)" }}
    >
      {/* Subtle top border glow */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(212,175,55,0.3), transparent)" }}
      />

      {/* Logo */}
      <div className="px-5 pt-6 pb-4 flex-shrink-0">
        <Link href="/dashboard" className="flex items-center gap-3 group">
          <div className="relative">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg, #D4AF37, #B8952A)",
                boxShadow: "0 0 16px rgba(212,175,55,0.35)",
              }}
            >
              <span
                className="text-black font-bold text-base leading-none"
                style={{ fontFamily: "'Cormorant SC', serif", letterSpacing: "-0.02em" }}
              >
                A
              </span>
            </div>
            <div
              className="absolute -inset-1 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ background: "radial-gradient(circle, rgba(212,175,55,0.15) 0%, transparent 70%)" }}
            />
          </div>
          <div>
            <h1
              className="text-[18px] tracking-[0.06em] text-white leading-none"
              style={{ fontFamily: "'Cormorant SC', serif", fontWeight: 500, letterSpacing: "0.08em" }}
            >
              AURUM
            </h1>
            <p
              className="text-[9.5px] text-[#3F3F46] mt-[3px] leading-none"
              style={{ fontFamily: "'Instrument Sans', sans-serif", fontWeight: 500, letterSpacing: "0.22em", textTransform: "uppercase" }}
            >
              Finance
            </p>
          </div>
        </Link>
      </div>

      {/* Profile quick-switch */}
      <div className="px-3 mb-4 flex-shrink-0">
        <div
          className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl cursor-pointer transition-all duration-200 hover:bg-[#1F1F1F] group"
          style={{ border: "1px solid #1E1E1E" }}
        >
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-semibold text-black flex-shrink-0"
            style={{ background: "linear-gradient(135deg, #D4AF37, #B8952A)" }}
          >
            L
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[13px] font-medium text-white truncate leading-none" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>Lauro Luis</p>
            <p className="text-[11px] text-[#52525B] mt-0.5 leading-none" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>Pessoal</p>
          </div>
          <ChevronRight size={13} className="text-[#3F3F46] group-hover:text-[#A1A1AA] transition-colors flex-shrink-0" />
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto sidebar-scroll px-3 pb-4 space-y-5">
        {navSections.map((section) => (
          <div key={section.label}>
            <p
              className="px-3 mb-1.5 text-[9.5px] text-[#3F3F46]"
              style={{ fontFamily: "'Instrument Sans', sans-serif", fontWeight: 500, letterSpacing: "0.14em", textTransform: "uppercase" }}
            >
              {section.label}
            </p>
            <div className="space-y-0.5">
              {section.items.map((item) => {
                const Icon = item.icon;
                const isActive =
                  pathname === item.href || pathname.startsWith(item.href + "/");
                return (
                  <Link key={item.href} href={item.href}>
                    <motion.div
                      className={cn("nav-item", isActive && "active")}
                      whileHover={{ x: 1 }}
                      transition={{ duration: 0.15 }}
                    >
                      <Icon
                        size={15}
                        className={cn(
                          "flex-shrink-0 transition-colors",
                          isActive ? "text-[#D4AF37]" : "text-[#52525B] group-hover:text-[#A1A1AA]"
                        )}
                      />
                      <span className="flex-1 truncate">{item.label}</span>
                      {"badge" in item && item.badge && (
                        <span
                          className="text-[9px] font-semibold px-1.5 py-0.5 rounded tracking-wider"
                          style={{
                            background: "rgba(212,175,55,0.12)",
                            color: "#D4AF37",
                            border: "1px solid rgba(212,175,55,0.2)",
                          }}
                        >
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

      {/* Bottom section */}
      <div className="flex-shrink-0 px-3 pb-5">
        <div className="h-px mb-3" style={{ background: "linear-gradient(90deg, transparent, #1E1E1E, transparent)" }} />
        <div className="space-y-0.5">
          {bottomItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link key={item.href} href={item.href}>
                <div className={cn("nav-item", isActive && "active")}>
                  <Icon size={15} className={cn("flex-shrink-0", isActive ? "text-[#D4AF37]" : "text-[#52525B]")} />
                  <span>{item.label}</span>
                </div>
              </Link>
            );
          })}
          <button className="nav-item w-full text-left text-[#52525B] hover:text-[#EF4444]">
            <LogOut size={15} className="flex-shrink-0" />
            <span>Sair</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
