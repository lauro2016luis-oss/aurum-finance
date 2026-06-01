"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Eye, EyeOff, ArrowRight, Lock, Mail, Sparkles, TrendingUp, Shield, Zap } from "lucide-react";

/* ── tiny animated counter ──────────────────────────────── */
const stats = [
  { value: "R$ 284k", label: "Patrimônio médio gerenciado" },
  { value: "98%",     label: "Taxa de satisfação" },
  { value: "3.2×",   label: "Crescimento patrimonial" },
];

export default function LoginPage() {
  const [mode, setMode]         = useState<"login" | "register">("login");
  const [showPass, setShowPass] = useState(false);
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [name, setName]         = useState("");
  const [loading, setLoading]   = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 1400));
    setLoading(false);
    window.location.href = "/dashboard";
  };

  return (
    <div className="min-h-screen flex overflow-hidden" style={{ background: "#080808" }}>

      {/* ═══════════════ LEFT — BRAND PANEL ═══════════════ */}
      <div className="hidden lg:flex flex-col justify-between w-[52%] relative overflow-hidden p-14"
        style={{
          background: "linear-gradient(145deg, #0E0E0E 0%, #0A0A0A 40%, #0D0C08 100%)",
          borderRight: "1px solid rgba(212,175,55,0.08)",
        }}>

        {/* decorative geometry */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* large radial gold glow */}
          <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full"
            style={{ background: "radial-gradient(circle, rgba(212,175,55,0.07) 0%, transparent 70%)" }} />
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full"
            style={{ background: "radial-gradient(circle, rgba(212,175,55,0.04) 0%, transparent 70%)" }} />
          {/* grid lines */}
          <svg className="absolute inset-0 w-full h-full opacity-[0.025]" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#D4AF37" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
          {/* diagonal line accent */}
          <div className="absolute top-0 right-0 w-px h-full opacity-20"
            style={{ background: "linear-gradient(180deg, transparent 0%, #D4AF37 30%, #D4AF37 70%, transparent 100%)" }} />
        </div>

        {/* logo */}
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
          className="relative z-10 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #D4AF37, #B8952A)", boxShadow: "0 0 24px rgba(212,175,55,0.3)" }}>
            <span className="text-[#0A0A0A] font-bold text-[16px]" style={{ fontFamily: "'Cormorant SC', serif" }}>A</span>
          </div>
          <div>
            <p className="text-white text-[17px] tracking-[0.12em]" style={{ fontFamily: "'Cormorant SC', serif" }}>AURUM</p>
            <p className="text-[10px] tracking-[0.2em] uppercase" style={{ color: "#D4AF37", fontFamily: "'Instrument Sans', sans-serif" }}>Finance</p>
          </div>
        </motion.div>

        {/* hero text */}
        <motion.div className="relative z-10 space-y-8"
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.15 }}>
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full"
              style={{ background: "rgba(212,175,55,0.08)", border: "1px solid rgba(212,175,55,0.2)" }}>
              <Sparkles size={11} style={{ color: "#D4AF37" }} />
              <span className="text-[11px] tracking-[0.1em]" style={{ color: "#D4AF37", fontFamily: "'Instrument Sans', sans-serif" }}>
                IA FINANCEIRA INTEGRADA
              </span>
            </div>
            <h1 className="text-[48px] leading-[1.08] font-light text-white"
              style={{ fontFamily: "'Cormorant SC', serif" }}>
              Controle total<br />
              <span style={{ color: "#D4AF37" }}>das suas finanças</span>
            </h1>
            <p className="text-[15px] leading-relaxed max-w-[400px]"
              style={{ color: "#52525B", fontFamily: "'Instrument Sans', sans-serif" }}>
              Gestão pessoal e empresarial com inteligência artificial. Veja onde seu dinheiro vai — e para onde ele pode ir.
            </p>
          </div>

          {/* feature pills */}
          <div className="space-y-3">
            {[
              { icon: TrendingUp, text: "Investimentos e carteira em tempo real" },
              { icon: Shield,     text: "Reserva de emergência e metas automáticas" },
              { icon: Zap,        text: "Vera IA — sua consultora financeira pessoal" },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: "rgba(212,175,55,0.08)", border: "1px solid rgba(212,175,55,0.12)" }}>
                  <Icon size={13} style={{ color: "#D4AF37" }} />
                </div>
                <span className="text-[13px]" style={{ color: "#A1A1AA", fontFamily: "'Instrument Sans', sans-serif" }}>{text}</span>
              </div>
            ))}
          </div>

          {/* stats row */}
          <div className="grid grid-cols-3 gap-4 pt-4 border-t" style={{ borderColor: "rgba(212,175,55,0.1)" }}>
            {stats.map(s => (
              <div key={s.label}>
                <p className="metric-value text-[22px] font-light" style={{ color: "#D4AF37" }}>{s.value}</p>
                <p className="text-[10.5px] mt-0.5" style={{ color: "#52525B", fontFamily: "'Instrument Sans', sans-serif" }}>{s.label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* footer note */}
        <motion.p className="relative z-10 text-[11px]"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
          style={{ color: "#3F3F46", fontFamily: "'Instrument Sans', sans-serif" }}>
          © 2025 AURUM Finance — Todos os direitos reservados
        </motion.p>
      </div>

      {/* ═══════════════ RIGHT — FORM PANEL ═══════════════ */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 sm:p-10 lg:p-14 relative">

        {/* mobile logo */}
        <motion.div className="lg:hidden flex items-center gap-3 mb-10"
          initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="w-9 h-9 rounded-xl flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #D4AF37, #B8952A)" }}>
            <span className="text-[#0A0A0A] font-bold text-[14px]" style={{ fontFamily: "'Cormorant SC', serif" }}>A</span>
          </div>
          <span className="text-white text-[16px] tracking-[0.12em]" style={{ fontFamily: "'Cormorant SC', serif" }}>AURUM</span>
        </motion.div>

        <motion.div className="w-full max-w-[420px]"
          initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>

          {/* mode toggle */}
          <div className="flex p-1 rounded-2xl mb-8"
            style={{ background: "#111111", border: "1px solid #1E1E1E" }}>
            {(["login", "register"] as const).map(m => (
              <button key={m} onClick={() => setMode(m)}
                className="flex-1 py-2.5 rounded-xl text-[13px] transition-all duration-300 relative"
                style={{
                  fontFamily: "'Instrument Sans', sans-serif",
                  color: mode === m ? "#fff" : "#52525B",
                }}>
                {mode === m && (
                  <motion.div layoutId="modeTab" className="absolute inset-0 rounded-xl"
                    style={{ background: "linear-gradient(135deg, rgba(212,175,55,0.15), rgba(212,175,55,0.08))", border: "1px solid rgba(212,175,55,0.2)" }}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.4 }} />
                )}
                <span className="relative z-10">
                  {m === "login" ? "Entrar" : "Criar conta"}
                </span>
              </button>
            ))}
          </div>

          {/* heading */}
          <AnimatePresence mode="wait">
            <motion.div key={mode}
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }} className="mb-8">
              <h2 className="text-[30px] font-light text-white leading-tight"
                style={{ fontFamily: "'Cormorant SC', serif" }}>
                {mode === "login" ? "Bem-vindo de volta" : "Comece agora"}
              </h2>
              <p className="text-[13px] mt-1.5" style={{ color: "#52525B", fontFamily: "'Instrument Sans', sans-serif" }}>
                {mode === "login"
                  ? "Acesse sua plataforma financeira"
                  : "Crie sua conta e assuma o controle"}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <AnimatePresence>
              {mode === "register" && (
                <motion.div key="name-field"
                  initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.25 }}>
                  <label className="label-xs block mb-1.5">Nome completo</label>
                  <input className="input-premium w-full" placeholder="Seu nome"
                    value={name} onChange={e => setName(e.target.value)} />
                </motion.div>
              )}
            </AnimatePresence>

            <div>
              <label className="label-xs block mb-1.5">E-mail</label>
              <div className="relative">
                <Mail size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                  style={{ color: "#3F3F46" }} />
                <input type="email" className="input-premium w-full pl-10"
                  placeholder="seu@email.com"
                  value={email} onChange={e => setEmail(e.target.value)} />
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1.5">
                <label className="label-xs">Senha</label>
                {mode === "login" && (
                  <button type="button" className="text-[11px] hover:text-[#D4AF37] transition-colors"
                    style={{ color: "#52525B", fontFamily: "'Instrument Sans', sans-serif" }}>
                    Esqueci a senha
                  </button>
                )}
              </div>
              <div className="relative">
                <Lock size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                  style={{ color: "#3F3F46" }} />
                <input type={showPass ? "text" : "password"} className="input-premium w-full pl-10 pr-11"
                  placeholder={mode === "login" ? "Sua senha" : "Mínimo 8 caracteres"}
                  value={password} onChange={e => setPassword(e.target.value)} />
                <button type="button" onClick={() => setShowPass(v => !v)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 transition-colors"
                  style={{ color: showPass ? "#D4AF37" : "#3F3F46" }}>
                  {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            {/* submit */}
            <motion.button type="submit" disabled={loading}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3.5 rounded-xl font-medium text-[14px] flex items-center justify-center gap-2.5 transition-all duration-300 mt-2"
              style={{
                background: loading
                  ? "rgba(212,175,55,0.15)"
                  : "linear-gradient(135deg, #D4AF37, #B8952A)",
                color: loading ? "#D4AF37" : "#0A0A0A",
                fontFamily: "'Instrument Sans', sans-serif",
                boxShadow: loading ? "none" : "0 8px 32px rgba(212,175,55,0.25)",
                border: loading ? "1px solid rgba(212,175,55,0.3)" : "none",
              }}>
              {loading ? (
                <>
                  <motion.div className="w-4 h-4 rounded-full border-2"
                    style={{ borderColor: "#D4AF37", borderTopColor: "transparent" }}
                    animate={{ rotate: 360 }} transition={{ duration: 0.7, repeat: Infinity, ease: "linear" }} />
                  <span>Verificando...</span>
                </>
              ) : (
                <>
                  <span>{mode === "login" ? "Entrar na plataforma" : "Criar minha conta"}</span>
                  <ArrowRight size={15} />
                </>
              )}
            </motion.button>
          </form>

          {/* divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px" style={{ background: "#1E1E1E" }} />
            <span className="text-[11px]" style={{ color: "#3F3F46", fontFamily: "'Instrument Sans', sans-serif" }}>ou continue com</span>
            <div className="flex-1 h-px" style={{ background: "#1E1E1E" }} />
          </div>

          {/* social */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { name: "Google", icon: (
                <svg width="16" height="16" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
              )},
              { name: "Apple", icon: (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="#fff">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
              )},
            ].map(({ name, icon }) => (
              <button key={name} type="button"
                className="flex items-center justify-center gap-2.5 py-3 rounded-xl text-[13px] transition-all duration-200 hover:border-[#333]"
                style={{
                  background: "#111111",
                  border: "1px solid #1E1E1E",
                  color: "#A1A1AA",
                  fontFamily: "'Instrument Sans', sans-serif",
                }}>
                {icon}
                {name}
              </button>
            ))}
          </div>

          {/* switch mode */}
          <p className="text-center mt-8 text-[12.5px]" style={{ color: "#52525B", fontFamily: "'Instrument Sans', sans-serif" }}>
            {mode === "login" ? "Não tem conta? " : "Já tem conta? "}
            <button onClick={() => setMode(mode === "login" ? "register" : "login")}
              className="hover:text-[#D4AF37] transition-colors"
              style={{ color: "#A1A1AA" }}>
              {mode === "login" ? "Criar gratuitamente" : "Entrar"}
            </button>
          </p>

          {/* trust badges */}
          <div className="flex items-center justify-center gap-5 mt-8">
            {["🔒 SSL seguro", "✦ Sem mensalidade", "7 dias garantia"].map(b => (
              <span key={b} className="text-[10.5px]"
                style={{ color: "#3F3F46", fontFamily: "'Instrument Sans', sans-serif" }}>{b}</span>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
