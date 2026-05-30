"use client";

import { Bell, Search, Eye, EyeOff, Menu } from "lucide-react";
import { useState } from "react";
import { useNav } from "@/lib/nav-context";

interface HeaderProps {
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
}

export function Header({ title, subtitle, children }: HeaderProps) {
  const [hideValues, setHideValues] = useState(false);
  const [hasNotifications] = useState(true);
  const { toggleSidebar } = useNav();

  return (
    <header
      className="h-14 sm:h-16 flex items-center justify-between px-4 sm:px-6 lg:px-8 flex-shrink-0 sticky top-0 z-30 gap-2"
      style={{
        background: "rgba(10,10,10,0.9)",
        backdropFilter: "blur(20px)",
        borderBottom: "1px solid #1A1A1A",
      }}
    >
      {/* Left: hamburger + title */}
      <div className="flex items-center gap-3 min-w-0">
        {/* Hamburger — only on mobile/tablet */}
        <button
          onClick={toggleSidebar}
          className="lg:hidden w-9 h-9 flex items-center justify-center rounded-xl text-[#52525B] hover:text-white hover:bg-[#1A1A1A] transition-all flex-shrink-0"
        >
          <Menu size={18} />
        </button>

        <div className="min-w-0">
          {subtitle && (
            <p className="text-[9.5px] text-[#3F3F46] leading-none mb-1 hidden sm:block"
              style={{ fontFamily:"'Instrument Sans',sans-serif", fontWeight:500, letterSpacing:"0.16em", textTransform:"uppercase" }}>
              {subtitle}
            </p>
          )}
          <h1 className="text-[18px] sm:text-[22px] text-white leading-none truncate"
            style={{ fontFamily:"'Cormorant SC',serif", fontWeight:400, letterSpacing:"-0.01em" }}>
            {title}
          </h1>
        </div>
      </div>

      {/* Right: actions */}
      <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
        {/* Slot for page-specific buttons */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {children}
        </div>

        {/* Search — hidden on very small screens */}
        <button className="hidden md:flex items-center gap-2 px-3 py-2 rounded-xl text-[#52525B] hover:text-[#A1A1AA] transition-all hover:bg-[#1A1A1A]"
          style={{ border:"1px solid transparent" }}>
          <Search size={15} />
          <span className="text-[12px] text-[#3F3F46]" style={{ fontFamily:"'Instrument Sans',sans-serif" }}>Buscar...</span>
        </button>

        {/* Search icon only on small */}
        <button className="md:hidden w-9 h-9 flex items-center justify-center rounded-xl text-[#52525B] hover:text-[#A1A1AA] transition-all hover:bg-[#1A1A1A]">
          <Search size={15} />
        </button>

        {/* Hide values */}
        <button onClick={() => setHideValues(!hideValues)}
          className="w-9 h-9 flex items-center justify-center rounded-xl text-[#52525B] hover:text-[#A1A1AA] transition-all hover:bg-[#1A1A1A]">
          {hideValues ? <EyeOff size={15} /> : <Eye size={15} />}
        </button>

        {/* Notifications */}
        <button className="relative w-9 h-9 flex items-center justify-center rounded-xl text-[#52525B] hover:text-[#A1A1AA] transition-all hover:bg-[#1A1A1A]">
          <Bell size={15} />
          {hasNotifications && (
            <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
          )}
        </button>

        {/* Avatar */}
        <button className="w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold text-black ml-1 transition-all hover:scale-105"
          style={{ background:"linear-gradient(135deg,#D4AF37,#B8952A)", boxShadow:"0 0 12px rgba(212,175,55,0.25)" }}>
          L
        </button>
      </div>
    </header>
  );
}
