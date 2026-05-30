"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Landmark, Plus, Trash2 } from "lucide-react";
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

export default function ContasPage() {
  const { bankAccounts, addBankAccount, deleteBankAccount } = useData();
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ bank:"Nubank", type:"Conta Corrente", balance:"", agency:"0001", account:"" });

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
    setShowModal(false);
  };

  return (
    <div className="flex flex-col min-h-full">
      <Header title="Contas Bancárias" subtitle="Bancos">
        <button onClick={() => setShowModal(true)} className="btn-gold flex items-center gap-1.5 text-[12.5px] py-2 px-4">
          <Plus size={14} /> Adicionar Conta
        </button>
      </Header>

      <motion.div className="flex-1 p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-6 overflow-y-auto"
        initial={{ opacity:0,y:12 }} animate={{ opacity:1,y:0 }} transition={{ duration:0.4 }}>

        <div className="card-gold p-6">
          <p className="text-[11px] text-[#52525B] uppercase tracking-wider mb-2">Saldo Consolidado</p>
          <p className="metric-value text-[40px] sm:text-[48px] text-gold-gradient font-light leading-none">{formatCurrency(total)}</p>
          <p className="text-[13px] text-[#52525B] mt-2">{bankAccounts.length} contas ativas</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
          {bankAccounts.map((account, i) => {
            const color = BANK_COLORS[account.bank] || "#D4AF37";
            return (
              <motion.div key={account.id} initial={{ opacity:0,y:20 }} animate={{ opacity:1,y:0 }}
                transition={{ delay:i*0.08 }} className="card-premium p-6 group" style={{ borderLeft:`3px solid ${color}40` }}>
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
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ background:color, boxShadow:`0 0 6px ${color}80` }} />
                    <button onClick={() => deleteBankAccount(account.id)}
                      className="opacity-0 group-hover:opacity-100 w-7 h-7 flex items-center justify-center rounded-lg hover:bg-error/10 text-[#3F3F46] hover:text-error transition-all">
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
                <p className="metric-value text-[28px] font-light text-white mb-1">{formatCurrency(account.balance)}</p>
                <div className="flex gap-4 text-[12px] text-[#3F3F46] mt-3 pt-3 border-t border-[#1A1A1A]">
                  <span>Ag. {account.agency}</span>
                  <span>Cc. {account.account}</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      <Modal open={showModal} onClose={() => setShowModal(false)} title="Adicionar Conta" subtitle="Nova conta bancária"
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
            <button onClick={() => setShowModal(false)} className="btn-ghost flex-1 py-2.5 text-[13px]">Cancelar</button>
            <button onClick={handleAdd} className="btn-gold flex-1 py-2.5 text-[13px]">Adicionar Conta</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
