"use client";
import { useState } from "react";

const F = {
  h: "'Plus Jakarta Sans', sans-serif",
  d: "'DM Sans', sans-serif",
  m: "'JetBrains Mono', monospace",
};

const globalStyles = `
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,700;1,800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300&family=JetBrains+Mono:wght@300;400;500&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; }
body { background: #0A0A0A; color: #FFFFFF; font-family: 'DM Sans', sans-serif; }

.lp-wrap  { max-width: 1080px; margin: 0 auto; padding: 0 24px; }
.lp-wrap-sm { max-width: 620px; margin: 0 auto; padding: 0 24px; }
.lp-g2   { display: grid; grid-template-columns: 1fr 1fr; gap: 56px; align-items: center; }
.lp-g3   { display: grid; grid-template-columns: repeat(3,1fr); gap: 20px; }
.lp-g4   { display: grid; grid-template-columns: repeat(4,1fr); gap: 16px; }
.lp-g2p  { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
.lp-gm   { display: grid; grid-template-columns: repeat(4,1fr); gap: 32px; }
.lp-nl   { display: flex; align-items: center; gap: 32px; }
.lp-btn  { cursor: pointer; border: none; background: linear-gradient(135deg,#D4AF37,#B8952A);
           color: #0A0A0A; font-family: 'Plus Jakarta Sans', sans-serif; font-weight: 700;
           font-size: 15px; padding: 14px 28px; border-radius: 8px; display: inline-block;
           text-decoration: none; transition: opacity .2s, transform .2s; }
.lp-btn:hover { opacity: .88; transform: translateY(-1px); }
.lp-btn-ghost { cursor: pointer; border: 1px solid #3F3F46; background: transparent;
               color: #A1A1AA; font-family: 'DM Sans', sans-serif; font-size: 14px;
               padding: 10px 22px; border-radius: 8px; transition: border-color .2s, color .2s; }
.lp-btn-ghost:hover { border-color: #D4AF37; color: #D4AF37; }
.lp-card { background: #111111; border: 1px solid #1F1F1F; border-radius: 16px; padding: 28px; }
.lp-card-glow { box-shadow: 0 0 0 1px #D4AF3720, 0 8px 40px #D4AF3710; }

/* Animations */
@keyframes metricIn1 {
  0%,100%{opacity:0;transform:translateY(8px)} 8%,30%{opacity:1;transform:translateY(0)}
  38%,100%{opacity:0;transform:translateY(-8px)}
}
@keyframes metricIn2 {
  0%,12%,100%{opacity:0;transform:translateY(8px)} 20%,42%{opacity:1;transform:translateY(0)}
  50%,100%{opacity:0;transform:translateY(-8px)}
}
@keyframes metricIn3 {
  0%,24%,100%{opacity:0;transform:translateY(8px)} 32%,54%{opacity:1;transform:translateY(0)}
  62%,100%{opacity:0;transform:translateY(-8px)}
}
@keyframes metricIn4 {
  0%,36%,100%{opacity:0;transform:translateY(8px)} 44%,66%{opacity:1;transform:translateY(0)}
  74%,100%{opacity:0;transform:translateY(-8px)}
}
@keyframes drawLine1 {
  0%{stroke-dashoffset:300} 40%{stroke-dashoffset:0} 80%{stroke-dashoffset:0} 100%{stroke-dashoffset:-300}
}
@keyframes drawLine2 {
  0%,8%{stroke-dashoffset:300} 48%{stroke-dashoffset:0} 88%{stroke-dashoffset:0} 100%{stroke-dashoffset:-300}
}
@keyframes drawLine3 {
  0%,16%{stroke-dashoffset:300} 56%{stroke-dashoffset:0} 96%{stroke-dashoffset:0} 100%{stroke-dashoffset:-300}
}
@keyframes dash1 {
  0%,5%{stroke-dasharray:0 157} 40%{stroke-dasharray:50 107} 80%,100%{stroke-dasharray:50 107}
}
@keyframes dash2 {
  0%,10%{stroke-dasharray:0 157} 45%{stroke-dasharray:40 117} 85%,100%{stroke-dasharray:40 117}
}
@keyframes dash3 {
  0%,15%{stroke-dasharray:0 157} 50%{stroke-dasharray:30 127} 90%,100%{stroke-dasharray:30 127}
}
@keyframes dash4 {
  0%,20%{stroke-dasharray:0 157} 55%{stroke-dasharray:22 135} 95%,100%{stroke-dasharray:22 135}
}
@keyframes dash5 {
  0%,25%{stroke-dasharray:0 157} 60%{stroke-dasharray:15 142} 99%,100%{stroke-dasharray:15 142}
}
@keyframes idash1 {
  0%,5%{stroke-dasharray:0 157} 35%{stroke-dasharray:63 94} 75%,100%{stroke-dasharray:63 94}
}
@keyframes idash2 {
  0%,10%{stroke-dasharray:0 157} 40%{stroke-dasharray:47 110} 80%,100%{stroke-dasharray:47 110}
}
@keyframes idash3 {
  0%,15%{stroke-dasharray:0 157} 45%{stroke-dasharray:31 126} 85%,100%{stroke-dasharray:31 126}
}
@keyframes idash4 {
  0%,20%{stroke-dasharray:0 157} 50%{stroke-dasharray:16 141} 90%,100%{stroke-dasharray:16 141}
}
@keyframes cardSlide1 {
  0%,100%{opacity:0;transform:translateX(-20px)} 10%,40%{opacity:1;transform:translateX(0)}
  50%,90%{opacity:1;transform:translateX(0)} 100%{opacity:0}
}
@keyframes cardSlide2 {
  0%,18%{opacity:0;transform:translateX(-20px)} 28%,58%{opacity:1;transform:translateX(0)}
  68%,95%{opacity:1} 100%{opacity:0}
}
@keyframes cardSlide3 {
  0%,26%{opacity:0;transform:translateX(-20px)} 36%,66%{opacity:1;transform:translateX(0)}
  76%,95%{opacity:1} 100%{opacity:0}
}
@keyframes bar34 {
  0%,10%{width:0} 45%{width:34%} 80%,100%{width:34%}
}
@keyframes bar32 {
  0%,15%{width:0} 50%{width:32%} 85%,100%{width:32%}
}
@keyframes bar16 {
  0%,20%{width:0} 55%{width:16%} 90%,100%{width:16%}
}
@keyframes rowIn1 {
  0%,100%{opacity:0;transform:translateX(-10px)} 8%,35%{opacity:1;transform:translateX(0)}
  42%,92%{opacity:1} 100%{opacity:0}
}
@keyframes rowIn2 {
  0%,14%{opacity:0} 22%,49%{opacity:1} 56%,94%{opacity:1} 100%{opacity:0}
}
@keyframes rowIn3 {
  0%,20%{opacity:0} 28%,55%{opacity:1} 62%,96%{opacity:1} 100%{opacity:0}
}
@keyframes rowIn4 {
  0%,26%{opacity:0} 34%,61%{opacity:1} 68%,98%{opacity:1} 100%{opacity:0}
}
@keyframes rowIn5 {
  0%,32%{opacity:0} 40%,67%{opacity:1} 74%,99%{opacity:1} 100%{opacity:0}
}
@keyframes veraMsg1 {
  0%,100%{opacity:0;transform:translateY(6px)} 8%,38%{opacity:1;transform:translateY(0)}
  45%,95%{opacity:1}
}
@keyframes veraMsg2 {
  0%,28%{opacity:0;transform:translateY(6px)} 36%,66%{opacity:1;transform:translateY(0)}
  73%,95%{opacity:1} 100%{opacity:0}
}
@keyframes veraMsg3 {
  0%,50%{opacity:0;transform:translateY(6px)} 58%,82%{opacity:1;transform:translateY(0)}
  89%,95%{opacity:1} 100%{opacity:0}
}
@keyframes typingShow {
  0%,15%{opacity:1} 22%,55%{opacity:0} 56%,100%{opacity:0}
}
@keyframes typeDot1 {
  0%,20%,60%,100%{transform:translateY(0)} 40%{transform:translateY(-4px)}
}
@keyframes typeDot2 {
  0%,25%,65%,100%{transform:translateY(0)} 45%{transform:translateY(-4px)}
}
@keyframes typeDot3 {
  0%,30%,70%,100%{transform:translateY(0)} 50%{transform:translateY(-4px)}
}
@keyframes cursor {
  0%,49%{opacity:1} 50%,100%{opacity:0}
}
@keyframes mockGlow {
  0%,100%{box-shadow:0 0 0 1px #D4AF3730,0 8px 40px #D4AF3710}
  50%{box-shadow:0 0 0 1px #D4AF3760,0 8px 60px #D4AF3730}
}
@keyframes numShimmer {
  0%,100%{opacity:1} 50%{opacity:.6}
}
@keyframes goldPulse {
  0%,100%{color:#D4AF37} 50%{color:#E8CC6A}
}
@keyframes greenBlink {
  0%,100%{opacity:1} 50%{opacity:.5}
}
@keyframes ping {
  0%{transform:scale(1);opacity:1} 75%,100%{transform:scale(2);opacity:0}
}
@keyframes fadeUp {
  from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)}
}
@keyframes gradShift {
  0%,100%{background-position:0% 50%} 50%{background-position:100% 50%}
}

.lp-hero-h1 {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: clamp(32px,4.2vw,60px);
  font-weight: 800;
  line-height: 1.12;
  letter-spacing: -0.03em;
}
.lp-gold-txt {
  background: linear-gradient(135deg,#D4AF37,#E8CC6A,#B8952A);
  background-size: 200% 200%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: gradShift 4s ease infinite;
}
.lp-section { padding: 96px 0; }
.lp-section-sm { padding: 64px 0; }
.lp-divider { width: 100%; height: 1px; background: linear-gradient(90deg, transparent, #2A2A2A, transparent); }

@media(max-width:900px){
  .lp-g2{grid-template-columns:1fr;gap:40px}
  .lp-g3{grid-template-columns:1fr 1fr}
  .lp-g4{grid-template-columns:1fr 1fr}
  .lp-gm{grid-template-columns:1fr 1fr}
  .lp-hide-mob{display:none}
}
@media(max-width:600px){
  .lp-g3{grid-template-columns:1fr}
  .lp-g4{grid-template-columns:1fr}
  .lp-gm{grid-template-columns:1fr}
  .lp-g2p{grid-template-columns:1fr}
}
`;

// ─── helpers ──────────────────────────────────────────────────────────────────
function Gold({ children }: { children: React.ReactNode }) {
  return <span className="lp-gold-txt">{children}</span>;
}

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span style={{
      display: "inline-block",
      background: "#1A1400",
      border: "1px solid #D4AF3740",
      color: "#D4AF37",
      fontFamily: F.d,
      fontSize: 12,
      fontWeight: 600,
      letterSpacing: "0.1em",
      textTransform: "uppercase" as const,
      padding: "5px 14px",
      borderRadius: 100,
      marginBottom: 20,
    }}>
      {children}
    </span>
  );
}

function FAQ({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{
      borderBottom: "1px solid #1F1F1F",
      padding: "20px 0",
    }}>
      <button onClick={() => setOpen(!open)} style={{
        width: "100%", background: "none", border: "none", cursor: "pointer",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        gap: 16,
      }}>
        <span style={{ fontFamily: F.h, fontSize: 16, fontWeight: 600, color: "#FFFFFF", textAlign: "left" as const }}>{q}</span>
        <span style={{ color: "#D4AF37", fontSize: 22, lineHeight: 1, flexShrink: 0, transform: open ? "rotate(45deg)" : "none", transition: "transform .2s" }}>+</span>
      </button>
      {open && (
        <p style={{ fontFamily: F.d, fontSize: 14, color: "#A1A1AA", lineHeight: 1.7, marginTop: 12, paddingRight: 32 }}>{a}</p>
      )}
    </div>
  );
}

// ─── sidebar shared in mocks ───────────────────────────────────────────────────
function Sidebar({ active }: { active: string }) {
  const items = [
    { icon: "⬛", label: "Dashboard" },
    { icon: "💳", label: "Cartões" },
    { icon: "📈", label: "Investimentos" },
    { icon: "🤖", label: "Vera IA" },
    { icon: "📋", label: "Relatórios" },
  ];
  return (
    <div style={{ width: 44, background: "#0D0D0D", borderRight: "1px solid #1F1F1F", display: "flex", flexDirection: "column", alignItems: "center", padding: "12px 0", gap: 4, flexShrink: 0 }}>
      <div style={{ width: 22, height: 22, background: "linear-gradient(135deg,#D4AF37,#B8952A)", borderRadius: 5, marginBottom: 12 }} />
      {items.map(item => (
        <div key={item.label} title={item.label} style={{
          width: 32, height: 32, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 13, cursor: "pointer",
          background: item.label === active ? "#1A1400" : "transparent",
          border: item.label === active ? "1px solid #D4AF3740" : "1px solid transparent",
        }}>
          {item.icon}
        </div>
      ))}
    </div>
  );
}

// ─── animated mocks ────────────────────────────────────────────────────────────
function MockDashboard() {
  const metrics = [
    { label: "Saldo Total", val: "R$ 24.830", sub: "+8.2% este mês", color: "#D4AF37" },
    { label: "Receita", val: "R$ 12.400", sub: "+14% vs anterior", color: "#22C55E" },
    { label: "Despesas", val: "R$ 7.640", sub: "-3% vs anterior", color: "#F87171" },
    { label: "Investido", val: "R$ 4.790", sub: "+12.5% retorno", color: "#818CF8" },
  ];
  const anims = ["metricIn1","metricIn2","metricIn3","metricIn4"];
  return (
    <div style={{ display: "flex", height: "100%", overflow: "hidden" }}>
      <Sidebar active="Dashboard" />
      <div style={{ flex: 1, padding: "12px", overflow: "hidden", display: "flex", flexDirection: "column", gap: 10 }}>
        <div style={{ fontFamily: F.h, fontWeight: 700, fontSize: 13, color: "#FFFFFF" }}>Dashboard</div>
        {/* metrics */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
          {metrics.map((m, i) => (
            <div key={m.label} style={{ background: "#0D0D0D", border: "1px solid #1F1F1F", borderRadius: 8, padding: "8px 10px",
              animation: `${anims[i]} 9s ease-in-out infinite`, animationDelay: `${i * 0.3}s` }}>
              <div style={{ fontFamily: F.d, fontSize: 9, color: "#52525B", marginBottom: 2 }}>{m.label}</div>
              <div style={{ fontFamily: F.m, fontSize: 13, fontWeight: 500, color: m.color }}>{m.val}</div>
              <div style={{ fontFamily: F.d, fontSize: 9, color: "#52525B" }}>{m.sub}</div>
            </div>
          ))}
        </div>
        {/* chart */}
        <div style={{ background: "#0D0D0D", border: "1px solid #1F1F1F", borderRadius: 8, padding: "8px 10px", flex: 1 }}>
          <div style={{ fontFamily: F.d, fontSize: 9, color: "#52525B", marginBottom: 6 }}>Evolução financeira</div>
          <svg width="100%" height="60" viewBox="0 0 200 60" preserveAspectRatio="none">
            <path d="M0 50 L30 40 L60 45 L90 25 L120 30 L150 15 L180 20 L200 10" fill="none" stroke="#D4AF3760" strokeWidth="1" strokeDasharray="300" style={{ animation: "drawLine1 9s ease-in-out infinite" }} />
            <path d="M0 55 L30 50 L60 52 L90 42 L120 44 L150 35 L180 38 L200 28" fill="none" stroke="#22C55E60" strokeWidth="1" strokeDasharray="300" style={{ animation: "drawLine2 9s ease-in-out infinite" }} />
            <path d="M0 58 L30 55 L60 56 L90 52 L120 53 L150 48 L180 50 L200 44" fill="none" stroke="#F8717160" strokeWidth="1" strokeDasharray="300" style={{ animation: "drawLine3 9s ease-in-out infinite" }} />
          </svg>
        </div>
        {/* donut */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, background: "#0D0D0D", border: "1px solid #1F1F1F", borderRadius: 8, padding: "8px 10px" }}>
          <svg width="44" height="44" viewBox="0 0 44 44">
            <circle cx="22" cy="22" r="15" fill="none" stroke="#1F1F1F" strokeWidth="6" />
            <circle cx="22" cy="22" r="15" fill="none" stroke="#D4AF37" strokeWidth="6" strokeDasharray="0 157" strokeLinecap="round" transform="rotate(-90 22 22)" style={{ animation: "dash1 9s ease-in-out infinite" }} />
            <circle cx="22" cy="22" r="15" fill="none" stroke="#22C55E" strokeWidth="6" strokeDasharray="0 157" strokeLinecap="round" transform="rotate(-90 22 22)" strokeDashoffset="-50" style={{ animation: "dash2 9s ease-in-out infinite" }} />
            <circle cx="22" cy="22" r="15" fill="none" stroke="#F87171" strokeWidth="6" strokeDasharray="0 157" strokeLinecap="round" transform="rotate(-90 22 22)" strokeDashoffset="-90" style={{ animation: "dash3 9s ease-in-out infinite" }} />
            <circle cx="22" cy="22" r="15" fill="none" stroke="#818CF8" strokeWidth="6" strokeDasharray="0 157" strokeLinecap="round" transform="rotate(-90 22 22)" strokeDashoffset="-120" style={{ animation: "dash4 9s ease-in-out infinite" }} />
          </svg>
          <div style={{ flex: 1 }}>
            {[["Alimentação","#D4AF37","32%"],["Moradia","#22C55E","25%"],["Transporte","#F87171","19%"],["Outros","#818CF8","24%"]].map(([cat,col,pct]) => (
              <div key={cat as string} style={{ display: "flex", justifyContent: "space-between", marginBottom: 2 }}>
                <span style={{ fontFamily: F.d, fontSize: 9, color: "#A1A1AA", display: "flex", alignItems: "center", gap: 4 }}>
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: col as string, display: "inline-block" }} />{cat}
                </span>
                <span style={{ fontFamily: F.m, fontSize: 9, color: col as string }}>{pct}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function MockCartoes() {
  const cards = [
    { bank: "Nubank", limit: "R$ 8.000", used: "R$ 2.720", color: "#820AD1" },
    { bank: "Itaú", limit: "R$ 12.000", used: "R$ 3.840", color: "#F97316" },
    { bank: "XP", limit: "R$ 5.000", used: "R$ 800", color: "#D4AF37" },
  ];
  const barAnims = ["bar34","bar32","bar16"];
  const slideAnims = ["cardSlide1","cardSlide2","cardSlide3"];
  return (
    <div style={{ display: "flex", height: "100%", overflow: "hidden" }}>
      <Sidebar active="Cartões" />
      <div style={{ flex: 1, padding: "12px", overflow: "hidden", display: "flex", flexDirection: "column", gap: 8 }}>
        <div style={{ fontFamily: F.h, fontWeight: 700, fontSize: 13, color: "#FFFFFF" }}>Cartões</div>
        {cards.map((c, i) => (
          <div key={c.bank} style={{
            background: "#0D0D0D", border: "1px solid #1F1F1F", borderRadius: 8, padding: "10px 12px",
            animation: `${slideAnims[i]} 9s ease-in-out infinite`, animationDelay: `${i * 0.2}s`,
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: c.color }} />
                <span style={{ fontFamily: F.h, fontSize: 11, fontWeight: 600, color: "#FFFFFF" }}>{c.bank}</span>
              </div>
              <span style={{ fontFamily: F.m, fontSize: 10, color: c.color, animation: "numShimmer 2s ease-in-out infinite" }}>{c.used}</span>
            </div>
            <div style={{ background: "#1F1F1F", borderRadius: 100, height: 4, overflow: "hidden" }}>
              <div style={{
                height: "100%", borderRadius: 100,
                background: `linear-gradient(90deg, ${c.color}, ${c.color}88)`,
                width: "0%",
                animation: `${barAnims[i]} 9s ease-in-out infinite`,
              }} />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
              <span style={{ fontFamily: F.d, fontSize: 9, color: "#52525B" }}>Limite: {c.limit}</span>
              <span style={{ fontFamily: F.d, fontSize: 9, color: "#52525B" }}>{["34%","32%","16%"][i]} utilizado</span>
            </div>
          </div>
        ))}
        <div style={{ background: "#0D0D0D", border: "1px solid #1F1F1F", borderRadius: 8, padding: "8px 12px", marginTop: "auto" }}>
          <div style={{ fontFamily: F.d, fontSize: 9, color: "#52525B" }}>Total de faturas este mês</div>
          <div style={{ fontFamily: F.m, fontSize: 14, fontWeight: 500, color: "#D4AF37", animation: "goldPulse 3s ease-in-out infinite" }}>R$ 7.360</div>
        </div>
      </div>
    </div>
  );
}

function MockInvestimentos() {
  const assets = [
    { name: "Tesouro IPCA+", pct: "40%", val: "R$ 12.400", ret: "+11.2%", color: "#D4AF37" },
    { name: "Ações IBOV", pct: "30%", val: "R$ 9.300", ret: "+8.7%", color: "#22C55E" },
    { name: "FIIs", pct: "20%", val: "R$ 6.200", ret: "+6.3%", color: "#818CF8" },
    { name: "Cripto", pct: "10%", val: "R$ 3.100", ret: "+24.1%", color: "#F59E0B" },
  ];
  const rowAnims = ["rowIn1","rowIn2","rowIn3","rowIn4"];
  return (
    <div style={{ display: "flex", height: "100%", overflow: "hidden" }}>
      <Sidebar active="Investimentos" />
      <div style={{ flex: 1, padding: "12px", overflow: "hidden", display: "flex", flexDirection: "column", gap: 8 }}>
        <div style={{ fontFamily: F.h, fontWeight: 700, fontSize: 13, color: "#FFFFFF" }}>Investimentos</div>
        <div style={{ display: "flex", alignItems: "center", gap: 12, background: "#0D0D0D", border: "1px solid #1F1F1F", borderRadius: 8, padding: "10px 12px" }}>
          <svg width="52" height="52" viewBox="0 0 52 52">
            <circle cx="26" cy="26" r="18" fill="none" stroke="#1F1F1F" strokeWidth="7" />
            <circle cx="26" cy="26" r="18" fill="none" stroke="#D4AF37" strokeWidth="7" strokeDasharray="0 157" strokeLinecap="round" transform="rotate(-90 26 26)" style={{ animation: "idash1 9s ease-in-out infinite" }} />
            <circle cx="26" cy="26" r="18" fill="none" stroke="#22C55E" strokeWidth="7" strokeDasharray="0 157" strokeLinecap="round" transform="rotate(-90 26 26)" strokeDashoffset="-63" style={{ animation: "idash2 9s ease-in-out infinite" }} />
            <circle cx="26" cy="26" r="18" fill="none" stroke="#818CF8" strokeWidth="7" strokeDasharray="0 157" strokeLinecap="round" transform="rotate(-90 26 26)" strokeDashoffset="-110" style={{ animation: "idash3 9s ease-in-out infinite" }} />
            <circle cx="26" cy="26" r="18" fill="none" stroke="#F59E0B" strokeWidth="7" strokeDasharray="0 157" strokeLinecap="round" transform="rotate(-90 26 26)" strokeDashoffset="-141" style={{ animation: "idash4 9s ease-in-out infinite" }} />
          </svg>
          <div>
            <div style={{ fontFamily: F.d, fontSize: 9, color: "#52525B" }}>Patrimônio total</div>
            <div style={{ fontFamily: F.m, fontSize: 16, fontWeight: 500, color: "#D4AF37" }}>R$ 31.000</div>
            <div style={{ fontFamily: F.d, fontSize: 9, color: "#22C55E", animation: "greenBlink 2s ease-in-out infinite" }}>▲ +9.8% no período</div>
          </div>
        </div>
        <div style={{ background: "#0D0D0D", border: "1px solid #1F1F1F", borderRadius: 8, overflow: "hidden" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr auto auto", gap: 8, padding: "6px 12px", borderBottom: "1px solid #1A1A1A" }}>
            <span style={{ fontFamily: F.d, fontSize: 9, color: "#52525B" }}>Ativo</span>
            <span style={{ fontFamily: F.d, fontSize: 9, color: "#52525B" }}>Valor</span>
            <span style={{ fontFamily: F.d, fontSize: 9, color: "#52525B", textAlign: "right" as const }}>Rend.</span>
          </div>
          {assets.map((a, i) => (
            <div key={a.name} style={{
              display: "grid", gridTemplateColumns: "1fr auto auto", gap: 8, padding: "6px 12px", borderBottom: "1px solid #1A1A1A",
              animation: `${rowAnims[i]} 9s ease-in-out infinite`, animationDelay: `${i * 0.15}s`,
            }}>
              <span style={{ fontFamily: F.d, fontSize: 9, color: "#A1A1AA", display: "flex", alignItems: "center", gap: 4 }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: a.color, display: "inline-block" }} />{a.name}
              </span>
              <span style={{ fontFamily: F.m, fontSize: 9, color: "#FFFFFF" }}>{a.val}</span>
              <span style={{ fontFamily: F.m, fontSize: 9, color: "#22C55E", textAlign: "right" as const, animation: "greenBlink 3s ease-in-out infinite" }}>{a.ret}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function MockVera() {
  return (
    <div style={{ display: "flex", height: "100%", overflow: "hidden" }}>
      <Sidebar active="Vera IA" />
      <div style={{ flex: 1, padding: "12px", overflow: "hidden", display: "flex", flexDirection: "column", gap: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 10, paddingBottom: 8, borderBottom: "1px solid #1F1F1F" }}>
          <div style={{ width: 22, height: 22, background: "linear-gradient(135deg,#D4AF37,#B8952A)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10 }}>V</div>
          <div>
            <div style={{ fontFamily: F.h, fontSize: 12, fontWeight: 700, color: "#FFFFFF" }}>Vera</div>
            <div style={{ fontFamily: F.d, fontSize: 9, color: "#22C55E" }}>● online</div>
          </div>
        </div>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8, overflow: "hidden" }}>
          {/* user message */}
          <div style={{ animation: "veraMsg1 9s ease-in-out infinite", alignSelf: "flex-end", background: "#1A1400", border: "1px solid #D4AF3730", borderRadius: "10px 10px 2px 10px", padding: "6px 10px", maxWidth: "80%" }}>
            <p style={{ fontFamily: F.d, fontSize: 10, color: "#E8CC6A" }}>Onde estou gastando mais?</p>
          </div>
          {/* typing indicator */}
          <div style={{ animation: "typingShow 9s ease-in-out infinite", alignSelf: "flex-start", background: "#111111", border: "1px solid #1F1F1F", borderRadius: "10px 10px 10px 2px", padding: "8px 12px", display: "flex", gap: 4, alignItems: "center" }}>
            <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#A1A1AA", animation: "typeDot1 1.2s ease-in-out infinite" }} />
            <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#A1A1AA", animation: "typeDot2 1.2s ease-in-out infinite" }} />
            <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#A1A1AA", animation: "typeDot3 1.2s ease-in-out infinite" }} />
          </div>
          {/* vera reply */}
          <div style={{ animation: "veraMsg2 9s ease-in-out infinite", alignSelf: "flex-start", background: "#111111", border: "1px solid #1F1F1F", borderRadius: "10px 10px 10px 2px", padding: "8px 10px", maxWidth: "90%" }}>
            <p style={{ fontFamily: F.d, fontSize: 10, color: "#A1A1AA", lineHeight: 1.5 }}>
              Analisei seus últimos 30 dias. Alimentação representa <span style={{ color: "#D4AF37", fontWeight: 600 }}>32%</span> dos gastos — R$ 2.448. Posso sugerir formas de reduzir?
            </p>
          </div>
          {/* second user message */}
          <div style={{ animation: "veraMsg3 9s ease-in-out infinite", alignSelf: "flex-end", background: "#1A1400", border: "1px solid #D4AF3730", borderRadius: "10px 10px 2px 10px", padding: "6px 10px", maxWidth: "80%" }}>
            <p style={{ fontFamily: F.d, fontSize: 10, color: "#E8CC6A" }}>Sim, quero ver!</p>
          </div>
        </div>
        <div style={{ marginTop: 8, background: "#0D0D0D", border: "1px solid #1F1F1F", borderRadius: 6, padding: "6px 10px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontFamily: F.d, fontSize: 10, color: "#52525B" }}>
            Pergunte à Vera<span style={{ animation: "cursor .8s step-end infinite" }}>|</span>
          </span>
          <div style={{ width: 18, height: 18, background: "linear-gradient(135deg,#D4AF37,#B8952A)", borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, cursor: "pointer" }}>↑</div>
        </div>
      </div>
    </div>
  );
}

// ─── MAIN PAGE ─────────────────────────────────────────────────────────────────
export default function LandingPage() {
  const features = [
    { icon: "📊", title: "Dashboard em Tempo Real", desc: "Todos os seus números em um único painel: saldo, receitas, despesas e patrimônio — atualizados na hora." },
    { icon: "💳", title: "Gestão de Cartões", desc: "Controle faturas, limites e gastos de todos os seus cartões em um só lugar, sem surpresas no fechamento." },
    { icon: "📈", title: "Acompanhamento de Investimentos", desc: "Monitore sua carteira — Tesouro, ações, FIIs, criptos — e veja quanto cada ativo está rendendo de fato." },
    { icon: "🏢", title: "Finanças Empresariais", desc: "Separe pessoal de empresarial sem abrir outro aplicativo. Contas, fluxo de caixa e DRE no mesmo lugar." },
    { icon: "🎯", title: "Metas e Reservas", desc: "Defina objetivos — viagem, emergência, aposentadoria — e acompanhe o progresso com marcos automáticos." },
    { icon: "📅", title: "Planejamento Mensal", desc: "Monte seu orçamento, defina limites por categoria e receba alertas antes de estourar qualquer limite." },
  ];

  const testimonials = [
    { text: "Nunca imaginei que organizar dinheiro pudesse ser tão simples. O AURUM me mostrou R$ 2.100 que eu jogava fora todo mês sem perceber.", name: "Carolina M.", role: "Empresária", initial: "C" },
    { text: "Finalmente tenho visão clara do fluxo de caixa da minha empresa. O que levava horas em planilha agora está sempre atualizado automaticamente.", name: "Roberto T.", role: "MEI — Consultoria", initial: "R" },
    { text: "A Vera me avisou que eu estava gastando 40% acima do orçamento em restaurantes. Economizei R$ 800 só no mês seguinte.", name: "Amanda S.", role: "Designer Freelancer", initial: "A" },
    { text: "Juntei minha vida financeira pessoal e do escritório num lugar só. Simples, rápido e sem enrolação.", name: "Fernando L.", role: "Advogado", initial: "F" },
    { text: "O AURUM substituiu quatro apps diferentes que eu usava. Agora tudo está conectado e faz sentido junto.", name: "Juliana P.", role: "Médica", initial: "J" },
    { text: "Comecei a investir de verdade depois que o AURUM me mostrou quanto dinheiro eu deixava parado sem rentabilidade.", name: "Marcos V.", role: "Engenheiro", initial: "M" },
  ];

  const faqs = [
    { q: "Vou precisar pagar mensalidade?", a: "Nunca. O AURUM Finance funciona com pagamento único — você paga uma vez e usa para sempre. Sem renovações, sem surpresas na fatura." },
    { q: "Serve tanto para mim quanto para minha empresa?", a: "Sim. O AURUM reúne gestão financeira pessoal e empresarial em um único sistema. Você alterna entre os contextos sem precisar de contas separadas." },
    { q: "O que é a Vera IA?", a: "A Vera é a inteligência artificial integrada ao AURUM. Ela analisa seus dados financeiros e responde perguntas em linguagem natural — tipo um contador pessoal disponível 24 horas." },
    { q: "Preciso ser expert em finanças para usar?", a: "Não precisa. O AURUM foi projetado para ser direto ao ponto: você lança os dados e o sistema organiza, categoriza e exibe tudo de forma visual e clara." },
    { q: "Meus dados ficam seguros?", a: "Sim. Todos os dados são criptografados e armazenados com os mais altos padrões de segurança. Seus dados não são compartilhados com terceiros em hipótese alguma." },
    { q: "Posso importar dados de outros apps?", a: "Sim. O AURUM permite importação via OFX, CSV e integração direta com bancos via Open Finance — trazendo seu histórico de forma rápida." },
    { q: "Funciona em celular também?", a: "Sim, o AURUM é totalmente responsivo e conta com aplicativo nativo para iOS e Android — com sincronização em tempo real entre dispositivos." },
    { q: "E se eu precisar de ajuda?", a: "Oferecemos suporte via chat, e-mail e base de conhecimento detalhada. Clientes do plano Premium também têm acesso a atendimento prioritário." },
  ];

  const painPoints = [
    "Fim do mês chega e o saldo some — sem explicação",
    "Fatura do cartão sempre maior do que esperava",
    "Empresa sem previsão de caixa para os próximos 30 dias",
    "Investimentos em planilha que nunca está atualizada",
    "Três apps diferentes para organizar as mesmas finanças",
    "Nem sabe quanto realmente entra e sai todo mês",
  ];

  const mocks = [
    { label: "Dashboard", comp: <MockDashboard /> },
    { label: "Cartões", comp: <MockCartoes /> },
    { label: "Investimentos", comp: <MockInvestimentos /> },
    { label: "Vera IA", comp: <MockVera /> },
  ];

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: globalStyles }} />

      {/* ── NAVBAR ─────────────────────────────────────────────────────────── */}
      <nav style={{ position: "sticky", top: 0, zIndex: 100, borderBottom: "1px solid #1F1F1F", background: "rgba(10,10,10,0.92)", backdropFilter: "blur(16px)" }}>
        <div className="lp-wrap" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 30, height: 30, background: "linear-gradient(135deg,#D4AF37,#B8952A)", borderRadius: 7 }} />
            <span style={{ fontFamily: F.h, fontWeight: 800, fontSize: 18, color: "#FFFFFF" }}>AURUM</span>
          </div>
          <div className="lp-nl lp-hide-mob">
            {[
              { label: "Funcionalidades", href: "#funcionalidades" },
              { label: "Vera IA", href: "#vera" },
              { label: "Preços", href: "#precos" },
              { label: "FAQ", href: "#faq" },
            ].map(link => (
              <a key={link.label} href={link.href} style={{ fontFamily: F.d, fontSize: 14, color: "#A1A1AA", textDecoration: "none", transition: "color .2s" }}
                onMouseEnter={e => (e.currentTarget.style.color = "#FFFFFF")}
                onMouseLeave={e => (e.currentTarget.style.color = "#A1A1AA")}>
                {link.label}
              </a>
            ))}
          </div>
          <a href="/login" className="lp-btn" style={{ fontSize: 13, padding: "9px 20px" }}>Começar Agora</a>
        </div>
      </nav>

      {/* ── HERO ───────────────────────────────────────────────────────────── */}
      <section style={{ padding: "96px 0 80px", position: "relative", overflow: "hidden" }}>
        {/* bg glow */}
        <div style={{ position: "absolute", top: "40%", left: "50%", transform: "translate(-50%,-50%)", width: 600, height: 400, background: "radial-gradient(ellipse, #D4AF3715 0%, transparent 70%)", pointerEvents: "none" }} />
        <div className="lp-wrap" style={{ textAlign: "center", position: "relative" }}>
          <div style={{ display: "inline-block", marginBottom: 24 }}>
            <Chip>Gestão financeira com IA — pessoal e empresarial</Chip>
          </div>
          <h1 className="lp-hero-h1" style={{ marginBottom: 24 }}>
            Seu Dinheiro Finalmente<br />
            <Gold>Trabalhando por Você</Gold><br />
            — não contra você
          </h1>
          <p style={{ fontFamily: F.d, fontSize: 18, color: "#A1A1AA", maxWidth: 560, margin: "0 auto 40px", lineHeight: 1.65 }}>
            O AURUM Finance reúne <strong style={{ color: "#FFFFFF" }}>todas as suas finanças</strong> — pessoal e empresarial — em um painel único com inteligência artificial que te ajuda a tomar decisões de verdade.
          </p>
          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <a href="#precos" className="lp-btn" style={{ fontSize: 15, padding: "15px 30px" }}>
              Quero Assumir o Controle das Minhas Finanças →
            </a>
          </div>
          <p style={{ fontFamily: F.d, fontSize: 12, color: "#52525B", marginTop: 16 }}>
            Pagamento único · Sem mensalidade · Acesso imediato
          </p>
        </div>
      </section>

      {/* ── PROBLEM ────────────────────────────────────────────────────────── */}
      <section className="lp-section" style={{ background: "#080808" }}>
        <div className="lp-wrap">
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <Chip>O problema</Chip>
            <h2 style={{ fontFamily: F.h, fontSize: "clamp(26px,3.2vw,42px)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.15, marginBottom: 16 }}>
              Esses problemas custam caro<br />— e a maioria nem percebe.
            </h2>
            <p style={{ fontFamily: F.d, fontSize: 16, color: "#A1A1AA", maxWidth: 480, margin: "0 auto" }}>
              Não é descuido. É que ninguém te deu as ferramentas certas.
            </p>
          </div>
          <div className="lp-g2p" style={{ maxWidth: 680, margin: "0 auto" }}>
            {painPoints.map((point, i) => (
              <div key={i} style={{ background: "#0D0D0D", border: "1px solid #1A1A1A", borderRadius: 10, padding: "16px 20px", display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ color: "#F87171", fontSize: 16, flexShrink: 0 }}>✕</span>
                <span style={{ fontFamily: F.d, fontSize: 14, color: "#A1A1AA", lineHeight: 1.5 }}>{point}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="lp-divider" />

      {/* ── SOLUTION ───────────────────────────────────────────────────────── */}
      <section className="lp-section">
        <div className="lp-wrap" style={{ textAlign: "center" }}>
          <Chip>A solução</Chip>
          <h2 style={{ fontFamily: F.h, fontSize: "clamp(26px,3.2vw,42px)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.15, marginBottom: 16 }}>
            O AURUM Finance foi construído<br />para acabar com <Gold>essa confusão de vez</Gold>
          </h2>
          <p style={{ fontFamily: F.d, fontSize: 16, color: "#A1A1AA", maxWidth: 520, margin: "0 auto 64px", lineHeight: 1.65 }}>
            Um único sistema que conecta suas contas bancárias, cartões, investimentos e finanças da empresa — com IA que interpreta os dados e te orienta.
          </p>
        </div>
        {/* mock grid */}
        <div className="lp-wrap">
          <div className="lp-g2p" style={{ gap: 24 }}>
            {mocks.map(({ label, comp }) => (
              <div key={label} style={{
                background: "#0D0D0D", border: "1px solid #1F1F1F", borderRadius: 14, overflow: "hidden",
                height: 260, animation: "mockGlow 4s ease-in-out infinite",
              }}>
                {comp}
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="lp-divider" />

      {/* ── FEATURES ───────────────────────────────────────────────────────── */}
      <section id="funcionalidades" className="lp-section" style={{ background: "#080808" }}>
        <div className="lp-wrap">
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <Chip>Funcionalidades</Chip>
            <h2 style={{ fontFamily: F.h, fontSize: "clamp(26px,3.2vw,42px)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.15 }}>
              Funcionalidades que fazem a diferença<br />no dia a dia
            </h2>
          </div>
          <div className="lp-g3">
            {features.map(f => (
              <div key={f.title} className="lp-card" style={{ transition: "border-color .2s, transform .2s" }}
                onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = "#D4AF3740"; (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = "#1F1F1F"; (e.currentTarget as HTMLDivElement).style.transform = "none"; }}>
                <div style={{ fontSize: 28, marginBottom: 14 }}>{f.icon}</div>
                <h3 style={{ fontFamily: F.h, fontSize: 16, fontWeight: 700, color: "#FFFFFF", marginBottom: 8 }}>{f.title}</h3>
                <p style={{ fontFamily: F.d, fontSize: 14, color: "#A1A1AA", lineHeight: 1.65 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="lp-divider" />

      {/* ── VERA ───────────────────────────────────────────────────────────── */}
      <section id="vera" className="lp-section">
        <div className="lp-wrap">
          <div className="lp-g2">
            <div>
              <Chip>Vera IA</Chip>
              <h2 style={{ fontFamily: F.h, fontSize: "clamp(26px,3.2vw,42px)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.15, marginBottom: 20 }}>
                Conheça a Vera —<br />a IA que entende<br /><Gold>suas finanças de verdade</Gold>
              </h2>
              <p style={{ fontFamily: F.d, fontSize: 15, color: "#A1A1AA", lineHeight: 1.75, marginBottom: 28 }}>
                A Vera não é um chatbot genérico. Ela acessa seus dados reais — gastos, metas, investimentos — e responde perguntas como um contador de confiança disponível 24 horas por dia.
              </p>
              {["Analisa padrões de gasto e identifica desperdícios", "Sugere ajustes no orçamento com base no seu perfil", "Responde em linguagem natural, sem termos técnicos", "Antecipa riscos antes que virem problemas"].map(item => (
                <div key={item} style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 10 }}>
                  <span style={{ color: "#D4AF37", flexShrink: 0, marginTop: 2 }}>✓</span>
                  <span style={{ fontFamily: F.d, fontSize: 14, color: "#A1A1AA" }}>{item}</span>
                </div>
              ))}
            </div>
            <div style={{
              background: "#0D0D0D", border: "1px solid #1F1F1F", borderRadius: 14,
              overflow: "hidden", height: 320, animation: "mockGlow 4s ease-in-out infinite",
            }}>
              <MockVera />
            </div>
          </div>
        </div>
      </section>

      <div className="lp-divider" />

      {/* ── FOR WHOM ───────────────────────────────────────────────────────── */}
      <section className="lp-section" style={{ background: "#080808" }}>
        <div className="lp-wrap">
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <Chip>Para quem é</Chip>
            <h2 style={{ fontFamily: F.h, fontSize: "clamp(26px,3.2vw,42px)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.15 }}>
              O AURUM foi feito para quem<br />quer <Gold>resultados, não promessas</Gold>
            </h2>
          </div>
          <div className="lp-g4">
            {[
              { emoji: "👤", title: "Pessoa Física", desc: "Quer saber exatamente para onde vai seu dinheiro e começar a acumular patrimônio de verdade." },
              { emoji: "🏢", title: "Empreendedor", desc: "Precisa de clareza sobre o fluxo de caixa, DRE e saúde financeira do negócio sem contratar um contador só pra isso." },
              { emoji: "💼", title: "Profissional Liberal", desc: "Médico, advogado, arquiteto — quem precisa separar PF de PJ e ter visibilidade sobre receita variável." },
              { emoji: "📈", title: "Investidor", desc: "Quer consolidar todos os ativos em um único painel e acompanhar a performance real de cada posição." },
            ].map(p => (
              <div key={p.title} className="lp-card" style={{ textAlign: "center" }}>
                <div style={{ fontSize: 32, marginBottom: 14 }}>{p.emoji}</div>
                <h3 style={{ fontFamily: F.h, fontSize: 16, fontWeight: 700, color: "#FFFFFF", marginBottom: 8 }}>{p.title}</h3>
                <p style={{ fontFamily: F.d, fontSize: 13, color: "#A1A1AA", lineHeight: 1.65 }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="lp-divider" />

      {/* ── PRICING ────────────────────────────────────────────────────────── */}
      <section id="precos" className="lp-section">
        <div className="lp-wrap" style={{ textAlign: "center" }}>
          <Chip>Preço</Chip>
          <h2 style={{ fontFamily: F.h, fontSize: "clamp(26px,3.2vw,42px)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.15, marginBottom: 16 }}>
            Invista uma única vez<br />— use <Gold>para sempre</Gold>
          </h2>
          <p style={{ fontFamily: F.d, fontSize: 16, color: "#A1A1AA", maxWidth: 440, margin: "0 auto 56px", lineHeight: 1.65 }}>
            Sem assinatura. Sem cobrança recorrente. Um pagamento e acesso vitalício a todas as funcionalidades e atualizações.
          </p>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div style={{
              background: "#111111", border: "1px solid #D4AF3760", borderRadius: 20,
              padding: "40px 48px", width: 360, position: "relative",
              boxShadow: "0 0 60px #D4AF3725",
            }}>
              <div style={{ position: "absolute", top: -16, left: "50%", transform: "translateX(-50%)", background: "linear-gradient(135deg,#D4AF37,#B8952A)", color: "#0A0A0A", fontFamily: F.h, fontWeight: 700, fontSize: 11, padding: "5px 20px", borderRadius: 100, whiteSpace: "nowrap" as const }}>
                🔥 OFERTA DE LANÇAMENTO
              </div>
              <div style={{ fontFamily: F.h, fontSize: 22, fontWeight: 800, color: "#FFFFFF", marginBottom: 4 }}>AURUM Finance</div>
              <div style={{ fontFamily: F.d, fontSize: 13, color: "#52525B", marginBottom: 24 }}>Acesso completo · Pagamento único · Vitalício</div>
              {/* preço comparativo riscado */}
              <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 6 }}>
                <span style={{ fontFamily: F.m, fontSize: 16, color: "#52525B", textDecoration: "line-through" }}>R$ 119,90</span>
                <span style={{ fontFamily: F.d, fontSize: 12, color: "#F87171", fontWeight: 600 }}>58% OFF</span>
              </div>
              {/* preço real */}
              <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: 28 }}>
                <span style={{ fontFamily: F.d, fontSize: 16, color: "#D4AF37", fontWeight: 500 }}>R$</span>
                <span style={{ fontFamily: F.m, fontSize: 52, fontWeight: 500, color: "#D4AF37", lineHeight: 1, animation: "goldPulse 3s ease-in-out infinite" }}>49</span>
                <span style={{ fontFamily: F.m, fontSize: 28, color: "#D4AF37", fontWeight: 500 }}>,90</span>
              </div>
              {["Dashboard pessoal e empresarial","Gestão de cartões e faturas","Controle de investimentos","Vera IA ilimitada","Metas e planejamento mensal","Relatórios automáticos","Suporte prioritário","Atualizações vitalícias"].map(f => (
                <div key={f} style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 10 }}>
                  <span style={{ color: "#D4AF37", fontSize: 13 }}>✓</span>
                  <span style={{ fontFamily: F.d, fontSize: 13, color: "#A1A1AA" }}>{f}</span>
                </div>
              ))}
              <a href="/login" className="lp-btn" style={{ width: "100%", textAlign: "center" as const, marginTop: 28, display: "block", fontSize: 15, padding: "15px 0" }}>
                Quero Entrar no AURUM Finance →
              </a>
              <p style={{ fontFamily: F.d, fontSize: 11, color: "#52525B", textAlign: "center" as const, marginTop: 12 }}>Garantia de 30 dias · Acesso imediato</p>
            </div>
          </div>
        </div>
      </section>

      <div className="lp-divider" />

      {/* ── TESTIMONIALS ───────────────────────────────────────────────────── */}
      <section className="lp-section" style={{ background: "#080808" }}>
        <div className="lp-wrap">
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <Chip>Depoimentos</Chip>
            <h2 style={{ fontFamily: F.h, fontSize: "clamp(26px,3.2vw,42px)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.15 }}>
              Mais de 2.400 pessoas<br />já <Gold>viraram o jogo financeiro</Gold>
            </h2>
          </div>
          <div className="lp-g3">
            {testimonials.map(t => (
              <div key={t.name} className="lp-card">
                <div style={{ display: "flex", gap: 4, marginBottom: 14 }}>
                  {[1,2,3,4,5].map(s => <span key={s} style={{ color: "#D4AF37", fontSize: 12 }}>★</span>)}
                </div>
                <p style={{ fontFamily: F.d, fontSize: 14, color: "#A1A1AA", lineHeight: 1.7, marginBottom: 20 }}>"{t.text}"</p>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 34, height: 34, borderRadius: "50%", background: "linear-gradient(135deg,#D4AF37,#B8952A)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: F.h, fontWeight: 700, fontSize: 14, color: "#0A0A0A" }}>{t.initial}</div>
                  <div>
                    <div style={{ fontFamily: F.h, fontSize: 13, fontWeight: 700, color: "#FFFFFF" }}>{t.name}</div>
                    <div style={{ fontFamily: F.d, fontSize: 11, color: "#52525B" }}>{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="lp-divider" />

      {/* ── FAQ ────────────────────────────────────────────────────────────── */}
      <section id="faq" className="lp-section">
        <div className="lp-wrap-sm">
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <Chip>FAQ</Chip>
            <h2 style={{ fontFamily: F.h, fontSize: "clamp(24px,3vw,38px)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.15 }}>
              Respostas antes de decidir
            </h2>
          </div>
          {faqs.map(faq => <FAQ key={faq.q} q={faq.q} a={faq.a} />)}
        </div>
      </section>

      <div className="lp-divider" />

      {/* ── FOOTER CTA ─────────────────────────────────────────────────────── */}
      <section className="lp-section" style={{ background: "#080808" }}>
        <div className="lp-wrap" style={{ textAlign: "center" }}>
          <h2 style={{ fontFamily: F.h, fontSize: "clamp(28px,3.5vw,48px)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.15, marginBottom: 20 }}>
            A decisão certa começa<br />com <Gold>uma ação agora.</Gold>
          </h2>
          <p style={{ fontFamily: F.d, fontSize: 16, color: "#A1A1AA", maxWidth: 460, margin: "0 auto 40px", lineHeight: 1.65 }}>
            Cada mês que passa sem clareza financeira é dinheiro que escorrega sem você perceber. Hora de mudar isso.
          </p>
          <a href="/login" className="lp-btn" style={{ fontSize: 16, padding: "17px 36px" }}>
            Quero Entrar no AURUM Finance Agora →
          </a>
          <p style={{ fontFamily: F.d, fontSize: 12, color: "#52525B", marginTop: 16 }}>
            Pagamento único · Garantia de 30 dias · Acesso imediato
          </p>
        </div>
      </section>

      {/* ── FOOTER ─────────────────────────────────────────────────────────── */}
      <footer style={{ borderTop: "1px solid #1F1F1F", padding: "32px 0" }}>
        <div className="lp-wrap" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 24, height: 24, background: "linear-gradient(135deg,#D4AF37,#B8952A)", borderRadius: 5 }} />
            <span style={{ fontFamily: F.h, fontWeight: 800, fontSize: 15, color: "#FFFFFF" }}>AURUM Finance</span>
          </div>
          <p style={{ fontFamily: F.d, fontSize: 12, color: "#52525B" }}>© 2025 AURUM Finance. Todos os direitos reservados.</p>
          <div style={{ display: "flex", gap: 20 }}>
            {["Termos","Privacidade","Suporte"].map(l => (
              <a key={l} href="#" style={{ fontFamily: F.d, fontSize: 12, color: "#52525B", textDecoration: "none" }}>{l}</a>
            ))}
          </div>
        </div>
      </footer>
    </>
  );
}
