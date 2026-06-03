"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Wallet, TrendingUp, TrendingDown, AlertCircle,
  ChevronRight, ArrowUpRight, ArrowDownRight,
  Shield, CreditCard, Target, BarChart2,
  RefreshCcw, Landmark, CheckCircle2, Clock, XCircle,
} from "lucide-react";
import { Header } from "@/components/layout/Header";
import { MetricCard } from "@/components/shared/MetricCard";
import { CashFlowChart } from "@/components/dashboard/CashFlowChart";
import { useData, FixedExpense } from "@/lib/data-store";
import { formatCurrency } from "@/lib/utils";
import { useNav } from "@/lib/nav-context";
import { useTheme } from "@/lib/theme-context";

/* ── animation presets ─────────────────────────────────── */
const stagger = { hidden:{opacity:0}, show:{opacity:1, transition:{staggerChildren:0.06}} };
const fadeUp  = { hidden:{opacity:0,y:16}, show:{opacity:1,y:0,transition:{duration:0.42,ease:[0.25,0.46,0.45,0.94]}} };

/* ── section header ─────────────────────────────────────── */
function SectionHead({ label, title, href, cta="Gerenciar", isLight }:{label:string;title:string;href:string;cta?:string;isLight:boolean}) {
  return (
    <div className="flex items-end justify-between mb-4">
      <div>
        <p className="text-[10px] uppercase tracking-[0.16em] mb-1"
          style={{color: isLight ? "#A07810" : "#D4AF37", fontFamily:"'Instrument Sans',sans-serif", fontWeight: 600}}>{label}</p>
        <h2 className="text-[18px] leading-none"
          style={{fontFamily:"'Instrument Sans',sans-serif", fontWeight: isLight ? 700 : 400, letterSpacing: "-0.01em", color: isLight ? "#1C1A14" : "#FFFFFF"}}>{title}</h2>
      </div>
      <Link href={href} className="flex items-center gap-1 text-[11.5px] transition-colors"
        style={{color: isLight ? "#6B6860" : "#52525B", fontFamily:"'Instrument Sans',sans-serif"}}>
        {cta} <ChevronRight size={12} />
      </Link>
    </div>
  );
}

/* ── blur wrapper ───────────────────────────────────────── */
function Blurred({hide, children, className=""}:{hide:boolean;children:React.ReactNode;className?:string}) {
  return (
    <span className={className} style={{filter:hide?"blur(7px)":"none",userSelect:hide?"none":"auto",transition:"filter 0.3s"}}>
      {children}
    </span>
  );
}

/* ── status badge ───────────────────────────────────────── */
const STATUS_CFG = {
  paid:    {label:"Pago",     icon:CheckCircle2, color:"#22C55E", bg:"rgba(34,197,94,0.1)"},
  pending: {label:"Pendente", icon:Clock,        color:"#F59E0B", bg:"rgba(245,158,11,0.1)"},
  overdue: {label:"Vencida",  icon:XCircle,      color:"#EF4444", bg:"rgba(239,68,68,0.1)"},
};

/* ── thin progress bar ──────────────────────────────────── */
function ProgressBar({pct, color="#D4AF37", h=4, isLight}:{pct:number;color?:string;h?:number;isLight:boolean}) {
  return (
    <div className="w-full rounded-full overflow-hidden" style={{height:h, background: isLight ? "#E5E3D8" : "#1A1A1A"}}>
      <motion.div className="h-full rounded-full"
        style={{background:`linear-gradient(90deg,${color}80,${color})`}}
        initial={{width:"0%"}} animate={{width:`${Math.min(pct,100)}%`}}
        transition={{duration:1.1,ease:"easeOut"}} />
    </div>
  );
}

/* ══════════════════════════════════════════════════════════ */
export default function DashboardPage() {
  const {
    transactions, fixedExpenses, creditCards,
    bankAccounts, financialGoals, investments,
    subscriptions, reserve, getExpenseStatus,
  } = useData();
  const now = new Date();
  const monthKey = `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,"0")}`;
  const { hideValues } = useNav();
  const { theme } = useTheme();
  const isLight = theme === "light";

  /* theme-derived shortcuts */
  const textPrimary   = isLight ? "#1C1A14" : "#FFFFFF";
  const textSecondary = isLight ? "#3D3B32" : "#A1A1AA";
  const textMuted     = isLight ? "#6B6860" : "#52525B";
  const textDisabled  = isLight ? "#A8A598" : "#3F3F46";
  const bgRow         = isLight ? "#F7F5EF" : "#141414";
  const bgRowHover    = isLight ? "rgba(0,0,0,0.025)" : "rgba(255,255,255,0.015)";
  const borderColor   = isLight ? "#DDD9CC" : "#1A1A1A";
  const borderThin    = isLight ? "#DDD9CC" : "#141414";
  const bgIcon        = isLight ? "#EEECe4" : "#1A1A1A";
  const gold          = isLight ? "#A07810" : "#D4AF37";

  /* ── derived metrics ──────────────────────────────────── */
  const incomes   = transactions.filter(t => t.value > 0);
  const expenses  = transactions.filter(t => t.value < 0);
  const totalIn   = incomes.reduce((s,t) => s+t.value, 0);
  const totalOut  = Math.abs(expenses.reduce((s,t) => s+t.value, 0));
  const saldo     = totalIn - totalOut;

  const pendingFE = fixedExpenses.filter(f => getExpenseStatus(f, monthKey) !== "paid" && f.active);
  const faltaPagar = pendingFE.reduce((s,f) => s+f.value, 0)
    + creditCards.reduce((s,c) => s+c.used, 0);

  const totalInvested = investments.reduce((s,i) => s+i.amount, 0);
  const totalCurrentInv = investments.reduce((s,i) => s+i.currentValue, 0);
  const totalBank = bankAccounts.reduce((s,b) => s+b.balance, 0);
  const patrimonio = totalBank + totalCurrentInv + reserve;

  const activeSubTotal = subscriptions.filter(s=>s.status==="active").reduce((s,sub)=>s+sub.price,0);

  const fixedTotal   = fixedExpenses.filter(f=>f.active).reduce((s,f)=>s+f.value,0);
  const fixedPaid    = fixedExpenses.filter(f=>f.status==="paid"&&f.active).reduce((s,f)=>s+f.value,0);
  const fixedPending = fixedExpenses.filter(f=>f.status==="pending"&&f.active).reduce((s,f)=>s+f.value,0);
  const fixedOverdue = fixedExpenses.filter(f=>f.status==="overdue"&&f.active).reduce((s,f)=>s+f.value,0);

  const CARD_COLORS: Record<string,string> = {
    Nubank:"#8B5CF6",Itaú:"#F59E0B",Inter:"#F97316","XP Investimentos":"#22C55E",
    Bradesco:"#EF4444",BTG:"#3B82F6","C6 Bank":"#6B7280",Warren:"#A78BFA",
    Santander:"#DC2626","Banco do Brasil":"#FACC15",Outros: gold,
  };

  return (
    <div className="flex flex-col min-h-full">
      <Header title="Dashboard" subtitle="Visão Geral" />

      <motion.div
        className="flex-1 p-4 sm:p-6 lg:p-8 space-y-8 overflow-y-auto"
        variants={stagger} initial="hidden" animate="show"
      >

        {/* ═══════════ 0 — RESULTADO DO MÊS (light only) ══ */}
        {isLight && (
          <motion.div variants={fadeUp}>
            <motion.div
              className="rounded-2xl px-5 py-4 flex items-center justify-between gap-4"
              style={{
                background: saldo > 0
                  ? "linear-gradient(135deg, rgba(34,197,94,0.07) 0%, rgba(22,163,74,0.04) 100%)"
                  : "linear-gradient(135deg, rgba(239,68,68,0.06) 0%, rgba(220,38,38,0.03) 100%)",
                border: `1px solid ${saldo > 0 ? "rgba(34,197,94,0.22)" : "rgba(239,68,68,0.18)"}`,
                boxShadow: saldo > 0
                  ? "0 2px 16px rgba(34,197,94,0.07)"
                  : "0 2px 16px rgba(239,68,68,0.06)",
              }}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: saldo > 0 ? "rgba(34,197,94,0.12)" : "rgba(239,68,68,0.1)" }}>
                  {saldo > 0
                    ? <ArrowUpRight size={16} style={{ color: "#16A34A" }} />
                    : <ArrowDownRight size={16} style={{ color: "#DC2626" }} />
                  }
                </div>
                <div className="min-w-0">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.12em] leading-none mb-1"
                    style={{ color: saldo > 0 ? "#15803D" : "#B91C1C", fontFamily: "'Instrument Sans',sans-serif" }}>
                    {saldo > 0 ? "✓ Você está no lucro este mês" : "↓ Atenção: despesas maiores que receitas"}
                  </p>
                  <Blurred hide={hideValues}>
                    <p className="metric-value text-[26px] sm:text-[30px] leading-none font-bold"
                      style={{ color: saldo > 0 ? "#15803D" : "#DC2626", letterSpacing: "-0.04em" }}>
                      {formatCurrency(Math.abs(saldo))}
                    </p>
                  </Blurred>
                </div>
              </div>
              {totalIn > 0 && (
                <div className="text-right flex-shrink-0 hidden sm:block">
                  <p className="text-[10px] uppercase tracking-[0.14em] font-semibold mb-1"
                    style={{ color: saldo > 0 ? "#15803D" : "#B91C1C", fontFamily: "'Instrument Sans',sans-serif", opacity: 0.7 }}>
                    Margem
                  </p>
                  <p className="metric-value text-[22px] font-bold"
                    style={{ color: saldo > 0 ? "#16A34A" : "#DC2626", letterSpacing: "-0.03em" }}>
                    {totalIn > 0 ? ((saldo / totalIn) * 100).toFixed(1) : "0.0"}%
                  </p>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}

        {/* ═══════════ 1 — MÉTRICAS PRINCIPAIS ═══════════ */}
        <motion.div variants={fadeUp}>
          <div className="flex gap-3 overflow-x-auto pb-1 sm:pb-0 sm:grid sm:grid-cols-3 lg:grid-cols-5 sm:gap-4 scrollbar-none">
            {[
              { title:"Total Recebido",   value:formatCurrency(totalIn),      icon:<TrendingUp size={14}/>,   subtitle:"Entradas no período",    changeValue:8.2 },
              { title:"Total Gasto",      value:formatCurrency(totalOut),     icon:<TrendingDown size={14}/>, subtitle:"Fixos + variáveis",       changeValue:-3.1 },
              { title:"Saldo Disponível", value:formatCurrency(saldo),        icon:<Wallet size={14}/>,       subtitle:"Receitas − despesas",     changeValue:saldo>0?1:-1 },
              { title:"Falta Pagar",      value:formatCurrency(faltaPagar),   icon:<AlertCircle size={14}/>,  subtitle:"Pendentes + fatura",      changeValue:-1 },
            ].map(m => (
              <div key={m.title} className="flex-shrink-0 w-[160px] sm:w-auto">
                <MetricCard {...m} />
              </div>
            ))}
            <div className="flex-shrink-0 w-[160px] sm:w-auto">
              <MetricCard title="Patrimônio Total" value={formatCurrency(patrimonio)} changeValue={2.8} icon={<BarChart2 size={14}/>} subtitle="Contas + inv. + reserva" gold />
            </div>
          </div>
        </motion.div>

        {/* ═══════════ 2 — FLUXO DO MÊS ════════════════ */}
        <motion.div variants={fadeUp}>
          <SectionHead label="Financeiro" title="Fluxo de Caixa" href="/receitas" cta="Ver fluxo" isLight={isLight} />
          <CashFlowChart />
        </motion.div>

        {/* ═══════════ 3+4 — GASTOS FIXOS + CARTÕES ════ */}
        <motion.div variants={fadeUp} className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">

          {/* GASTOS FIXOS */}
          <div>
            <SectionHead label="Recorrências" title="Gastos Fixos do Mês" href="/gastos-fixos" isLight={isLight} />
            <div className="card-premium overflow-hidden">
              {/* summary strip */}
              <div className="grid grid-cols-3" style={{borderBottom:`1px solid ${borderColor}`}}>
                {[
                  {l:"Total",    v:fixedTotal,   c: textSecondary},
                  {l:"Próximas", v:fixedPending, c:"#F59E0B"},
                  {l:"Vencidas", v:fixedOverdue, c:"#EF4444"},
                ].map((s,i)=>(
                  <div key={s.l} className="p-3 text-center" style={{borderRight: i<2 ? `1px solid ${borderColor}` : "none"}}>
                    <p className="text-[9.5px] uppercase tracking-wider mb-1" style={{color:textMuted,fontFamily:"'Instrument Sans',sans-serif"}}>{s.l}</p>
                    <Blurred hide={hideValues}>
                      <p className="metric-value text-[14px]" style={{color:s.c}}>{formatCurrency(s.v)}</p>
                    </Blurred>
                  </div>
                ))}
              </div>
              {/* rows */}
              <div>
                {fixedExpenses.filter(f=>f.active).slice(0,6).map(fe=>{
                  const cfg = STATUS_CFG[getExpenseStatus(fe, monthKey)] || STATUS_CFG.pending;
                  const Icon = cfg.icon;
                  return (
                    <div key={fe.id} className="flex items-center justify-between px-4 py-3 transition-colors"
                      style={{borderBottom:`1px solid ${borderThin}`}}
                      onMouseEnter={e=>(e.currentTarget as HTMLDivElement).style.background=bgRowHover}
                      onMouseLeave={e=>(e.currentTarget as HTMLDivElement).style.background="transparent"}>
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0" style={{background:bgIcon}}>
                          <Icon size={13} style={{color:cfg.color}} />
                        </div>
                        <div className="min-w-0">
                          <p className="text-[13px] truncate" style={{color:textPrimary}}>{fe.name}</p>
                          <p className="text-[10.5px]" style={{color:textMuted,fontFamily:"'Instrument Sans',sans-serif"}}>{fe.category} · dia {fe.dueDay}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 flex-shrink-0 ml-3">
                        <Blurred hide={hideValues}>
                          <span className="metric-value text-[13px]" style={{color:textPrimary}}>{formatCurrency(fe.value)}</span>
                        </Blurred>
                        <span className="text-[10px] px-2 py-0.5 rounded-full" style={{background:cfg.bg,color:cfg.color,fontFamily:"'Instrument Sans',sans-serif"}}>{cfg.label}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
              {fixedExpenses.filter(f=>f.active).length > 6 && (
                <div className="px-4 py-2.5" style={{borderTop:`1px solid ${borderThin}`}}>
                  <Link href="/gastos-fixos" className="text-[11.5px] transition-colors flex items-center gap-1"
                    style={{color:textMuted,fontFamily:"'Instrument Sans',sans-serif"}}>
                    Ver todos ({fixedExpenses.filter(f=>f.active).length}) <ChevronRight size={11}/>
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* CARTÕES */}
          <div>
            <SectionHead label="Crédito" title="Seus Cartões" href="/cartoes" isLight={isLight} />
            <div className="space-y-3">
              {creditCards.slice(0,3).map(card=>{
                const color = CARD_COLORS[card.bank] || card.color || gold;
                const usagePct = (card.used/card.limit)*100;
                return (
                  <div key={card.id} className="card-premium p-4"
                    style={{borderLeft:`3px solid ${color}50`}}>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{background:`${color}15`}}>
                          <CreditCard size={14} style={{color}} />
                        </div>
                        <div>
                          <p className="text-[13px] font-medium" style={{color:textPrimary}}>{card.name}</p>
                          <p className="text-[10.5px]" style={{color:textMuted,fontFamily:"'Instrument Sans',sans-serif"}}>
                            {card.bank} · •••• {card.lastFour}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Blurred hide={hideValues}>
                          <p className="metric-value text-[15px]" style={{color:usagePct>80?"#EF4444":textPrimary}}>{formatCurrency(card.used)}</p>
                        </Blurred>
                        <p className="text-[10px]" style={{color:textMuted,fontFamily:"'Instrument Sans',sans-serif"}}>de {formatCurrency(card.limit)}</p>
                      </div>
                    </div>
                    <ProgressBar pct={usagePct} color={usagePct>80?"#EF4444":color} isLight={isLight} />
                    <div className="flex justify-between mt-1.5 text-[10px]" style={{color:textDisabled,fontFamily:"'Instrument Sans',sans-serif"}}>
                      <span>{usagePct.toFixed(0)}% utilizado</span>
                      <span>Vence dia {card.dueDay} · Fecha dia {card.closingDay}</span>
                    </div>
                  </div>
                );
              })}
              {creditCards.length === 0 && (
                <div className="card-premium p-8 text-center text-[13px]" style={{color:textMuted}}>Nenhum cartão cadastrado</div>
              )}
            </div>
          </div>
        </motion.div>

        {/* ═══════════ 5 — COFRINHOS ════════════════════ */}
        <motion.div variants={fadeUp}>
          <SectionHead label="Poupança" title="Cofrinhos & Metas" href="/metas" isLight={isLight} />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

            {/* Reserva */}
            <div className="card-gold p-5">
              <div className="flex items-center gap-2.5 mb-3">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                  style={{background: isLight ? "rgba(160,120,10,0.1)" : "rgba(212,175,55,0.12)"}}>
                  <Shield size={16} style={{color: gold}} />
                </div>
                <div>
                  <p className="text-[13px] font-medium" style={{color:textPrimary}}>Reserva de Emergência</p>
                  <p className="text-[10.5px]" style={{color:textMuted,fontFamily:"'Instrument Sans',sans-serif"}}>Segurança financeira</p>
                </div>
              </div>
              <Blurred hide={hideValues}>
                <p className="metric-value text-[24px] text-gold-gradient font-light mb-0.5">{formatCurrency(reserve)}</p>
              </Blurred>
              <p className="text-[10.5px] mb-3" style={{color:textMuted,fontFamily:"'Instrument Sans',sans-serif"}}>
                de {formatCurrency(60000)} · {((reserve/60000)*100).toFixed(0)}%
              </p>
              <ProgressBar pct={(reserve/60000)*100} isLight={isLight} />
            </div>

            {/* Goals */}
            {financialGoals.slice(0,5).map(goal=>{
              const pct = (goal.current/goal.target)*100;
              return (
                <div key={goal.id} className="card-premium p-5">
                  <div className="flex items-center gap-2.5 mb-3">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center text-xl"
                      style={{background: bgIcon}}>{goal.icon}</div>
                    <div className="min-w-0">
                      <p className="text-[13px] font-medium truncate" style={{color:textPrimary}}>{goal.name}</p>
                      <p className="text-[10.5px]" style={{color:textMuted,fontFamily:"'Instrument Sans',sans-serif"}}>{goal.category}</p>
                    </div>
                    <span className="ml-auto metric-value text-[14px]" style={{color:pct>=100?"#22C55E":gold}}>{pct.toFixed(0)}%</span>
                  </div>
                  <Blurred hide={hideValues}>
                    <p className="metric-value text-[20px] font-light mb-0.5" style={{color:textPrimary}}>{formatCurrency(goal.current)}</p>
                  </Blurred>
                  <p className="text-[10.5px] mb-3" style={{color:textMuted,fontFamily:"'Instrument Sans',sans-serif"}}>
                    de {formatCurrency(goal.target)}
                  </p>
                  <ProgressBar pct={pct} color={pct>=100?"#22C55E":gold} isLight={isLight} />
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* ═══════════ 6 — INVESTIMENTOS ════════════════ */}
        <motion.div variants={fadeUp}>
          <SectionHead label="Carteira" title="Seus Investimentos" href="/investimentos" isLight={isLight} />
          <div className="card-premium overflow-hidden">
            {/* summary */}
            <div className="grid grid-cols-2 sm:grid-cols-4" style={{borderBottom:`1px solid ${borderColor}`}}>
              {[
                {l:"Total Investido",  v:formatCurrency(totalInvested),    c:textSecondary},
                {l:"Valor Atual",      v:formatCurrency(totalCurrentInv),  c:textPrimary},
                {l:"Rentabilidade",    v:`+${(((totalCurrentInv-totalInvested)/totalInvested||0)*100).toFixed(1)}%`, c:"#22C55E"},
                {l:"Lucro",            v:formatCurrency(totalCurrentInv-totalInvested), c: gold},
              ].map((s,i)=>(
                <div key={s.l} className="p-4 text-center" style={{borderRight: i<3 ? `1px solid ${borderColor}` : "none"}}>
                  <p className="text-[9.5px] uppercase tracking-wider mb-1.5" style={{color:textMuted,fontFamily:"'Instrument Sans',sans-serif"}}>{s.l}</p>
                  <Blurred hide={hideValues}>
                    <p className="metric-value text-[15px]" style={{color:s.c}}>{s.v}</p>
                  </Blurred>
                </div>
              ))}
            </div>
            {/* list */}
            <div>
              {investments.slice(0,5).map(inv=>{
                const gain = inv.currentValue - inv.amount;
                const isPos = gain >= 0;
                return (
                  <div key={inv.id} className="flex items-center justify-between px-5 py-3.5 transition-colors"
                    style={{borderBottom:`1px solid ${borderThin}`}}
                    onMouseEnter={e=>(e.currentTarget as HTMLDivElement).style.background=bgRowHover}
                    onMouseLeave={e=>(e.currentTarget as HTMLDivElement).style.background="transparent"}>
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{background: isLight ? "rgba(160,120,10,0.08)" : "rgba(212,175,55,0.08)", border:`1px solid ${isLight?"rgba(160,120,10,0.15)":"rgba(212,175,55,0.15)"}`}}>
                        <BarChart2 size={13} style={{color: gold}} />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[13px] truncate" style={{color:textPrimary}}>{inv.name}</p>
                        <p className="text-[10.5px]" style={{color:textMuted,fontFamily:"'Instrument Sans',sans-serif"}}>{inv.type} · {inv.category}</p>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0 ml-4">
                      <Blurred hide={hideValues}>
                        <p className="metric-value text-[14px]" style={{color:textPrimary}}>{formatCurrency(inv.currentValue)}</p>
                      </Blurred>
                      <p className="text-[10.5px]" style={{color:isPos?"#22C55E":"#EF4444",fontFamily:"'Instrument Sans',sans-serif"}}>
                        {isPos?"+":""}{inv.yield}% ao ano
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
            {investments.length > 5 && (
              <div className="px-5 py-3" style={{borderTop:`1px solid ${borderThin}`}}>
                <Link href="/investimentos" className="text-[11.5px] transition-colors flex items-center gap-1"
                  style={{color:textMuted,fontFamily:"'Instrument Sans',sans-serif"}}>
                  Ver todos ({investments.length}) <ChevronRight size={11}/>
                </Link>
              </div>
            )}
          </div>
        </motion.div>

        {/* ═══════════ 7+8 — TRANSAÇÕES + ASSINATURAS ══ */}
        <motion.div variants={fadeUp} className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8">

          {/* ÚLTIMAS TRANSAÇÕES */}
          <div className="lg:col-span-3">
            <SectionHead label="Fluxo" title="Últimas Transações" href="/receitas" cta="Ver todas" isLight={isLight} />
            <div className="card-premium overflow-hidden">
              <div>
                {transactions.slice(0,7).map(tx=>{
                  const isIn = tx.value > 0;
                  return (
                    <div key={tx.id} className="flex items-center justify-between px-4 py-3.5 transition-colors"
                      style={{borderBottom:`1px solid ${borderThin}`}}
                      onMouseEnter={e=>(e.currentTarget as HTMLDivElement).style.background=bgRowHover}
                      onMouseLeave={e=>(e.currentTarget as HTMLDivElement).style.background="transparent"}>
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
                          style={{background:isIn?"rgba(34,197,94,0.08)":"rgba(239,68,68,0.06)"}}>
                          {isIn ? <ArrowUpRight size={13} style={{color:"#22C55E"}}/> : <ArrowDownRight size={13} style={{color:"#EF4444"}}/>}
                        </div>
                        <div className="min-w-0">
                          <p className="text-[13px] truncate" style={{color:textPrimary}}>{tx.description}</p>
                          <p className="text-[10.5px]" style={{color:textMuted,fontFamily:"'Instrument Sans',sans-serif"}}>{tx.category} · {tx.date}</p>
                        </div>
                      </div>
                      <Blurred hide={hideValues} className="flex-shrink-0 ml-3">
                        <span className="metric-value text-[13px]" style={{color:isIn?"#22C55E":textSecondary}}>
                          {isIn?"+":"−"}{formatCurrency(Math.abs(tx.value))}
                        </span>
                      </Blurred>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ASSINATURAS */}
          <div className="lg:col-span-2">
            <SectionHead label="Recorrências" title="Assinaturas" href="/assinaturas" isLight={isLight} />
            <div className="card-premium overflow-hidden">
              <div className="px-4 py-3 flex justify-between items-center" style={{borderBottom:`1px solid ${borderColor}`}}>
                <span className="text-[10.5px]" style={{color:textMuted,fontFamily:"'Instrument Sans',sans-serif"}}>Total mensal</span>
                <Blurred hide={hideValues}>
                  <span className="metric-value text-[15px]" style={{color:gold}}>{formatCurrency(activeSubTotal)}</span>
                </Blurred>
              </div>
              <div>
                {subscriptions.filter(s=>s.status==="active").slice(0,6).map(sub=>(
                  <div key={sub.id} className="flex items-center justify-between px-4 py-3 transition-colors"
                    style={{borderBottom:`1px solid ${borderThin}`}}
                    onMouseEnter={e=>(e.currentTarget as HTMLDivElement).style.background=bgRowHover}
                    onMouseLeave={e=>(e.currentTarget as HTMLDivElement).style.background="transparent"}>
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg flex items-center justify-center text-[12px] font-bold"
                        style={{background: isLight ? "rgba(160,120,10,0.1)" : "rgba(212,175,55,0.08)", color: gold}}>
                        {sub.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-[12.5px]" style={{color:textPrimary}}>{sub.name}</p>
                        <p className="text-[10px]" style={{color:textMuted,fontFamily:"'Instrument Sans',sans-serif"}}>{sub.category} · dia {sub.billingDay}</p>
                      </div>
                    </div>
                    <Blurred hide={hideValues}>
                      <span className="metric-value text-[12.5px]" style={{color:textPrimary}}>{formatCurrency(sub.price)}</span>
                    </Blurred>
                  </div>
                ))}
                {subscriptions.filter(s=>s.status==="active").length === 0 && (
                  <div className="p-8 text-center text-[12px]" style={{color:textMuted}}>Nenhuma assinatura ativa</div>
                )}
              </div>
            </div>

            {/* Contas bancárias mini */}
            <div className="mt-6">
              <SectionHead label="Contas" title="Saldo Bancário" href="/contas" isLight={isLight} />
              <div className="card-premium overflow-hidden">
                <div className="px-4 py-3 flex justify-between items-center" style={{borderBottom:`1px solid ${borderColor}`}}>
                  <span className="text-[10.5px]" style={{color:textMuted,fontFamily:"'Instrument Sans',sans-serif"}}>Consolidado</span>
                  <Blurred hide={hideValues}>
                    <span className="metric-value text-[15px]" style={{color:gold}}>{formatCurrency(totalBank)}</span>
                  </Blurred>
                </div>
                <div>
                  {bankAccounts.slice(0,4).map(acc=>{
                    const color = CARD_COLORS[acc.bank] || gold;
                    return (
                      <div key={acc.id} className="flex items-center justify-between px-4 py-3 transition-colors"
                        style={{borderBottom:`1px solid ${borderThin}`}}
                        onMouseEnter={e=>(e.currentTarget as HTMLDivElement).style.background=bgRowHover}
                        onMouseLeave={e=>(e.currentTarget as HTMLDivElement).style.background="transparent"}>
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{background:`${color}15`}}>
                            <Landmark size={12} style={{color}} />
                          </div>
                          <div>
                            <p className="text-[12.5px]" style={{color:textPrimary}}>{acc.bank}</p>
                            <p className="text-[10px]" style={{color:textMuted,fontFamily:"'Instrument Sans',sans-serif"}}>{acc.type}</p>
                          </div>
                        </div>
                        <Blurred hide={hideValues}>
                          <span className="metric-value text-[12.5px]" style={{color:textPrimary}}>{formatCurrency(acc.balance)}</span>
                        </Blurred>
                      </div>
                    );
                  })}
                  {bankAccounts.length === 0 && (
                    <div className="p-6 text-center text-[12px]" style={{color:textMuted}}>Nenhuma conta cadastrada</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* bottom padding for mobile nav */}
        <div className="h-2" />
      </motion.div>
    </div>
  );
}
