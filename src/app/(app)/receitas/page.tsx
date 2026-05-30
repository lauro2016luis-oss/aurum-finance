"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  Plus, ArrowUpRight, ArrowDownRight,
  ChevronLeft, ChevronRight, Calendar,
  Download, Filter, Search, RotateCcw,
  TrendingUp, TrendingDown, Wallet,
} from "lucide-react";
import { Header } from "@/components/layout/Header";
import { MetricCard } from "@/components/shared/MetricCard";
import { transactions, categoryData } from "@/lib/mock-data";
import { formatCurrency, formatDate } from "@/lib/utils";
import {
  AreaChart, Area, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer,
} from "recharts";

const MONTHS = [
  "Janeiro","Fevereiro","Março","Abril","Maio","Junho",
  "Julho","Agosto","Setembro","Outubro","Novembro","Dezembro",
];

type PeriodMode = "month" | "quarter" | "semester" | "year";
type Tab = "all" | "income" | "expense";

const monthlyFlow = [
  { month: "Mar", receitas: 14800, despesas: 8400 },
  { month: "Abr", receitas: 17200, despesas: 9200 },
  { month: "Mai", receitas: 15900, despesas: 10100 },
  { month: "Jun", receitas: 19800, despesas: 8800 },
  { month: "Jul", receitas: 18100, despesas: 9600 },
  { month: "Ago", receitas: 18500, despesas: 9847 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl p-3 text-sm"
      style={{ background: "#1A1A1A", border: "1px solid #262626", boxShadow: "0 8px 24px rgba(0,0,0,0.5)" }}>
      <p className="text-[10px] text-[#52525B] uppercase tracking-wider mb-2"
        style={{ fontFamily: "'Instrument Sans', sans-serif" }}>{label}</p>
      {payload.map((e: any) => (
        <div key={e.name} className="flex items-center gap-2 mb-1 last:mb-0">
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: e.color }} />
          <span className="text-[12px] text-[#A1A1AA]" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>{e.name}:</span>
          <span className="metric-value text-[12px] text-white">{formatCurrency(e.value)}</span>
        </div>
      ))}
    </div>
  );
};

export default function ReceitasPage() {
  const now = new Date();
  const [tab, setTab]               = useState<Tab>("all");
  const [periodMode, setPeriodMode] = useState<PeriodMode>("month");
  const [currentMonth, setCurrentMonth] = useState(now.getMonth());
  const [currentYear, setCurrentYear]   = useState(now.getFullYear());
  const [showCustom, setShowCustom] = useState(false);
  const [customStart, setCustomStart] = useState("");
  const [customEnd, setCustomEnd]     = useState("");
  const [search, setSearch]           = useState("");
  const [showForm, setShowForm]       = useState<Tab | null>(null);

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

  const incomes  = transactions.filter(t => t.value > 0);
  const expenses = transactions.filter(t => t.value < 0);
  const totalIn  = incomes.reduce((s, t) => s + t.value, 0);
  const totalOut = Math.abs(expenses.reduce((s, t) => s + t.value, 0));
  const balance  = totalIn - totalOut;

  const filtered = transactions.filter(t => {
    if (tab === "income"  && t.value <= 0) return false;
    if (tab === "expense" && t.value >= 0) return false;
    if (search && !t.description.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const topExpenses = categoryData.slice(0, 5);

  return (
    <div className="flex flex-col min-h-full">
      <Header title="Receitas & Despesas" subtitle="Fluxo">
        <div className="flex items-center gap-1.5 sm:gap-2">
          <button
            onClick={() => setShowForm("income")}
            className="btn-gold flex items-center gap-1.5 text-[12px] sm:text-[12.5px] py-2 px-3 sm:px-4"
          >
            <Plus size={13} />
            <span className="hidden sm:inline">Nova </span>Receita
          </button>
          <button
            onClick={() => setShowForm("expense")}
            className="btn-ghost flex items-center gap-1.5 text-[12px] sm:text-[12.5px] py-2 px-3 sm:px-4"
          >
            <Plus size={13} />
            <span className="hidden sm:inline">Nova </span>Despesa
          </button>
        </div>
      </Header>

      <motion.div
        className="flex-1 p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-5 overflow-y-auto"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {/* ── Period controls ───────────────────────────────── */}
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          <div className="flex items-center p-1 rounded-xl gap-0.5"
            style={{ background: "#111111", border: "1px solid #1E1E1E" }}>
            {(["month","quarter","semester","year"] as PeriodMode[]).map((m) => (
              <button key={m}
                onClick={() => setPeriodMode(m)}
                className="px-3 py-1.5 rounded-lg text-[12px] transition-all duration-200"
                style={{
                  background: periodMode === m ? "#1F1F1F" : "transparent",
                  color: periodMode === m ? "#D4AF37" : "#52525B",
                  border: periodMode === m ? "1px solid rgba(212,175,55,0.2)" : "1px solid transparent",
                  fontFamily: "'Instrument Sans', sans-serif",
                }}>
                {m === "month" ? "Mês" : m === "quarter" ? "Trimestre" : m === "semester" ? "Semestre" : "Ano"}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl"
            style={{ background: "#141414", border: "1px solid #1E1E1E" }}>
            <button onClick={() => stepMonth(-1)}
              className="w-6 h-6 flex items-center justify-center rounded-lg hover:bg-[#1F1F1F] text-[#52525B] hover:text-white transition-colors">
              <ChevronLeft size={13} />
            </button>
            <span className="text-[13px] text-white min-w-[160px] text-center"
              style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
              {periodLabel()}
            </span>
            <button onClick={() => stepMonth(1)}
              className="w-6 h-6 flex items-center justify-center rounded-lg hover:bg-[#1F1F1F] text-[#52525B] hover:text-white transition-colors">
              <ChevronRight size={13} />
            </button>
          </div>

          <button
            onClick={() => setShowCustom(!showCustom)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[12px] transition-all duration-200"
            style={{
              background: showCustom ? "rgba(212,175,55,0.08)" : "#141414",
              color: showCustom ? "#D4AF37" : "#52525B",
              border: `1px solid ${showCustom ? "rgba(212,175,55,0.2)" : "#1E1E1E"}`,
              fontFamily: "'Instrument Sans', sans-serif",
            }}>
            <Calendar size={12} />
            Personalizado
          </button>

          <button
            onClick={() => { setCurrentMonth(now.getMonth()); setCurrentYear(now.getFullYear()); setPeriodMode("month"); }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[12px] ml-auto transition-all duration-200"
            style={{
              background: "rgba(212,175,55,0.08)", color: "#D4AF37",
              border: "1px solid rgba(212,175,55,0.2)",
              fontFamily: "'Instrument Sans', sans-serif",
            }}>
            <RotateCcw size={11} />
            Hoje
          </button>
        </div>

        {/* Custom date range */}
        <AnimatePresence>
          {showCustom && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="flex items-center gap-3 p-4 rounded-2xl"
                style={{ background: "#141414", border: "1px solid rgba(212,175,55,0.12)" }}>
                <Calendar size={14} className="text-[#D4AF37] flex-shrink-0" />
                <span className="text-[12px] text-[#52525B]" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>De</span>
                <input type="date" value={customStart} onChange={e => setCustomStart(e.target.value)}
                  className="input-premium w-[148px] text-[12.5px] py-2" style={{ colorScheme: "dark" }} />
                <span className="text-[#3F3F46]">→</span>
                <span className="text-[12px] text-[#52525B]" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>Até</span>
                <input type="date" value={customEnd} onChange={e => setCustomEnd(e.target.value)}
                  className="input-premium w-[148px] text-[12.5px] py-2" style={{ colorScheme: "dark" }} />
                {customStart && customEnd && (
                  <button className="btn-gold py-2 px-4 text-[12px]">Aplicar</button>
                )}
                <button onClick={() => { setCustomStart(""); setCustomEnd(""); }}
                  className="btn-ghost py-2 px-3 text-[12px]">Limpar</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Metric cards ──────────────────────────────────── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <MetricCard title="Total Recebido"  value={formatCurrency(totalIn)}  changeValue={8.2}  icon={<TrendingUp size={14} />}   subtitle={periodLabel()} />
          <MetricCard title="Total Gasto"     value={formatCurrency(totalOut)} changeValue={-3.1} icon={<TrendingDown size={14} />} subtitle={periodLabel()} />
          <MetricCard title="Saldo do Período" value={formatCurrency(balance)} changeValue={balance > 0 ? 1 : -1} icon={<Wallet size={14} />} subtitle="Receitas − despesas" />
          <MetricCard title="Transações"      value={String(transactions.length)} subtitle="No período" gold />
        </div>

        {/* ── Charts ────────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5">
          {/* Area chart */}
          <div className="lg:col-span-2 card-premium p-6">
            <div className="flex items-center justify-between mb-5">
              <div>
                <p className="text-[10px] text-[#52525B] uppercase tracking-[0.13em] mb-1"
                  style={{ fontFamily: "'Instrument Sans', sans-serif" }}>Histórico</p>
                <h3 className="text-[18px] text-white"
                  style={{ fontFamily: "'Cormorant SC', serif", fontWeight: 400 }}>
                  Receitas vs. Despesas
                </h3>
              </div>
              <div className="flex items-center gap-4 text-[11px]" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
                <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-[#22C55E]" /><span className="text-[#52525B]">Receitas</span></div>
                <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-[#EF4444]" /><span className="text-[#52525B]">Despesas</span></div>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={monthlyFlow}>
                <defs>
                  <linearGradient id="gIn"  x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%"   stopColor="#22C55E" stopOpacity={0.15} />
                    <stop offset="100%" stopColor="#22C55E" stopOpacity={0.01} />
                  </linearGradient>
                  <linearGradient id="gOut" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%"   stopColor="#EF4444" stopOpacity={0.12} />
                    <stop offset="100%" stopColor="#EF4444" stopOpacity={0.01} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E1E1E" vertical={false} />
                <XAxis dataKey="month" tick={{ fill: "#52525B", fontSize: 11, fontFamily: "'Instrument Sans'" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#52525B", fontSize: 11, fontFamily: "'Instrument Sans'" }} axisLine={false} tickLine={false}
                  tickFormatter={v => `${(v/1000).toFixed(0)}k`} width={36} />
                <Tooltip content={<CustomTooltip />} cursor={{ stroke: "#262626", strokeWidth: 1 }} />
                <Area type="monotone" dataKey="receitas" name="Receitas" stroke="#22C55E" strokeWidth={1.5}
                  fill="url(#gIn)" dot={false} activeDot={{ r: 4, fill: "#22C55E", stroke: "#0A0A0A", strokeWidth: 2 }} />
                <Area type="monotone" dataKey="despesas" name="Despesas" stroke="#EF4444" strokeWidth={1.5}
                  fill="url(#gOut)" dot={false} activeDot={{ r: 4, fill: "#EF4444", stroke: "#0A0A0A", strokeWidth: 2 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Categories side panel */}
          <div className="card-premium p-5 flex flex-col gap-4">
            <div>
              <p className="text-[10px] text-[#52525B] uppercase tracking-[0.13em] mb-3"
                style={{ fontFamily: "'Instrument Sans', sans-serif" }}>Maiores Gastos</p>
              <div className="space-y-3">
                {topExpenses.map((item) => (
                  <div key={item.name}>
                    <div className="flex justify-between mb-1" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
                      <span className="text-[12.5px] text-[#A1A1AA]">{item.name}</span>
                      <span className="metric-value text-[12px] text-white">{formatCurrency(item.value, true)}</span>
                    </div>
                    <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "#1A1A1A" }}>
                      <motion.div className="h-full rounded-full"
                        style={{ background: `linear-gradient(90deg, ${item.color}50, ${item.color})` }}
                        initial={{ width: "0%" }}
                        animate={{ width: `${(item.value / topExpenses[0].value) * 100}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Balance summary */}
            <div className="mt-auto pt-4 border-t border-[#1A1A1A] space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-[12px] text-[#52525B]" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>Entradas</span>
                <span className="metric-value text-[13px] text-[#22C55E]">+{formatCurrency(totalIn)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[12px] text-[#52525B]" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>Saídas</span>
                <span className="metric-value text-[13px] text-[#EF4444]">−{formatCurrency(totalOut)}</span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-[#1A1A1A]">
                <span className="text-[12px] text-white font-medium" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>Saldo</span>
                <span className="metric-value text-[15px]"
                  style={{ color: balance >= 0 ? "#D4AF37" : "#EF4444" }}>
                  {balance >= 0 ? "+" : ""}{formatCurrency(balance)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Quick-add form (animated) ─────────────────────── */}
        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="rounded-2xl p-6"
                style={{
                  background: "#141414",
                  border: `1px solid ${showForm === "income" ? "rgba(34,197,94,0.2)" : "rgba(239,68,68,0.2)"}`,
                }}>
                <div className="flex items-center gap-2 mb-5">
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center"
                    style={{ background: showForm === "income" ? "rgba(34,197,94,0.1)" : "rgba(239,68,68,0.08)" }}>
                    {showForm === "income"
                      ? <ArrowUpRight size={14} className="text-success" />
                      : <ArrowDownRight size={14} className="text-error" />}
                  </div>
                  <h3 className="text-[17px] text-white"
                    style={{ fontFamily: "'Cormorant SC', serif", fontWeight: 400 }}>
                    {showForm === "income" ? "Nova Receita" : "Nova Despesa"}
                  </h3>
                </div>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                  <div className="lg:col-span-2">
                    <label className="text-[10px] text-[#52525B] uppercase tracking-[0.13em] mb-1.5 block"
                      style={{ fontFamily: "'Instrument Sans', sans-serif" }}>Descrição</label>
                    <input className="input-premium" placeholder={showForm === "income" ? "Ex: Salário" : "Ex: Aluguel"} />
                  </div>
                  <div>
                    <label className="text-[10px] text-[#52525B] uppercase tracking-[0.13em] mb-1.5 block"
                      style={{ fontFamily: "'Instrument Sans', sans-serif" }}>Valor</label>
                    <input className="input-premium" placeholder="R$ 0,00" />
                  </div>
                  <div>
                    <label className="text-[10px] text-[#52525B] uppercase tracking-[0.13em] mb-1.5 block"
                      style={{ fontFamily: "'Instrument Sans', sans-serif" }}>Data</label>
                    <div className="relative">
                      <Calendar size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#52525B]" />
                      <input type="date" className="input-premium pl-9" style={{ colorScheme: "dark" }} />
                    </div>
                  </div>
                  <div>
                    <label className="text-[10px] text-[#52525B] uppercase tracking-[0.13em] mb-1.5 block"
                      style={{ fontFamily: "'Instrument Sans', sans-serif" }}>Categoria</label>
                    <select className="input-premium" style={{ background: "#141414" }}>
                      {showForm === "income"
                        ? <><option>Salário</option><option>Freelance</option><option>Dividendos</option><option>Outros</option></>
                        : <><option>Moradia</option><option>Alimentação</option><option>Transporte</option><option>Saúde</option><option>Outros</option></>
                      }
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] text-[#52525B] uppercase tracking-[0.13em] mb-1.5 block"
                      style={{ fontFamily: "'Instrument Sans', sans-serif" }}>Conta</label>
                    <select className="input-premium" style={{ background: "#141414" }}>
                      <option>Nubank</option><option>Itaú</option><option>Inter</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] text-[#52525B] uppercase tracking-[0.13em] mb-1.5 block"
                      style={{ fontFamily: "'Instrument Sans', sans-serif" }}>Recorrência</label>
                    <select className="input-premium" style={{ background: "#141414" }}>
                      <option>Nenhuma</option><option>Mensal</option><option>Semanal</option><option>Anual</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] text-[#52525B] uppercase tracking-[0.13em] mb-1.5 block"
                      style={{ fontFamily: "'Instrument Sans', sans-serif" }}>Observação</label>
                    <input className="input-premium" placeholder="Opcional" />
                  </div>
                </div>
                <div className="flex gap-3 mt-5">
                  <button className="btn-gold py-2 px-6">
                    Salvar {showForm === "income" ? "Receita" : "Despesa"}
                  </button>
                  <button className="btn-ghost py-2 px-4" onClick={() => setShowForm(null)}>Cancelar</button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Transactions table ────────────────────────────── */}
        <div className="card-premium overflow-hidden overflow-x-auto">
          {/* Table toolbar */}
          <div className="p-5 border-b border-[#1A1A1A] flex items-center gap-4">
            {/* Tabs */}
            <div className="flex items-center gap-1 p-1 rounded-xl flex-shrink-0"
              style={{ background: "#111111", border: "1px solid #1E1E1E" }}>
              {([
                ["all",     "Todos",    transactions.length],
                ["income",  "Receitas", incomes.length],
                ["expense", "Despesas", expenses.length],
              ] as [Tab, string, number][]).map(([val, lbl, count]) => (
                <button key={val}
                  onClick={() => setTab(val)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] transition-all duration-200"
                  style={{
                    background: tab === val ? "#1F1F1F" : "transparent",
                    color: tab === val
                      ? val === "income" ? "#22C55E" : val === "expense" ? "#EF4444" : "#fff"
                      : "#52525B",
                    border: tab === val ? "1px solid #262626" : "1px solid transparent",
                    fontFamily: "'Instrument Sans', sans-serif",
                  }}>
                  {lbl}
                  <span className="px-1.5 py-0.5 rounded-full text-[10px]"
                    style={{
                      background: tab === val ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.04)",
                      color: tab === val ? "inherit" : "#3F3F46",
                    }}>
                    {count}
                  </span>
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative flex-1 max-w-xs">
              <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#52525B]" />
              <input type="text" placeholder="Buscar..."
                className="input-premium pl-9 py-2 text-[12.5px]"
                value={search} onChange={e => setSearch(e.target.value)} />
            </div>

            <div className="ml-auto flex items-center gap-2">
              <button className="btn-ghost text-[12px] py-2 px-3 flex items-center gap-1.5">
                <Filter size={12} />Filtrar
              </button>
              <button className="btn-ghost text-[12px] py-2 px-3 flex items-center gap-1.5">
                <Download size={12} />Exportar
              </button>
            </div>
          </div>

          <table className="table-premium">
            <thead>
              <tr>
                <th className="pl-5">Descrição</th>
                <th>Categoria</th>
                <th>Data</th>
                <th>Conta</th>
                <th>Tipo</th>
                <th className="text-right pr-5">Valor</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence mode="popLayout">
                {filtered.map((tx) => {
                  const isIn = tx.value > 0;
                  return (
                    <motion.tr key={tx.id}
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="cursor-pointer"
                      whileHover={{ backgroundColor: "rgba(255,255,255,0.012)" }}
                    >
                      <td className="pl-5">
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                            style={{ background: isIn ? "rgba(34,197,94,0.08)" : "rgba(239,68,68,0.06)" }}>
                            {isIn
                              ? <ArrowUpRight size={13} className="text-success" />
                              : <ArrowDownRight size={13} className="text-error" />}
                          </div>
                          <span className="text-[13px] text-white">{tx.description}</span>
                        </div>
                      </td>
                      <td>
                        <span className={`badge ${isIn ? "badge-success" : "badge-neutral"}`}>
                          {tx.category}
                        </span>
                      </td>
                      <td>
                        <span className="text-[12.5px] text-[#52525B]"
                          style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
                          {formatDate(tx.date)}
                        </span>
                      </td>
                      <td>
                        <span className="text-[12.5px] text-[#52525B]"
                          style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
                          {tx.account}
                        </span>
                      </td>
                      <td>
                        <span
                          className="badge"
                          style={{
                            background: isIn ? "rgba(34,197,94,0.08)" : "rgba(239,68,68,0.06)",
                            color: isIn ? "#22C55E" : "#EF4444",
                            fontFamily: "'Instrument Sans', sans-serif",
                          }}>
                          {isIn ? "Receita" : "Despesa"}
                        </span>
                      </td>
                      <td className="text-right pr-5">
                        <span className="metric-value text-[14px] font-medium"
                          style={{ color: isIn ? "#22C55E" : "#EF4444" }}>
                          {isIn ? "+" : "−"}{formatCurrency(Math.abs(tx.value))}
                        </span>
                      </td>
                    </motion.tr>
                  );
                })}
              </AnimatePresence>
            </tbody>
          </table>

          {/* Footer */}
          <div className="px-5 py-3 border-t border-[#1A1A1A] flex items-center justify-between">
            <span className="text-[12px] text-[#3F3F46]"
              style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
              {filtered.length} registros — {periodLabel()}
            </span>
            <div className="flex items-center gap-5">
              <span className="text-[12px] text-[#3F3F46]"
                style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
                Entradas: <span className="metric-value text-[13px] text-success">+{formatCurrency(totalIn)}</span>
              </span>
              <span className="text-[12px] text-[#3F3F46]"
                style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
                Saídas: <span className="metric-value text-[13px] text-error">−{formatCurrency(totalOut)}</span>
              </span>
              <span className="text-[12px] text-[#3F3F46]"
                style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
                Saldo: <span className="metric-value text-[13px]"
                  style={{ color: balance >= 0 ? "#D4AF37" : "#EF4444" }}>
                  {balance >= 0 ? "+" : ""}{formatCurrency(balance)}
                </span>
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
