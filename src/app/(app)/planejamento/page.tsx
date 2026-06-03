"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { CalendarClock, TrendingUp, Calculator, Sliders } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { formatCurrency } from "@/lib/utils";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts";

function generateProjection(monthly: number, rate: number, months: number) {
  const data = [];
  let accumulated = 32400;
  for (let i = 0; i <= months; i++) {
    accumulated = accumulated * (1 + rate / 100 / 12) + monthly;
    if (i % 3 === 0) {
      data.push({ month: `M${i}`, valor: Math.round(accumulated) });
    }
  }
  return data;
}

export default function PlanejamentoPage() {
  const [monthly, setMonthly] = useState(2000);
  const [rate, setRate] = useState(11);
  const [months, setMonths] = useState(36);

  const projection = generateProjection(monthly, rate, months);
  const finalValue = projection[projection.length - 1]?.valor ?? 0;

  return (
    <div className="flex flex-col min-h-full">
      <Header title="Planejamento Financeiro" subtitle="Projeções" />

      <motion.div
        className="flex-1 p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-6 overflow-y-auto"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {/* Simulator */}
        <div className="card-gold p-6">
          <div className="flex items-center gap-2 mb-4">
            <Calculator size={16} className="text-[#D4AF37]" />
            <p className="text-[11px] text-[#52525B] uppercase tracking-wider">Simulador de Projeção</p>
          </div>
          <div className="grid grid-cols-3 gap-6 mb-6">
            <div>
              <label className="text-[11px] text-[#52525B] uppercase tracking-wider mb-2 block">
                Aporte Mensal
              </label>
              <input
                type="range" min="500" max="10000" step="100" value={monthly}
                onChange={(e) => setMonthly(Number(e.target.value))}
                className="w-full accent-[#D4AF37] mb-1"
              />
              <p className="metric-value text-[20px] text-[#D4AF37]">{formatCurrency(monthly)}</p>
            </div>
            <div>
              <label className="text-[11px] text-[#52525B] uppercase tracking-wider mb-2 block">
                Taxa de Rendimento (a.a.)
              </label>
              <input
                type="range" min="4" max="20" step="0.5" value={rate}
                onChange={(e) => setRate(Number(e.target.value))}
                className="w-full accent-[#D4AF37] mb-1"
              />
              <p className="metric-value text-[20px] text-[#D4AF37]">{rate}%</p>
            </div>
            <div>
              <label className="text-[11px] text-[#52525B] uppercase tracking-wider mb-2 block">
                Horizonte (meses)
              </label>
              <input
                type="range" min="12" max="120" step="6" value={months}
                onChange={(e) => setMonths(Number(e.target.value))}
                className="w-full accent-[#D4AF37] mb-1"
              />
              <p className="metric-value text-[20px] text-[#D4AF37]">{months} meses</p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 mb-6 pt-4 border-t border-[rgba(212,175,55,0.1)]">
            <div>
              <p className="text-[11px] text-[#52525B] mb-1">Total Aportado</p>
              <p className="metric-value text-[20px] text-white">{formatCurrency(monthly * months)}</p>
            </div>
            <div>
              <p className="text-[11px] text-[#52525B] mb-1">Juros Acumulados</p>
              <p className="metric-value text-[20px] text-success">{formatCurrency(finalValue - monthly * months - 32400)}</p>
            </div>
            <div>
              <p className="text-[11px] text-[#52525B] mb-1">Patrimônio Final</p>
              <p className="metric-value text-[20px] text-gold-gradient">{formatCurrency(finalValue)}</p>
            </div>
          </div>
        </div>

        {/* Projection chart */}
        <div className="card-premium p-6">
          <p className="text-[11px] text-[#52525B] uppercase tracking-wider mb-1">Projeção</p>
          <h3 className="text-[18px] font-light text-white mb-5" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
            Evolução Patrimonial Projetada
          </h3>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={projection}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1E1E1E" vertical={false} />
              <XAxis dataKey="month" tick={{ fill: "#52525B", fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#52525B", fontSize: 11 }} axisLine={false} tickLine={false}
                tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} width={40} />
              <Tooltip contentStyle={{ background: "#1A1A1A", border: "1px solid #262626", borderRadius: 12 }}
                formatter={(v: any) => formatCurrency(v)} />
              <Line type="monotone" dataKey="valor" stroke="#D4AF37" strokeWidth={2.5} dot={false}
                activeDot={{ r: 5, fill: "#D4AF37", stroke: "#0A0A0A", strokeWidth: 2 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </div>
  );
}
