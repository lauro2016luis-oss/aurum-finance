"use client";

import { motion } from "framer-motion";
import { CreditCard, Plus, TrendingUp } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { creditCards } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/utils";

export default function CartoesPage() {
  const totalLimit = creditCards.reduce((s, c) => s + c.limit, 0);
  const totalUsed = creditCards.reduce((s, c) => s + c.used, 0);

  return (
    <div className="flex flex-col min-h-full">
      <Header title="Cartões" subtitle="Crédito">
        <button className="btn-gold flex items-center gap-1.5 text-[12.5px] py-2 px-4">
          <Plus size={14} />
          Adicionar Cartão
        </button>
      </Header>

      <motion.div
        className="flex-1 p-8 space-y-6 overflow-y-auto"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {/* Summary */}
        <div className="grid grid-cols-3 gap-4">
          <div className="card-premium p-5">
            <p className="text-[11px] text-[#52525B] uppercase tracking-wider mb-1">Limite Total</p>
            <p className="metric-value text-[24px] text-white font-light">{formatCurrency(totalLimit)}</p>
          </div>
          <div className="card-premium p-5">
            <p className="text-[11px] text-[#52525B] uppercase tracking-wider mb-1">Utilizado</p>
            <p className="metric-value text-[24px] text-error font-light">{formatCurrency(totalUsed)}</p>
            <p className="text-[12px] text-[#52525B] mt-1">
              {((totalUsed / totalLimit) * 100).toFixed(0)}% do limite
            </p>
          </div>
          <div className="card-gold p-5">
            <p className="text-[11px] text-[#52525B] uppercase tracking-wider mb-1">Disponível</p>
            <p className="metric-value text-[24px] text-gold-gradient font-light">
              {formatCurrency(totalLimit - totalUsed)}
            </p>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-3 gap-5">
          {creditCards.map((card, i) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="space-y-4"
            >
              {/* Card visual */}
              <div
                className="relative rounded-2xl p-6 overflow-hidden cursor-pointer group"
                style={{
                  background: `linear-gradient(135deg, ${card.color}20, ${card.color}08)`,
                  border: `1px solid ${card.color}30`,
                  minHeight: 180,
                }}
              >
                {/* Background pattern */}
                <div
                  className="absolute -right-8 -top-8 w-40 h-40 rounded-full opacity-[0.06]"
                  style={{ background: card.color }}
                />
                <div
                  className="absolute -right-4 -bottom-4 w-24 h-24 rounded-full opacity-[0.04]"
                  style={{ background: card.color }}
                />

                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-8">
                    <div>
                      <p className="text-[10px] text-[#52525B] uppercase tracking-wider">{card.bank}</p>
                      <p className="text-[14px] text-white font-medium mt-0.5">{card.name}</p>
                    </div>
                    <CreditCard size={20} style={{ color: card.color }} />
                  </div>

                  <p className="metric-value text-[13px] text-[#52525B] tracking-[0.2em]">
                    •••• •••• •••• {card.lastFour}
                  </p>

                  <div className="mt-4 flex justify-between items-end">
                    <div>
                      <p className="text-[10px] text-[#52525B]">Fatura</p>
                      <p className="metric-value text-[18px] text-white font-light">
                        {formatCurrency(card.used)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] text-[#52525B]">Venc. dia {card.dueDay}</p>
                      <p className="text-[12px]" style={{ color: card.color }}>
                        Fecha dia {card.closingDay}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Usage bar */}
              <div className="card-premium p-4">
                <div className="flex justify-between text-[12px] mb-2">
                  <span className="text-[#52525B]">Utilizado</span>
                  <span className="text-white metric-value">
                    {((card.used / card.limit) * 100).toFixed(0)}%
                  </span>
                </div>
                <div className="progress-bar" style={{ height: 5 }}>
                  <div
                    className="h-full rounded-full transition-all duration-1000"
                    style={{
                      width: `${(card.used / card.limit) * 100}%`,
                      background: (card.used / card.limit) > 0.8
                        ? "#EF4444"
                        : card.color,
                    }}
                  />
                </div>
                <div className="flex justify-between text-[11px] mt-2 text-[#3F3F46]">
                  <span>{formatCurrency(card.used)} usado</span>
                  <span>{formatCurrency(card.available)} disp.</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
