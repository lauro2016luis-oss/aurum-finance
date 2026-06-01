"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  Plus, CheckCircle2, Clock, AlertCircle, Trash2,
  ChevronLeft, ChevronRight, Calendar,
  Download, Filter, Search, RotateCcw,
} from "lucide-react";
import { Header } from "@/components/layout/Header";
import { MetricCard } from "@/components/shared/MetricCard";
import { formatCurrency } from "@/lib/utils";
import { useData } from "@/lib/data-store";

const MONTHS = ["Janeiro","Fevereiro","Março","Abril","Maio","Junho",
                 "Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"];

type PeriodMode = "month" | "quarter" | "semester" | "year";

const statusConfig = {
  paid:    { label: "Pago",     color: "#22C55E", bg: "rgba(34,197,94,0.1)",   icon: CheckCircle2 },
  pending: { label: "Pendente", color: "#F59E0B", bg: "rgba(245,158,11,0.1)",  icon: Clock },
  overdue: { label: "Vencida",  color: "#EF4444", bg: "rgba(239,68,68,0.1)",   icon: AlertCircle },
};

const CATS = ["Moradia","Saúde","Serviços","Entretenimento","Educação","Transporte","Alimentação","Outros"];

export default function GastosFixosPage() {
  const { fixedExpenses, addFixedExpense, deleteFixedExpense, toggleFixedExpenseStatus, updateFixedExpense, getExpenseStatus } = useData();
  const now = new Date();
  const [showForm, setShowForm] = useState(false);
  const [newForm, setNewForm] = useState({ name:"", value:"", dueDay:"", category:"Moradia" });
  const [periodMode, setPeriodMode] = useState<PeriodMode>("month");
  const [currentMonth, setCurrentMonth] = useState(now.getMonth());
  const [currentYear, setCurrentYear]   = useState(now.getFullYear());
  const [customStart, setCustomStart]   = useState("");
  const [customEnd, setCustomEnd]       = useState("");
  const [showCustom, setShowCustom]     = useState(false);
  const [search, setSearch]             = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");

  /* ── period helpers ──────────────────────────────────────── */
  const stepMonth = (dir: number) => {
    let m = currentMonth + dir, y = currentYear;
    if (m < 0)  { m = 11; y--; }
    if (m > 11) { m = 0;  y++; }
    setCurrentMonth(m); setCurrentYear(y);
  };

  const periodLabel = () => {
    if (periodMode === "month")    return `${MONTHS[currentMonth]} ${currentYear}`;
    if (periodMode === "quarter")  { const q = Math.floor(currentMonth/3)+1; return `${q}º Trimestre ${currentYear}`; }
    if (periodMode === "semester") { const s = currentMonth < 6 ? "1º" : "2º"; return `${s} Semestre ${currentYear}`; }
    return `Ano ${currentYear}`;
  };

  /* ── month key ex: "2026-06" ─────────────────────────────── */
  const monthKey = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}`;

  /* ── derived data ────────────────────────────────────────── */
  const filtered = fixedExpenses.filter((e) => {
    const st = getExpenseStatus(e, monthKey);
    if (filterStatus !== "all" && st !== filterStatus) return false;
    if (search && !e.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const total   = fixedExpenses.reduce((s, e) => s + e.value, 0);
  const paid    = fixedExpenses.filter(e => getExpenseStatus(e, monthKey) === "paid").reduce((s, e) => s + e.value, 0);
  const pending = fixedExpenses.filter(e => getExpenseStatus(e, monthKey) === "pending").reduce((s, e) => s + e.value, 0);
  const overdue = fixedExpenses.filter(e => getExpenseStatus(e, monthKey) === "overdue").reduce((s, e) => s + e.value, 0);

  const paidPct = (paid / total) * 100;

  return (
    <div className="flex flex-col min-h-full">
      <Header title="Gastos Fixos" subtitle="Recorrentes">
        <button
          onClick={() => setShowForm(!showForm)}
          className="btn-gold flex items-center gap-1.5 text-[12.5px] py-2 px-4"
        >
          <Plus size={14} />
          Novo Gasto Fixo
        </button>
      </Header>

      <motion.div
        className="flex-1 p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-5 overflow-y-auto"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >

        {/* ── Period controls ───────────────────────────────── */}
        <div className="flex items-center gap-3 flex-wrap">
          {/* Mode pills */}
          <div
            className="flex items-center p-1 rounded-xl gap-0.5"
            style={{ background: "#111111", border: "1px solid #1E1E1E" }}
          >
            {(["month","quarter","semester","year"] as PeriodMode[]).map((m) => (
              <button
                key={m}
                onClick={() => setPeriodMode(m)}
                className="px-3 py-1.5 rounded-lg text-[12px] transition-all duration-200 whitespace-nowrap"
                style={{
                  background: periodMode === m ? "#1F1F1F" : "transparent",
                  color: periodMode === m ? "#D4AF37" : "#52525B",
                  border: periodMode === m ? "1px solid rgba(212,175,55,0.2)" : "1px solid transparent",
                  fontFamily: "'Instrument Sans', sans-serif",
                }}
              >
                {m === "month" ? "Mês" : m === "quarter" ? "Trimestre" : m === "semester" ? "Semestre" : "Ano"}
              </button>
            ))}
          </div>

          {/* Arrow navigation */}
          <div
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl"
            style={{ background: "#141414", border: "1px solid #1E1E1E" }}
          >
            <button
              onClick={() => stepMonth(-1)}
              className="w-6 h-6 flex items-center justify-center rounded-lg hover:bg-[#1F1F1F] text-[#52525B] hover:text-white transition-colors"
            >
              <ChevronLeft size={13} />
            </button>
            <span
              className="text-[13px] text-white min-w-[160px] text-center"
              style={{ fontFamily: "'Instrument Sans', sans-serif" }}
            >
              {periodLabel()}
            </span>
            <button
              onClick={() => stepMonth(1)}
              className="w-6 h-6 flex items-center justify-center rounded-lg hover:bg-[#1F1F1F] text-[#52525B] hover:text-white transition-colors"
            >
              <ChevronRight size={13} />
            </button>
          </div>

          {/* Custom date range toggle */}
          <button
            onClick={() => setShowCustom(!showCustom)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[12px] transition-all duration-200"
            style={{
              background: showCustom ? "rgba(212,175,55,0.08)" : "#141414",
              color: showCustom ? "#D4AF37" : "#52525B",
              border: `1px solid ${showCustom ? "rgba(212,175,55,0.2)" : "#1E1E1E"}`,
              fontFamily: "'Instrument Sans', sans-serif",
            }}
          >
            <Calendar size={12} />
            Personalizado
          </button>

          {/* Back to today */}
          <button
            onClick={() => { setCurrentMonth(now.getMonth()); setCurrentYear(now.getFullYear()); setPeriodMode("month"); }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[12px] transition-all duration-200 ml-auto"
            style={{
              background: "rgba(212,175,55,0.08)",
              color: "#D4AF37",
              border: "1px solid rgba(212,175,55,0.2)",
              fontFamily: "'Instrument Sans', sans-serif",
            }}
          >
            <RotateCcw size={11} />
            Hoje
          </button>
        </div>

        {/* Custom date inputs */}
        <AnimatePresence>
          {showCustom && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div
                className="flex items-center gap-3 p-4 rounded-2xl"
                style={{ background: "#141414", border: "1px solid rgba(212,175,55,0.12)" }}
              >
                <Calendar size={14} className="text-[#D4AF37] flex-shrink-0" />
                <span className="text-[12px] text-[#52525B]" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>De</span>
                <input
                  type="date"
                  value={customStart}
                  onChange={(e) => setCustomStart(e.target.value)}
                  className="input-premium w-[148px] text-[12.5px] py-2"
                  style={{ colorScheme: "dark" }}
                />
                <span className="text-[#3F3F46]">→</span>
                <span className="text-[12px] text-[#52525B]" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>Até</span>
                <input
                  type="date"
                  value={customEnd}
                  onChange={(e) => setCustomEnd(e.target.value)}
                  className="input-premium w-[148px] text-[12.5px] py-2"
                  style={{ colorScheme: "dark" }}
                />
                {customStart && customEnd && (
                  <button className="btn-gold py-2 px-4 text-[12px]">Aplicar Filtro</button>
                )}
                <button
                  onClick={() => { setCustomStart(""); setCustomEnd(""); }}
                  className="btn-ghost py-2 px-3 text-[12px]"
                >
                  Limpar
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <MetricCard title="Total do Período" value={formatCurrency(total)} subtitle={periodLabel()} />
          <MetricCard title="Pago" value={formatCurrency(paid)} changeValue={1} subtitle={`${paidPct.toFixed(0)}% quitado`} />
          <MetricCard title="Pendente" value={formatCurrency(pending)} subtitle="A pagar" />
          <MetricCard title="Vencidas" value={formatCurrency(overdue)} changeValue={-1} subtitle="Em atraso" gold />
        </div>

        {/* Progress bar overview */}
        <div
          className="card-gold p-5 flex items-center gap-6"
        >
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] text-[#52525B]" style={{ fontFamily: "'Instrument Sans', sans-serif", letterSpacing: "0.12em", textTransform: "uppercase" }}>
                Progresso do mês — {periodLabel()}
              </span>
              <span className="metric-value text-[13px] text-[#D4AF37]">{paidPct.toFixed(1)}%</span>
            </div>
            <div className="h-2 rounded-full overflow-hidden" style={{ background: "#1A1A1A" }}>
              <motion.div
                className="h-full rounded-full"
                style={{ background: "linear-gradient(90deg, #B8952A, #D4AF37, #E8CC6A)" }}
                initial={{ width: "0%" }}
                animate={{ width: `${paidPct}%` }}
                transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
              />
            </div>
            <div className="flex justify-between mt-1.5 text-[11px] text-[#3F3F46]" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
              <span>Pago: {formatCurrency(paid)}</span>
              <span>Restante: {formatCurrency(total - paid)}</span>
            </div>
          </div>
          <div className="flex items-center gap-5 flex-shrink-0">
            {[
              { label: "Pago",     value: fixedExpenses.filter(e => getExpenseStatus(e, monthKey) === "paid").length,    color: "#22C55E" },
              { label: "Pendente", value: fixedExpenses.filter(e => getExpenseStatus(e, monthKey) === "pending").length,  color: "#F59E0B" },
              { label: "Vencido",  value: fixedExpenses.filter(e => getExpenseStatus(e, monthKey) === "overdue").length,  color: "#EF4444" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <p className="metric-value text-[22px]" style={{ color: s.color }}>{s.value}</p>
                <p className="text-[10.5px] text-[#3F3F46] mt-0.5" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Add form */}
        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0, y: -10, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, y: -10, height: 0 }}
              className="overflow-hidden"
            >
              <div className="card-gold p-6">
                <h3 className="text-[18px] text-white mb-5" style={{ fontFamily: "'Cormorant SC', serif", fontWeight: 400 }}>
                  Novo Gasto Fixo
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  <div className="sm:col-span-2">
                    <label className="label-xs mb-1.5 block">Nome</label>
                    <input className="input-premium w-full" placeholder="Ex: Aluguel"
                      value={newForm.name} onChange={e => setNewForm(f=>({...f,name:e.target.value}))} />
                  </div>
                  <div>
                    <label className="label-xs mb-1.5 block">Valor (R$)</label>
                    <input className="input-premium w-full" placeholder="0,00"
                      value={newForm.value} onChange={e => setNewForm(f=>({...f,value:e.target.value}))} />
                  </div>
                  <div>
                    <label className="label-xs mb-1.5 block">Dia de Vencimento</label>
                    <input className="input-premium w-full" placeholder="1-31" type="number" min="1" max="31"
                      value={newForm.dueDay} onChange={e => setNewForm(f=>({...f,dueDay:e.target.value}))} />
                  </div>
                  <div>
                    <label className="label-xs mb-1.5 block">Categoria</label>
                    <select className="input-premium w-full" style={{colorScheme:"dark"}}
                      value={newForm.category} onChange={e => setNewForm(f=>({...f,category:e.target.value}))}>
                      {CATS.map(c => <option key={c}>{c}</option>)}
                    </select>
                  </div>
                </div>
                <div className="flex gap-3 mt-5">
                  <button className="btn-gold py-2 px-6 text-[13px]" onClick={() => {
                    if (!newForm.name || !newForm.value) return;
                    const v = parseFloat(newForm.value.replace(",","."));
                    if (isNaN(v)) return;
                    addFixedExpense({ name:newForm.name, category:newForm.category, dueDay:parseInt(newForm.dueDay)||1, value:v, status:"pending", active:true });
                    setNewForm({ name:"", value:"", dueDay:"", category:"Moradia" });
                    setShowForm(false);
                  }}>Salvar Gasto Fixo</button>
                  <button className="btn-ghost py-2 px-4 text-[13px]" onClick={() => setShowForm(false)}>Cancelar</button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Table */}
        <div className="card-premium overflow-hidden overflow-x-auto">
          <div className="p-5 border-b border-[#1A1A1A] flex items-center gap-4">
            <div className="flex-1">
              <p className="text-[10px] text-[#52525B] uppercase tracking-[0.13em] mb-0.5" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>Lançamentos</p>
              <h3 className="text-[17px] text-white" style={{ fontFamily: "'Cormorant SC', serif", fontWeight: 400 }}>
                Recorrentes — {periodLabel()}
              </h3>
            </div>

            {/* Search */}
            <div className="relative w-52">
              <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#52525B]" />
              <input
                type="text"
                placeholder="Buscar gasto..."
                className="input-premium pl-9 py-2 text-[12.5px]"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            {/* Status filter */}
            <div
              className="flex items-center gap-1 p-1 rounded-xl"
              style={{ background: "#111111", border: "1px solid #1E1E1E" }}
            >
              {[["all","Todos"],["paid","Pagos"],["pending","Pendentes"],["overdue","Vencidos"]].map(([val, lbl]) => (
                <button
                  key={val}
                  onClick={() => setFilterStatus(val)}
                  className="px-2.5 py-1 rounded-lg text-[11.5px] transition-all duration-200 whitespace-nowrap"
                  style={{
                    background: filterStatus === val ? "#1F1F1F" : "transparent",
                    color: filterStatus === val ? "#fff" : "#52525B",
                    border: filterStatus === val ? "1px solid #262626" : "1px solid transparent",
                    fontFamily: "'Instrument Sans', sans-serif",
                  }}
                >
                  {lbl}
                </button>
              ))}
            </div>

            <button className="btn-ghost text-[12px] py-2 px-3 flex items-center gap-1.5">
              <Download size={12} />
              Exportar
            </button>
          </div>

          <table className="table-premium">
            <thead>
              <tr>
                <th className="pl-6">Nome</th>
                <th>Categoria</th>
                <th>Vencimento</th>
                <th>Próx. Venc.</th>
                <th className="text-right">Valor</th>
                <th className="text-center">Status</th>
                <th className="pr-4"></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((expense) => {
                const statusForMonth = getExpenseStatus(expense, monthKey);
                const s = statusConfig[statusForMonth];
                const Icon = s.icon;
                const nextDue = new Date(currentYear, currentMonth, expense.dueDay);
                if (nextDue < new Date()) nextDue.setMonth(nextDue.getMonth() + 1);
                const nextLabel = `${String(expense.dueDay).padStart(2,"0")}/${String(nextDue.getMonth()+1).padStart(2,"0")}/${nextDue.getFullYear()}`;

                return (
                  <motion.tr key={expense.id} className="cursor-pointer group"
                    whileHover={{ backgroundColor: "rgba(255,255,255,0.012)" }}>
                    <td className="pl-6">
                      <div className="flex items-center gap-2.5">
                        <div className="w-1.5 h-8 rounded-full flex-shrink-0" style={{ background: s.color, opacity: 0.6 }} />
                        <span className="text-[13px] text-white">{expense.name}</span>
                      </div>
                    </td>
                    <td><span className="badge badge-neutral">{expense.category}</span></td>
                    <td>
                      <div className="flex items-center gap-1.5 text-[12.5px] text-[#52525B]" style={{ fontFamily:"'Instrument Sans',sans-serif" }}>
                        <Calendar size={11} className="text-[#3F3F46]" />dia {expense.dueDay}
                      </div>
                    </td>
                    <td>
                      <span className="text-[12.5px]" style={{ fontFamily:"'Instrument Sans',sans-serif", color:expense.status==="overdue"?"#EF4444":"#52525B" }}>
                        {nextLabel}
                      </span>
                    </td>
                    <td className="text-right">
                      <span className="metric-value text-[14px] text-white">{formatCurrency(expense.value)}</span>
                    </td>
                    <td className="text-center">
                      <button onClick={() => toggleFixedExpenseStatus(expense.id, monthKey)}
                        className="badge inline-flex items-center gap-1 hover:opacity-80 transition-opacity cursor-pointer"
                        style={{ background:s.bg, color:s.color, fontFamily:"'Instrument Sans',sans-serif" }}>
                        <Icon size={10} />{s.label}
                      </button>
                    </td>
                    <td className="pr-4">
                      <button onClick={() => deleteFixedExpense(expense.id)}
                        className="opacity-0 group-hover:opacity-100 w-7 h-7 flex items-center justify-center rounded-lg hover:bg-error/10 text-[#3F3F46] hover:text-error transition-all">
                        <Trash2 size={13} />
                      </button>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>

          {/* Footer */}
          <div className="px-6 py-3 border-t border-[#1A1A1A] flex items-center justify-between">
            <span className="text-[12px] text-[#3F3F46]" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
              {filtered.length} de {fixedExpenses.length} gastos
            </span>
            <div className="flex items-center gap-5">
              <span className="text-[12px] text-[#3F3F46]" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
                Pago: <span className="text-success metric-value text-[13px]">{formatCurrency(paid)}</span>
              </span>
              <span className="text-[12px] text-[#3F3F46]" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
                Total: <span className="text-white metric-value text-[13px]">{formatCurrency(total)}</span>
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
