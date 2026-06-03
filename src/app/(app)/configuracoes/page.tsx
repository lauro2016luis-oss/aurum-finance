"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Settings, Bell, Shield, CreditCard, Palette, Globe, ChevronRight, Pencil, Check, X, Loader2 } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { createClient } from "@/lib/supabase/client";

const settingsSections = [
  {
    title: "Preferências",
    items: [
      { icon: Bell,    label: "Notificações",    desc: "Alertas de vencimento, metas, resumos" },
      { icon: Palette, label: "Aparência",        desc: "Tema, cores, densidade da interface" },
      { icon: Globe,   label: "Idioma e região",  desc: "Português (Brasil) · BRL" },
    ],
  },
];

export default function ConfiguracoesPage() {
  const [name,      setName]      = useState("");
  const [email,     setEmail]     = useState("");
  const [initial,   setInitial]   = useState("U");
  const [editing,   setEditing]   = useState(false);
  const [editName,  setEditName]  = useState("");
  const [saving,    setSaving]    = useState(false);
  const [saved,     setSaved]     = useState(false);
  const [userId,    setUserId]    = useState("");

  useEffect(() => {
    createClient().auth.getUser().then(({ data }) => {
      if (!data.user) return;
      const meta = data.user.user_metadata;
      const n = meta?.name || meta?.full_name || data.user.email?.split("@")[0] || "Usuário";
      setName(n);
      setEmail(data.user.email ?? "");
      setInitial(n.charAt(0).toUpperCase());
      setUserId(data.user.id);
    });
  }, []);

  const handleSave = async () => {
    if (!editName.trim() || !userId) return;
    setSaving(true);
    const supabase = createClient();
    await supabase.auth.updateUser({ data: { name: editName.trim() } });
    setName(editName.trim());
    setInitial(editName.trim().charAt(0).toUpperCase());
    setSaving(false);
    setEditing(false);
    setSaved(true);
    // Dispara evento para a sidebar atualizar sem reload
    window.dispatchEvent(new CustomEvent("aurum:profile-updated", { detail: { name: editName.trim() } }));
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="flex flex-col min-h-full">
      <Header title="Configurações" subtitle="Sistema" />

      <motion.div
        className="flex-1 p-4 sm:p-6 lg:p-8 max-w-2xl space-y-8 overflow-y-auto"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {/* Profile card */}
        <div className="card-gold p-6 flex items-center gap-5">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-bold text-black flex-shrink-0"
            style={{ background: "linear-gradient(135deg,#D4AF37,#B8952A)", boxShadow: "0 0 20px rgba(212,175,55,0.3)" }}>
            {initial}
          </div>
          <div className="flex-1 min-w-0">
            {editing ? (
              <div className="flex items-center gap-2">
                <input
                  className="input-premium text-[16px] py-1.5 px-3 flex-1"
                  value={editName}
                  onChange={e => setEditName(e.target.value)}
                  onKeyDown={e => { if (e.key === "Enter") handleSave(); if (e.key === "Escape") setEditing(false); }}
                  autoFocus
                />
                <button onClick={handleSave} disabled={saving}
                  className="w-8 h-8 rounded-lg flex items-center justify-center transition-all"
                  style={{ background: "rgba(34,197,94,0.15)", border: "1px solid rgba(34,197,94,0.3)", color: "#22C55E" }}>
                  {saving ? <Loader2 size={14} className="animate-spin" /> : <Check size={14} />}
                </button>
                <button onClick={() => setEditing(false)}
                  className="w-8 h-8 rounded-lg flex items-center justify-center transition-all"
                  style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)", color: "#EF4444" }}>
                  <X size={14} />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <h3 className="text-[18px] font-medium text-white">{name}</h3>
                <button onClick={() => { setEditName(name); setEditing(true); }}
                  className="w-7 h-7 rounded-lg flex items-center justify-center transition-all hover:bg-[#152015]"
                  style={{ color: "#52525B" }}>
                  <Pencil size={13} />
                </button>
              </div>
            )}
            <p className="text-[13px] text-[#52525B] mt-0.5">{email}</p>
            <div className="flex items-center gap-1.5 mt-2">
              <span className="badge badge-gold text-[10px]">AurumCash Pro</span>
              <span className="text-[11px] text-[#52525B]">· Ativo até Jan 2026</span>
            </div>
          </div>
        </div>

        {/* Saved toast */}
        <AnimatePresence>
          {saved && (
            <motion.div initial={{ opacity:0, y:-8 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-8 }}
              className="flex items-center gap-2 px-4 py-3 rounded-xl text-[13px]"
              style={{ background:"rgba(34,197,94,0.08)", border:"1px solid rgba(34,197,94,0.2)", color:"#22C55E", fontFamily:"'Instrument Sans',sans-serif" }}>
              <Check size={14} /> Nome atualizado com sucesso!
            </motion.div>
          )}
        </AnimatePresence>

        {/* Conta section */}
        <div>
          <p className="text-[11px] text-[#52525B] uppercase tracking-wider mb-3">Conta</p>
          <div className="card-premium overflow-hidden">
            <button className="w-full flex items-center gap-4 p-5 hover:bg-[#152015] transition-colors text-left border-b border-[#1A1A1A] group"
              onClick={() => { setEditName(name); setEditing(true); }}>
              <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background:"#1A1A1A" }}>
                <Settings size={16} className="text-[#52525B] group-hover:text-[#D4AF37] transition-colors" />
              </div>
              <div className="flex-1">
                <p className="text-[14px] text-white">Perfil e dados pessoais</p>
                <p className="text-[12px] text-[#52525B] mt-0.5">Nome, e-mail, foto de perfil</p>
              </div>
              <ChevronRight size={14} className="text-[#3F3F46] group-hover:text-[#52525B] transition-colors" />
            </button>
            <button className="w-full flex items-center gap-4 p-5 hover:bg-[#152015] transition-colors text-left border-b border-[#1A1A1A] group">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background:"#1A1A1A" }}>
                <Shield size={16} className="text-[#52525B] group-hover:text-[#D4AF37] transition-colors" />
              </div>
              <div className="flex-1">
                <p className="text-[14px] text-white">Segurança</p>
                <p className="text-[12px] text-[#52525B] mt-0.5">Senha, autenticação 2FA, sessões</p>
              </div>
              <ChevronRight size={14} className="text-[#3F3F46]" />
            </button>
            <button className="w-full flex items-center gap-4 p-5 hover:bg-[#152015] transition-colors text-left group">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background:"#1A1A1A" }}>
                <CreditCard size={16} className="text-[#52525B] group-hover:text-[#D4AF37] transition-colors" />
              </div>
              <div className="flex-1">
                <p className="text-[14px] text-white">Assinatura e plano</p>
                <p className="text-[12px] text-[#52525B] mt-0.5">AurumCash Pro · R$ 49,90/mês</p>
              </div>
              <ChevronRight size={14} className="text-[#3F3F46]" />
            </button>
          </div>
        </div>

        {settingsSections.map((section) => (
          <div key={section.title}>
            <p className="text-[11px] text-[#52525B] uppercase tracking-wider mb-3">{section.title}</p>
            <div className="card-premium overflow-hidden">
              {section.items.map((item, i) => {
                const Icon = item.icon;
                return (
                  <button key={i}
                    className="w-full flex items-center gap-4 p-5 hover:bg-[#152015] transition-colors text-left border-b border-[#1A1A1A] last:border-0 group">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background:"#1A1A1A" }}>
                      <Icon size={16} className="text-[#52525B] group-hover:text-[#D4AF37] transition-colors" />
                    </div>
                    <div className="flex-1">
                      <p className="text-[14px] text-white">{item.label}</p>
                      <p className="text-[12px] text-[#52525B] mt-0.5">{item.desc}</p>
                    </div>
                    <ChevronRight size={14} className="text-[#3F3F46] group-hover:text-[#52525B] transition-colors" />
                  </button>
                );
              })}
            </div>
          </div>
        ))}

        {/* Danger zone */}
        <div>
          <p className="text-[11px] text-[#52525B] uppercase tracking-wider mb-3">Zona de Risco</p>
          <div className="card-premium p-5" style={{ borderColor:"rgba(239,68,68,0.2)" }}>
            <p className="text-[13.5px] font-medium text-white mb-1">Excluir conta</p>
            <p className="text-[12px] text-[#52525B] mb-4">Esta ação é irreversível. Todos os dados serão permanentemente removidos.</p>
            <button className="px-4 py-2 rounded-xl text-[12.5px] font-medium text-[#EF4444] transition-all duration-200 hover:bg-error/10"
              style={{ border:"1px solid rgba(239,68,68,0.2)" }}>
              Excluir minha conta
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
