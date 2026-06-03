"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { patrimonyData } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/utils";

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div
        className="rounded-xl p-3"
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
            <span className="text-white font-mono text-[12px]">{formatCurrency(entry.value)}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export function PatrimonyChart() {
  const latest = patrimonyData[patrimonyData.length - 1];
  const prev = patrimonyData[patrimonyData.length - 2];
  const change = ((latest.patrimonio - prev.patrimonio) / prev.patrimonio) * 100;

  return (
    <div className="card-premium p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-[11px] text-[#52525B] uppercase tracking-[0.12em] mb-1">Evolução</p>
          <h3
            className="text-[18px] font-light text-white"
            style={{ fontFamily: "'Instrument Sans', sans-serif" }}
          >
            Patrimônio Total
          </h3>
        </div>
        <div className="text-right">
          <p className="metric-value text-[22px] text-gold-gradient font-light">
            {formatCurrency(latest.patrimonio)}
          </p>
          <p className="text-[11px] text-[#22C55E] mt-0.5">
            +{change.toFixed(1)}% no mês
          </p>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={140}>
        <LineChart data={patrimonyData} margin={{ top: 4, right: 0, left: 0, bottom: 0 }}>
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
          <Line
            type="monotone"
            dataKey="patrimonio"
            stroke="#D4AF37"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 5, fill: "#D4AF37", stroke: "#0A0A0A", strokeWidth: 2 }}
          />
          <Line
            type="monotone"
            dataKey="investimentos"
            stroke="#52525B"
            strokeWidth={1.5}
            strokeDasharray="4 4"
            dot={false}
            activeDot={{ r: 4, fill: "#52525B", stroke: "#0A0A0A", strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>

      <div className="flex items-center gap-6 mt-3">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-0.5 bg-[#D4AF37]" />
          <span className="text-[11px] text-[#52525B]">Patrimônio total</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-0.5 bg-[#52525B]" style={{ borderTop: "1px dashed #52525B", background: "none" }} />
          <span className="text-[11px] text-[#52525B]">Investimentos</span>
        </div>
      </div>
    </div>
  );
}
