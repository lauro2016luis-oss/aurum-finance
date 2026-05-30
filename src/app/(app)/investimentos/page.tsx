"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  TrendingUp, TrendingDown, Plus, X, Search,
  ChevronDown, Calendar, DollarSign, Percent,
  Clock, FileText, Building2, Check, Sparkles,
} from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { Header } from "@/components/layout/Header";
import { MetricCard } from "@/components/shared/MetricCard";
import { investments, investmentPortfolioData } from "@/lib/mock-data";
import { formatCurrency, formatPercent } from "@/lib/utils";

/* ─────────────────────────── DATA ─────────────────────────── */

const BANKS = [
  { id: "xp",        name: "XP Investimentos",   color: "#22C55E", abbr: "XP"  },
  { id: "nubank",    name: "Nubank",              color: "#8B5CF6", abbr: "NU"  },
  { id: "inter",     name: "Banco Inter",         color: "#F97316", abbr: "IN"  },
  { id: "itau",      name: "Itaú",                color: "#F59E0B", abbr: "IT"  },
  { id: "bradesco",  name: "Bradesco",            color: "#EF4444", abbr: "BD"  },
  { id: "btg",       name: "BTG Pactual",         color: "#3B82F6", abbr: "BTG" },
  { id: "rico",      name: "Rico",                color: "#10B981", abbr: "RC"  },
  { id: "clear",     name: "Clear",               color: "#D4AF37", abbr: "CL"  },
  { id: "warren",    name: "Warren",              color: "#A78BFA", abbr: "WR"  },
  { id: "modalmais", name: "ModalMais",           color: "#F472B6", abbr: "MM"  },
  { id: "c6",        name: "C6 Bank",             color: "#6B7280", abbr: "C6"  },
  { id: "avenue",    name: "Avenue",              color: "#0EA5E9", abbr: "AV"  },
];

const ASSET_TYPES = [
  { id: "cdb",      label: "CDB",              icon: "🏦", desc: "Certificado de Depósito Bancário" },
  { id: "lci",      label: "LCI",              icon: "🏠", desc: "Letra de Crédito Imobiliário" },
  { id: "lca",      label: "LCA",              icon: "🌾", desc: "Letra de Crédito do Agronegócio" },
  { id: "tesouro",  label: "Tesouro Direto",   icon: "🇧🇷", desc: "Títulos públicos federais" },
  { id: "acoes",    label: "Ações",            icon: "📈", desc: "Renda variável nacional" },
  { id: "fii",      label: "FII",              icon: "🏢", desc: "Fundo de Investimento Imobiliário" },
  { id: "bdr",      label: "BDR",              icon: "🌎", desc: "Brazilian Depositary Receipt" },
  { id: "etf",      label: "ETF",              icon: "📊", desc: "Exchange Traded Fund" },
  { id: "cripto",   label: "Cripto",           icon: "₿",  desc: "Criptoativos" },
  { id: "fundo",    label: "Fundo",            icon: "💼", desc: "Fundos de investimento" },
  { id: "debenture",label: "Debênture",        icon: "📄", desc: "Títulos de dívida corporativa" },
  { id: "poupanca", label: "Poupança",         icon: "🐷", desc: "Caderneta de poupança" },
];

/* ──────────────────── BANK DROPDOWN ────────────────────────── */

function BankDropdown({
  value, onChange,
}: {
  value: string;
  onChange: (name: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState(value);
  const ref = useRef<HTMLDivElement>(null);

  const filtered = BANKS.filter((b) =>
    b.name.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const selected = BANKS.find((b) => b.name === value);

  return (
    <div ref={ref} className="relative">
      <div
        className="input-premium flex items-center gap-2.5 cursor-text"
        onClick={() => setOpen(true)}
        style={{ padding: "0 14px" }}
      >
        {selected && (
          <div
            className="w-6 h-6 rounded-lg flex items-center justify-center text-[9px] font-bold text-black flex-shrink-0"
            style={{ background: selected.color }}
          >
            {selected.abbr}
          </div>
        )}
        <input
          className="flex-1 bg-transparent outline-none text-[13.5px] text-white placeholder:text-[#3F3F46] h-[42px]"
          placeholder="Ex: XP, Inter, Nubank..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            onChange(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
        />
        <Search size={13} className="text-[#3F3F46] flex-shrink-0" />
      </div>

      <AnimatePresence>
        {open && filtered.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full mt-2 left-0 right-0 z-50 rounded-2xl overflow-hidden py-1"
            style={{
              background: "#131313",
              border: "1px solid #262626",
              boxShadow: "0 20px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(212,175,55,0.06)",
            }}
          >
            {filtered.map((bank) => (
              <button
                key={bank.id}
                className="w-full flex items-center gap-3 px-3.5 py-2.5 hover:bg-[#1A1A1A] transition-colors text-left group"
                onClick={() => {
                  setQuery(bank.name);
                  onChange(bank.name);
                  setOpen(false);
                }}
              >
                <div
                  className="w-7 h-7 rounded-xl flex items-center justify-center text-[9px] font-bold text-black flex-shrink-0"
                  style={{ background: bank.color }}
                >
                  {bank.abbr}
                </div>
                <div className="flex-1">
                  <p className="text-[13px] text-white">{bank.name}</p>
                </div>
                {query === bank.name && (
                  <Check size={12} className="text-gold" />
                )}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─────────────────── ASSET TYPE PICKER ──────────────────────── */

function AssetTypePicker({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const selected = ASSET_TYPES.find((t) => t.id === value);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="input-premium w-full flex items-center justify-between gap-2 text-left"
        style={{ padding: "0 14px", height: "42px" }}
      >
        {selected ? (
          <span className="flex items-center gap-2 text-[13.5px] text-white">
            <span>{selected.icon}</span>
            <span>{selected.label}</span>
          </span>
        ) : (
          <span className="text-[13px] text-[#3F3F46]">Selecionar tipo...</span>
        )}
        <ChevronDown
          size={13}
          className="text-[#52525B] transition-transform"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full mt-2 left-0 right-0 z-50 rounded-2xl overflow-hidden p-2"
            style={{
              background: "#131313",
              border: "1px solid #262626",
              boxShadow: "0 20px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(212,175,55,0.06)",
            }}
          >
            <div className="grid grid-cols-2 gap-1">
              {ASSET_TYPES.map((type) => (
                <button
                  key={type.id}
                  onClick={() => { onChange(type.id); setOpen(false); }}
                  className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl transition-all text-left group"
                  style={{
                    background: value === type.id ? "rgba(212,175,55,0.1)" : "transparent",
                    border: value === type.id ? "1px solid rgba(212,175,55,0.2)" : "1px solid transparent",
                  }}
                >
                  <span className="text-[16px]">{type.icon}</span>
                  <div>
                    <p className="text-[12.5px] font-medium" style={{ color: value === type.id ? "#D4AF37" : "#fff" }}>
                      {type.label}
                    </p>
                    <p className="text-[10px] text-[#52525B] leading-none mt-0.5 hidden group-hover:block">
                      {type.desc}
                    </p>
                  </div>
                  {value === type.id && <Check size={11} className="text-gold ml-auto" />}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─────────────────── FORM FIELD ──────────────────────────────── */

function Field({
  label, icon, children, span,
}: {
  label: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  span?: number;
}) {
  return (
    <div style={span ? { gridColumn: `span ${span}` } : {}}>
      <label className="flex items-center gap-1.5 text-[11px] uppercase tracking-[0.1em] text-[#52525B] mb-1.5">
        {icon && <span className="opacity-60">{icon}</span>}
        {label}
      </label>
      {children}
    </div>
  );
}

/* ─────────────────── NOVO ATIVO PANEL ───────────────────────── */

function NovoAtivoPanel({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState({
    nome: "",
    instituicao: "",
    tipo: "",
    dataInicio: new Date().toISOString().split("T")[0],
    capitalInicial: "",
    aporteMenusal: "",
    rentabilidade: "",
    taxaAplicada: "",
    prazo: "",
    observacao: "",
  });

  const set = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [field]: e.target.value }));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 16 }}
      transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="rounded-2xl overflow-hidden"
      style={{
        background: "linear-gradient(145deg, #151515 0%, #111111 100%)",
        border: "1px solid rgba(212,175,55,0.18)",
        boxShadow: "0 0 40px rgba(212,175,55,0.06), 0 20px 60px rgba(0,0,0,0.5)",
      }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-6 py-4"
        style={{
          borderBottom: "1px solid #1C1C1C",
          background: "linear-gradient(90deg, rgba(212,175,55,0.05) 0%, transparent 60%)",
        }}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center"
            style={{ background: "rgba(212,175,55,0.12)", border: "1px solid rgba(212,175,55,0.2)" }}
          >
            <Sparkles size={14} className="text-gold" />
          </div>
          <div>
            <h3
              className="text-[15px] font-light text-white"
              style={{ fontFamily: "'Cormorant SC', serif", letterSpacing: "0.04em" }}
            >
              Novo Investimento
            </h3>
            <p className="text-[11px] text-[#52525B] mt-0.5">Adicionar ativo à carteira</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="w-8 h-8 rounded-xl flex items-center justify-center text-[#3F3F46] hover:text-white hover:bg-[#1A1A1A] transition-all"
        >
          <X size={15} />
        </button>
      </div>

      {/* Body */}
      <div className="p-4 sm:p-6 space-y-4 sm:space-y-5">
        {/* Nome */}
        <Field label="Nome do Ativo" icon={<FileText size={10} />} span={3}>
          <input
            className="input-premium w-full"
            placeholder="Ex.: CDB Banco Inter 110% CDI, PETR4, MXRF11..."
            value={form.nome}
            onChange={set("nome")}
          />
        </Field>

        {/* Row 2 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <Field label="Instituição" icon={<Building2 size={10} />}>
            <BankDropdown
              value={form.instituicao}
              onChange={(v) => setForm((f) => ({ ...f, instituicao: v }))}
            />
          </Field>
          <Field label="Tipo de Ativo">
            <AssetTypePicker
              value={form.tipo}
              onChange={(v) => setForm((f) => ({ ...f, tipo: v }))}
            />
          </Field>
        </div>

        {/* Row 3 — financials */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          <Field label="Capital Inicial" icon={<DollarSign size={10} />}>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[12px] text-[#52525B]">R$</span>
              <input
                className="input-premium w-full pl-9"
                placeholder="0,00"
                value={form.capitalInicial}
                onChange={set("capitalInicial")}
              />
            </div>
          </Field>
          <Field label="Aporte Mensal" icon={<DollarSign size={10} />}>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[12px] text-[#52525B]">R$</span>
              <input
                className="input-premium w-full pl-9"
                placeholder="0,00"
                value={form.aporteMenusal}
                onChange={set("aporteMenusal")}
              />
            </div>
          </Field>
          <Field label="Rentabilidade Anual" icon={<Percent size={10} />}>
            <div className="relative">
              <input
                className="input-premium w-full pr-8"
                placeholder="0,00"
                value={form.rentabilidade}
                onChange={set("rentabilidade")}
              />
              <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[12px] text-[#52525B]">%</span>
            </div>
          </Field>
        </div>

        {/* Row 4 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          <Field label="Data de Início" icon={<Calendar size={10} />}>
            <input
              type="date"
              className="input-premium w-full"
              value={form.dataInicio}
              onChange={set("dataInicio")}
              style={{ colorScheme: "dark" }}
            />
          </Field>
          <Field label="Taxa Aplicada" icon={<Percent size={10} />}>
            <div className="relative">
              <input
                className="input-premium w-full pr-8"
                placeholder="0,00"
                value={form.taxaAplicada}
                onChange={set("taxaAplicada")}
              />
              <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[12px] text-[#52525B]">%</span>
            </div>
          </Field>
          <Field label="Prazo (meses)" icon={<Clock size={10} />}>
            <input
              className="input-premium w-full"
              placeholder="Opcional"
              value={form.prazo}
              onChange={set("prazo")}
            />
          </Field>
        </div>

        {/* Observação */}
        <Field label="Observação" icon={<FileText size={10} />}>
          <textarea
            className="input-premium w-full resize-none"
            placeholder="Opcional — estratégia, motivo, indexador..."
            rows={2}
            value={form.observacao}
            onChange={set("observacao")}
            style={{ paddingTop: "10px", paddingBottom: "10px" }}
          />
        </Field>

        {/* Actions */}
        <div className="flex items-center gap-3 pt-1">
          <button
            onClick={onClose}
            className="btn-ghost flex-1 text-[13px] py-2.5"
          >
            Cancelar
          </button>
          <button
            className="btn-gold flex-1 flex items-center justify-center gap-2 text-[13px] py-2.5"
            style={{ fontFamily: "'Instrument Sans', sans-serif" }}
          >
            <Plus size={14} />
            Criar Investimento
          </button>
        </div>
      </div>
    </motion.div>
  );
}

/* ─────────────────── PAGE ───────────────────────────────────── */

export default function InvestimentosPage() {
  const [showForm, setShowForm] = useState(false);

  const totalInvested = investments.reduce((s, i) => s + i.amount, 0);
  const totalCurrent  = investments.reduce((s, i) => s + i.currentValue, 0);
  const totalProfit   = totalCurrent - totalInvested;
  const totalYield    = ((totalCurrent - totalInvested) / totalInvested) * 100;

  return (
    <div className="flex flex-col min-h-full">
      <Header title="Investimentos" subtitle="Carteira">
        <button
          className="btn-gold flex items-center gap-1.5 text-[12.5px] py-2 px-4"
          onClick={() => setShowForm((v) => !v)}
        >
          <Plus size={14} />
          Novo Ativo
        </button>
      </Header>

      <motion.div
        className="flex-1 p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-6 overflow-y-auto"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {/* Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <MetricCard title="Valor Investido" value={formatCurrency(totalInvested)} subtitle="Aportado total" />
          <MetricCard title="Valor Atual" value={formatCurrency(totalCurrent)} changeValue={totalYield} subtitle="Posição atual" />
          <MetricCard title="Lucro Total" value={formatCurrency(totalProfit)} changeValue={totalYield} subtitle="Valorização" />
          <MetricCard title="Rentabilidade" value={`+${totalYield.toFixed(1)}%`} changeValue={totalYield} subtitle="Total" gold />
        </div>

        {/* NEW ASSET FORM */}
        <AnimatePresence>
          {showForm && (
            <NovoAtivoPanel onClose={() => setShowForm(false)} />
          )}
        </AnimatePresence>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5">
          {/* Portfolio allocation */}
          <div className="card-premium p-6">
            <p className="text-[11px] text-[#52525B] uppercase tracking-wider mb-1">Distribuição</p>
            <h3 className="text-[18px] font-light text-white mb-4" style={{ fontFamily: "'Cormorant SC', serif" }}>
              Carteira
            </h3>
            <div className="relative">
              <ResponsiveContainer width="100%" height={180}>
                <PieChart>
                  <Pie
                    data={investmentPortfolioData}
                    cx="50%" cy="50%"
                    innerRadius={55} outerRadius={78}
                    paddingAngle={2} dataKey="value" strokeWidth={0}
                  >
                    {investmentPortfolioData.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ background: "#1A1A1A", border: "1px solid #262626", borderRadius: 12 }}
                    labelStyle={{ color: "#fff" }}
                    itemStyle={{ color: "#A1A1AA" }}
                    formatter={(v: unknown) => formatCurrency(v as number)}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <p className="text-[10px] text-[#52525B]">Total</p>
                <p className="metric-value text-[16px] text-white font-light">
                  {formatCurrency(totalCurrent, true)}
                </p>
              </div>
            </div>
            <div className="space-y-2 mt-2">
              {investmentPortfolioData.map((item) => (
                <div key={item.name} className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: item.color }} />
                  <span className="text-[12px] text-[#A1A1AA] flex-1">{item.name}</span>
                  <span className="text-[12px] text-[#52525B] font-mono">{item.percentage}%</span>
                  <span className="text-[12px] text-white font-mono">{formatCurrency(item.value, true)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Investments list */}
          <div className="lg:col-span-2 card-premium overflow-hidden overflow-x-auto">
            <div className="p-5 border-b border-[#1A1A1A]">
              <p className="text-[11px] text-[#52525B] uppercase tracking-wider mb-0.5">Posições</p>
              <h3 className="text-[17px] font-light text-white" style={{ fontFamily: "'Cormorant SC', serif" }}>
                Ativos em Carteira
              </h3>
            </div>
            <table className="table-premium">
              <thead>
                <tr>
                  <th className="pl-5">Ativo</th>
                  <th>Tipo</th>
                  <th className="text-right">Investido</th>
                  <th className="text-right">Atual</th>
                  <th className="text-right pr-5">Rendimento</th>
                </tr>
              </thead>
              <tbody>
                {investments.map((inv) => {
                  const profit = inv.currentValue - inv.amount;
                  const isPositive = profit >= 0;
                  return (
                    <tr key={inv.id} className="cursor-pointer">
                      <td className="pl-5">
                        <div>
                          <p className="text-[13.5px] text-white font-medium">{inv.name}</p>
                          <p className="text-[11px] text-[#52525B]">{inv.category}</p>
                        </div>
                      </td>
                      <td>
                        <span className="badge badge-neutral">{inv.type}</span>
                      </td>
                      <td className="text-right">
                        <span className="metric-value text-[13px] text-[#52525B]">
                          {formatCurrency(inv.amount)}
                        </span>
                      </td>
                      <td className="text-right">
                        <span className="metric-value text-[13px] text-white">
                          {formatCurrency(inv.currentValue)}
                        </span>
                      </td>
                      <td className="text-right pr-5">
                        <div className="flex items-center justify-end gap-1">
                          {isPositive
                            ? <TrendingUp size={12} className="text-success" />
                            : <TrendingDown size={12} className="text-error" />}
                          <span
                            className="metric-value text-[13px] font-medium"
                            style={{ color: isPositive ? "#22C55E" : "#EF4444" }}
                          >
                            +{inv.yield.toFixed(1)}%
                          </span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
