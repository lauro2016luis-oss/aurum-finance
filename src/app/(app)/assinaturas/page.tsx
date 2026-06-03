"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Plus, Pause, Play, Trash2, RefreshCcw } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Modal } from "@/components/shared/Modal";
import { MetricCard } from "@/components/shared/MetricCard";
import { useData } from "@/lib/data-store";
import { formatCurrency } from "@/lib/utils";

const CATS = ["Streaming","Música","Software","Educação","Saúde","Jogos","Notícias","Produtividade","Outros"];
const COLORS: Record<string,string> = {
  Streaming:"#EF4444", Música:"#8B5CF6", Software:"#3B82F6", Educação:"#F59E0B",
  Saúde:"#22C55E", Jogos:"#EC4899", Notícias:"#14B8A6", Produtividade:"#F97316", Outros:"#D4AF37",
};

export default function AssinaturasPage() {
  const { subscriptions, addSubscription, toggleSubscription, deleteSubscription } = useData();
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name:"", price:"", billingDay:"1", category:"Streaming", nextBilling:"" });

  const active = subscriptions.filter(s => s.status === "active");
  const monthlyTotal = active.reduce((sum, s) => sum + s.price, 0);
  const yearlyTotal = monthlyTotal * 12;

  const handleAdd = () => {
    const p = parseFloat(form.price.replace(",","."));
    if (!form.name || isNaN(p) || p <= 0) return;
    const today = new Date();
    const nextBilling = form.nextBilling || `${today.getFullYear()}-${String(today.getMonth()+2).padStart(2,"0")}-${String(form.billingDay).padStart(2,"0")}`;
    addSubscription({
      name: form.name,
      price: p,
      billingDay: parseInt(form.billingDay) || 1,
      category: form.category,
      status: "active",
      nextBilling,
    });
    setForm({ name:"", price:"", billingDay:"1", category:"Streaming", nextBilling:"" });
    setShowModal(false);
  };

  return (
    <div className="flex flex-col min-h-full">
      <Header title="Assinaturas" subtitle="Recorrências">
        <button onClick={() => setShowModal(true)} className="btn-gold flex items-center gap-1.5 text-[12.5px] py-2 px-4">
          <Plus size={14} /> Nova Assinatura
        </button>
      </Header>

      <motion.div className="flex-1 p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-6 overflow-y-auto"
        initial={{ opacity:0,y:12 }} animate={{ opacity:1,y:0 }} transition={{ duration:0.4 }}>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <MetricCard title="Total Mensal" value={formatCurrency(monthlyTotal)} subtitle="Assinaturas ativas" />
          <MetricCard title="Total Anual" value={formatCurrency(yearlyTotal)} subtitle="Projeção anual" />
          <MetricCard title="Ativas" value={String(active.length)} subtitle="Serviços" />
          <MetricCard title="Pausadas" value={String(subscriptions.length - active.length)} subtitle="Inativas" gold />
        </div>

        <div className="card-premium overflow-hidden">
          <div className="p-5 border-b border-[#1A1A1A]">
            <p className="text-[11px] text-[#52525B] uppercase tracking-wider mb-0.5">Lista</p>
            <h3 className="text-[17px] font-light text-white" style={{ fontFamily:"'Instrument Sans',sans-serif" }}>
              Suas Assinaturas
            </h3>
          </div>

          <div className="divide-y divide-[#1A1A1A]">
            <AnimatePresence initial={false} mode="popLayout">
              {subscriptions.map((sub, i) => {
                const color = COLORS[sub.category] || "#D4AF37";
                return (
                  <motion.div key={sub.id}
                    initial={{ opacity:0, height:0 }} animate={{ opacity:1, height:"auto" }}
                    exit={{ opacity:0, height:0 }} transition={{ duration:0.2 }}
                    className="flex items-center justify-between px-5 py-4 hover:bg-[#101810] transition-colors group">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center text-[15px] font-bold"
                        style={{ background:`${color}15`, color }}>
                        {sub.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-[14px] text-white font-medium">{sub.name}</p>
                        <p className="text-[11.5px] text-[#52525B]">{sub.category} · Dia {sub.billingDay}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 sm:gap-6">
                      <span className={`badge ${sub.status === "active" ? "badge-success" : "badge-neutral"}`}>
                        {sub.status === "active" ? "Ativa" : "Pausada"}
                      </span>
                      <span className="metric-value text-[16px] text-white hidden sm:block">
                        {formatCurrency(sub.price)}<span className="text-[11px] text-[#52525B] font-sans">/mês</span>
                      </span>
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => toggleSubscription(sub.id)}
                          className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-[#162016] text-[#52525B] hover:text-[#F59E0B] transition-all"
                          title={sub.status === "active" ? "Pausar" : "Ativar"}>
                          {sub.status === "active" ? <Pause size={12} /> : <Play size={12} />}
                        </button>
                        <button onClick={() => deleteSubscription(sub.id)}
                          className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-error/10 text-[#52525B] hover:text-error transition-all">
                          <Trash2 size={12} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>

            {subscriptions.length === 0 && (
              <div className="p-10 text-center text-[#52525B] text-[13px]">
                Nenhuma assinatura cadastrada
              </div>
            )}
          </div>
        </div>
      </motion.div>

      <Modal open={showModal} onClose={() => setShowModal(false)} title="Nova Assinatura" subtitle="Adicionar serviço recorrente"
        icon={<RefreshCcw size={14} className="text-gold" />}>
        <div className="space-y-4">
          <div>
            <label className="label-xs mb-1.5 block">Nome do Serviço</label>
            <input className="input-premium w-full" placeholder="Ex: Netflix, Spotify..." value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="label-xs mb-1.5 block">Valor Mensal (R$)</label>
              <input className="input-premium w-full" placeholder="0,00" value={form.price} onChange={e=>setForm(f=>({...f,price:e.target.value}))} />
            </div>
            <div>
              <label className="label-xs mb-1.5 block">Dia de Cobrança</label>
              <input className="input-premium w-full" type="number" min="1" max="31" placeholder="1" value={form.billingDay} onChange={e=>setForm(f=>({...f,billingDay:e.target.value}))} />
            </div>
          </div>
          <div>
            <label className="label-xs mb-1.5 block">Categoria</label>
            <select className="input-premium w-full" value={form.category} onChange={e=>setForm(f=>({...f,category:e.target.value}))} style={{colorScheme:"dark"}}>
              {CATS.map(c=><option key={c}>{c}</option>)}
            </select>
          </div>
          <div className="flex gap-3 pt-1">
            <button onClick={() => setShowModal(false)} className="btn-ghost flex-1 py-2.5 text-[13px]">Cancelar</button>
            <button onClick={handleAdd} className="btn-gold flex-1 py-2.5 text-[13px]">Adicionar</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
