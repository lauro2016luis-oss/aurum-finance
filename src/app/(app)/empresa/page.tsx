"use client";

import { motion } from "framer-motion";
import { Building2, TrendingUp, TrendingDown, Users, Package, ArrowUpRight, Plus } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { MetricCard } from "@/components/shared/MetricCard";
import { companyData } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/utils";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const dreData = [
  { label: "Receita Bruta", value: 85000, type: "income" },
  { label: "Deduções", value: -4250, type: "deduction" },
  { label: "Receita Líquida", value: 80750, type: "income" },
  { label: "CMV/CPV", value: -18000, type: "expense" },
  { label: "Lucro Bruto", value: 62750, type: "income" },
  { label: "Despesas Operacionais", value: -34000, type: "expense" },
  { label: "Lucro Operacional", value: 28750, type: "income" },
  { label: "Resultado Financeiro", value: -2500, type: "expense" },
  { label: "Lucro Líquido", value: 26250, type: "profit" },
];

export default function EmpresaPage() {
  return (
    <div className="flex flex-col min-h-full">
      <Header title="Modo Empresa" subtitle="Empresarial">
        <button className="btn-gold flex items-center gap-1.5 text-[12.5px] py-2 px-4">
          <Plus size={14} />
          Nova Operação
        </button>
      </Header>

      <motion.div
        className="flex-1 p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-6 overflow-y-auto"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {/* Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <MetricCard title="Receita do Mês" value={formatCurrency(companyData.revenue)} changeValue={1} icon={<TrendingUp size={14} />} />
          <MetricCard title="Despesas" value={formatCurrency(companyData.expenses)} changeValue={-1} icon={<TrendingDown size={14} />} />
          <MetricCard title="Contas a Receber" value={formatCurrency(companyData.receivables)} subtitle="Pendentes" icon={<ArrowUpRight size={14} />} />
          <MetricCard title="Lucro Líquido" value={formatCurrency(companyData.profit)} changeValue={1} gold icon={<Building2 size={14} />} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
          {/* DRE */}
          <div className="card-premium p-6">
            <p className="text-[11px] text-[#52525B] uppercase tracking-wider mb-1">DRE</p>
            <h3 className="text-[18px] font-light text-white mb-5" style={{ fontFamily: "'Cormorant SC', serif" }}>
              Demonstrativo de Resultados
            </h3>
            <div className="space-y-1">
              {dreData.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between py-2 border-b border-[#141414] last:border-0"
                  style={{
                    background: item.type === "profit" ? "rgba(212,175,55,0.04)" : "transparent",
                    borderRadius: item.type === "profit" ? 8 : 0,
                    padding: item.type === "profit" ? "8px 8px" : undefined,
                  }}
                >
                  <span className={`text-[13px] ${["Receita Líquida", "Lucro Bruto", "Lucro Operacional", "Lucro Líquido"].includes(item.label) ? "font-medium text-white" : "text-[#52525B]"}`}>
                    {item.label}
                  </span>
                  <span
                    className="metric-value text-[13px] font-medium"
                    style={{
                      color: item.type === "profit" ? "#D4AF37" : item.value > 0 ? "#22C55E" : "#EF4444",
                    }}
                  >
                    {item.value > 0 ? "" : ""}{formatCurrency(Math.abs(item.value))}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-5">
            {/* Customers */}
            <div className="card-premium p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Users size={14} className="text-[#52525B]" />
                  <p className="text-[13px] text-white font-medium">Clientes Ativos</p>
                </div>
                <button className="text-[11px] text-[#D4AF37] hover:underline">Ver todos</button>
              </div>
              {companyData.customers.map((c, i) => (
                <div key={i} className="flex items-center justify-between py-2.5 border-b border-[#141414] last:border-0">
                  <div>
                    <p className="text-[13px] text-white">{c.name}</p>
                    <span className={`badge text-[10px] mt-0.5 ${c.status === "active" ? "badge-success" : "badge-warning"}`}>
                      {c.status === "active" ? "Ativo" : "Pendente"}
                    </span>
                  </div>
                  <span className="metric-value text-[14px] text-white">{formatCurrency(c.value)}</span>
                </div>
              ))}
            </div>

            {/* Suppliers */}
            <div className="card-premium p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Package size={14} className="text-[#52525B]" />
                  <p className="text-[13px] text-white font-medium">Contas a Pagar</p>
                </div>
                <button className="text-[11px] text-[#D4AF37] hover:underline">Ver todas</button>
              </div>
              {companyData.suppliers.map((s, i) => (
                <div key={i} className="flex items-center justify-between py-2.5 border-b border-[#141414] last:border-0">
                  <div>
                    <p className="text-[13px] text-white">{s.name}</p>
                    <p className="text-[11px] text-[#52525B]">Venc. {s.dueDate}</p>
                  </div>
                  <div className="text-right">
                    <p className="metric-value text-[14px] text-white">{formatCurrency(s.value)}</p>
                    <span className={`badge text-[10px] ${s.status === "paid" ? "badge-success" : "badge-warning"}`}>
                      {s.status === "paid" ? "Pago" : "Pendente"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
