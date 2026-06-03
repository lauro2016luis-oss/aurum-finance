"use client";

import { motion } from "framer-motion";
import { ShieldOff, ArrowLeft, Mail } from "lucide-react";
import Link from "next/link";

export default function AcessoBloqueadoPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6" style={{ background: "#080808" }}>
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(239,68,68,0.04) 0%, transparent 70%)" }} />
      </div>

      <motion.div className="w-full max-w-[420px] relative z-10"
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>

        {/* logo */}
        <div className="flex items-center gap-3 justify-center mb-10">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #D4AF37, #B8952A)" }}>
            <span className="text-[#0A0A0A] font-bold text-[14px]" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>A</span>
          </div>
          <span className="text-white text-[16px] tracking-[0.12em]" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>AURUM</span>
        </div>

        <div className="card-premium p-8 text-center space-y-6">
          <div className="h-0.5 rounded-full mb-2" style={{ background: "linear-gradient(90deg,rgba(239,68,68,0.5),transparent)" }} />

          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto"
            style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)" }}>
            <ShieldOff size={26} style={{ color: "#EF4444" }} />
          </div>

          <div>
            <h2 className="text-[26px] font-light text-white mb-2" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
              Acesso não liberado
            </h2>
            <p className="text-[13px] leading-relaxed" style={{ color: "#52525B", fontFamily: "'Instrument Sans', sans-serif" }}>
              Sua conta não possui um pagamento ativo ou ainda não foi ativada. Verifique seu e-mail para o link de ativação.
            </p>
          </div>

          <div className="space-y-3">
            <a href="mailto:suporte@aurumfinance.app"
              className="w-full flex items-center justify-center gap-2 btn-gold py-3 text-[13px]">
              <Mail size={14} /> Falar com suporte
            </a>
            <Link href="/login"
              className="w-full flex items-center justify-center gap-2 btn-ghost py-3 text-[13px]">
              <ArrowLeft size={14} /> Voltar ao login
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
