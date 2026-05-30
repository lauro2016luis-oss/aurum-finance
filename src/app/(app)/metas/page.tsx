"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Plus, Target, Calendar, TrendingUp, Trash2, PlusCircle } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Modal } from "@/components/shared/Modal";
import { useData } from "@/lib/data-store";
import { formatCurrency, formatDate } from "@/lib/utils";

const ICONS = ["🛡️","✈️","🏠","🚗","📱","💍","🎓","🏖️","💰","🏋️","🎯","🌟"];
const CATS  = ["Segurança","Lazer","Imóvel","Transporte","Tecnologia","Educação","Viagem","Saúde","Outros"];

export default function MetasPage() {
  const { financialGoals, addGoal, deleteGoal, addGoalContribution } = useData();
  const [showNew, setShowNew] = useState(false);
  const [contrib, setContrib] = useState<{ id:string; amount:string } | null>(null);
  const [form, setForm] = useState({ name:"", target:"", current:"", deadline:"", category:"Segurança", icon:"🎯" });

  const totalTarget  = financialGoals.reduce((s,g) => s + g.target, 0);
  const totalCurrent = financialGoals.reduce((s,g) => s + g.current, 0);
  const overallPct   = totalTarget > 0 ? (totalCurrent / totalTarget) * 100 : 0;

  const handleCreate = () => {
    const t = parseFloat(form.target.replace(",","."));
    const c = parseFloat((form.current||"0").replace(",","."));
    if (!form.name || isNaN(t) || t <= 0) return;
    addGoal({ name:form.name, target:t, current:c||0, deadline:form.deadline||"2026-12-31", category:form.category, icon:form.icon });
    setForm({ name:"", target:"", current:"", deadline:"", category:"Segurança", icon:"🎯" });
    setShowNew(false);
  };

  const handleContrib = () => {
    if (!contrib) return;
    const v = parseFloat(contrib.amount.replace(",","."));
    if (isNaN(v) || v <= 0) return;
    addGoalContribution(contrib.id, v);
    setContrib(null);
  };

  return (
    <div className="flex flex-col min-h-full">
      <Header title="Metas Financeiras" subtitle="Objetivos">
        <button onClick={() => setShowNew(true)} className="btn-gold flex items-center gap-1.5 text-[12.5px] py-2 px-4">
          <Plus size={14} /> Nova Meta
        </button>
      </Header>

      <motion.div className="flex-1 p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-6 overflow-y-auto"
        initial={{ opacity:0,y:12 }} animate={{ opacity:1,y:0 }} transition={{ duration:0.4 }}>

        {/* Summary */}
        <div className="card-gold p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-[11px] text-[#52525B] uppercase tracking-wider mb-1">Progresso Geral</p>
              <h3 className="text-[22px] font-light text-white" style={{ fontFamily:"'Cormorant SC',serif" }}>
                {overallPct.toFixed(1)}% das metas atingido
              </h3>
            </div>
            <div className="text-right">
              <p className="metric-value text-[24px] text-gold-gradient font-light">{formatCurrency(totalCurrent)}</p>
              <p className="text-[12px] text-[#52525B] mt-1">de {formatCurrency(totalTarget)}</p>
            </div>
          </div>
          <div className="h-1.5 rounded-full overflow-hidden" style={{ background:"#1A1A1A" }}>
            <motion.div className="h-full rounded-full" style={{ background:"linear-gradient(90deg,#B8952A,#D4AF37,#E8CC6A)" }}
              initial={{ width:"0%" }} animate={{ width:`${Math.min(overallPct,100)}%` }} transition={{ duration:1.2, ease:"easeOut" }} />
          </div>
        </div>

        {/* Goals grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
          {financialGoals.map((goal, i) => {
            const pct = (goal.current / goal.target) * 100;
            const monthly = (goal.target - goal.current) / 6;
            return (
              <motion.div key={goal.id} initial={{ opacity:0,y:20 }} animate={{ opacity:1,y:0 }} transition={{ delay:i*0.08 }}
                className="card-premium p-6 group">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl" style={{ background:"#1A1A1A" }}>
                      {goal.icon}
                    </div>
                    <div>
                      <h4 className="text-[15px] font-medium text-white">{goal.name}</h4>
                      <p className="text-[11px] text-[#52525B]">{goal.category}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <p className="text-[20px] metric-value font-light" style={{ color:pct>=100?"#22C55E":"#D4AF37" }}>
                      {pct.toFixed(0)}%
                    </p>
                    <button onClick={() => deleteGoal(goal.id)}
                      className="opacity-0 group-hover:opacity-100 w-7 h-7 flex items-center justify-center rounded-lg hover:bg-error/10 text-[#3F3F46] hover:text-error transition-all">
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
                <div className="flex justify-between text-[13px] mb-2">
                  <span className="text-[#52525B]">Acumulado</span>
                  <span className="metric-value text-white">{formatCurrency(goal.current)}</span>
                </div>
                <div className="h-1.5 rounded-full overflow-hidden mb-3" style={{ background:"#1A1A1A" }}>
                  <motion.div className="h-full rounded-full" style={{ background:"linear-gradient(90deg,#B8952A,#D4AF37)" }}
                    initial={{ width:"0%" }} animate={{ width:`${Math.min(pct,100)}%` }} transition={{ duration:1.2, ease:"easeOut", delay:0.2+i*0.08 }} />
                </div>
                <div className="flex justify-between items-center text-[12px]">
                  <span className="text-[#3F3F46]">Faltam {formatCurrency(goal.target - goal.current)}</span>
                  <div className="flex items-center gap-1 text-[#52525B]">
                    <Calendar size={11} />{formatDate(new Date(goal.deadline), "short")}
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-[#1A1A1A] flex items-center justify-between">
                  <div className="flex items-center gap-1 text-[11px] text-[#3F3F46]">
                    <TrendingUp size={11} />Sugestão mensal
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="metric-value text-[13px] text-[#D4AF37]">{formatCurrency(monthly)}/mês</span>
                    <button onClick={() => setContrib({ id:goal.id, amount:"" })}
                      className="flex items-center gap-1 px-2 py-1 rounded-lg text-[11px] text-gold hover:bg-gold/10 transition-all"
                      style={{ border:"1px solid rgba(212,175,55,0.2)" }}>
                      <PlusCircle size={11} /> Aportar
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* New goal modal */}
      <Modal open={showNew} onClose={() => setShowNew(false)} title="Nova Meta" subtitle="Definir objetivo financeiro"
        icon={<Target size={14} className="text-gold" />}>
        <div className="space-y-4">
          <div>
            <label className="label-xs mb-1.5 block">Ícone</label>
            <div className="flex flex-wrap gap-2">
              {ICONS.map(ic => (
                <button key={ic} onClick={() => setForm(f=>({...f,icon:ic}))}
                  className="w-9 h-9 flex items-center justify-center rounded-xl text-lg transition-all"
                  style={{ background:form.icon===ic?"rgba(212,175,55,0.15)":"#1A1A1A", border:`1px solid ${form.icon===ic?"rgba(212,175,55,0.3)":"#262626"}` }}>
                  {ic}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="label-xs mb-1.5 block">Nome da Meta</label>
            <input className="input-premium w-full" placeholder="Ex: Viagem Europa, Carro Novo..."
              value={form.name} onChange={e => setForm(f=>({...f,name:e.target.value}))} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="label-xs mb-1.5 block">Valor Alvo (R$)</label>
              <input className="input-premium w-full" placeholder="0,00"
                value={form.target} onChange={e => setForm(f=>({...f,target:e.target.value}))} />
            </div>
            <div>
              <label className="label-xs mb-1.5 block">Já Tenho (R$)</label>
              <input className="input-premium w-full" placeholder="0,00"
                value={form.current} onChange={e => setForm(f=>({...f,current:e.target.value}))} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="label-xs mb-1.5 block">Categoria</label>
              <select className="input-premium w-full" value={form.category} onChange={e=>setForm(f=>({...f,category:e.target.value}))} style={{colorScheme:"dark"}}>
                {CATS.map(c=><option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="label-xs mb-1.5 block">Prazo</label>
              <input type="date" className="input-premium w-full" value={form.deadline} onChange={e=>setForm(f=>({...f,deadline:e.target.value}))} style={{colorScheme:"dark"}} />
            </div>
          </div>
          <div className="flex gap-3 pt-1">
            <button onClick={() => setShowNew(false)} className="btn-ghost flex-1 py-2.5 text-[13px]">Cancelar</button>
            <button onClick={handleCreate} className="btn-gold flex-1 py-2.5 text-[13px]">Criar Meta</button>
          </div>
        </div>
      </Modal>

      {/* Contribution modal */}
      <Modal open={!!contrib} onClose={() => setContrib(null)} title="Aportar na Meta" subtitle="Adicionar valor ao objetivo"
        icon={<PlusCircle size={14} className="text-gold" />}>
        <div className="space-y-4">
          <div>
            <label className="label-xs mb-1.5 block">Valor do Aporte (R$)</label>
            <input className="input-premium w-full" placeholder="0,00"
              value={contrib?.amount||""} onChange={e => setContrib(c => c ? {...c,amount:e.target.value} : null)} />
          </div>
          <div className="flex gap-3 pt-1">
            <button onClick={() => setContrib(null)} className="btn-ghost flex-1 py-2.5 text-[13px]">Cancelar</button>
            <button onClick={handleContrib} className="btn-gold flex-1 py-2.5 text-[13px]">Confirmar Aporte</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
