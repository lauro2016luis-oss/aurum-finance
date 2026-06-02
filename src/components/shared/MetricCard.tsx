"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useNav } from "@/lib/nav-context";
import { useTheme } from "@/lib/theme-context";

interface MetricCardProps {
  title: string;
  value: string;
  change?: string;
  changeValue?: number;
  positive?: boolean;
  icon?: React.ReactNode;
  subtitle?: string;
  gold?: boolean;
  large?: boolean;
}

export function MetricCard({
  title,
  value,
  change,
  changeValue,
  positive,
  icon,
  subtitle,
  gold = false,
  large = false,
}: MetricCardProps) {
  const isPositive = changeValue !== undefined ? changeValue >= 0 : (positive ?? true);
  const { hideValues } = useNav();
  const { theme } = useTheme();
  const isLight = theme === "light";

  const textMuted    = isLight ? "#6B6860" : "#52525B";
  const textDisabled = isLight ? "#A8A598" : "#3F3F46";
  const textPrimary  = isLight ? "#1C1A14" : "#FFFFFF";
  const bgIcon       = isLight ? "#EEECe4" : "#1E1E1E";
  const goldColor    = isLight ? "#A07810" : "#D4AF37";

  return (
    <motion.div
      className={cn(
        "relative rounded-2xl p-5 flex flex-col gap-3 overflow-hidden group cursor-default",
        gold ? "card-gold" : "card-premium"
      )}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {/* Background glow for gold cards */}
      {gold && (
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ background: isLight
            ? "radial-gradient(circle at 30% 40%, rgba(160,120,10,0.05) 0%, transparent 60%)"
            : "radial-gradient(circle at 30% 40%, rgba(212,175,55,0.06) 0%, transparent 60%)"
          }}
        />
      )}

      {/* Top row */}
      <div className="flex items-center justify-between relative z-10">
        <p
          className="text-[10px] leading-none"
          style={{ color: textMuted, fontFamily: "'Instrument Sans', sans-serif", fontWeight: 500, letterSpacing: "0.13em", textTransform: "uppercase" }}
        >
          {title}
        </p>
        {icon && (
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center transition-colors duration-200"
            style={{ background: bgIcon, color: textMuted }}
          >
            {icon}
          </div>
        )}
      </div>

      {/* Value */}
      <div className="relative z-10">
        <p
          className={cn(
            "metric-value leading-none transition-all duration-300",
            large ? "text-[28px] sm:text-[38px]" : "text-[20px] sm:text-[24px]",
            gold ? "text-gold-gradient" : ""
          )}
          style={{
            color: gold ? undefined : (isLight ? "#1A5C32" : "#FFFFFF"),
            fontWeight: 600,
            letterSpacing: "-0.03em",
            ...(hideValues ? { filter: "blur(10px)", userSelect: "none" } : {}),
          }}
        >
          {value}
        </p>
        {subtitle && (
          <p
            className="text-[11px] mt-1.5 leading-none"
            style={{ color: textDisabled, fontFamily: "'Instrument Sans', sans-serif" }}
          >{subtitle}</p>
        )}
      </div>

      {/* Change indicator */}
      {change && (
        <div className="flex items-center gap-1.5 relative z-10">
          <div
            className={cn(
              "flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[11px] font-medium",
              isPositive
                ? "bg-success/10 text-success"
                : "bg-error/10 text-error"
            )}
          >
            {isPositive ? <ArrowUpRight size={10} /> : <ArrowDownRight size={10} />}
            {change}
          </div>
          <span className="text-[11px]" style={{ color: textDisabled, fontFamily: "'Instrument Sans', sans-serif" }}>vs. mês anterior</span>
        </div>
      )}

      {/* Decorative element */}
      <div
        className={cn(
          "absolute bottom-0 right-0 w-24 h-24 rounded-full transition-opacity duration-500",
          gold ? "" : ""
        )}
        style={{
          background: gold ? goldColor : (isLight ? "#1C1A14" : "#FFFFFF"),
          opacity: 0.03,
          transform: "translate(30%, 30%)",
        }}
      />
    </motion.div>
  );
}
