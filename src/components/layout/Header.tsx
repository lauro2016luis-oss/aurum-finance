"use client";

import { Bell, Search, Eye, EyeOff, Menu } from "lucide-react";
import { useNav } from "@/lib/nav-context";

interface HeaderProps {
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
}

export function Header({ title, subtitle, children }: HeaderProps) {
  const { toggleSidebar, hideValues, toggleHideValues } = useNav();

  return (
    <header
      className="h-14 sm:h-16 flex items-center justify-between px-4 sm:px-6 lg:px-8 flex-shrink-0 sticky top-0 z-30 gap-2"
      style={{
        background: "rgba(10,10,10,0.92)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: "1px solid #1A1A1A",
      }}
    >
      {/* Left: hamburger + title */}
      <div className="flex items-center gap-3 min-w-0 flex-1">
        {/* Hamburger — mobile/tablet only */}
        <button
          onClick={toggleSidebar}
          className="lg:hidden w-10 h-10 flex items-center justify-center rounded-xl transition-all flex-shrink-0"
          style={{ background: "#1A1A1A", border: "1px solid #262626" }}
          aria-label="Abrir menu"
        >
          <Menu size={18} className="text-[#A1A1AA]" />
        </button>

        <div className="min-w-0">
          {subtitle && (
            <p className="text-[9px] sm:text-[9.5px] text-[#3F3F46] leading-none mb-1 hidden sm:block"
              style={{ fontFamily:"'Instrument Sans',sans-serif", fontWeight:500, letterSpacing:"0.16em", textTransform:"uppercase" }}>
              {subtitle}
            </p>
          )}
          <h1 className="text-[17px] sm:text-[22px] text-white leading-none truncate"
            style={{ fontFamily:"'Cormorant SC',serif", fontWeight:400, letterSpacing:"-0.01em" }}>
            {title}
          </h1>
        </div>
      </div>

      {/* Right: actions */}
      <div className="flex items-center gap-1 sm:gap-1.5 flex-shrink-0">
        {/* Page-specific slot */}
        {children && (
          <div className="flex items-center gap-1 sm:gap-1.5 mr-1 sm:mr-2">
            {children}
          </div>
        )}

        {/* Search — desktop only */}
        <button className="hidden md:flex items-center gap-2 px-3 py-2 rounded-xl text-[#52525B] hover:text-[#A1A1AA] transition-all hover:bg-[#1A1A1A]"
          style={{ border:"1px solid transparent" }}>
          <Search size={14} />
          <span className="text-[12px] text-[#3F3F46]" style={{ fontFamily:"'Instrument Sans',sans-serif" }}>⌘K</span>
        </button>

        {/* Search icon — mobile */}
        <button className="md:hidden w-9 h-9 flex items-center justify-center rounded-xl text-[#52525B] hover:text-[#A1A1AA] transition-all hover:bg-[#1A1A1A]">
          <Search size={15} />
        </button>

        {/* Hide/show values — with visible label on desktop */}
        <button
          onClick={toggleHideValues}
          className="flex items-center gap-1.5 h-9 px-2 sm:px-3 rounded-xl transition-all"
          style={{
            background: hideValues ? "rgba(212,175,55,0.1)" : "#1A1A1A",
            border: hideValues ? "1px solid rgba(212,175,55,0.25)" : "1px solid #262626",
          }}
          title={hideValues ? "Mostrar valores" : "Ocultar valores"}
        >
          {hideValues
            ? <EyeOff size={15} style={{ color: "#D4AF37" }} />
            : <Eye size={15} className="text-[#A1A1AA]" />
          }
          <span className="hidden sm:block text-[11px]"
            style={{ color: hideValues ? "#D4AF37" : "#52525B", fontFamily:"'Instrument Sans',sans-serif" }}>
            {hideValues ? "Exibir" : "Ocultar"}
          </span>
        </button>

        {/* Notifications */}
        <button className="relative w-9 h-9 flex items-center justify-center rounded-xl text-[#52525B] hover:text-[#A1A1AA] transition-all hover:bg-[#1A1A1A]"
          style={{ border:"1px solid transparent" }}>
          <Bell size={15} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#D4AF37]"
            style={{ boxShadow: "0 0 6px rgba(212,175,55,0.6)" }} />
        </button>

        {/* Avatar */}
        <button className="w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold text-black transition-all hover:scale-105"
          style={{ background:"linear-gradient(135deg,#D4AF37,#B8952A)", boxShadow:"0 0 12px rgba(212,175,55,0.25)" }}>
          L
        </button>
      </div>
    </header>
  );
}
