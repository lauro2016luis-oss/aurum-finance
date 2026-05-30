"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { CreditCard, Plus, Trash2 } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Modal } from "@/components/shared/Modal";
import { useData } from "@/lib/data-store";
import { formatCurrency } from "@/lib/utils";

const BANKS = ["Nubank","Itaú","Bradesco","Santander","BTG","XP","C6 Bank","Inter","Caixa","Banco do Brasil","Outros"];
const CARD_COLORS: Record<string,string> = {
  Nubank:"#8B5CF6", Itaú:"#F59E0B", Bradesco:"#EF4444", Santander:"#DC2626",
  BTG:"#3B82F6", XP:"#22C55E", "C6 Bank":"#6B7280", Inter:"#F97316",
  Caixa:"#2563EB", "Banco do Brasil":"#FACC15", Outros:"#D4AF37",
};

export default function CartoesPage() {
  const { creditCards, addCreditCard, deleteCreditCard } = useData();
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    name:"", bank:"Nubank", limit:"", used:"0", closingDay:"5", dueDay:"12", lastFour:"",
  });

  const totalLimit = creditCards.reduce((s,c) => s + c.limit, 0);
  const totalUsed  = creditCards.reduce((s,c) => s + c.used, 0);

  const handleAdd = () => {
    const lim = parseFloat(form.limit.replace(",","."));
    const used = parseFloat((form.used||"0").replace(",","."));
    if (!form.name || isNaN(lim) || lim <= 0) return;
    const color = CARD_COLORS[form.bank] || "#D4AF37";
    addCreditCard({
      name: form.name,
      bank: form.bank,
      limit: lim,
      used: used || 0,
      available: lim - (used || 0),
      closingDay: parseInt(form.closingDay) || 5,
      dueDay: parseInt(form.dueDay) || 12,
      color,
      lastFour: form.lastFour || "0000",
    });
    setForm({ name:"", bank:"Nubank", limit:"", used:"0", closingDay:"5", dueDay:"12", lastFour:"" });
    setShowModal(false);
  };

  return (
    <div className="flex flex-col min-h-full">
      <Header title="Cartões" subtitle="Crédito">
        <button onClick={() => setShowModal(true)} className="btn-gold flex items-center gap-1.5 text-[12.5px] py-2 px-4">
          <Plus size={14} /> Adicionar Cartão
        </button>
      </Header>

      <motion.div className="flex-1 p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-6 overflow-y-auto"
        initial={{ opacity:0,y:12 }} animate={{ opacity:1,y:0 }} transition={{ duration:0.4 }}>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          <div className="card-premium p-5">
            <p className="text-[11px] text-[#52525B] uppercase tracking-wider mb-1">Limite Total</p>
            <p className="metric-value text-[24px] text-white font-light">{formatCurrency(totalLimit)}</p>
          </div>
          <div className="card-premium p-5">
            <p className="text-[11px] text-[#52525B] uppercase tracking-wider mb-1">Utilizado</p>
            <p className="metric-value text-[24px] text-error font-light">{formatCurrency(totalUsed)}</p>
            {totalLimit > 0 && <p className="text-[12px] text-[#52525B] mt-1">{((totalUsed/totalLimit)*100).toFixed(0)}% do limite</p>}
          </div>
          <div className="card-gold p-5">
            <p className="text-[11px] text-[#52525B] uppercase tracking-wider mb-1">Disponível</p>
            <p className="metric-value text-[24px] text-gold-gradient font-light">{formatCurrency(totalLimit - totalUsed)}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5">
          <AnimatePresence initial={false} mode="popLayout">
            {creditCards.map((card, i) => (
              <motion.div key={card.id}
                initial={{ opacity:0,y:20 }} animate={{ opacity:1,y:0 }} exit={{ opacity:0,scale:0.95 }}
                transition={{ delay:i*0.08 }} className="space-y-4 group">
                <div className="relative rounded-2xl p-6 overflow-hidden cursor-pointer"
                  style={{ background:`linear-gradient(135deg,${card.color}20,${card.color}08)`, border:`1px solid ${card.color}30`, minHeight:180 }}>
                  <div className="absolute -right-8 -top-8 w-40 h-40 rounded-full opacity-[0.06]" style={{ background:card.color }} />
                  <div className="absolute -right-4 -bottom-4 w-24 h-24 rounded-full opacity-[0.04]" style={{ background:card.color }} />
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-8">
                      <div>
                        <p className="text-[10px] text-[#52525B] uppercase tracking-wider">{card.bank}</p>
                        <p className="text-[14px] text-white font-medium mt-0.5">{card.name}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <CreditCard size={20} style={{ color:card.color }} />
                        <button onClick={() => deleteCreditCard(card.id)}
                          className="opacity-0 group-hover:opacity-100 w-7 h-7 flex items-center justify-center rounded-lg hover:bg-error/20 text-[#52525B] hover:text-error transition-all">
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </div>
                    <p className="metric-value text-[13px] text-[#52525B] tracking-[0.2em]">•••• •••• •••• {card.lastFour}</p>
                    <div className="mt-4 flex justify-between items-end">
                      <div>
                        <p className="text-[10px] text-[#52525B]">Fatura</p>
                        <p className="metric-value text-[18px] text-white font-light">{formatCurrency(card.used)}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] text-[#52525B]">Venc. dia {card.dueDay}</p>
                        <p className="text-[12px]" style={{ color:card.color }}>Fecha dia {card.closingDay}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="card-premium p-4">
                  <div className="flex justify-between text-[12px] mb-2">
                    <span className="text-[#52525B]">Utilizado</span>
                    <span className="text-white metric-value">{((card.used/card.limit)*100).toFixed(0)}%</span>
                  </div>
                  <div className="progress-bar" style={{ height:5 }}>
                    <div className="h-full rounded-full transition-all duration-1000"
                      style={{ width:`${(card.used/card.limit)*100}%`, background:(card.used/card.limit)>0.8?"#EF4444":card.color }} />
                  </div>
                  <div className="flex justify-between text-[11px] mt-2 text-[#3F3F46]">
                    <span>{formatCurrency(card.used)} usado</span>
                    <span>{formatCurrency(card.available)} disp.</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {creditCards.length === 0 && (
          <div className="card-premium p-12 text-center text-[#52525B] text-[13px]">
            Nenhum cartão cadastrado
          </div>
        )}
      </motion.div>

      <Modal open={showModal} onClose={() => setShowModal(false)} title="Adicionar Cartão" subtitle="Novo cartão de crédito"
        icon={<CreditCard size={14} className="text-gold" />}>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="label-xs mb-1.5 block">Nome do Cartão</label>
              <input className="input-premium w-full" placeholder="Ex: Nubank Ultravioleta" value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))} />
            </div>
            <div>
              <label className="label-xs mb-1.5 block">Banco</label>
              <select className="input-premium w-full" value={form.bank} onChange={e=>setForm(f=>({...f,bank:e.target.value}))} style={{colorScheme:"dark"}}>
                {BANKS.map(b=><option key={b}>{b}</option>)}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="label-xs mb-1.5 block">Limite (R$)</label>
              <input className="input-premium w-full" placeholder="0,00" value={form.limit} onChange={e=>setForm(f=>({...f,limit:e.target.value}))} />
            </div>
            <div>
              <label className="label-xs mb-1.5 block">Fatura Atual (R$)</label>
              <input className="input-premium w-full" placeholder="0,00" value={form.used} onChange={e=>setForm(f=>({...f,used:e.target.value}))} />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="label-xs mb-1.5 block">Últimos 4 dígitos</label>
              <input className="input-premium w-full" placeholder="0000" maxLength={4} value={form.lastFour} onChange={e=>setForm(f=>({...f,lastFour:e.target.value}))} />
            </div>
            <div>
              <label className="label-xs mb-1.5 block">Fecha dia</label>
              <input className="input-premium w-full" type="number" min="1" max="31" value={form.closingDay} onChange={e=>setForm(f=>({...f,closingDay:e.target.value}))} />
            </div>
            <div>
              <label className="label-xs mb-1.5 block">Vence dia</label>
              <input className="input-premium w-full" type="number" min="1" max="31" value={form.dueDay} onChange={e=>setForm(f=>({...f,dueDay:e.target.value}))} />
            </div>
          </div>
          <div className="flex gap-3 pt-1">
            <button onClick={() => setShowModal(false)} className="btn-ghost flex-1 py-2.5 text-[13px]">Cancelar</button>
            <button onClick={handleAdd} className="btn-gold flex-1 py-2.5 text-[13px]">Adicionar Cartão</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
