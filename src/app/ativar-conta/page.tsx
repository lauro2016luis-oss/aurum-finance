"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, Lock, CheckCircle2, XCircle, Loader2 } from "lucide-react";

/* ── password strength ──────────────────────────────────── */
function strength(p: string): { score: number; label: string; color: string } {
  let s = 0;
  if (p.length >= 8)  s++;
  if (p.length >= 12) s++;
  if (/[A-Z]/.test(p))  s++;
  if (/[0-9]/.test(p))  s++;
  if (/[^A-Za-z0-9]/.test(p)) s++;
  const map = [
    { label: "",        color: "#3F3F46" },
    { label: "Fraca",   color: "#EF4444" },
    { label: "Média",   color: "#F59E0B" },
    { label: "Boa",     color: "#22C55E" },
    { label: "Forte",   color: "#22C55E" },
    { label: "Ótima",   color: "#D4AF37" },
  ];
  return { score: s, ...map[s] };
}

/* ── inner component (uses useSearchParams) ─────────────── */
function ActivateContent() {
  const params  = useSearchParams();
  const router  = useRouter();
  const token   = params.get("token") ?? "";

  type Phase = "validating" | "invalid" | "form" | "submitting" | "success";
  const [phase,    setPhase]    = useState<Phase>("validating");
  const [name,     setName]     = useState("");
  const [password, setPassword] = useState("");
  const [confirm,  setConfirm]  = useState("");
  const [showP,    setShowP]    = useState(false);
  const [showC,    setShowC]    = useState(false);
  const [error,    setError]    = useState("");

  /* validate token on mount */
  useEffect(() => {
    if (!token) { setPhase("invalid"); return; }

    (async () => {
      const res = await fetch(`/api/ativar-conta/validate?token=${encodeURIComponent(token)}`);
      if (res.ok) {
        const json = await res.json();
        setName(json.customer_name ?? "");
        setPhase("form");
      } else {
        setPhase("invalid");
      }
    })();
  }, [token]);

  const pw = strength(password);
  const match = confirm.length > 0 && password === confirm;

  const handleActivate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password.length < 8) { setError("A senha deve ter no mínimo 8 caracteres."); return; }
    if (password !== confirm) { setError("As senhas não coincidem."); return; }

    setPhase("submitting");
    const res = await fetch("/api/ativar-conta/activate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, password }),
    });

    if (res.ok) {
      setPhase("success");
      setTimeout(() => router.push("/dashboard"), 2500);
    } else {
      const json = await res.json().catch(() => ({}));
      setError(json.error ?? "Erro ao ativar conta. Tente novamente.");
      setPhase("form");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6"
      style={{ background: "#080808" }}>

      {/* bg glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(212,175,55,0.05) 0%, transparent 70%)" }} />
      </div>

      <motion.div className="w-full max-w-[440px] relative z-10"
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>

        {/* logo */}
        <div className="flex items-center gap-3 justify-center mb-10">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #D4AF37, #B8952A)" }}>
            <span className="text-[#0A0A0A] font-bold text-[14px]" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>A</span>
          </div>
          <span className="text-white text-[16px] tracking-[0.12em]" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>AurumCash</span>
        </div>

        <AnimatePresence mode="wait">

          {/* VALIDATING */}
          {phase === "validating" && (
            <motion.div key="validating" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="text-center space-y-4">
              <Loader2 className="mx-auto animate-spin" size={32} style={{ color: "#D4AF37" }} />
              <p className="text-[14px]" style={{ color: "#52525B", fontFamily: "'Instrument Sans', sans-serif" }}>
                Verificando seu link…
              </p>
            </motion.div>
          )}

          {/* INVALID */}
          {phase === "invalid" && (
            <motion.div key="invalid" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              className="card-premium p-8 text-center space-y-4">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto"
                style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)" }}>
                <XCircle size={24} style={{ color: "#EF4444" }} />
              </div>
              <div>
                <h2 className="text-[22px] font-light text-white mb-2" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
                  Link inválido ou expirado
                </h2>
                <p className="text-[13px]" style={{ color: "#52525B", fontFamily: "'Instrument Sans', sans-serif" }}>
                  Este link de ativação não é válido ou já expirou. Entre em contato com o suporte se precisar de ajuda.
                </p>
              </div>
              <a href="mailto:suporte@aurumcash.app"
                className="inline-block btn-ghost py-2.5 px-6 text-[13px]">
                Falar com suporte
              </a>
            </motion.div>
          )}

          {/* FORM */}
          {phase === "form" && (
            <motion.div key="form" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              <div className="card-premium p-8">
                {/* top gold line */}
                <div className="h-0.5 rounded-full mb-7" style={{ background: "linear-gradient(90deg,#D4AF37,#B8952A,transparent)" }} />

                <div className="mb-7">
                  <p className="text-[11px] uppercase tracking-[0.16em] mb-1" style={{ color: "#D4AF37", fontFamily: "'Instrument Sans', sans-serif" }}>
                    Bem-vindo ao AurumCash
                  </p>
                  <h2 className="text-[26px] font-light text-white" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
                    {name ? `Olá, ${name.split(" ")[0]}!` : "Crie sua senha"}
                  </h2>
                  <p className="text-[13px] mt-1.5" style={{ color: "#52525B", fontFamily: "'Instrument Sans', sans-serif" }}>
                    Seu pagamento foi confirmado. Crie uma senha para acessar a plataforma.
                  </p>
                </div>

                <form onSubmit={handleActivate} className="space-y-4">
                  {/* senha */}
                  <div>
                    <label className="label-xs block mb-1.5">Nova senha</label>
                    <div className="relative">
                      <Lock size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: "#3F3F46" }} />
                      <input type={showP ? "text" : "password"}
                        className="input-premium w-full pl-10 pr-11"
                        placeholder="Mínimo 8 caracteres"
                        value={password}
                        onChange={e => setPassword(e.target.value)} />
                      <button type="button" onClick={() => setShowP(v => !v)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 transition-colors"
                        style={{ color: showP ? "#D4AF37" : "#3F3F46" }}>
                        {showP ? <EyeOff size={15} /> : <Eye size={15} />}
                      </button>
                    </div>
                    {/* strength bar */}
                    {password.length > 0 && (
                      <div className="mt-2 space-y-1">
                        <div className="flex gap-1">
                          {[1,2,3,4,5].map(i => (
                            <div key={i} className="flex-1 h-1 rounded-full transition-all duration-300"
                              style={{ background: i <= pw.score ? pw.color : "#1E1E1E" }} />
                          ))}
                        </div>
                        {pw.label && (
                          <p className="text-[11px]" style={{ color: pw.color, fontFamily: "'Instrument Sans', sans-serif" }}>
                            Senha {pw.label}
                          </p>
                        )}
                      </div>
                    )}
                  </div>

                  {/* confirmar */}
                  <div>
                    <label className="label-xs block mb-1.5">Confirmar senha</label>
                    <div className="relative">
                      <Lock size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: "#3F3F46" }} />
                      <input type={showC ? "text" : "password"}
                        className="input-premium w-full pl-10 pr-11"
                        placeholder="Repita a senha"
                        value={confirm}
                        onChange={e => setConfirm(e.target.value)} />
                      <button type="button" onClick={() => setShowC(v => !v)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 transition-colors"
                        style={{ color: showC ? "#D4AF37" : "#3F3F46" }}>
                        {showC ? <EyeOff size={15} /> : <Eye size={15} />}
                      </button>
                      {confirm.length > 0 && (
                        <div className="absolute right-9 top-1/2 -translate-y-1/2">
                          <CheckCircle2 size={14} style={{ color: match ? "#22C55E" : "#EF4444" }} />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* error */}
                  <AnimatePresence>
                    {error && (
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden">
                        <div className="p-3 rounded-xl text-[12.5px]"
                          style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)", color: "#EF4444", fontFamily: "'Instrument Sans', sans-serif" }}>
                          {error}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <button type="submit"
                    className="w-full py-3.5 rounded-xl font-medium text-[14px] flex items-center justify-center gap-2 mt-2 transition-all duration-300"
                    style={{
                      background: "linear-gradient(135deg, #D4AF37, #B8952A)",
                      color: "#0A0A0A",
                      fontFamily: "'Instrument Sans', sans-serif",
                      boxShadow: "0 8px 32px rgba(212,175,55,0.25)",
                    }}>
                    Ativar minha conta
                  </button>
                </form>
              </div>
            </motion.div>
          )}

          {/* SUBMITTING */}
          {phase === "submitting" && (
            <motion.div key="submitting" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="card-premium p-8 text-center space-y-4">
              <Loader2 className="mx-auto animate-spin" size={32} style={{ color: "#D4AF37" }} />
              <p className="text-[14px]" style={{ color: "#52525B", fontFamily: "'Instrument Sans', sans-serif" }}>
                Ativando sua conta…
              </p>
            </motion.div>
          )}

          {/* SUCCESS */}
          {phase === "success" && (
            <motion.div key="success" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
              className="card-premium p-8 text-center space-y-5">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto"
                style={{ background: "rgba(212,175,55,0.1)", border: "1px solid rgba(212,175,55,0.25)" }}>
                <CheckCircle2 size={28} style={{ color: "#D4AF37" }} />
              </div>
              <div>
                <h2 className="text-[24px] font-light text-white mb-2" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
                  Conta ativada!
                </h2>
                <p className="text-[13px]" style={{ color: "#52525B", fontFamily: "'Instrument Sans', sans-serif" }}>
                  Bem-vindo ao AurumCash. Redirecionando…
                </p>
              </div>
              <div className="flex justify-center">
                <Loader2 className="animate-spin" size={20} style={{ color: "#D4AF37" }} />
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </motion.div>
    </div>
  );
}

export default function ActivatePage() {
  return (
    <Suspense>
      <ActivateContent />
    </Suspense>
  );
}
