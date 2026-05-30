"use client";

import { motion } from "framer-motion";
import { Download, FileText, Sheet, File, BarChart3, TrendingUp, Calendar, ChevronRight } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { cashFlowData } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/utils";

const reportTypes = [
  {
    icon: BarChart3,
    title: "Fluxo de Caixa",
    desc: "Entradas e saídas do período selecionado com análise detalhada",
    color: "#D4AF37",
    formats: ["PDF", "Excel"],
  },
  {
    icon: TrendingUp,
    title: "Relatório Mensal",
    desc: "Resumo completo do mês com todas as categorias e comparativos",
    color: "#22C55E",
    formats: ["PDF", "CSV"],
  },
  {
    icon: FileText,
    title: "Relatório Anual",
    desc: "Visão anual de receitas, despesas, metas e patrimônio",
    color: "#3B82F6",
    formats: ["PDF", "Excel", "CSV"],
  },
  {
    icon: Calendar,
    title: "Por Categoria",
    desc: "Análise de gastos agrupados por categoria no período",
    color: "#F59E0B",
    formats: ["PDF", "Excel"],
  },
];

export default function RelatoriosPage() {
  return (
    <div className="flex flex-col min-h-full">
      <Header title="Relatórios" subtitle="Análises" />

      <motion.div
        className="flex-1 p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-6 overflow-y-auto"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {/* Period selector */}
        <div className="flex items-center gap-3">
          {["Este mês", "Mês anterior", "Últimos 3 meses", "Último semestre", "Este ano"].map((p, i) => (
            <button
              key={p}
              className="px-4 py-2 rounded-xl text-[12.5px] transition-all duration-200"
              style={{
                background: i === 0 ? "rgba(212,175,55,0.1)" : "#141414",
                color: i === 0 ? "#D4AF37" : "#52525B",
                border: `1px solid ${i === 0 ? "rgba(212,175,55,0.3)" : "#1E1E1E"}`,
              }}
            >
              {p}
            </button>
          ))}
        </div>

        {/* Chart */}
        <div className="card-premium p-6">
          <div className="flex items-center justify-between mb-5">
            <div>
              <p className="text-[11px] text-[#52525B] uppercase tracking-wider mb-0.5">Visão Geral</p>
              <h3 className="text-[18px] font-light text-white" style={{ fontFamily: "'Cormorant SC', serif" }}>
                Receitas vs. Despesas — 2024
              </h3>
            </div>
            <button className="btn-ghost text-[12px] flex items-center gap-1.5 py-2">
              <Download size={13} />
              Exportar
            </button>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={cashFlowData} barGap={4}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1E1E1E" vertical={false} />
              <XAxis dataKey="month" tick={{ fill: "#52525B", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#52525B", fontSize: 11 }} axisLine={false} tickLine={false}
                tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} width={36} />
              <Tooltip
                contentStyle={{ background: "#1A1A1A", border: "1px solid #262626", borderRadius: 12 }}
                labelStyle={{ color: "#A1A1AA", fontSize: 11 }}
                formatter={(v: any) => formatCurrency(v)}
              />
              <Bar dataKey="receitas" fill="#22C55E" fillOpacity={0.8} radius={[4, 4, 0, 0]} maxBarSize={28} />
              <Bar dataKey="despesas" fill="#EF4444" fillOpacity={0.7} radius={[4, 4, 0, 0]} maxBarSize={28} />
              <Bar dataKey="saldo" fill="#D4AF37" fillOpacity={0.9} radius={[4, 4, 0, 0]} maxBarSize={28} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Report types */}
        <div>
          <p className="text-[11px] text-[#52525B] uppercase tracking-wider mb-4">Gerar Relatório</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {reportTypes.map((report, i) => {
              const Icon = report.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="card-premium p-5 cursor-pointer group hover:border-[#333]"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ background: `${report.color}12` }}
                    >
                      <Icon size={18} style={{ color: report.color }} />
                    </div>
                    <ChevronRight size={14} className="text-[#3F3F46] group-hover:text-[#A1A1AA] transition-colors" />
                  </div>
                  <h4 className="text-[14px] font-medium text-white mb-1">{report.title}</h4>
                  <p className="text-[12px] text-[#52525B] mb-3 leading-relaxed">{report.desc}</p>
                  <div className="flex gap-2">
                    {report.formats.map((fmt) => (
                      <button
                        key={fmt}
                        className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all duration-200 hover:text-white"
                        style={{
                          background: "#141414",
                          color: "#52525B",
                          border: "1px solid #1E1E1E",
                        }}
                      >
                        <Download size={10} />
                        {fmt}
                      </button>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
