"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { cashFlowData } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/utils";

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div
        className="rounded-xl p-3 text-sm"
        style={{
          background: "#1A1A1A",
          border: "1px solid #262626",
          boxShadow: "0 8px 24px rgba(0,0,0,0.5)",
        }}
      >
        <p className="text-[11px] text-[#52525B] uppercase tracking-wider mb-2">{label}</p>
        {payload.map((entry: any) => (
          <div key={entry.name} className="flex items-center gap-2 mb-1 last:mb-0">
            <div className="w-2 h-2 rounded-full" style={{ background: entry.color }} />
            <span className="text-[#A1A1AA] text-[12px] capitalize">{entry.name}:</span>
            <span className="text-white font-mono text-[12px]">
              {formatCurrency(entry.value)}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export function CashFlowChart() {
  return (
    <div className="card-premium p-6 h-full">
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-[11px] text-[#52525B] uppercase tracking-[0.12em] mb-1">Fluxo de Caixa</p>
          <h3
            className="text-[18px] font-light text-white"
            style={{ fontFamily: "'Cormorant SC', serif" }}
          >
            Receitas vs. Despesas
          </h3>
        </div>
        <div className="flex items-center gap-4 text-[11px]">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-[#22C55E]" />
            <span className="text-[#52525B]">Receitas</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-[#EF4444]" />
            <span className="text-[#52525B]">Despesas</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-[#D4AF37]" />
            <span className="text-[#52525B]">Saldo</span>
          </div>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={220}>
        <AreaChart data={cashFlowData} margin={{ top: 4, right: 0, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="receitas" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#22C55E" stopOpacity={0.15} />
              <stop offset="100%" stopColor="#22C55E" stopOpacity={0.01} />
            </linearGradient>
            <linearGradient id="despesas" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#EF4444" stopOpacity={0.12} />
              <stop offset="100%" stopColor="#EF4444" stopOpacity={0.01} />
            </linearGradient>
            <linearGradient id="saldo" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#D4AF37" stopOpacity={0.2} />
              <stop offset="100%" stopColor="#D4AF37" stopOpacity={0.01} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#1E1E1E" vertical={false} />
          <XAxis
            dataKey="month"
            tick={{ fill: "#52525B", fontSize: 11 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: "#52525B", fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
            width={36}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ stroke: "#262626", strokeWidth: 1 }} />
          <Area
            type="monotone"
            dataKey="receitas"
            stroke="#22C55E"
            strokeWidth={1.5}
            fill="url(#receitas)"
            dot={false}
            activeDot={{ r: 4, fill: "#22C55E", stroke: "#0A0A0A", strokeWidth: 2 }}
          />
          <Area
            type="monotone"
            dataKey="despesas"
            stroke="#EF4444"
            strokeWidth={1.5}
            fill="url(#despesas)"
            dot={false}
            activeDot={{ r: 4, fill: "#EF4444", stroke: "#0A0A0A", strokeWidth: 2 }}
          />
          <Area
            type="monotone"
            dataKey="saldo"
            stroke="#D4AF37"
            strokeWidth={2}
            fill="url(#saldo)"
            dot={false}
            activeDot={{ r: 4, fill: "#D4AF37", stroke: "#0A0A0A", strokeWidth: 2 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
