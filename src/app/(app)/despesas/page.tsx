"use client";

import { motion } from "framer-motion";
import { Plus, TrendingDown, ArrowDownRight } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { MetricCard } from "@/components/shared/MetricCard";
import { transactions, categoryData } from "@/lib/mock-data";
import { formatCurrency, formatDate } from "@/lib/utils";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

export default function DespesasPage() {
  const expenses = transactions.filter((t) => t.value < 0);
  const total = Math.abs(expenses.reduce((s, t) => s + t.value, 0));
  const avg = total / expenses.length;
  const largest = Math.max(...expenses.map((t) => Math.abs(t.value)));

  return (
    <div className="flex flex-col min-h-full">
      <Header title="Despesas" subtitle="Saídas">
        <button className="btn-gold flex items-center gap-1.5 text-[12.5px] py-2 px-4">
          <Plus size={14} />
          Nova Despesa
        </button>
      </Header>

      <motion.div
        className="flex-1 p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-6 overflow-y-auto"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <MetricCard title="Total do Mês" value={formatCurrency(total)} changeValue={-3.1} />
          <MetricCard title="Ticket Médio" value={formatCurrency(avg)} subtitle="Por transação" />
          <MetricCard title="Maior Despesa" value={formatCurrency(largest)} subtitle="Este mês" />
          <MetricCard title="Transações" value={String(expenses.length)} subtitle="Saídas" gold />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5">
          <div className="card-premium p-6">
            <p className="text-[11px] text-[#52525B] uppercase tracking-wider mb-1">Distribuição</p>
            <h3 className="text-[18px] font-light text-white mb-4" style={{ fontFamily: "'Cormorant SC', serif" }}>
              Por Categoria
            </h3>
            <div className="relative">
              <ResponsiveContainer width="100%" height={160}>
                <PieChart>
                  <Pie data={categoryData} cx="50%" cy="50%" innerRadius={48} outerRadius={68} paddingAngle={2} dataKey="value" strokeWidth={0}>
                    {categoryData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                  </Pie>
                  <Tooltip contentStyle={{ background: "#1A1A1A", border: "1px solid #262626", borderRadius: 12 }}
                    formatter={(v: any) => formatCurrency(v)} />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <p className="text-[10px] text-[#52525B]">Total</p>
                <p className="metric-value text-[14px] text-white">{formatCurrency(total, true)}</p>
              </div>
            </div>
            <div className="space-y-1.5 mt-2">
              {categoryData.slice(0, 5).map((item) => (
                <div key={item.name} className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: item.color }} />
                  <span className="text-[12px] text-[#A1A1AA] flex-1">{item.name}</span>
                  <span className="text-[12px] text-white font-mono">{formatCurrency(item.value)}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2 card-premium overflow-hidden">
            <div className="p-5 border-b border-[#1A1A1A]">
              <h3 className="text-[17px] font-light text-white" style={{ fontFamily: "'Cormorant SC', serif" }}>
                Todas as Despesas
              </h3>
            </div>
            <table className="table-premium">
              <thead>
                <tr>
                  <th className="pl-5">Descrição</th>
                  <th>Categoria</th>
                  <th>Data</th>
                  <th className="text-right pr-5">Valor</th>
                </tr>
              </thead>
              <tbody>
                {expenses.map((tx) => (
                  <tr key={tx.id}>
                    <td className="pl-5">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "rgba(239,68,68,0.06)" }}>
                          <ArrowDownRight size={13} className="text-error" />
                        </div>
                        <span className="text-[13.5px] text-white">{tx.description}</span>
                      </div>
                    </td>
                    <td><span className="badge badge-neutral">{tx.category}</span></td>
                    <td className="text-[13px] text-[#52525B]">{formatDate(tx.date)}</td>
                    <td className="text-right pr-5">
                      <span className="metric-value text-[14px] font-medium text-error">{formatCurrency(tx.value)}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
