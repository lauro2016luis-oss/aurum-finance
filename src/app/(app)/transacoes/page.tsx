"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import {
  Search,
  Filter,
  Download,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight,
  Plus,
} from "lucide-react";
import { Header } from "@/components/layout/Header";
import { MetricCard } from "@/components/shared/MetricCard";
import { transactions } from "@/lib/mock-data";
import { formatCurrency, formatDate } from "@/lib/utils";

const categories = ["Todos", "Renda", "Alimentação", "Moradia", "Transporte", "Saúde", "Entretenimento", "Investimentos"];

export default function TransacoesPage() {
  const [filter, setFilter] = useState("Todos");
  const [search, setSearch] = useState("");
  const [type, setType] = useState<"all" | "income" | "expense">("all");

  const filtered = transactions.filter((t) => {
    if (type !== "all" && (type === "income" ? t.value < 0 : t.value > 0)) return false;
    if (filter !== "Todos" && t.category !== filter) return false;
    if (search && !t.description.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const totalIncome = transactions.filter(t => t.value > 0).reduce((s, t) => s + t.value, 0);
  const totalExpense = Math.abs(transactions.filter(t => t.value < 0).reduce((s, t) => s + t.value, 0));

  return (
    <div className="flex flex-col min-h-full">
      <Header title="Transações" subtitle="Histórico">
        <button className="btn-gold flex items-center gap-1.5 text-[12.5px] py-2 px-4">
          <Plus size={14} />
          Nova Transação
        </button>
      </Header>

      <motion.div
        className="flex-1 p-8 space-y-6 overflow-y-auto"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {/* Metrics */}
        <div className="grid grid-cols-4 gap-4">
          <MetricCard title="Total de Entradas" value={formatCurrency(totalIncome)} changeValue={1} icon={<TrendingUp size={14} />} />
          <MetricCard title="Total de Saídas" value={formatCurrency(totalExpense)} changeValue={-1} icon={<TrendingDown size={14} />} />
          <MetricCard title="Transações" value={String(transactions.length)} subtitle="Este mês" icon={<ArrowUpRight size={14} />} />
          <MetricCard title="Saldo do Período" value={formatCurrency(totalIncome - totalExpense)} changeValue={12} icon={<ArrowDownRight size={14} />} gold />
        </div>

        {/* Filters */}
        <div className="card-premium p-5">
          <div className="flex items-center gap-4 mb-5">
            {/* Search */}
            <div className="relative flex-1">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#52525B]" />
              <input
                type="text"
                placeholder="Buscar transação..."
                className="input-premium pl-9"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            {/* Type filter */}
            <div className="flex items-center gap-1 p-1 rounded-xl" style={{ background: "#111111", border: "1px solid #1E1E1E" }}>
              {(["all", "income", "expense"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setType(t)}
                  className="px-3 py-1.5 rounded-lg text-[12px] font-medium transition-all duration-200"
                  style={{
                    background: type === t ? "#1F1F1F" : "transparent",
                    color: type === t ? "#fff" : "#52525B",
                    border: type === t ? "1px solid #262626" : "1px solid transparent",
                  }}
                >
                  {t === "all" ? "Todos" : t === "income" ? "Receitas" : "Despesas"}
                </button>
              ))}
            </div>

            <button className="btn-ghost flex items-center gap-1.5 text-[12px]">
              <Filter size={13} />
              Filtros
            </button>
            <button className="btn-ghost flex items-center gap-1.5 text-[12px]">
              <Download size={13} />
              Exportar
            </button>
          </div>

          {/* Category pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className="px-3 py-1.5 rounded-full text-[12px] whitespace-nowrap transition-all duration-200 flex-shrink-0"
                style={{
                  background: filter === cat ? "rgba(212,175,55,0.1)" : "#141414",
                  color: filter === cat ? "#D4AF37" : "#52525B",
                  border: `1px solid ${filter === cat ? "rgba(212,175,55,0.3)" : "#1E1E1E"}`,
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Transactions table */}
        <div className="card-premium overflow-hidden">
          <table className="table-premium">
            <thead>
              <tr>
                <th className="pl-6">Descrição</th>
                <th>Categoria</th>
                <th>Data</th>
                <th>Conta</th>
                <th>Status</th>
                <th className="text-right pr-6">Valor</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((tx) => (
                <motion.tr
                  key={tx.id}
                  className="cursor-pointer"
                  whileHover={{ backgroundColor: "rgba(255,255,255,0.015)" }}
                >
                  <td className="pl-6">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{
                          background: tx.value > 0
                            ? "rgba(34,197,94,0.08)"
                            : "rgba(239,68,68,0.06)",
                        }}
                      >
                        {tx.value > 0 ? (
                          <ArrowUpRight size={14} className="text-success" />
                        ) : (
                          <ArrowDownRight size={14} className="text-error" />
                        )}
                      </div>
                      <span className="text-[13.5px] text-white font-light">{tx.description}</span>
                    </div>
                  </td>
                  <td>
                    <span className="badge badge-neutral">{tx.category}</span>
                  </td>
                  <td className="text-[13px] text-[#52525B]">
                    {formatDate(tx.date)}
                  </td>
                  <td className="text-[13px] text-[#52525B]">{tx.account}</td>
                  <td>
                    <span className={`badge ${tx.status === "completed" ? "badge-success" : "badge-warning"}`}>
                      {tx.status === "completed" ? "Concluída" : "Pendente"}
                    </span>
                  </td>
                  <td className="text-right pr-6">
                    <span
                      className="metric-value text-[14px] font-medium"
                      style={{ color: tx.value > 0 ? "#22C55E" : "#EF4444" }}
                    >
                      {tx.value > 0 ? "+" : ""}
                      {formatCurrency(tx.value)}
                    </span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>

          {filtered.length === 0 && (
            <div className="py-16 text-center">
              <p className="text-[#3F3F46] text-sm">Nenhuma transação encontrada</p>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
