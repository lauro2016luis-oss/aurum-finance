"use client";

import { motion } from "framer-motion";
import { Plus, Target, Calendar, TrendingUp } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { financialGoals } from "@/lib/mock-data";
import { formatCurrency, formatDate } from "@/lib/utils";

export default function MetasPage() {
  const totalTarget = financialGoals.reduce((s, g) => s + g.target, 0);
  const totalCurrent = financialGoals.reduce((s, g) => s + g.current, 0);
  const overallPct = (totalCurrent / totalTarget) * 100;

  return (
    <div className="flex flex-col min-h-full">
      <Header title="Metas Financeiras" subtitle="Objetivos">
        <button className="btn-gold flex items-center gap-1.5 text-[12.5px] py-2 px-4">
          <Plus size={14} />
          Nova Meta
        </button>
      </Header>

      <motion.div
        className="flex-1 p-8 space-y-6 overflow-y-auto"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {/* Summary */}
        <div className="card-gold p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-[11px] text-[#52525B] uppercase tracking-wider mb-1">Progresso Geral</p>
              <h3 className="text-[22px] font-light text-white" style={{ fontFamily: "'Cormorant SC', serif" }}>
                {overallPct.toFixed(1)}% das metas atingido
              </h3>
            </div>
            <div className="text-right">
              <p className="metric-value text-[24px] text-gold-gradient font-light">
                {formatCurrency(totalCurrent)}
              </p>
              <p className="text-[12px] text-[#52525B] mt-1">de {formatCurrency(totalTarget)}</p>
            </div>
          </div>
          <div className="progress-bar" style={{ height: 6 }}>
            <motion.div
              className="progress-fill"
              initial={{ width: "0%" }}
              animate={{ width: `${overallPct}%` }}
              transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
            />
          </div>
        </div>

        {/* Goals grid */}
        <div className="grid grid-cols-2 gap-5">
          {financialGoals.map((goal, i) => {
            const pct = (goal.current / goal.target) * 100;
            const monthly = (goal.target - goal.current) / 6;
            const deadline = new Date(goal.deadline);

            return (
              <motion.div
                key={goal.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="card-premium p-6 cursor-pointer group hover:border-[#333]"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
                      style={{ background: "#1A1A1A" }}
                    >
                      {goal.icon}
                    </div>
                    <div>
                      <h4 className="text-[15px] font-medium text-white">{goal.name}</h4>
                      <p className="text-[11px] text-[#52525B]">{goal.category}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-[20px] metric-value font-light" style={{ color: pct >= 100 ? "#22C55E" : "#D4AF37" }}>
                      {pct.toFixed(0)}%
                    </p>
                  </div>
                </div>

                {/* Values */}
                <div className="flex justify-between text-[13px] mb-2">
                  <span className="text-[#52525B]">Acumulado</span>
                  <span className="metric-value text-white">{formatCurrency(goal.current)}</span>
                </div>
                <div className="progress-bar mb-3">
                  <motion.div
                    className="progress-fill"
                    initial={{ width: "0%" }}
                    animate={{ width: `${Math.min(pct, 100)}%` }}
                    transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 + i * 0.1 }}
                  />
                </div>

                <div className="flex justify-between items-center text-[12px]">
                  <span className="text-[#3F3F46]">
                    Faltam {formatCurrency(goal.target - goal.current)}
                  </span>
                  <div className="flex items-center gap-1 text-[#52525B]">
                    <Calendar size={11} />
                    {formatDate(deadline, "short")}
                  </div>
                </div>

                {/* Footer */}
                <div
                  className="mt-4 pt-4 border-t border-[#1A1A1A] flex items-center justify-between"
                >
                  <div className="flex items-center gap-1 text-[11px] text-[#3F3F46]">
                    <TrendingUp size={11} />
                    Sugestão mensal
                  </div>
                  <span className="metric-value text-[13px] text-[#D4AF37]">
                    {formatCurrency(monthly)}/mês
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
