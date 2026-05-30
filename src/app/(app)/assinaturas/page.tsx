"use client";

import { motion } from "framer-motion";
import { Plus, RefreshCcw, Pause, Trash2 } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { MetricCard } from "@/components/shared/MetricCard";
import { subscriptions } from "@/lib/mock-data";
import { formatCurrency, formatDate } from "@/lib/utils";

export default function AssinaturasPage() {
  const active = subscriptions.filter((s) => s.status === "active");
  const monthlyTotal = active.reduce((sum, s) => sum + s.price, 0);
  const yearlyTotal = monthlyTotal * 12;

  return (
    <div className="flex flex-col min-h-full">
      <Header title="Assinaturas" subtitle="Recorrências">
        <button className="btn-gold flex items-center gap-1.5 text-[12.5px] py-2 px-4">
          <Plus size={14} />
          Nova Assinatura
        </button>
      </Header>

      <motion.div
        className="flex-1 p-8 space-y-6 overflow-y-auto"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="grid grid-cols-4 gap-4">
          <MetricCard title="Total Mensal" value={formatCurrency(monthlyTotal)} subtitle="Assinaturas ativas" />
          <MetricCard title="Total Anual" value={formatCurrency(yearlyTotal)} subtitle="Projeção anual" />
          <MetricCard title="Ativas" value={String(active.length)} subtitle="Serviços" />
          <MetricCard title="Pausadas" value={String(subscriptions.length - active.length)} subtitle="Inativas" gold />
        </div>

        <div className="card-premium overflow-hidden">
          <div className="p-5 border-b border-[#1A1A1A] flex items-center justify-between">
            <div>
              <p className="text-[11px] text-[#52525B] uppercase tracking-wider mb-0.5">Lista</p>
              <h3 className="text-[17px] font-light text-white" style={{ fontFamily: "'Cormorant SC', serif" }}>
                Suas Assinaturas
              </h3>
            </div>
          </div>

          <div className="divide-y divide-[#1A1A1A]">
            {subscriptions.map((sub, i) => (
              <motion.div
                key={sub.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center justify-between p-5 hover:bg-[#141414] transition-colors group"
              >
                <div className="flex items-center gap-4">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-[15px] font-bold"
                    style={{ background: "#1A1A1A", color: "#D4AF37" }}
                  >
                    {sub.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-[14px] text-white font-medium">{sub.name}</p>
                    <p className="text-[11.5px] text-[#52525B]">
                      {sub.category} · Dia {sub.billingDay}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <span
                    className={`badge ${sub.status === "active" ? "badge-success" : "badge-neutral"}`}
                  >
                    {sub.status === "active" ? "Ativa" : "Pausada"}
                  </span>
                  <span className="metric-value text-[16px] text-white">{formatCurrency(sub.price)}<span className="text-[11px] text-[#52525B] font-sans">/mês</span></span>
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-[#1F1F1F] text-[#52525B] hover:text-[#F59E0B]">
                      <Pause size={12} />
                    </button>
                    <button className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-[#1F1F1F] text-[#52525B] hover:text-[#EF4444]">
                      <Trash2 size={12} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
