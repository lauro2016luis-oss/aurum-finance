"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Search, Filter, Download, TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight, Plus, Trash2 } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { MetricCard } from "@/components/shared/MetricCard";
import { Modal } from "@/components/shared/Modal";
import { useData } from "@/lib/data-store";
import { formatCurrency, formatDate } from "@/lib/utils";

const CATEGORIES = ["Renda","Alimentação","Moradia","Transporte","Saúde","Entretenimento","Investimentos","Educação","Lazer","Outros","Renda Extra","Serviços"];
const ACCOUNTS   = ["Nubank","Itaú","Inter","XP Investimentos","Bradesco","BTG","C6 Bank"];

export default function TransacoesPage() {
  const { transactions, addTransaction, deleteTransaction } = useData();
  const [filter, setFilter]   = useState("Todos");
  const [search, setSearch]   = useState("");
  const [type, setType]       = useState<"all"|"income"|"expense">("all");
  const [showModal, setShowModal] = useState(false);

  const [form, setForm] = useState({
    description: "", category: "Renda", date: new Date().toISOString().split("T")[0],
    value: "", account: "Nubank", type: "income" as "income"|"expense", status: "completed" as "completed"|"pending",
  });

  const filtered = transactions.filter((t) => {
    if (type === "income"  && t.value < 0) return false;
    if (type === "expense" && t.value > 0) return false;
    if (filter !== "Todos" && t.category !== filter) return false;
    if (search && !t.description.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const totalIncome  = transactions.filter(t => t.value > 0).reduce((s,t) => s + t.value, 0);
  const totalExpense = Math.abs(transactions.filter(t => t.value < 0).reduce((s,t) => s + t.value, 0));

  const handleSubmit = () => {
    if (!form.description || !form.value) return;
    const v = parseFloat(form.value.replace(",","."));
    if (isNaN(v) || v <= 0) return;
    addTransaction({
      description: form.description,
      category: form.category,
      date: form.date,
      value: form.type === "income" ? v : -v,
      type: form.type,
      account: form.account,
      status: form.status,
    });
    setForm({ description:"", category:"Renda", date:new Date().toISOString().split("T")[0], value:"", account:"Nubank", type:"income", status:"completed" });
    setShowModal(false);
  };

  const allCats = ["Todos", ...CATEGORIES];

  return (
    <div className="flex flex-col min-h-full">
      <Header title="Transações" subtitle="Histórico">
        <button onClick={() => setShowModal(true)} className="btn-gold flex items-center gap-1.5 text-[12.5px] py-2 px-4">
          <Plus size={14} /> Nova Transação
        </button>
      </Header>

      <motion.div className="flex-1 p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-6 overflow-y-auto"
        initial={{ opacity:0,y:12 }} animate={{ opacity:1,y:0 }} transition={{ duration:0.4 }}>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <MetricCard title="Total de Entradas" value={formatCurrency(totalIncome)}  changeValue={1}  icon={<TrendingUp size={14} />} />
          <MetricCard title="Total de Saídas"   value={formatCurrency(totalExpense)} changeValue={-1} icon={<TrendingDown size={14} />} />
          <MetricCard title="Transações"         value={String(transactions.length)} subtitle="Registradas" icon={<ArrowUpRight size={14} />} />
          <MetricCard title="Saldo do Período"   value={formatCurrency(totalIncome - totalExpense)} changeValue={12} icon={<ArrowDownRight size={14} />} gold />
        </div>

        <div className="card-premium p-4 sm:p-5">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <div className="relative flex-1 min-w-[180px]">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#52525B]" />
              <input type="text" placeholder="Buscar transação..." className="input-premium pl-9 w-full"
                value={search} onChange={e => setSearch(e.target.value)} />
            </div>
            <div className="flex items-center gap-1 p-1 rounded-xl flex-shrink-0" style={{ background:"#111111", border:"1px solid #1E1E1E" }}>
              {(["all","income","expense"] as const).map(t => (
                <button key={t} onClick={() => setType(t)}
                  className="px-3 py-1.5 rounded-lg text-[12px] font-medium transition-all"
                  style={{ background:type===t?"#1F1F1F":"transparent", color:type===t?"#fff":"#52525B", border:type===t?"1px solid #262626":"1px solid transparent" }}>
                  {t==="all"?"Todos":t==="income"?"Receitas":"Despesas"}
                </button>
              ))}
            </div>
            <button className="btn-ghost flex items-center gap-1.5 text-[12px] flex-shrink-0">
              <Download size={13} /> Exportar
            </button>
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {allCats.map(cat => (
              <button key={cat} onClick={() => setFilter(cat)}
                className="px-3 py-1.5 rounded-full text-[12px] whitespace-nowrap transition-all flex-shrink-0"
                style={{ background:filter===cat?"rgba(212,175,55,0.1)":"#141414", color:filter===cat?"#D4AF37":"#52525B",
                  border:`1px solid ${filter===cat?"rgba(212,175,55,0.3)":"#1E1E1E"}` }}>
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="card-premium overflow-hidden overflow-x-auto">
          <table className="table-premium">
            <thead>
              <tr>
                <th className="pl-6">Descrição</th>
                <th>Categoria</th>
                <th>Data</th>
                <th>Conta</th>
                <th>Status</th>
                <th className="text-right pr-6">Valor</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence mode="popLayout">
                {filtered.map(tx => (
                  <motion.tr key={tx.id} layout initial={{ opacity:0,y:-8 }} animate={{ opacity:1,y:0 }} exit={{ opacity:0,x:-20 }} className="cursor-pointer group">
                    <td className="pl-6">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
                          style={{ background:tx.value>0?"rgba(34,197,94,0.08)":"rgba(239,68,68,0.06)" }}>
                          {tx.value>0 ? <ArrowUpRight size={14} className="text-success" /> : <ArrowDownRight size={14} className="text-error" />}
                        </div>
                        <span className="text-[13.5px] text-white font-light">{tx.description}</span>
                      </div>
                    </td>
                    <td><span className="badge badge-neutral">{tx.category}</span></td>
                    <td className="text-[13px] text-[#52525B]">{formatDate(tx.date)}</td>
                    <td className="text-[13px] text-[#52525B]">{tx.account}</td>
                    <td>
                      <span className={`badge ${tx.status==="completed"?"badge-success":"badge-warning"}`}>
                        {tx.status==="completed"?"Concluída":"Pendente"}
                      </span>
                    </td>
                    <td className="text-right pr-3">
                      <span className="metric-value text-[14px] font-medium"
                        style={{ color:tx.value>0?"#22C55E":"#EF4444" }}>
                        {tx.value>0?"+":""}{formatCurrency(tx.value)}
                      </span>
                    </td>
                    <td className="pr-4">
                      <button onClick={() => deleteTransaction(tx.id)}
                        className="opacity-0 group-hover:opacity-100 w-7 h-7 flex items-center justify-center rounded-lg hover:bg-error/10 text-[#3F3F46] hover:text-error transition-all">
                        <Trash2 size={13} />
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="py-16 text-center">
              <p className="text-[#3F3F46] text-sm">Nenhuma transação encontrada</p>
            </div>
          )}
        </div>
      </motion.div>

      {/* Modal */}
      <Modal open={showModal} onClose={() => setShowModal(false)} title="Nova Transação" subtitle="Registrar movimentação" icon={<Plus size={14} className="text-gold" />}>
        <div className="space-y-4">
          {/* Tipo */}
          <div>
            <label className="label-xs mb-2 block">Tipo</label>
            <div className="grid grid-cols-2 gap-2">
              {(["income","expense"] as const).map(t => (
                <button key={t} onClick={() => setForm(f => ({...f, type:t}))}
                  className="py-2.5 rounded-xl text-[13px] font-medium transition-all"
                  style={{
                    background: form.type===t ? (t==="income"?"rgba(34,197,94,0.12)":"rgba(239,68,68,0.12)") : "#1A1A1A",
                    color: form.type===t ? (t==="income"?"#22C55E":"#EF4444") : "#52525B",
                    border: `1px solid ${form.type===t ? (t==="income"?"rgba(34,197,94,0.3)":"rgba(239,68,68,0.3)") : "#262626"}`,
                  }}>
                  {t==="income"?"↑ Receita":"↓ Despesa"}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="label-xs mb-1.5 block">Descrição</label>
            <input className="input-premium w-full" placeholder="Ex: Salário, Supermercado..." value={form.description} onChange={e => setForm(f=>({...f,description:e.target.value}))} />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="label-xs mb-1.5 block">Valor (R$)</label>
              <input className="input-premium w-full" placeholder="0,00" value={form.value} onChange={e => setForm(f=>({...f,value:e.target.value}))} />
            </div>
            <div>
              <label className="label-xs mb-1.5 block">Data</label>
              <input type="date" className="input-premium w-full" value={form.date} onChange={e => setForm(f=>({...f,date:e.target.value}))} style={{colorScheme:"dark"}} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="label-xs mb-1.5 block">Categoria</label>
              <select className="input-premium w-full" value={form.category} onChange={e => setForm(f=>({...f,category:e.target.value}))} style={{colorScheme:"dark"}}>
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="label-xs mb-1.5 block">Conta</label>
              <select className="input-premium w-full" value={form.account} onChange={e => setForm(f=>({...f,account:e.target.value}))} style={{colorScheme:"dark"}}>
                {ACCOUNTS.map(a => <option key={a} value={a}>{a}</option>)}
              </select>
            </div>
          </div>

          <div>
            <label className="label-xs mb-1.5 block">Status</label>
            <div className="grid grid-cols-2 gap-2">
              {(["completed","pending"] as const).map(s => (
                <button key={s} onClick={() => setForm(f=>({...f,status:s}))}
                  className="py-2 rounded-xl text-[12.5px] transition-all"
                  style={{ background:form.status===s?"rgba(212,175,55,0.1)":"#1A1A1A", color:form.status===s?"#D4AF37":"#52525B",
                    border:`1px solid ${form.status===s?"rgba(212,175,55,0.25)":"#262626"}` }}>
                  {s==="completed"?"✓ Concluída":"⏳ Pendente"}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button onClick={() => setShowModal(false)} className="btn-ghost flex-1 py-2.5 text-[13px]">Cancelar</button>
            <button onClick={handleSubmit} className="btn-gold flex-1 py-2.5 text-[13px]">Registrar</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
