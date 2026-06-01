"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Landmark, Plus, Trash2, ArrowDownLeft, ArrowUpRight, Pencil } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Modal } from "@/components/shared/Modal";
import { useData } from "@/lib/data-store";
import { formatCurrency } from "@/lib/utils";

const BANK_COLORS: Record<string,string> = {
  Nubank:"#8B5CF6", Itaú:"#F59E0B", Inter:"#F97316", "XP Investimentos":"#22C55E",
  Bradesco:"#EF4444", BTG:"#3B82F6", "C6 Bank":"#6B7280", Warren:"#A78BFA",
};
const ACCOUNT_TYPES = ["Conta Corrente","Conta Poupança","Conta Digital","Conta Investimento","Conta Salário"];
const BANKS = ["Nubank","Itaú","Inter","XP Investimentos","Bradesco","BTG","C6 Bank","Warren","ModalMais"];

type MovModal = { id: string; bank: string; balance: number; mode: "deposit" | "withdraw" | "edit" };

export default function ContasPage() {
  const { bankAccounts, addBankAccount, updateBankAccount, deleteBankAccount } = useData();
  const [showAdd, setShowAdd] = useState(false);
  const [movModal, setMovModal] = useState<MovModal | null>(null);
  const [form, setForm] = useState({ bank:"Nubank", type:"Conta Corrente", balance:"", agency:"0001", account:"" });
  const [movValue, setMovValue] = useState("");
  const [newBalance, setNewBalance] = useState("");

  const total = bankAccounts.reduce((s,a) => s + a.balance, 0);

  const handleAdd = () => {
    const b = parseFloat(form.balance.replace(",","."));
    if (!form.account || isNaN(b)) return;
    addBankAccount({
      bank: form.bank, type: form.type, balance: b,
      agency: form.agency, account: form.account,
      color: BANK_COLORS[form.bank] || "#D4AF37",
    });
    setForm({ bank:"Nubank", type:"Conta Corrente", balance:"", agency:"0001", account:"" });
    setShowAdd(false);
  };

  const handleMovimento = () => {
    if (!movModal) return;
    if (movModal.mode === "edit") {
      const v = parseFloat(newBalance.replace(",","."));
      if (!isNaN(v)) updateBankAccount(movModal.id, { balance: v });
    } else {
      const v = parseFloat(movValue.replace(",","."));
      if (isNaN(v) || v <= 0) return;
      const delta = movModal.mode === "deposit" ? v : -v;
      updateBankAccount(movModal.id, { balance: Math.max(0, movModal.balance + delta) });
    }
    setMovModal(null);
    setMovValue("");
    setNewBalance("");
  };

  const openMov = (id: string, bank: string, balance: number, mode: MovModal["mode"]) => {
    setMovModal({ id, bank, balance, mode });
    setMovValue("");
    setNewBalance(balance.toFixed(2).replace(".",","));
  };

  return (
    <div className="flex flex-col min-h-full">
      <Header title="Contas Bancárias" subtitle="Bancos">
        <button onClick={() => setShowAdd(true)} className="btn-gold flex items-center gap-1.5 text-[12.5px] py-2 px-4">
          <Plus size={14} /> Adicionar Conta
        </button>
      </Header>

      <motion.div className="flex-1 p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-6 overflow-y-auto"
        initial={{ opacity:0,y:12 }} animate={{ opacity:1,y:0 }} transition={{ duration:0.4 }}>

        {/* Saldo consolidado */}
        <div className="card-gold p-6">
          <p className="text-[11px] text-[#52525B] uppercase tracking-wider mb-2">Saldo Consolidado</p>
          <p className="metric-value text-[40px] sm:text-[48px] text-gold-gradient font-light leading-none">{formatCurrency(total)}</p>
          <p className="text-[13px] text-[#52525B] mt-2">{bankAccounts.length} contas ativas</p>
        </div>

        {/* Cards das contas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
          <AnimatePresence>
            {bankAccounts.map((account, i) => {
              const color = BANK_COLORS[account.bank] || "#D4AF37";
              return (
                <motion.div key={account.id} initial={{ opacity:0,y:20 }} animate={{ opacity:1,y:0 }}
                  exit={{ opacity:0,scale:0.95 }} transition={{ delay:i*0.06 }}
                  className="card-premium p-6 group" style={{ borderLeft:`3px solid ${color}40` }}>

                  {/* Header do card */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background:`${color}12` }}>
                        <Landmark size={18} style={{ color }} />
                      </div>
                      <div>
                        <h4 className="text-[15px] font-medium text-white">{account.bank}</h4>
                        <p className="text-[11px] text-[#52525B]">{account.type}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full mr-1" style={{ background:color, boxShadow:`0 0 6px ${color}80` }} />
                      {/* Editar saldo */}
                      <button onClick={() => openMov(account.id, account.bank, account.balance, "edit")}
                        className="opacity-0 group-hover:opacity-100 w-7 h-7 flex items-center justify-center rounded-lg hover:bg-[#1A1A1A] text-[#52525B] hover:text-[#D4AF37] transition-all">
                        <Pencil size={12} />
                      </button>
                      {/* Deletar */}
                      <button onClick={() => deleteBankAccount(account.id)}
                        className="opacity-0 group-hover:opacity-100 w-7 h-7 flex items-center justify-center rounded-lg hover:bg-red-500/10 text-[#3F3F46] hover:text-red-400 transition-all">
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>

                  {/* Saldo */}
                  <p className="metric-value text-[28px] font-light text-white mb-1">{formatCurrency(account.balance)}</p>

                  {/* Ag / Cc */}
                  <div className="flex gap-4 text-[12px] text-[#3F3F46] mt-3 pt-3 border-t border-[#1A1A1A]">
                    <span>Ag. {account.agency}</span>
                    <span>Cc. {account.account}</span>
                  </div>

                  {/* Botões depósito / saque */}
                  <div className="flex gap-2 mt-4">
                    <button onClick={() => openMov(account.id, account.bank, account.balance, "deposit")}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-[12px] font-medium transition-all"
                      style={{ background:"rgba(34,197,94,0.08)", border:"1px solid rgba(34,197,94,0.2)", color:"#22C55E" }}>
                      <ArrowDownLeft size={13} /> Depositar
                    </button>
                    <button onClick={() => openMov(account.id, account.bank, account.balance, "withdraw")}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-[12px] font-medium transition-all"
                      style={{ background:"rgba(239,68,68,0.08)", border:"1px solid rgba(239,68,68,0.2)", color:"#EF4444" }}>
                      <ArrowUpRight size={13} /> Retirar
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Modal — Adicionar Conta */}
      <Modal open={showAdd} onClose={() => setShowAdd(false)} title="Adicionar Conta" subtitle="Nova conta bancária"
        icon={<Landmark size={14} className="text-gold" />}>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="label-xs mb-1.5 block">Banco</label>
              <select className="input-premium w-full" value={form.bank} onChange={e=>setForm(f=>({...f,bank:e.target.value}))} style={{colorScheme:"dark"}}>
                {BANKS.map(b=><option key={b}>{b}</option>)}
              </select>
            </div>
            <div>
              <label className="label-xs mb-1.5 block">Tipo</label>
              <select className="input-premium w-full" value={form.type} onChange={e=>setForm(f=>({...f,type:e.target.value}))} style={{colorScheme:"dark"}}>
                {ACCOUNT_TYPES.map(t=><option key={t}>{t}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label className="label-xs mb-1.5 block">Saldo Inicial (R$)</label>
            <input className="input-premium w-full" placeholder="0,00" value={form.balance} onChange={e=>setForm(f=>({...f,balance:e.target.value}))} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="label-xs mb-1.5 block">Agência</label>
              <input className="input-premium w-full" placeholder="0001" value={form.agency} onChange={e=>setForm(f=>({...f,agency:e.target.value}))} />
            </div>
            <div>
              <label className="label-xs mb-1.5 block">Número da Conta</label>
              <input className="input-premium w-full" placeholder="12345-6" value={form.account} onChange={e=>setForm(f=>({...f,account:e.target.value}))} />
            </div>
          </div>
          <div className="flex gap-3 pt-1">
            <button onClick={() => setShowAdd(false)} className="btn-ghost flex-1 py-2.5 text-[13px]">Cancelar</button>
            <button onClick={handleAdd} className="btn-gold flex-1 py-2.5 text-[13px]">Adicionar Conta</button>
          </div>
        </div>
      </Modal>

      {/* Modal — Depósito / Retirada / Editar saldo */}
      <Modal
        open={!!movModal}
        onClose={() => { setMovModal(null); setMovValue(""); setNewBalance(""); }}
        title={
          movModal?.mode === "deposit" ? "Depositar" :
          movModal?.mode === "withdraw" ? "Retirar" : "Ajustar Saldo"
        }
        subtitle={movModal?.bank ?? ""}
        icon={
          movModal?.mode === "deposit" ? <ArrowDownLeft size={14} className="text-green-400" /> :
          movModal?.mode === "withdraw" ? <ArrowUpRight size={14} className="text-red-400" /> :
          <Pencil size={14} className="text-gold" />
        }
      >
        <div className="space-y-4">
          {movModal && (
            <div className="p-3 rounded-xl text-[13px] text-center" style={{ background:"rgba(212,175,55,0.06)", border:"1px solid rgba(212,175,55,0.1)" }}>
              <span className="text-[#52525B]">Saldo atual: </span>
              <span className="text-[#D4AF37] font-medium">{formatCurrency(movModal.balance)}</span>
            </div>
          )}

          {movModal?.mode === "edit" ? (
            <div>
              <label className="label-xs mb-1.5 block">Novo saldo (R$)</label>
              <input className="input-premium w-full" placeholder="0,00" value={newBalance}
                onChange={e => setNewBalance(e.target.value)} autoFocus />
            </div>
          ) : (
            <div>
              <label className="label-xs mb-1.5 block">
                {movModal?.mode === "deposit" ? "Valor a depositar (R$)" : "Valor a retirar (R$)"}
              </label>
              <input className="input-premium w-full" placeholder="0,00" value={movValue}
                onChange={e => setMovValue(e.target.value)} autoFocus />
            </div>
          )}

          <div className="flex gap-3 pt-1">
            <button onClick={() => { setMovModal(null); setMovValue(""); setNewBalance(""); }}
              className="btn-ghost flex-1 py-2.5 text-[13px]">Cancelar</button>
            <button onClick={handleMovimento}
              className="flex-1 py-2.5 rounded-xl text-[13px] font-medium transition-all"
              style={{
                background: movModal?.mode === "deposit" ? "rgba(34,197,94,0.15)" :
                            movModal?.mode === "withdraw" ? "rgba(239,68,68,0.15)" :
                            "linear-gradient(135deg,#D4AF37,#B8952A)",
                border: movModal?.mode === "deposit" ? "1px solid rgba(34,197,94,0.3)" :
                        movModal?.mode === "withdraw" ? "1px solid rgba(239,68,68,0.3)" : "none",
                color: movModal?.mode === "deposit" ? "#22C55E" :
                       movModal?.mode === "withdraw" ? "#EF4444" : "#0A0A0A",
              }}>
              {movModal?.mode === "deposit" ? "Confirmar Depósito" :
               movModal?.mode === "withdraw" ? "Confirmar Retirada" : "Salvar Saldo"}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
