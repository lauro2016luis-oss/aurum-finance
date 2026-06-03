"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Download, FileText, BarChart3, TrendingUp, Calendar } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { useTheme } from "@/lib/theme-context";
import { useData, Transaction } from "@/lib/data-store";
import { formatCurrency } from "@/lib/utils";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer,
} from "recharts";

// ── helpers ────────────────────────────────────────────────────
function getPeriodRange(period: string): { start: Date; end: Date } {
  const now = new Date();
  const y = now.getFullYear(), m = now.getMonth();

  switch (period) {
    case "Este mês":
      return { start: new Date(y, m, 1), end: new Date(y, m + 1, 0, 23, 59, 59) };
    case "Mês anterior":
      return { start: new Date(y, m - 1, 1), end: new Date(y, m, 0, 23, 59, 59) };
    case "Últimos 3 meses":
      return { start: new Date(y, m - 2, 1), end: new Date(y, m + 1, 0, 23, 59, 59) };
    case "Último semestre":
      return { start: new Date(y, m - 5, 1), end: new Date(y, m + 1, 0, 23, 59, 59) };
    case "Este ano":
      return { start: new Date(y, 0, 1), end: new Date(y, 11, 31, 23, 59, 59) };
    default:
      return { start: new Date(y, m, 1), end: new Date(y, m + 1, 0, 23, 59, 59) };
  }
}

function monthLabel(date: Date) {
  return date.toLocaleDateString("pt-BR", { month: "short" });
}

function downloadCSV(filename: string, rows: string[][]) {
  const csv = rows.map(r => r.map(c => `"${c}"`).join(",")).join("\n");
  const blob = new Blob(["﻿" + csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = filename; a.click();
  URL.revokeObjectURL(url);
}

// ── component ──────────────────────────────────────────────────
const periods = ["Este mês", "Mês anterior", "Últimos 3 meses", "Último semestre", "Este ano"];

export default function RelatoriosPage() {
  const { theme } = useTheme();
  const isLight = theme === "light";
  const { transactions } = useData();
  const [selectedPeriod, setSelectedPeriod] = useState("Este mês");

  const textPrimary  = isLight ? "#1C1A14" : "#FFFFFF";
  const textMuted    = isLight ? "#6B6860" : "#52525B";
  const textDisabled = isLight ? "#9A9588" : "#3F3F46";
  const bgControl    = isLight ? "#F0EEE6" : "#141414";
  const bgActive     = isLight ? "rgba(160,120,10,0.08)" : "rgba(212,175,55,0.1)";
  const borderCtrl   = isLight ? "#E8E6DE" : "#1E1E1E";
  const borderActive = isLight ? "rgba(160,120,10,0.3)" : "rgba(212,175,55,0.3)";
  const goldColor    = isLight ? "#A07810" : "#D4AF37";
  const gridStroke   = isLight ? "#E5E3D8" : "#1E1E1E";
  const tooltipBg    = isLight ? "#FFFFFF" : "#1A1A1A";
  const tooltipBorder = isLight ? "#E8E6DE" : "#262626";

  // ── filtered transactions ──────────────────────────────────
  const { start, end } = getPeriodRange(selectedPeriod);

  const filtered = useMemo(() =>
    transactions.filter((t: Transaction) => {
      const d = new Date(t.date);
      return d >= start && d <= end;
    }),
    [transactions, selectedPeriod]
  );

  const totalIn  = filtered.filter((t: Transaction) => t.type === "income").reduce((s: number, t: Transaction) => s + t.value, 0);
  const totalOut = filtered.filter((t: Transaction) => t.type === "expense").reduce((s: number, t: Transaction) => s + t.value, 0);
  const saldo    = totalIn - totalOut;

  // ── chart data: group by month inside range ────────────────
  const chartData = useMemo(() => {
    const months: Record<string, { receitas: number; despesas: number; saldo: number }> = {};
    const cur = new Date(start.getFullYear(), start.getMonth(), 1);
    while (cur <= end) {
      months[`${cur.getFullYear()}-${cur.getMonth()}`] = { receitas: 0, despesas: 0, saldo: 0 };
      cur.setMonth(cur.getMonth() + 1);
    }
    filtered.forEach((t: Transaction) => {
      const d = new Date(t.date);
      const k = `${d.getFullYear()}-${d.getMonth()}`;
      if (!months[k]) return;
      if (t.type === "income") months[k].receitas += t.value;
      else months[k].despesas += t.value;
    });
    return Object.entries(months).map(([k, v]) => {
      const [yr, mo] = k.split("-").map(Number);
      return { month: monthLabel(new Date(yr, mo, 1)), ...v, saldo: v.receitas - v.despesas };
    });
  }, [filtered, selectedPeriod]);

  // ── category breakdown ─────────────────────────────────────
  const byCategory = useMemo(() => {
    const map: Record<string, number> = {};
    filtered.filter((t: Transaction) => t.type === "expense").forEach((t: Transaction) => {
      map[t.category] = (map[t.category] || 0) + t.value;
    });
    return Object.entries(map).sort((a, b) => b[1] - a[1]);
  }, [filtered]);

  // ── exports ─────────────────────────────────────────────────
  function exportFluxo() {
    const rows = [
      ["Data", "Descrição", "Categoria", "Tipo", "Valor", "Conta"],
      ...filtered.map(t => [
        t.date, t.description, t.category,
        t.type === "income" ? "Receita" : "Despesa",
        t.value.toFixed(2), t.account,
      ]),
    ];
    downloadCSV(`fluxo-caixa-${selectedPeriod.replace(/ /g, "-")}.csv`, rows);
  }

  function exportMensal() {
    const rows = [
      ["Período", selectedPeriod],
      ["Total Receitas", totalIn.toFixed(2)],
      ["Total Despesas", totalOut.toFixed(2)],
      ["Saldo", saldo.toFixed(2)],
      [],
      ["Categoria", "Total"],
      ...byCategory.map(([cat, val]) => [cat, val.toFixed(2)]),
    ];
    downloadCSV(`relatorio-mensal-${selectedPeriod.replace(/ /g, "-")}.csv`, rows);
  }

  function exportAnual() {
    const rows = [
      ["Mês", "Receitas", "Despesas", "Saldo"],
      ...chartData.map(d => [d.month, d.receitas.toFixed(2), d.despesas.toFixed(2), d.saldo.toFixed(2)]),
    ];
    downloadCSV(`relatorio-anual-${selectedPeriod.replace(/ /g, "-")}.csv`, rows);
  }

  function exportCategoria() {
    const rows = [
      ["Categoria", "Total", "% do Total"],
      ...byCategory.map(([cat, val]) => [cat, val.toFixed(2), totalOut > 0 ? ((val / totalOut) * 100).toFixed(1) + "%" : "0%"]),
    ];
    downloadCSV(`por-categoria-${selectedPeriod.replace(/ /g, "-")}.csv`, rows);
  }

  function exportChart() {
    const rows = [
      ["Mês", "Receitas", "Despesas", "Saldo"],
      ...chartData.map(d => [d.month, d.receitas.toFixed(2), d.despesas.toFixed(2), d.saldo.toFixed(2)]),
    ];
    downloadCSV(`grafico-${selectedPeriod.replace(/ /g, "-")}.csv`, rows);
  }

  const reportTypes = [
    { icon: BarChart3,  title: "Fluxo de Caixa",    desc: "Entradas e saídas do período selecionado com análise detalhada",   color: "#D4AF37", formats: [{ label: "CSV", fn: exportFluxo }] },
    { icon: TrendingUp, title: "Relatório Mensal",   desc: "Resumo completo do mês com todas as categorias e comparativos",    color: "#22C55E", formats: [{ label: "CSV", fn: exportMensal }] },
    { icon: FileText,   title: "Relatório Anual",    desc: "Visão anual de receitas, despesas, metas e patrimônio",            color: "#3B82F6", formats: [{ label: "CSV", fn: exportAnual }] },
    { icon: Calendar,   title: "Por Categoria",      desc: "Análise de gastos agrupados por categoria no período",             color: "#F59E0B", formats: [{ label: "CSV", fn: exportCategoria }] },
  ];

  return (
    <div className="flex flex-col min-h-full">
      <Header title="Relatórios" subtitle="Análises" />

      <motion.div
        className="flex-1 p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-6 overflow-y-auto"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {/* Period selector */}
        <div className="flex flex-wrap items-center gap-2">
          {periods.map((p) => {
            const active = p === selectedPeriod;
            return (
              <button
                key={p}
                onClick={() => setSelectedPeriod(p)}
                className="px-4 py-2 rounded-xl text-[12.5px] font-medium transition-all duration-200"
                style={{
                  background: active ? bgActive : bgControl,
                  color: active ? goldColor : textMuted,
                  border: `1px solid ${active ? borderActive : borderCtrl}`,
                  fontFamily: "'Instrument Sans', sans-serif",
                }}
              >
                {p}
              </button>
            );
          })}
        </div>

        {/* Summary chips */}
        <div className="flex flex-wrap gap-3">
          {[
            { label: "Receitas", value: totalIn,  color: "#22C55E" },
            { label: "Despesas", value: totalOut, color: "#EF4444" },
            { label: "Saldo",    value: saldo,    color: saldo >= 0 ? "#22C55E" : "#EF4444" },
          ].map(s => (
            <div key={s.label} className="card-premium px-4 py-3 flex items-center gap-3">
              <div>
                <p className="text-[10px] uppercase tracking-[0.12em] font-bold mb-0.5" style={{ color: textMuted, fontFamily: "'Instrument Sans',sans-serif" }}>{s.label}</p>
                <p className="text-[16px] font-bold leading-none" style={{ color: s.color, fontFamily: "'Instrument Sans',sans-serif", letterSpacing: "-0.02em" }}>{formatCurrency(s.value)}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Chart */}
        <div className="card-premium p-6">
          <div className="flex items-center justify-between mb-5">
            <div>
              <p className="text-[10px] uppercase tracking-wider mb-0.5 font-bold" style={{ color: textMuted, fontFamily: "'Instrument Sans',sans-serif" }}>Visão Geral</p>
              <h3 className="text-[18px] font-bold" style={{ color: textPrimary, fontFamily: "'Instrument Sans', sans-serif", letterSpacing: "-0.02em" }}>
                Receitas vs. Despesas — {selectedPeriod}
              </h3>
            </div>
            <button
              onClick={exportChart}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-[12px] font-medium transition-all"
              style={{ background: bgControl, color: textMuted, border: `1px solid ${borderCtrl}`, fontFamily: "'Instrument Sans',sans-serif" }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = goldColor; }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = textMuted; }}
            >
              <Download size={13} />
              Exportar CSV
            </button>
          </div>

          {chartData.length === 0 ? (
            <div className="h-[220px] flex items-center justify-center text-[13px]" style={{ color: textDisabled }}>
              Nenhuma transação no período
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={chartData} barGap={4}>
                <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} vertical={false} />
                <XAxis dataKey="month" tick={{ fill: textMuted, fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: textMuted, fontSize: 11 }} axisLine={false} tickLine={false}
                  tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} width={36} />
                <Tooltip
                  contentStyle={{ background: tooltipBg, border: `1px solid ${tooltipBorder}`, borderRadius: 12 }}
                  labelStyle={{ color: textMuted, fontSize: 11 }}
                  formatter={(v: any) => formatCurrency(v)}
                />
                <Bar dataKey="receitas" fill="#22C55E" fillOpacity={0.8} radius={[4, 4, 0, 0]} maxBarSize={28} />
                <Bar dataKey="despesas" fill="#EF4444" fillOpacity={0.7} radius={[4, 4, 0, 0]} maxBarSize={28} />
                <Bar dataKey="saldo"    fill="#D4AF37" fillOpacity={0.9} radius={[4, 4, 0, 0]} maxBarSize={28} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Report types */}
        <div>
          <p className="text-[11px] uppercase tracking-wider mb-4 font-bold" style={{ color: textMuted, fontFamily: "'Instrument Sans',sans-serif" }}>Gerar Relatório</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {reportTypes.map((report, i) => {
              const Icon = report.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="card-premium p-5"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ background: `${report.color}15` }}>
                      <Icon size={18} style={{ color: report.color }} />
                    </div>
                  </div>
                  <h4 className="text-[14px] font-bold mb-1" style={{ color: textPrimary, fontFamily: "'Instrument Sans',sans-serif" }}>{report.title}</h4>
                  <p className="text-[12px] mb-3 leading-relaxed" style={{ color: textMuted, fontFamily: "'Instrument Sans',sans-serif" }}>{report.desc}</p>
                  <div className="flex gap-2">
                    {report.formats.map((fmt) => (
                      <button
                        key={fmt.label}
                        onClick={fmt.fn}
                        className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-[11px] font-medium transition-all duration-200"
                        style={{ background: bgControl, color: textMuted, border: `1px solid ${borderCtrl}`, fontFamily: "'Instrument Sans',sans-serif" }}
                        onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = goldColor; (e.currentTarget as HTMLButtonElement).style.borderColor = borderActive; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = textMuted; (e.currentTarget as HTMLButtonElement).style.borderColor = borderCtrl; }}
                      >
                        <Download size={10} />
                        {fmt.label}
                      </button>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
