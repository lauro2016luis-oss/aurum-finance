"use client";

import { motion } from "framer-motion";
import { Settings, User, Bell, Shield, CreditCard, Palette, Globe, ChevronRight } from "lucide-react";
import { Header } from "@/components/layout/Header";

const settingsSections = [
  {
    title: "Conta",
    items: [
      { icon: User, label: "Perfil e dados pessoais", desc: "Nome, e-mail, foto de perfil" },
      { icon: Shield, label: "Segurança", desc: "Senha, autenticação 2FA, sessões" },
      { icon: CreditCard, label: "Assinatura e plano", desc: "AURUM Pro · R$ 49,90/mês" },
    ],
  },
  {
    title: "Preferências",
    items: [
      { icon: Bell, label: "Notificações", desc: "Alertas de vencimento, metas, resumos" },
      { icon: Palette, label: "Aparência", desc: "Tema, cores, densidade da interface" },
      { icon: Globe, label: "Idioma e região", desc: "Português (Brasil) · BRL" },
    ],
  },
];

export default function ConfiguracoesPage() {
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
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-bold text-black flex-shrink-0"
            style={{ background: "linear-gradient(135deg, #D4AF37, #B8952A)", boxShadow: "0 0 20px rgba(212,175,55,0.3)" }}
          >
            L
          </div>
          <div>
            <h3 className="text-[18px] font-medium text-white">Lauro Luis</h3>
            <p className="text-[13px] text-[#52525B] mt-0.5">lauro2016luis@gmail.com</p>
            <div className="flex items-center gap-1.5 mt-2">
              <span className="badge badge-gold text-[10px]">AURUM Pro</span>
              <span className="text-[11px] text-[#52525B]">· Ativo até Jan 2026</span>
            </div>
          </div>
        </div>

        {settingsSections.map((section) => (
          <div key={section.title}>
            <p className="text-[11px] text-[#52525B] uppercase tracking-wider mb-3">{section.title}</p>
            <div className="card-premium overflow-hidden">
              {section.items.map((item, i) => {
                const Icon = item.icon;
                return (
                  <button
                    key={i}
                    className="w-full flex items-center gap-4 p-5 hover:bg-[#1A1A1A] transition-colors text-left border-b border-[#1A1A1A] last:border-0 group"
                  >
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "#1A1A1A" }}>
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
          <div className="card-premium p-5" style={{ borderColor: "rgba(239,68,68,0.2)" }}>
            <p className="text-[13.5px] font-medium text-white mb-1">Excluir conta</p>
            <p className="text-[12px] text-[#52525B] mb-4">Esta ação é irreversível. Todos os dados serão permanentemente removidos.</p>
            <button className="px-4 py-2 rounded-xl text-[12.5px] font-medium text-[#EF4444] transition-all duration-200 hover:bg-error/10"
              style={{ border: "1px solid rgba(239,68,68,0.2)" }}>
              Excluir minha conta
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
