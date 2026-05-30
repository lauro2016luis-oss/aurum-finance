"use client";

import { motion } from "framer-motion";
import {
  Wallet,
  TrendingUp,
  TrendingDown,
  PiggyBank,
  Zap,
  AlertCircle,
  Target,
  CreditCard,
  ChevronRight,
  ArrowUpRight,
} from "lucide-react";
import { Header } from "@/components/layout/Header";
import { MetricCard } from "@/components/shared/MetricCard";
import { CashFlowChart } from "@/components/dashboard/CashFlowChart";
import { CategoryChart } from "@/components/dashboard/CategoryChart";
import { PatrimonyChart } from "@/components/dashboard/PatrimonyChart";
import { UpcomingBills } from "@/components/dashboard/UpcomingBills";
import { FinancialScore } from "@/components/dashboard/FinancialScore";
import { transactions } from "@/lib/mock-data";
import { formatCurrency, formatRelativeDate } from "@/lib/utils";

const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.07 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] } },
};

export default function DashboardPage() {
  return (
    <div className="flex flex-col min-h-full">
      <Header title="Dashboard" subtitle="Visão Geral">
        <div className="flex items-center gap-2">
          <button className="btn-ghost text-[12px] py-1.5 px-3">Este mês</button>
          <button className="btn-ghost text-[12px] py-1.5 px-3">Escolher período</button>
          <button className="btn-ghost text-[12px] py-1.5 px-3">Ano</button>
        </div>
      </Header>

      <motion.div
        className="flex-1 p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-6 overflow-y-auto"
        variants={stagger}
        initial="hidden"
        animate="show"
      >
        {/* Metric Cards */}
        <motion.div variants={fadeUp} className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
          <MetricCard
            title="Saldo Total"
            value="R$ 47.382,90"
            change="+12,4%"
            changeValue={12.4}
            icon={<Wallet size={15} />}
            subtitle="Todas as contas"
          />
          <MetricCard
            title="Receitas do Mês"
            value="R$ 18.500,00"
            change="+8,2%"
            changeValue={8.2}
            icon={<TrendingUp size={15} />}
            subtitle="vs. mês anterior"
          />
          <MetricCard
            title="Despesas do Mês"
            value="R$ 9.847,30"
            change="-3,1%"
            changeValue={-3.1}
            icon={<TrendingDown size={15} />}
            subtitle="Fixas + variáveis"
          />
          <MetricCard
            title="Patrimônio"
            value="R$ 284,5k"
            change="+2,8%"
            changeValue={2.8}
            icon={<PiggyBank size={15} />}
            subtitle="Acumulado total"
          />
          <MetricCard
            title="Lucro Líquido"
            value="R$ 8.652,70"
            change="+18,7%"
            changeValue={18.7}
            icon={<Zap size={15} />}
            subtitle="Este mês"
            gold
          />
        </motion.div>

        {/* Charts Row 1 */}
        <motion.div variants={fadeUp} className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5">
          <div className="lg:col-span-2 min-h-[260px] sm:min-h-[300px]">
            <CashFlowChart />
          </div>
          <div className="min-h-[260px] sm:min-h-[300px]">
            <CategoryChart />
          </div>
        </motion.div>

        {/* Charts Row 2 */}
        <motion.div variants={fadeUp} className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5">
          <div className="lg:col-span-2">
            <PatrimonyChart />
          </div>
          <div className="space-y-4 sm:space-y-5">
            <FinancialScore score={847} />
            <UpcomingBills />
          </div>
        </motion.div>

        {/* Alerts + Recent */}
        <motion.div variants={fadeUp} className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5">
          {/* Alerts */}
          <div className="space-y-3">
            <p className="text-[11px] text-[#52525B] uppercase tracking-[0.12em]">Alertas</p>
            <AlertCard
              icon={<AlertCircle size={14} className="text-[#F59E0B]" />}
              title="Conta vencendo"
              desc="Plano de saúde vence em 3 dias — R$ 850,00"
              type="warning"
            />
            <AlertCard
              icon={<Target size={14} className="text-[#D4AF37]" />}
              title="Meta atingida"
              desc="Reserva de emergência chegou a 74% do objetivo"
              type="gold"
            />
            <AlertCard
              icon={<CreditCard size={14} className="text-[#EF4444]" />}
              title="Cartão próximo do limite"
              desc="Nubank: 89% do limite utilizado este mês"
              type="error"
            />
          </div>

          {/* Recent transactions */}
          <div className="lg:col-span-2 card-premium p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-[11px] text-[#52525B] uppercase tracking-[0.12em] mb-0.5">Recentes</p>
                <h3
                  className="text-[16px] font-light text-white"
                  style={{ fontFamily: "'Cormorant SC', serif" }}
                >
                  Últimas Transações
                </h3>
              </div>
              <button className="btn-ghost text-[12px] py-1 px-3 flex items-center gap-1">
                Ver todas <ArrowUpRight size={12} />
              </button>
            </div>

            <table className="table-premium">
              <thead>
                <tr>
                  <th>Descrição</th>
                  <th>Categoria</th>
                  <th>Data</th>
                  <th className="text-right">Valor</th>
                </tr>
              </thead>
              <tbody>
                {transactions.slice(0, 6).map((tx) => (
                  <tr key={tx.id}>
                    <td>
                      <div className="flex items-center gap-2.5">
                        <div
                          className="w-7 h-7 rounded-lg flex items-center justify-center text-[11px]"
                          style={{
                            background: tx.type === "income" ? "rgba(34,197,94,0.1)" : "rgba(239,68,68,0.08)",
                          }}
                        >
                          {tx.type === "income" ? (
                            <TrendingUp size={12} className="text-success" />
                          ) : (
                            <TrendingDown size={12} className="text-error" />
                          )}
                        </div>
                        <span className="text-[13px] text-white">{tx.description}</span>
                      </div>
                    </td>
                    <td>
                      <span className="badge badge-neutral text-[11px]">{tx.category}</span>
                    </td>
                    <td className="text-[#52525B] text-[12px]">
                      {formatRelativeDate(tx.date)}
                    </td>
                    <td className="text-right">
                      <span
                        className="metric-value text-[13px] font-medium"
                        style={{ color: tx.value > 0 ? "#22C55E" : "#A1A1AA" }}
                      >
                        {tx.value > 0 ? "+" : ""}
                        {formatCurrency(tx.value)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

function AlertCard({
  icon,
  title,
  desc,
  type,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
  type: "warning" | "gold" | "error";
}) {
  const borderMap = {
    warning: "rgba(245,158,11,0.15)",
    gold: "rgba(212,175,55,0.15)",
    error: "rgba(239,68,68,0.15)",
  };
  return (
    <div
      className="p-3.5 rounded-xl cursor-pointer transition-all duration-200 hover:bg-[#1A1A1A] group"
      style={{ background: "#141414", border: `1px solid ${borderMap[type]}` }}
    >
      <div className="flex gap-2.5">
        <div className="mt-0.5 flex-shrink-0">{icon}</div>
        <div className="flex-1 min-w-0">
          <p className="text-[12.5px] font-medium text-white leading-none">{title}</p>
          <p className="text-[11.5px] text-[#52525B] mt-1 leading-relaxed">{desc}</p>
        </div>
        <ChevronRight size={13} className="text-[#3F3F46] group-hover:text-[#52525B] mt-0.5 flex-shrink-0 transition-colors" />
      </div>
    </div>
  );
}
