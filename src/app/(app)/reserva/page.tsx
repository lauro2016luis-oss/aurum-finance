"use client";

import { motion } from "framer-motion";
import { Shield, ArrowUpRight, ArrowDownLeft, Plus } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Header } from "@/components/layout/Header";
import { formatCurrency } from "@/lib/utils";

const reserveHistory = [
  { month: "Mar", valor: 18000 },
  { month: "Abr", valor: 21500 },
  { month: "Mai", valor: 24000 },
  { month: "Jun", valor: 27000 },
  { month: "Jul", valor: 30200 },
  { month: "Ago", valor: 32400 },
];

const movements = [
  { type: "deposit", amount: 2000, date: "2024-08-15", note: "Aporte mensal" },
  { type: "deposit", amount: 1500, date: "2024-07-20", note: "Extra julho" },
  { type: "withdraw", amount: 800, date: "2024-07-05", note: "Emergência carro" },
  { type: "deposit", amount: 2000, date: "2024-06-15", note: "Aporte mensal" },
];

export default function ReservaPage() {
  const current = 32400;
  const target = 60000;
  const pct = (current / target) * 100;
  const monthsOfExpenses = current / 9847;

  return (
    <div className="flex flex-col min-h-full">
      <Header title="Reserva de Emergência" subtitle="Segurança" />

      <motion.div
        className="flex-1 p-8 space-y-6 overflow-y-auto"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {/* Hero card */}
        <div className="card-gold p-8 relative overflow-hidden">
          <div className="absolute -right-16 -top-16 w-64 h-64 rounded-full opacity-[0.03]"
            style={{ background: "#D4AF37" }} />

          <div className="flex items-start justify-between relative z-10">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Shield size={16} className="text-[#D4AF37]" />
                <p className="text-[11px] text-[#52525B] uppercase tracking-wider">Reserva de Emergência</p>
              </div>
              <p className="metric-value text-[42px] text-gold-gradient font-light leading-none">
                {formatCurrency(current)}
              </p>
              <p className="text-[13px] text-[#52525B] mt-2">
                Cobre {monthsOfExpenses.toFixed(1)} meses de despesas
              </p>
            </div>

            <div className="text-right">
              <p className="text-[11px] text-[#52525B] uppercase tracking-wider mb-1">Objetivo</p>
              <p className="metric-value text-[28px] text-white font-light">{formatCurrency(target)}</p>
              <p className="text-[12px] mt-1" style={{ color: "#D4AF37" }}>
                Faltam {formatCurrency(target - current)}
              </p>
            </div>
          </div>

          {/* Progress */}
          <div className="mt-6 relative z-10">
            <div className="flex justify-between text-[12px] mb-2">
              <span className="text-[#52525B]">Progresso</span>
              <span className="text-[#D4AF37] font-medium">{pct.toFixed(1)}% atingido</span>
            </div>
            <div className="h-3 rounded-full overflow-hidden" style={{ background: "#1A1A1A" }}>
              <motion.div
                className="h-full rounded-full relative"
                style={{ background: "linear-gradient(90deg, #B8952A, #D4AF37, #E8CC6A)" }}
                initial={{ width: "0%" }}
                animate={{ width: `${pct}%` }}
                transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
              >
                <div className="absolute inset-0 opacity-30"
                  style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3))" }} />
              </motion.div>
            </div>
            <div className="flex justify-between text-[11px] text-[#3F3F46] mt-1.5">
              <span>Mínimo: 3 meses (R$ 29.541,90)</span>
              <span>Ideal: 6 meses ({formatCurrency(target)})</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-5">
          {/* Chart */}
          <div className="col-span-2 card-premium p-6">
            <p className="text-[11px] text-[#52525B] uppercase tracking-wider mb-1">Evolução</p>
            <h3 className="text-[18px] font-light text-white mb-5" style={{ fontFamily: "'Cormorant SC', serif" }}>
              Histórico da Reserva
            </h3>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={reserveHistory}>
                <defs>
                  <linearGradient id="reserveGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#D4AF37" stopOpacity={0.2} />
                    <stop offset="100%" stopColor="#D4AF37" stopOpacity={0.01} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E1E1E" vertical={false} />
                <XAxis dataKey="month" tick={{ fill: "#52525B", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#52525B", fontSize: 11 }} axisLine={false} tickLine={false}
                  tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} width={36} />
                <Tooltip
                  contentStyle={{ background: "#1A1A1A", border: "1px solid #262626", borderRadius: 12 }}
                  labelStyle={{ color: "#A1A1AA", fontSize: 11 }}
                  itemStyle={{ color: "#D4AF37" }}
                  formatter={(v: any) => formatCurrency(v)}
                />
                <Area type="monotone" dataKey="valor" stroke="#D4AF37" strokeWidth={2} fill="url(#reserveGrad)"
                  dot={false} activeDot={{ r: 5, fill: "#D4AF37", stroke: "#0A0A0A", strokeWidth: 2 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Movements + deposit */}
          <div className="space-y-4">
            {/* Action buttons */}
            <div className="card-premium p-5">
              <p className="text-[11px] text-[#52525B] uppercase tracking-wider mb-3">Movimentar</p>
              <div className="space-y-2">
                <button className="w-full btn-gold py-2.5 flex items-center justify-center gap-2">
                  <ArrowUpRight size={14} />
                  Depositar
                </button>
                <button className="w-full btn-ghost py-2.5 flex items-center justify-center gap-2">
                  <ArrowDownLeft size={14} />
                  Retirar
                </button>
              </div>
            </div>

            {/* Recent movements */}
            <div className="card-premium p-5">
              <p className="text-[11px] text-[#52525B] uppercase tracking-wider mb-3">Histórico</p>
              <div className="space-y-3">
                {movements.map((m, i) => (
                  <div key={i} className="flex items-center gap-2.5">
                    <div
                      className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ background: m.type === "deposit" ? "rgba(34,197,94,0.1)" : "rgba(239,68,68,0.1)" }}
                    >
                      {m.type === "deposit"
                        ? <ArrowUpRight size={12} className="text-success" />
                        : <ArrowDownLeft size={12} className="text-error" />
                      }
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[12.5px] text-white truncate">{m.note}</p>
                      <p className="text-[10.5px] text-[#3F3F46]">{m.date}</p>
                    </div>
                    <span
                      className="metric-value text-[13px] flex-shrink-0"
                      style={{ color: m.type === "deposit" ? "#22C55E" : "#EF4444" }}
                    >
                      {m.type === "deposit" ? "+" : "-"}{formatCurrency(m.amount)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
