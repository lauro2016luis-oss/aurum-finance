"use client";

import { motion } from "framer-motion";
import { Landmark, Plus, ArrowRight, ArrowLeft } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { bankAccounts } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/utils";

const bankColors: Record<string, string> = {
  Nubank: "#8B5CF6",
  Itaú: "#F59E0B",
  Inter: "#F97316",
  "XP Investimentos": "#22C55E",
};

export default function ContasPage() {
  const total = bankAccounts.reduce((s, a) => s + a.balance, 0);

  return (
    <div className="flex flex-col min-h-full">
      <Header title="Contas Bancárias" subtitle="Bancos">
        <button className="btn-gold flex items-center gap-1.5 text-[12.5px] py-2 px-4">
          <Plus size={14} />
          Adicionar Conta
        </button>
      </Header>

      <motion.div
        className="flex-1 p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-6 overflow-y-auto"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {/* Total balance */}
        <div className="card-gold p-6">
          <p className="text-[11px] text-[#52525B] uppercase tracking-wider mb-2">Saldo Consolidado</p>
          <p className="metric-value text-[48px] text-gold-gradient font-light leading-none">
            {formatCurrency(total)}
          </p>
          <p className="text-[13px] text-[#52525B] mt-2">{bankAccounts.length} contas ativas</p>
        </div>

        {/* Accounts */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
          {bankAccounts.map((account, i) => {
            const color = bankColors[account.bank] || "#D4AF37";
            return (
              <motion.div
                key={account.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="card-premium p-6 cursor-pointer group"
                style={{ borderLeft: `3px solid ${color}40` }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ background: `${color}12` }}
                    >
                      <Landmark size={18} style={{ color }} />
                    </div>
                    <div>
                      <h4 className="text-[15px] font-medium text-white">{account.bank}</h4>
                      <p className="text-[11px] text-[#52525B]">{account.type}</p>
                    </div>
                  </div>
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ background: color, boxShadow: `0 0 6px ${color}80` }}
                  />
                </div>

                <p className="metric-value text-[28px] font-light text-white mb-1">
                  {formatCurrency(account.balance)}
                </p>

                <div className="flex gap-4 text-[12px] text-[#3F3F46] mt-3 pt-3 border-t border-[#1A1A1A]">
                  <span>Ag. {account.agency}</span>
                  <span>Cc. {account.account}</span>
                </div>

                <div className="flex gap-2 mt-4">
                  <button className="flex-1 btn-ghost text-[12px] py-2 flex items-center justify-center gap-1">
                    <ArrowRight size={12} />
                    Transferir
                  </button>
                  <button className="flex-1 btn-ghost text-[12px] py-2 flex items-center justify-center gap-1">
                    <ArrowLeft size={12} />
                    Histórico
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
