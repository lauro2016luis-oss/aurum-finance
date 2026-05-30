"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Shield, ArrowUpRight, ArrowDownLeft } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Header } from "@/components/layout/Header";
import { Modal } from "@/components/shared/Modal";
import { formatCurrency } from "@/lib/utils";
import { useData } from "@/lib/data-store";

const reserveHistory = [
  { month: "Mar", valor: 18000 },
  { month: "Abr", valor: 21500 },
  { month: "Mai", valor: 24000 },
  { month: "Jun", valor: 27000 },
  { month: "Jul", valor: 30200 },
  { month: "Ago", valor: 32400 },
];

type Movement = { type: "deposit"|"withdraw"; amount: number; date: string; note: string };

export default function ReservaPage() {
  const { reserve, depositReserve, withdrawReserve } = useData();
  const [movements, setMovements] = useState<Movement[]>([
    { type:"deposit",  amount:2000, date:"2024-08-15", note:"Aporte mensal" },
    { type:"deposit",  amount:1500, date:"2024-07-20", note:"Extra julho" },
    { type:"withdraw", amount:800,  date:"2024-07-05", note:"Emergência carro" },
    { type:"deposit",  amount:2000, date:"2024-06-15", note:"Aporte mensal" },
  ]);
  const [modal, setModal] = useState<"deposit"|"withdraw"|null>(null);
  const [amount, setAmount] = useState("");
  const [note, setNote]     = useState("");

  const target = 60000;
  const pct    = Math.min((reserve / target) * 100, 100);
  const monthsOfExpenses = reserve / 9847;

  const handleMove = () => {
    const v = parseFloat(amount.replace(",","."));
    if (isNaN(v) || v <= 0) return;
    if (modal === "deposit") {
      depositReserve(v);
      setMovements(m => [{ type:"deposit", amount:v, date:new Date().toISOString().split("T")[0], note:note||"Aporte" }, ...m]);
    } else {
      withdrawReserve(v);
      setMovements(m => [{ type:"withdraw", amount:v, date:new Date().toISOString().split("T")[0], note:note||"Retirada" }, ...m]);
    }
    setAmount(""); setNote(""); setModal(null);
  };

  return (
    <div className="flex flex-col min-h-full">
      <Header title="Reserva de Emergência" subtitle="Segurança" />
      <motion.div className="flex-1 p-4 sm:p-6 lg:p-8 space-y-5 overflow-y-auto"
        initial={{ opacity:0,y:12 }} animate={{ opacity:1,y:0 }} transition={{ duration:0.4 }}>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5">
          {/* Hero */}
          <div className="lg:col-span-2 card-gold p-6 sm:p-8">
            <div className="flex items-start justify-between mb-6">
              <div>
                <p className="text-[10px] text-[#52525B] uppercase tracking-[0.14em] mb-1">Reserva Atual</p>
                <p className="metric-value text-[40px] sm:text-[52px] text-gold-gradient font-light leading-none">{formatCurrency(reserve)}</p>
                <p className="text-[13px] text-[#52525B] mt-2">Meta: {formatCurrency(target)} · {pct.toFixed(1)}% atingido</p>
              </div>
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background:"rgba(212,175,55,0.12)" }}>
                <Shield size={22} className="text-gold" />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-[11px] text-[#52525B]">
                <span>Progresso</span><span>{pct.toFixed(1)}%</span>
              </div>
              <div className="h-3 rounded-full overflow-hidden" style={{ background:"#1A1A1A" }}>
                <motion.div className="h-full rounded-full"
                  style={{ background:"linear-gradient(90deg,#B8952A,#D4AF37,#E8CC6A)" }}
                  initial={{ width:"0%" }} animate={{ width:`${pct}%` }}
                  transition={{ duration:1.5, ease:"easeOut" }} />
              </div>
              <div className="flex justify-between text-[11px] text-[#3F3F46]">
                <span>0</span><span>{formatCurrency(target)}</span>
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-5">
              {[
                { label:"Cobre", value:`${monthsOfExpenses.toFixed(1)} meses`, sub:"de despesas" },
                { label:"Faltam", value:formatCurrency(Math.max(0,target-reserve)), sub:"para a meta" },
                { label:"Meta", value:formatCurrency(target), sub:"emergência" },
              ].map(s => (
                <div key={s.label} className="p-3 rounded-xl" style={{ background:"rgba(0,0,0,0.3)" }}>
                  <p className="text-[10px] text-[#52525B] uppercase tracking-wider">{s.label}</p>
                  <p className="metric-value text-[15px] text-white mt-0.5">{s.value}</p>
                  <p className="text-[10px] text-[#3F3F46]">{s.sub}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Movements + deposit */}
          <div className="space-y-4">
            <div className="card-premium p-5">
              <p className="text-[11px] text-[#52525B] uppercase tracking-wider mb-3">Movimentar</p>
              <div className="space-y-2">
                <button onClick={() => setModal("deposit")} className="w-full btn-gold py-2.5 flex items-center justify-center gap-2">
                  <ArrowUpRight size={14} /> Depositar
                </button>
                <button onClick={() => setModal("withdraw")} className="w-full btn-ghost py-2.5 flex items-center justify-center gap-2">
                  <ArrowDownLeft size={14} /> Retirar
                </button>
              </div>
            </div>
            <div className="card-premium p-5">
              <p className="text-[11px] text-[#52525B] uppercase tracking-wider mb-3">Histórico</p>
              <div className="space-y-3">
                {movements.slice(0,6).map((m, i) => (
                  <div key={i} className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ background:m.type==="deposit"?"rgba(34,197,94,0.1)":"rgba(239,68,68,0.1)" }}>
                      {m.type==="deposit" ? <ArrowUpRight size={12} className="text-success" /> : <ArrowDownLeft size={12} className="text-error" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[12.5px] text-white truncate">{m.note}</p>
                      <p className="text-[10.5px] text-[#3F3F46]">{m.date}</p>
                    </div>
                    <span className="metric-value text-[13px] flex-shrink-0"
                      style={{ color:m.type==="deposit"?"#22C55E":"#EF4444" }}>
                      {m.type==="deposit"?"+":"-"}{formatCurrency(m.amount)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Chart */}
        <div className="card-premium p-5">
          <p className="text-[11px] text-[#52525B] uppercase tracking-wider mb-1">Evolução</p>
          <h3 className="text-[17px] text-white mb-4" style={{ fontFamily:"'Cormorant SC',serif" }}>Histórico da Reserva</h3>
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={reserveHistory}>
              <defs>
                <linearGradient id="rg" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#D4AF37" stopOpacity={0.15} />
                  <stop offset="100%" stopColor="#D4AF37" stopOpacity={0.01} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1E1E1E" vertical={false} />
              <XAxis dataKey="month" tick={{ fill:"#52525B", fontSize:11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill:"#52525B", fontSize:11 }} axisLine={false} tickLine={false} tickFormatter={v=>`${(v/1000).toFixed(0)}k`} width={36} />
              <Tooltip contentStyle={{ background:"#1A1A1A", border:"1px solid #262626", borderRadius:12 }} formatter={(v:unknown)=>formatCurrency(v as number)} />
              <Area type="monotone" dataKey="valor" stroke="#D4AF37" strokeWidth={1.5} fill="url(#rg)" dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Modal */}
      <Modal open={!!modal} onClose={() => setModal(null)}
        title={modal==="deposit"?"Depositar na Reserva":"Retirar da Reserva"}
        subtitle={modal==="deposit"?"Adicionar valor":"Movimentar valor"}
        icon={modal==="deposit" ? <ArrowUpRight size={14} className="text-gold" /> : <ArrowDownLeft size={14} className="text-gold" />}>
        <div className="space-y-4">
          <div>
            <label className="label-xs mb-1.5 block">Valor (R$)</label>
            <input className="input-premium w-full" placeholder="0,00" value={amount} onChange={e=>setAmount(e.target.value)} />
          </div>
          <div>
            <label className="label-xs mb-1.5 block">Observação</label>
            <input className="input-premium w-full" placeholder="Ex: Aporte mensal, Emergência..." value={note} onChange={e=>setNote(e.target.value)} />
          </div>
          <div className="p-3 rounded-xl text-[12px]" style={{ background:"rgba(212,175,55,0.06)", border:"1px solid rgba(212,175,55,0.15)" }}>
            <span className="text-[#52525B]">Saldo atual: </span>
            <span className="metric-value text-[13px] text-gold">{formatCurrency(reserve)}</span>
            {amount && !isNaN(parseFloat(amount)) && (
              <>
                <span className="text-[#52525B] mx-2">→</span>
                <span className="metric-value text-[13px] text-white">
                  {formatCurrency(modal==="deposit" ? reserve+parseFloat(amount) : Math.max(0,reserve-parseFloat(amount)))}
                </span>
              </>
            )}
          </div>
          <div className="flex gap-3 pt-1">
            <button onClick={() => setModal(null)} className="btn-ghost flex-1 py-2.5 text-[13px]">Cancelar</button>
            <button onClick={handleMove}
              className="flex-1 py-2.5 text-[13px] rounded-xl font-medium transition-all"
              style={{ background:modal==="deposit"?"rgba(34,197,94,0.15)":"rgba(239,68,68,0.1)",
                color:modal==="deposit"?"#22C55E":"#EF4444",
                border:`1px solid ${modal==="deposit"?"rgba(34,197,94,0.3)":"rgba(239,68,68,0.3)"}` }}>
              {modal==="deposit"?"Confirmar Depósito":"Confirmar Retirada"}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
