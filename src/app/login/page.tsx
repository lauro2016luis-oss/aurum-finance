"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, ArrowRight, Lock, Mail, Sparkles, TrendingUp, Shield, Zap } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

const stats = [
  { value: "R$ 284k", label: "Patrimônio médio gerenciado" },
  { value: "98%",     label: "Taxa de satisfação" },
  { value: "3.2×",   label: "Crescimento patrimonial" },
];

export default function LoginPage() {
  const router = useRouter();
  const [showPass, setShowPass] = useState(false);
  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const supabase = createClient();
    const { error: authErr } = await supabase.auth.signInWithPassword({ email, password });

    if (authErr) {
      setError("E-mail ou senha incorretos.");
      setLoading(false);
      return;
    }

    router.push("/dashboard");
    router.refresh();
  };

  return (
    <div className="min-h-screen flex overflow-hidden" style={{ background: "#080808" }}>

      {/* ═══ LEFT — BRAND ═══════════════════════════════════ */}
      <div className="hidden lg:flex flex-col justify-between w-[52%] relative overflow-hidden p-14"
        style={{ background: "linear-gradient(145deg,#0E0E0E 0%,#0A0A0A 40%,#0D0C08 100%)", borderRight: "1px solid rgba(212,175,55,0.08)" }}>

        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full"
            style={{ background: "radial-gradient(circle,rgba(212,175,55,0.07) 0%,transparent 70%)" }} />
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full"
            style={{ background: "radial-gradient(circle,rgba(212,175,55,0.04) 0%,transparent 70%)" }} />
          <svg className="absolute inset-0 w-full h-full opacity-[0.025]">
            <defs>
              <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#D4AF37" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
          <div className="absolute top-0 right-0 w-px h-full opacity-20"
            style={{ background: "linear-gradient(180deg,transparent 0%,#D4AF37 30%,#D4AF37 70%,transparent 100%)" }} />
        </div>

        {/* logo */}
        <motion.div className="relative z-10 flex items-center gap-3"
          initial={{ opacity:0, y:-10 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.6 }}>
          <div className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ background:"linear-gradient(135deg,#D4AF37,#B8952A)", boxShadow:"0 0 24px rgba(212,175,55,0.3)" }}>
            <span className="text-[#0A0A0A] font-bold text-[16px]" style={{ fontFamily:"'Cormorant SC',serif" }}>A</span>
          </div>
          <div>
            <p className="text-white text-[17px] tracking-[0.12em]" style={{ fontFamily:"'Cormorant SC',serif" }}>AURUM</p>
            <p className="text-[10px] tracking-[0.2em] uppercase" style={{ color:"#D4AF37", fontFamily:"'Instrument Sans',sans-serif" }}>Finance</p>
          </div>
        </motion.div>

        {/* hero */}
        <motion.div className="relative z-10 space-y-8"
          initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.7, delay:0.15 }}>
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full"
              style={{ background:"rgba(212,175,55,0.08)", border:"1px solid rgba(212,175,55,0.2)" }}>
              <Sparkles size={11} style={{ color:"#D4AF37" }} />
              <span className="text-[11px] tracking-[0.1em]" style={{ color:"#D4AF37", fontFamily:"'Instrument Sans',sans-serif" }}>
                IA FINANCEIRA INTEGRADA
              </span>
            </div>
            <h1 className="text-[48px] leading-[1.08] font-light text-white" style={{ fontFamily:"'Cormorant SC',serif" }}>
              Controle total<br/>
              <span style={{ color:"#D4AF37" }}>das suas finanças</span>
            </h1>
            <p className="text-[15px] leading-relaxed max-w-[400px]"
              style={{ color:"#52525B", fontFamily:"'Instrument Sans',sans-serif" }}>
              Gestão pessoal e empresarial com inteligência artificial. Veja onde seu dinheiro vai — e para onde ele pode ir.
            </p>
          </div>

          <div className="space-y-3">
            {[
              { icon: TrendingUp, text: "Investimentos e carteira em tempo real" },
              { icon: Shield,     text: "Reserva de emergência e metas automáticas" },
              { icon: Zap,        text: "Vera IA — sua consultora financeira pessoal" },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background:"rgba(212,175,55,0.08)", border:"1px solid rgba(212,175,55,0.12)" }}>
                  <Icon size={13} style={{ color:"#D4AF37" }} />
                </div>
                <span className="text-[13px]" style={{ color:"#A1A1AA", fontFamily:"'Instrument Sans',sans-serif" }}>{text}</span>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-4 pt-4 border-t" style={{ borderColor:"rgba(212,175,55,0.1)" }}>
            {stats.map(s => (
              <div key={s.label}>
                <p className="metric-value text-[22px] font-light" style={{ color:"#D4AF37" }}>{s.value}</p>
                <p className="text-[10.5px] mt-0.5" style={{ color:"#52525B", fontFamily:"'Instrument Sans',sans-serif" }}>{s.label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.p className="relative z-10 text-[11px]"
          initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.5 }}
          style={{ color:"#3F3F46", fontFamily:"'Instrument Sans',sans-serif" }}>
          © 2025 AURUM Finance — Todos os direitos reservados
        </motion.p>
      </div>

      {/* ═══ RIGHT — FORM ════════════════════════════════════ */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 sm:p-10 lg:p-14">

        {/* mobile logo */}
        <motion.div className="lg:hidden flex items-center gap-3 mb-10"
          initial={{ opacity:0, y:-8 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.5 }}>
          <div className="w-9 h-9 rounded-xl flex items-center justify-center"
            style={{ background:"linear-gradient(135deg,#D4AF37,#B8952A)" }}>
            <span className="text-[#0A0A0A] font-bold text-[14px]" style={{ fontFamily:"'Cormorant SC',serif" }}>A</span>
          </div>
          <span className="text-white text-[16px] tracking-[0.12em]" style={{ fontFamily:"'Cormorant SC',serif" }}>AURUM</span>
        </motion.div>

        <motion.div className="w-full max-w-[420px]"
          initial={{ opacity:0, y:24 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.6, delay:0.1 }}>

          {/* heading */}
          <div className="mb-8">
            <p className="text-[10px] uppercase tracking-[0.16em] mb-2"
              style={{ color:"#D4AF37", fontFamily:"'Instrument Sans',sans-serif" }}>
              Plataforma exclusiva
            </p>
            <h2 className="text-[30px] font-light text-white leading-tight" style={{ fontFamily:"'Cormorant SC',serif" }}>
              Bem-vindo de volta
            </h2>
            <p className="text-[13px] mt-1.5" style={{ color:"#52525B", fontFamily:"'Instrument Sans',sans-serif" }}>
              Acesse sua plataforma financeira
            </p>
          </div>

          {/* form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="label-xs block mb-1.5">E-mail</label>
              <div className="relative">
                <Mail size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color:"#3F3F46" }} />
                <input type="email" className="input-premium w-full pl-10" placeholder="seu@email.com"
                  value={email} onChange={e => setEmail(e.target.value)} required />
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1.5">
                <label className="label-xs">Senha</label>
                <button type="button" className="text-[11px] hover:text-[#D4AF37] transition-colors"
                  style={{ color:"#52525B", fontFamily:"'Instrument Sans',sans-serif" }}>
                  Esqueci a senha
                </button>
              </div>
              <div className="relative">
                <Lock size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color:"#3F3F46" }} />
                <input type={showPass ? "text" : "password"} className="input-premium w-full pl-10 pr-11"
                  placeholder="Sua senha"
                  value={password} onChange={e => setPassword(e.target.value)} required />
                <button type="button" onClick={() => setShowPass(v => !v)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 transition-colors"
                  style={{ color: showPass ? "#D4AF37" : "#3F3F46" }}>
                  {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            {/* error */}
            <AnimatePresence>
              {error && (
                <motion.div initial={{ opacity:0, height:0 }} animate={{ opacity:1, height:"auto" }} exit={{ opacity:0, height:0 }}
                  className="overflow-hidden">
                  <div className="p-3 rounded-xl text-[12.5px]"
                    style={{ background:"rgba(239,68,68,0.08)", border:"1px solid rgba(239,68,68,0.2)", color:"#EF4444", fontFamily:"'Instrument Sans',sans-serif" }}>
                    {error}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* submit */}
            <motion.button type="submit" disabled={loading} whileTap={{ scale:0.98 }}
              className="w-full py-3.5 rounded-xl font-medium text-[14px] flex items-center justify-center gap-2.5 transition-all duration-300 mt-2"
              style={{
                background: loading ? "rgba(212,175,55,0.15)" : "linear-gradient(135deg,#D4AF37,#B8952A)",
                color: loading ? "#D4AF37" : "#0A0A0A",
                fontFamily: "'Instrument Sans',sans-serif",
                boxShadow: loading ? "none" : "0 8px 32px rgba(212,175,55,0.25)",
                border: loading ? "1px solid rgba(212,175,55,0.3)" : "none",
              }}>
              {loading ? (
                <>
                  <motion.div className="w-4 h-4 rounded-full border-2"
                    style={{ borderColor:"#D4AF37", borderTopColor:"transparent" }}
                    animate={{ rotate:360 }} transition={{ duration:0.7, repeat:Infinity, ease:"linear" }} />
                  <span>Verificando...</span>
                </>
              ) : (
                <>
                  <span>Entrar na plataforma</span>
                  <ArrowRight size={15} />
                </>
              )}
            </motion.button>
          </form>

          {/* access info */}
          <div className="mt-6 p-4 rounded-xl" style={{ background:"rgba(212,175,55,0.04)", border:"1px solid rgba(212,175,55,0.1)" }}>
            <p className="text-[12px] text-center" style={{ color:"#52525B", fontFamily:"'Instrument Sans',sans-serif" }}>
              🔒 Acesso exclusivo para clientes.<br/>
              <span style={{ color:"#3F3F46" }}>Após a compra, você recebe o link de ativação por e-mail.</span>
            </p>
          </div>

          {/* trust */}
          <div className="flex items-center justify-center gap-5 mt-6">
            {["🔒 SSL seguro", "✦ Sem mensalidade", "7 dias garantia"].map(b => (
              <span key={b} className="text-[10.5px]"
                style={{ color:"#3F3F46", fontFamily:"'Instrument Sans',sans-serif" }}>{b}</span>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
