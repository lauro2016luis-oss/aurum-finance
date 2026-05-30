"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { cn } from "@/lib/utils";

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
          style={{ background: "radial-gradient(circle at 30% 40%, rgba(212,175,55,0.06) 0%, transparent 60%)" }}
        />
      )}

      {/* Top row */}
      <div className="flex items-center justify-between relative z-10">
        <p
          className="text-[10px] text-[#52525B] leading-none"
          style={{ fontFamily: "'Instrument Sans', sans-serif", fontWeight: 500, letterSpacing: "0.13em", textTransform: "uppercase" }}
        >
          {title}
        </p>
        {icon && (
          <div
            className={cn(
              "w-7 h-7 rounded-lg flex items-center justify-center text-[#52525B] transition-colors duration-200",
              gold ? "group-hover:text-[#D4AF37]" : "group-hover:text-[#A1A1AA]"
            )}
            style={{ background: "#1E1E1E" }}
          >
            {icon}
          </div>
        )}
      </div>

      {/* Value */}
      <div className="relative z-10">
        <p
          className={cn(
            "metric-value leading-none",
            large ? "text-[28px] sm:text-[38px]" : "text-[18px] sm:text-[21px]",
            gold ? "text-gold-gradient" : "text-white"
          )}
        >
          {value}
        </p>
        {subtitle && (
          <p
            className="text-[11px] text-[#3F3F46] mt-1.5 leading-none"
            style={{ fontFamily: "'Instrument Sans', sans-serif" }}
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
          <span className="text-[11px] text-[#3F3F46]" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>vs. mês anterior</span>
        </div>
      )}

      {/* Decorative element */}
      <div
        className={cn(
          "absolute bottom-0 right-0 w-24 h-24 rounded-full opacity-[0.03] transition-opacity duration-500 group-hover:opacity-[0.06]",
          gold ? "bg-[#D4AF37]" : "bg-white"
        )}
        style={{ transform: "translate(30%, 30%)" }}
      />
    </motion.div>
  );
}
