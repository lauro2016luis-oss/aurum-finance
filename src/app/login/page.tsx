"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, ArrowRight, Lock, Mail, Sparkles, TrendingUp, Shield, Zap, UserPlus, LogIn } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

const stats = [
  { value: "R$ 284k", label: "Patrimônio médio gerenciado" },
  { value: "98%",     label: "Taxa de satisfação" },
  { value: "3.2×",   label: "Crescimento patrimonial" },
];

export default function LoginPage() {
  const router = useRouter();
  const [mode, setMode]         = useState<"login" | "register">("login");
  const [showPass, setShowPass] = useState(false);
  const [showConf, setShowConf] = useState(false);
  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [confirm,  setConfirm]  = useState("");
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState("");
  const [success,  setSuccess]  = useState("");

  const switchMode = (m: "login" | "register") => {
    setMode(m);
    setError("");
    setSuccess("");
    setPassword("");
    setConfirm("");
  };

  /* ── Login ── */
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); setLoading(true);
    const supabase = createClient();
    const { error: authErr } = await supabase.auth.signInWithPassword({ email, password });
    if (authErr) { setError("E-mail ou senha incorretos."); setLoading(false); return; }
    router.push("/dashboard");
    router.refresh();
  };

  /* ── Criar conta ── */
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); setSuccess("");

    if (password.length < 6) { setError("A senha deve ter pelo menos 6 caracteres."); return; }
    if (password !== confirm) { setError("As senhas não coincidem."); return; }

    setLoading(true);

    // 1. Criar conta via API
    const res = await fetch("/api/ativar-conta/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();

    if (!res.ok) {
      setError(data.message || "Erro ao criar conta. Tente novamente.");
      setLoading(false);
      return;
    }

    // 2. Login automático
    const supabase = createClient();
    await supabase.auth.signInWithPassword({ email, password });
    router.push("/dashboard");
    router.refresh();
  };

  const handleSubmit = mode === "login" ? handleLogin : handleRegister;
  const passOk = password.length >= 6;
  const confOk = confirm.length > 0 && confirm === password;

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
            <span className="text-[#0A0A0A] font-bold text-[16px]" style={{ fontFamily:"'Instrument Sans',sans-serif" }}>A</span>
          </div>
          <div>
            <p className="text-white text-[17px] tracking-[0.12em]" style={{ fontFamily:"'Instrument Sans',sans-serif" }}>AURUM</p>
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
            <h1 className="text-[48px] leading-[1.08] font-light text-white" style={{ fontFamily:"'Instrument Sans',sans-serif" }}>
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
            <span className="text-[#0A0A0A] font-bold text-[14px]" style={{ fontFamily:"'Instrument Sans',sans-serif" }}>A</span>
          </div>
          <span className="text-white text-[16px] tracking-[0.12em]" style={{ fontFamily:"'Instrument Sans',sans-serif" }}>AURUM</span>
        </motion.div>

        <motion.div className="w-full max-w-[420px]"
          initial={{ opacity:0, y:24 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.6, delay:0.1 }}>

          {/* tabs */}
          <div className="flex mb-8 p-1 rounded-xl gap-1" style={{ background:"rgba(255,255,255,0.04)", border:"1px solid rgba(212,175,55,0.08)" }}>
            {([
              { key:"login",    label:"Entrar",       icon: LogIn },
              { key:"register", label:"Criar conta",  icon: UserPlus },
            ] as const).map(({ key, label, icon: Icon }) => (
              <button key={key} onClick={() => switchMode(key)}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-[13px] font-medium transition-all duration-200"
                style={{
                  background: mode === key ? "linear-gradient(135deg,#D4AF37,#B8952A)" : "transparent",
                  color: mode === key ? "#0A0A0A" : "#52525B",
                  fontFamily: "'Instrument Sans',sans-serif",
                }}>
                <Icon size={13} />
                {label}
              </button>
            ))}
          </div>

          {/* heading */}
          <AnimatePresence mode="wait">
            <motion.div key={mode} initial={{ opacity:0, y:8 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-8 }}
              transition={{ duration:0.2 }} className="mb-7">
              <p className="text-[10px] uppercase tracking-[0.16em] mb-2"
                style={{ color:"#D4AF37", fontFamily:"'Instrument Sans',sans-serif" }}>
                {mode === "login" ? "Plataforma exclusiva" : "Acesso para clientes"}
              </p>
              <h2 className="text-[30px] font-light text-white leading-tight" style={{ fontFamily:"'Instrument Sans',sans-serif" }}>
                {mode === "login" ? "Bem-vindo de volta" : "Crie sua conta"}
              </h2>
              <p className="text-[13px] mt-1.5" style={{ color:"#52525B", fontFamily:"'Instrument Sans',sans-serif" }}>
                {mode === "login"
                  ? "Acesse sua plataforma financeira"
                  : "Disponível apenas para quem já adquiriu o acesso"}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* email */}
            <div>
              <label className="label-xs block mb-1.5">E-mail</label>
              <div className="relative">
                <Mail size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color:"#3F3F46" }} />
                <input type="email" className="input-premium w-full pl-10" placeholder="seu@email.com"
                  value={email} onChange={e => setEmail(e.target.value)} required />
              </div>
            </div>

            {/* senha */}
            <div>
              <div className="flex justify-between mb-1.5">
                <label className="label-xs">Senha</label>
                {mode === "login" && (
                  <button type="button" className="text-[11px] hover:text-[#D4AF37] transition-colors"
                    style={{ color:"#52525B", fontFamily:"'Instrument Sans',sans-serif" }}>
                    Esqueci a senha
                  </button>
                )}
              </div>
              <div className="relative">
                <Lock size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color:"#3F3F46" }} />
                <input type={showPass ? "text" : "password"} className="input-premium w-full pl-10 pr-11"
                  placeholder={mode === "register" ? "Mínimo 6 caracteres" : "Sua senha"}
                  value={password} onChange={e => setPassword(e.target.value)} required />
                <button type="button" onClick={() => setShowPass(v => !v)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 transition-colors"
                  style={{ color: showPass ? "#D4AF37" : "#3F3F46" }}>
                  {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
              {/* força da senha no registro */}
              {mode === "register" && password.length > 0 && (
                <div className="flex gap-1 mt-2">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="flex-1 h-1 rounded-full transition-all" style={{
                      background: password.length >= i * 3
                        ? i <= 1 ? "#EF4444" : i <= 2 ? "#F59E0B" : i <= 3 ? "#3B82F6" : "#22C55E"
                        : "#1A1A1A"
                    }} />
                  ))}
                </div>
              )}
            </div>

            {/* confirmar senha (só no register) */}
            <AnimatePresence>
              {mode === "register" && (
                <motion.div initial={{ opacity:0, height:0 }} animate={{ opacity:1, height:"auto" }} exit={{ opacity:0, height:0 }}
                  className="overflow-hidden">
                  <label className="label-xs block mb-1.5">Confirmar senha</label>
                  <div className="relative">
                    <Lock size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color:"#3F3F46" }} />
                    <input type={showConf ? "text" : "password"} className="input-premium w-full pl-10 pr-11"
                      placeholder="Repita a senha"
                      value={confirm} onChange={e => setConfirm(e.target.value)} required={mode === "register"} />
                    <button type="button" onClick={() => setShowConf(v => !v)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 transition-colors"
                      style={{ color: showConf ? "#D4AF37" : "#3F3F46" }}>
                      {showConf ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                  </div>
                  {confirm.length > 0 && (
                    <p className="text-[11px] mt-1.5 ml-1" style={{ color: confOk ? "#22C55E" : "#EF4444", fontFamily:"'Instrument Sans',sans-serif" }}>
                      {confOk ? "✓ Senhas coincidem" : "✗ Senhas não coincidem"}
                    </p>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

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
              {success && (
                <motion.div initial={{ opacity:0, height:0 }} animate={{ opacity:1, height:"auto" }} exit={{ opacity:0, height:0 }}
                  className="overflow-hidden">
                  <div className="p-3 rounded-xl text-[12.5px]"
                    style={{ background:"rgba(34,197,94,0.08)", border:"1px solid rgba(34,197,94,0.2)", color:"#22C55E", fontFamily:"'Instrument Sans',sans-serif" }}>
                    {success}
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
                  <span>{mode === "login" ? "Verificando..." : "Criando conta..."}</span>
                </>
              ) : (
                <>
                  <span>{mode === "login" ? "Entrar na plataforma" : "Criar minha conta"}</span>
                  <ArrowRight size={15} />
                </>
              )}
            </motion.button>
          </form>

          {/* info */}
          <div className="mt-6 p-4 rounded-xl" style={{ background:"rgba(212,175,55,0.04)", border:"1px solid rgba(212,175,55,0.1)" }}>
            <p className="text-[12px] text-center" style={{ color:"#52525B", fontFamily:"'Instrument Sans',sans-serif" }}>
              {mode === "login" ? (
                <>🔒 Acesso exclusivo para clientes.<br/>
                <span style={{ color:"#3F3F46" }}>Após a compra, você recebe o link de ativação por e-mail.</span></>
              ) : (
                <>✦ Crie sua conta gratuitamente e comece agora.<br/>
                <span style={{ color:"#3F3F46" }}>Já tem conta? Use a aba Entrar.</span></>
              )}
            </p>
          </div>

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
