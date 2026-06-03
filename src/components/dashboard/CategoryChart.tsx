"use client";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { categoryData } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/utils";

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0];
    return (
      <div
        className="rounded-xl p-3"
        style={{
          background: "#1A1A1A",
          border: "1px solid #262626",
          boxShadow: "0 8px 24px rgba(0,0,0,0.5)",
        }}
      >
        <p className="text-[12px] text-white font-medium">{data.name}</p>
        <p className="text-[12px] text-[#D4AF37] font-mono mt-1">{formatCurrency(data.value)}</p>
      </div>
    );
  }
  return null;
};

export function CategoryChart() {
  const total = categoryData.reduce((s, d) => s + d.value, 0);

  return (
    <div className="card-premium p-6 h-full flex flex-col">
      <div className="mb-4">
        <p className="text-[11px] text-[#52525B] uppercase tracking-[0.12em] mb-1">Categorias</p>
        <h3
          className="text-[18px] font-light text-white"
          style={{ fontFamily: "'Instrument Sans', sans-serif" }}
        >
          Gastos por Categoria
        </h3>
      </div>

      <div className="relative flex justify-center my-2">
        <ResponsiveContainer width="100%" height={160}>
          <PieChart>
            <Pie
              data={categoryData}
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={72}
              paddingAngle={2}
              dataKey="value"
              strokeWidth={0}
            >
              {categoryData.map((entry, index) => (
                <Cell key={index} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>

        {/* Center label */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <p className="text-[10px] text-[#52525B] uppercase tracking-wider">Total</p>
          <p className="metric-value text-[15px] text-white font-light mt-0.5">
            {formatCurrency(total, true)}
          </p>
        </div>
      </div>

      {/* Legend */}
      <div className="space-y-2 mt-2">
        {categoryData.slice(0, 5).map((item) => (
          <div key={item.name} className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: item.color }} />
            <span className="text-[12px] text-[#A1A1AA] flex-1 truncate">{item.name}</span>
            <span className="text-[12px] font-mono text-[#52525B]">
              {((item.value / total) * 100).toFixed(0)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
