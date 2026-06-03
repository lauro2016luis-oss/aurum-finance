"use client";

import { motion } from "framer-motion";

interface FinancialScoreProps {
  score: number;
}

export function FinancialScore({ score }: FinancialScoreProps) {
  const max = 1000;
  const pct = (score / max) * 100;

  const getLabel = (s: number) => {
    if (s >= 900) return { label: "Excelente", color: "#22C55E" };
    if (s >= 750) return { label: "Muito Bom", color: "#D4AF37" };
    if (s >= 600) return { label: "Bom", color: "#F59E0B" };
    if (s >= 400) return { label: "Regular", color: "#F97316" };
    return { label: "Crítico", color: "#EF4444" };
  };

  const { label, color } = getLabel(score);

  // SVG arc
  const radius = 52;
  const circumference = Math.PI * radius; // half circle
  const strokeDash = circumference;
  const strokeOffset = circumference - (pct / 100) * circumference;

  return (
    <div className="card-premium p-5">
      <div className="mb-4">
        <p className="text-[11px] text-[#52525B] uppercase tracking-[0.12em] mb-0.5">Saúde</p>
        <h3
          className="text-[16px] font-light text-white"
          style={{ fontFamily: "'Instrument Sans', sans-serif" }}
        >
          Score Financeiro
        </h3>
      </div>

      <div className="flex flex-col items-center">
        <div className="relative">
          <svg width="130" height="75" viewBox="0 0 130 75">
            {/* Background arc */}
            <path
              d="M 15 65 A 52 52 0 0 1 115 65"
              fill="none"
              stroke="#1E1E1E"
              strokeWidth="8"
              strokeLinecap="round"
            />
            {/* Score arc */}
            <motion.path
              d="M 15 65 A 52 52 0 0 1 115 65"
              fill="none"
              stroke={color}
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={strokeDash}
              initial={{ strokeDashoffset: strokeDash }}
              animate={{ strokeDashoffset: strokeOffset }}
              transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
              style={{ filter: `drop-shadow(0 0 6px ${color}60)` }}
            />
          </svg>

          {/* Center text */}
          <div className="absolute inset-0 flex flex-col items-center justify-end pb-1">
            <motion.p
              className="metric-value text-3xl font-light"
              style={{ color }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              {score}
            </motion.p>
            <p className="text-[10px] text-[#52525B] mt-0.5" style={{ color: `${color}90` }}>
              {label}
            </p>
          </div>
        </div>

        {/* Score breakdown */}
        <div className="w-full space-y-2 mt-3">
          {[
            { label: "Controle de gastos", value: 88 },
            { label: "Reserva de emergência", value: 74 },
            { label: "Investimentos", value: 82 },
          ].map((item) => (
            <div key={item.label}>
              <div className="flex justify-between text-[11px] mb-1">
                <span className="text-[#52525B]">{item.label}</span>
                <span style={{ color }}>{item.value}%</span>
              </div>
              <div className="progress-bar">
                <motion.div
                  className="progress-fill"
                  style={{ background: `linear-gradient(90deg, ${color}60, ${color})` }}
                  initial={{ width: "0%" }}
                  animate={{ width: `${item.value}%` }}
                  transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
