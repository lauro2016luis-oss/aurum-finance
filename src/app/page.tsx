'use client';

import { useState } from 'react';

/* ─── DATA ──────────────────────────────────────────────────── */
const faqData = [
  { q: 'O acesso é vitalício?', a: 'Sim. Você paga uma única vez e tem acesso completo ao AURUM Finance para sempre, sem mensalidade.' },
  { q: 'Funciona para pessoa física e empresa?', a: 'Sim. O AURUM Finance tem módulos dedicados para finanças pessoais e gestão empresarial na mesma plataforma.' },
  { q: 'Posso acessar pelo celular?', a: 'Sim. A plataforma é totalmente responsiva e funciona perfeitamente no celular, tablet e desktop.' },
  { q: 'Preciso instalar algo?', a: 'Não. O AURUM Finance é 100% web. Basta fazer login e começar a usar imediatamente.' },
  { q: 'A IA já está inclusa?', a: 'Sim. A Vera, sua gerente de contas com IA, já está inclusa no acesso. Sem custos adicionais.' },
  { q: 'Existe suporte?', a: 'Sim. Oferecemos suporte humano dedicado para te ajudar a extrair o máximo da plataforma.' },
  { q: 'Como recebo meu acesso?', a: 'Imediatamente após o pagamento. Você receberá um e-mail com as instruções de acesso em segundos.' },
  { q: 'O pagamento é único?', a: 'Sim. R$ 147 uma única vez. Sem cobranças recorrentes, sem letras miúdas, sem surpresas.' },
];

const testimonials = [
  { text: 'Hoje finalmente sei para onde meu dinheiro vai. Em 30 dias cortei R$ 1.800 em gastos invisíveis.', name: 'Carolina M.', role: 'Empresária', initial: 'C' },
  { text: 'Minha empresa ficou muito mais organizada. O DRE automático e a Vera viraram meu braço direito.', name: 'Rafael S.', role: 'Dono de agência', initial: 'R' },
  { text: 'Consegui reduzir gastos que eu nem percebia. Em 2 meses já estava no positivo.', name: 'Juliana P.', role: 'Profissional liberal', initial: 'J' },
  { text: 'Previsibilidade de caixa de outro nível. Tomamos decisões muito mais rápidas e seguras.', name: 'Marcos T.', role: 'CEO de SaaS', initial: 'M' },
  { text: 'A clareza que o AURUM me deu não tem preço. Bati minha primeira meta de reserva em 4 meses.', name: 'Beatriz L.', role: 'Mãe e investidora', initial: 'B' },
  { text: 'Eu fugia de planilha. Aqui é tudo automático. A Vera me responde como se fosse meu gerente.', name: 'Eduardo F.', role: 'Comerciante', initial: 'E' },
];

/* ─── CSS: FONTS + ANIMATIONS ───────────────────────────────── */
const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300;1,9..40,400&display=swap');

  /* ─ Metric cards stagger ─ */
  @keyframes metricIn {
    0%, 100% { opacity: 0; transform: translateY(7px); }
    12%, 85% { opacity: 1; transform: translateY(0); }
  }

  /* ─ SVG line draw ─ */
  @keyframes drawLine1 {
    0%, 5% { stroke-dashoffset: 420; opacity: 0; }
    8% { opacity: 1; }
    55%, 100% { stroke-dashoffset: 0; opacity: 1; }
  }
  @keyframes drawLine2 {
    0%, 10% { stroke-dashoffset: 390; opacity: 0; }
    14% { opacity: 1; }
    60%, 100% { stroke-dashoffset: 0; opacity: 1; }
  }
  @keyframes drawLine3 {
    0%, 15% { stroke-dashoffset: 380; opacity: 0; }
    18% { opacity: 1; }
    65%, 100% { stroke-dashoffset: 0; opacity: 1; }
  }

  /* ─ Donut dashboard fills ─ */
  @keyframes dash1 {
    0%, 8% { stroke-dasharray: 0 175.9; }
    55%, 100% { stroke-dasharray: 56.3 175.9; }
  }
  @keyframes dash2 {
    0%, 14% { stroke-dasharray: 0 175.9; }
    58%, 100% { stroke-dasharray: 33.4 175.9; }
  }
  @keyframes dash3 {
    0%, 20% { stroke-dasharray: 0 175.9; }
    61%, 100% { stroke-dasharray: 28.1 175.9; }
  }
  @keyframes dash4 {
    0%, 26% { stroke-dasharray: 0 175.9; }
    64%, 100% { stroke-dasharray: 15.8 175.9; }
  }
  @keyframes dash5 {
    0%, 32% { stroke-dasharray: 0 175.9; }
    67%, 100% { stroke-dasharray: 10.6 175.9; }
  }

  /* ─ Investments donut ─ */
  @keyframes idash1 {
    0%, 8% { stroke-dasharray: 0 201.1; }
    55%, 100% { stroke-dasharray: 26.1 201.1; }
  }
  @keyframes idash2 {
    0%, 15% { stroke-dasharray: 0 201.1; }
    58%, 100% { stroke-dasharray: 54.3 201.1; }
  }
  @keyframes idash3 {
    0%, 22% { stroke-dasharray: 0 201.1; }
    62%, 100% { stroke-dasharray: 88.5 201.1; }
  }
  @keyframes idash4 {
    0%, 30% { stroke-dasharray: 0 201.1; }
    66%, 100% { stroke-dasharray: 46.3 201.1; }
  }
  @keyframes idash5 {
    0%, 38% { stroke-dasharray: 0 201.1; }
    70%, 100% { stroke-dasharray: 15.5 201.1; }
  }

  /* ─ Card slides (Cartões) ─ */
  @keyframes cardSlide1 {
    0%, 8%, 100% { opacity: 0; transform: translateX(-14px); }
    18%, 88% { opacity: 1; transform: translateX(0); }
  }
  @keyframes cardSlide2 {
    0%, 18%, 100% { opacity: 0; transform: translateX(-14px); }
    28%, 88% { opacity: 1; transform: translateX(0); }
  }
  @keyframes cardSlide3 {
    0%, 28%, 100% { opacity: 0; transform: translateX(-14px); }
    38%, 88% { opacity: 1; transform: translateX(0); }
  }

  /* ─ Progress bar fills ─ */
  @keyframes bar34 {
    0%, 20%, 100% { width: 0%; }
    50%, 85% { width: 34%; }
  }
  @keyframes bar32 {
    0%, 27%, 100% { width: 0%; }
    55%, 85% { width: 32%; }
  }
  @keyframes bar16 {
    0%, 34%, 100% { width: 0%; }
    60%, 85% { width: 16%; }
  }

  /* ─ Gold shimmer pulse ─ */
  @keyframes goldPulse {
    0%, 100% { filter: brightness(1); }
    50% { filter: brightness(1.4) drop-shadow(0 0 6px rgba(212,175,55,0.6)); }
  }

  /* ─ Table row fade ─ */
  @keyframes rowIn1 { 0%,10%,100%{opacity:0;transform:translateX(-8px)} 20%,85%{opacity:1;transform:translateX(0)} }
  @keyframes rowIn2 { 0%,17%,100%{opacity:0;transform:translateX(-8px)} 27%,85%{opacity:1;transform:translateX(0)} }
  @keyframes rowIn3 { 0%,24%,100%{opacity:0;transform:translateX(-8px)} 34%,85%{opacity:1;transform:translateX(0)} }
  @keyframes rowIn4 { 0%,31%,100%{opacity:0;transform:translateX(-8px)} 41%,85%{opacity:1;transform:translateX(0)} }
  @keyframes rowIn5 { 0%,38%,100%{opacity:0;transform:translateX(-8px)} 48%,85%{opacity:1;transform:translateX(0)} }

  /* ─ Green rendimento pulse ─ */
  @keyframes greenBlink {
    0%, 100% { opacity: 1; color: #22C55E; }
    40%, 60% { opacity: 0.4; }
  }

  /* ─ Vera messages ─ */
  @keyframes veraMsg1 {
    0%, 100% { opacity: 0; transform: translateY(8px); }
    8%, 88% { opacity: 1; transform: translateY(0); }
  }
  @keyframes veraMsg2 {
    0%, 28%, 100% { opacity: 0; transform: translateY(8px); }
    36%, 88% { opacity: 1; transform: translateY(0); }
  }
  @keyframes veraMsg3 {
    0%, 50%, 100% { opacity: 0; transform: translateY(8px); }
    58%, 88% { opacity: 1; transform: translateY(0); }
  }

  /* ─ Typing indicator ─ */
  @keyframes typingShow {
    0%, 20%, 52%, 100% { opacity: 0; }
    25%, 48% { opacity: 1; }
  }
  @keyframes typeDot1 {
    0%, 100% { transform: translateY(0); opacity: 0.3; }
    16% { transform: translateY(-3px); opacity: 1; }
  }
  @keyframes typeDot2 {
    0%, 100% { transform: translateY(0); opacity: 0.3; }
    33% { transform: translateY(-3px); opacity: 1; }
  }
  @keyframes typeDot3 {
    0%, 100% { transform: translateY(0); opacity: 0.3; }
    50% { transform: translateY(-3px); opacity: 1; }
  }

  /* ─ Cursor blink ─ */
  @keyframes cursor {
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
  }

  /* ─ Online dot ─ */
  @keyframes onlinePing {
    0%, 100% { transform: scale(1); opacity: 1; }
    50% { transform: scale(1.5); opacity: 0.5; }
  }

  /* ─ Glow pulse on mock borders ─ */
  @keyframes mockGlow {
    0%, 100% { box-shadow: 0 0 0 1px #1F1F1F, 0 0 30px rgba(212,175,55,0.04); }
    50% { box-shadow: 0 0 0 1px rgba(212,175,55,0.2), 0 0 50px rgba(212,175,55,0.12); }
  }

  /* ─ Number count shimmer ─ */
  @keyframes numShimmer {
    0%, 100% { opacity: 1; }
    35%, 65% { opacity: 0.7; filter: brightness(1.5); }
  }

  /* ─ Layout helpers ─ */
  .lp-wrap { max-width: 1080px; margin: 0 auto; padding: 0 24px; }
  .lp-wrap-sm { max-width: 640px; margin: 0 auto; padding: 0 24px; }
  .lp-wrap-md { max-width: 800px; margin: 0 auto; padding: 0 24px; }
  .lp-section { padding: 96px 24px; }
  .lp-grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 48px; align-items: center; }
  .lp-grid-4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
  .lp-grid-pain { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
  .lp-grid-meta { display: grid; grid-template-columns: repeat(4, 1fr); gap: 32px; }
  .lp-grid-test { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
  .lp-grid-bene { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
  .lp-grid-para { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
  .lp-checks { display: flex; flex-direction: column; gap: 10px; }
  .lp-nav-links { display: flex; align-items: center; gap: 32px; }
  .lp-nav-cta { display: block; }
  .lp-mobile-menu-btn { display: none; }
  .lp-hero-badges { display: flex; align-items: center; justify-content: center; gap: 24px; margin-bottom: 64px; }
  .lp-sol-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
  .lp-price-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; text-align: left; }
  .lp-footer-inner { display: flex; align-items: center; justify-content: space-between; gap: 24px; }
  .lp-footer-links { display: flex; align-items: center; gap: 24px; }
  .lp-inv-order { order: 1; }
  .lp-inv-order2 { order: 2; }

  @media (max-width: 900px) {
    .lp-grid-2 { grid-template-columns: 1fr; gap: 32px; }
    .lp-grid-4 { grid-template-columns: 1fr 1fr; }
    .lp-grid-pain { grid-template-columns: 1fr; }
    .lp-grid-meta { grid-template-columns: 1fr 1fr; }
    .lp-grid-test { grid-template-columns: 1fr; }
    .lp-grid-bene { grid-template-columns: 1fr 1fr; }
    .lp-grid-para { grid-template-columns: 1fr; }
    .lp-sol-grid { grid-template-columns: 1fr 1fr; }
    .lp-nav-links { display: none; }
    .lp-nav-cta { display: none; }
    .lp-mobile-menu-btn { display: flex; }
    .lp-section { padding: 64px 20px; }
    .lp-footer-inner { flex-direction: column; text-align: center; }
    .lp-footer-links { flex-wrap: wrap; justify-content: center; }
    .lp-inv-order { order: 2; }
    .lp-inv-order2 { order: 1; }
    .lp-hero-badges { flex-wrap: wrap; gap: 12px; }
    .lp-price-grid { grid-template-columns: 1fr; }
  }
  @media (max-width: 600px) {
    .lp-grid-4 { grid-template-columns: 1fr 1fr; }
    .lp-grid-meta { grid-template-columns: 1fr 1fr; }
    .lp-sol-grid { grid-template-columns: 1fr; }
    .lp-grid-bene { grid-template-columns: 1fr 1fr; }
  }

  .lp-navlink { color: #A1A1AA; text-decoration: none; font-size: 13px; white-space: nowrap; transition: color 0.2s; }
  .lp-navlink:hover { color: #FFFFFF; }
  .lp-footer-link { color: #52525B; text-decoration: none; font-size: 12px; transition: color 0.2s; }
  .lp-footer-link:hover { color: #FFFFFF; }
  .lp-btn-cta { cursor: pointer; border: none; background: linear-gradient(135deg,#D4AF37,#B8952A); color: #0A0A0A; font-weight: 700; border-radius: 14px; transition: transform 0.2s, box-shadow 0.2s; box-shadow: 0 8px 32px rgba(212,175,55,0.28); }
  .lp-btn-cta:hover { transform: translateY(-2px); box-shadow: 0 12px 40px rgba(212,175,55,0.4); }
`;

/* ─── FONT SHORTHAND ─────────────────────────────────────────── */
const F = { syne: 'Syne, sans-serif', dm: 'DM Sans, sans-serif', mono: 'JetBrains Mono, monospace' };

/* ─── FAQ ITEM ───────────────────────────────────────────────── */
function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div onClick={() => setOpen(!open)} className="cursor-pointer rounded-2xl transition-all duration-200"
      style={{ background: open ? 'rgba(212,175,55,0.05)' : '#111111', border: `1px solid ${open ? 'rgba(212,175,55,0.3)' : '#262626'}` }}>
      <div className="flex items-center justify-between px-6 py-5">
        <span className="font-semibold text-sm pr-4" style={{ color: '#FFFFFF', fontFamily: F.dm }}>{q}</span>
        <span className="text-xl flex-shrink-0 transition-transform duration-200" style={{ color: '#D4AF37', transform: open ? 'rotate(45deg)' : 'none' }}>+</span>
      </div>
      {open && <div className="px-6 pb-5 text-sm leading-relaxed" style={{ color: '#A1A1AA', fontFamily: F.dm }}>{a}</div>}
    </div>
  );
}

/* ─── SHARED SIDEBAR ─────────────────────────────────────────── */
function Sidebar({ active }: { active: string }) {
  const groups = [
    { label: 'PRINCIPAL', items: ['Dashboard', 'Transações'] },
    { label: 'FINANÇAS', items: ['Receitas', 'Gastos Fixos', 'Cartões', 'Contas Bancárias'] },
    { label: 'PATRIMÔNIO', items: ['Investimentos', 'Metas Financeiras', 'Reserva de Emergência', 'Planejamento', 'Assinaturas'] },
    { label: 'INTELIGÊNCIA', items: ['IA Financeira'] },
  ];
  return (
    <div style={{ width: 188, background: '#111111', borderRight: '1px solid #1F1F1F', padding: '10px 0', flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 0 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '0 14px', marginBottom: 10 }}>
        <div style={{ width: 26, height: 26, borderRadius: 8, background: 'linear-gradient(135deg,#D4AF37,#B8952A)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: F.syne, fontWeight: 800, fontSize: 13, color: '#0A0A0A' }}>A</div>
        <div>
          <div style={{ color: '#FFFFFF', fontFamily: F.syne, fontSize: 12, fontWeight: 700, letterSpacing: '0.06em', lineHeight: 1 }}>AURUM</div>
          <div style={{ color: '#52525B', fontFamily: F.dm, fontSize: 8, letterSpacing: '0.1em' }}>FINANCE</div>
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 7, margin: '0 8px 10px', padding: '6px 8px', borderRadius: 10, background: '#1F1F1F' }}>
        <div style={{ width: 22, height: 22, borderRadius: '50%', background: 'linear-gradient(135deg,#D4AF37,#B8952A)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 10, color: '#0A0A0A', fontFamily: F.syne, flexShrink: 0 }}>L</div>
        <div><div style={{ color: '#FFFFFF', fontFamily: F.dm, fontSize: 9.5, fontWeight: 500 }}>Lauro Luis</div><div style={{ color: '#52525B', fontFamily: F.dm, fontSize: 8 }}>Pessoal</div></div>
      </div>
      {groups.map((g) => (
        <div key={g.label} style={{ marginBottom: 6 }}>
          <div style={{ padding: '0 14px', marginBottom: 2, color: '#3F3F46', fontFamily: F.dm, fontSize: 8.5, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase' }}>{g.label}</div>
          {g.items.map((item) => {
            const on = item === active;
            return (
              <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 6, margin: on ? '0 6px' : '0 8px', padding: '5px 10px', borderRadius: 8, background: on ? 'rgba(212,175,55,0.1)' : 'transparent', borderLeft: on ? '2px solid #D4AF37' : '2px solid transparent' }}>
                <span style={{ color: on ? '#D4AF37' : '#52525B', fontFamily: F.dm, fontSize: 9.5, fontWeight: on ? 600 : 400 }}>{item}</span>
                {item === 'IA Financeira' && <span style={{ marginLeft: 'auto', background: 'rgba(212,175,55,0.15)', color: '#D4AF37', fontSize: 6.5, fontFamily: F.dm, fontWeight: 700, padding: '1px 4px', borderRadius: 3 }}>PRO</span>}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

/* ─── MOCK: DASHBOARD ────────────────────────────────────────── */
function MockDashboard() {
  const DUR = '9s';
  return (
    <div style={{ borderRadius: 16, overflow: 'hidden', fontFamily: F.dm, animation: `mockGlow ${DUR} ease-in-out infinite`, border: '1px solid #1F1F1F', background: '#0A0A0A' }}>
      {/* Topbar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 18px', background: '#111111', borderBottom: '1px solid #1F1F1F' }}>
        <div>
          <div style={{ color: '#52525B', fontSize: 8, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase' }}>VISÃO GERAL</div>
          <div style={{ color: '#FFFFFF', fontFamily: F.syne, fontSize: 14, fontWeight: 700 }}>Dashboard</div>
        </div>
        <div style={{ display: 'flex', gap: 5 }}>
          {['Este mês','Escolher período','Ano'].map((b,i) => (
            <div key={b} style={{ padding: '4px 10px', borderRadius: 8, background: i===0?'#1F1F1F':'transparent', color: i===0?'#FFFFFF':'#52525B', border: '1px solid #262626', fontSize: 8, fontFamily: F.dm }}>{b}</div>
          ))}
        </div>
      </div>
      <div style={{ display: 'flex', minHeight: 300 }}>
        <Sidebar active="Dashboard" />
        <div style={{ flex: 1, padding: 14, overflow: 'hidden' }}>
          {/* Metric cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: 7, marginBottom: 12 }}>
            {[
              { label:'SALDO TOTAL', val:'R$ 47.382,90', badge:'+12,4%', color:'#D4AF37', delay:'0s' },
              { label:'RECEITAS', val:'R$ 18.500,00', badge:'+8,2%', color:'#22C55E', delay:'0.6s' },
              { label:'DESPESAS', val:'R$ 9.847,30', badge:'-3,1%', color:'#EF4444', delay:'1.2s' },
              { label:'PATRIMÔNIO', val:'R$ 284,5k', badge:'+2,8%', color:'#FFFFFF', delay:'1.8s' },
              { label:'LUCRO', val:'R$ 8.652,70', badge:'+18,7%', color:'#D4AF37', delay:'2.4s' },
            ].map((m) => (
              <div key={m.label} style={{ borderRadius: 10, padding: 9, background: '#111111', border: '1px solid #1F1F1F', animation: `metricIn ${DUR} ease-in-out ${m.delay} infinite` }}>
                <div style={{ color:'#52525B', fontSize:7, fontWeight:600, letterSpacing:'0.1em', textTransform:'uppercase', marginBottom:4 }}>{m.label}</div>
                <div style={{ color:m.color, fontFamily:F.mono, fontSize:10.5, letterSpacing:'-0.03em', marginBottom:3, animation:`numShimmer ${DUR} ease-in-out ${m.delay} infinite` }}>{m.val}</div>
                <div style={{ display:'inline-block', padding:'1px 4px', borderRadius:4, background:m.badge.startsWith('+')?'rgba(34,197,94,0.1)':'rgba(239,68,68,0.1)', color:m.badge.startsWith('+')?'#22C55E':'#EF4444', fontSize:7, fontFamily:F.mono }}>{m.badge}</div>
              </div>
            ))}
          </div>
          {/* Charts */}
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 8 }}>
            {/* Line chart */}
            <div style={{ borderRadius: 10, padding: 10, background: '#111111', border: '1px solid #1F1F1F' }}>
              <div style={{ color:'#52525B', fontSize:7.5, letterSpacing:'0.1em', textTransform:'uppercase' }}>FLUXO DE CAIXA</div>
              <div style={{ color:'#FFFFFF', fontFamily:F.syne, fontSize:11, fontWeight:600, marginBottom:8 }}>Receitas vs. Despesas</div>
              <div style={{ display:'flex', gap:10, marginBottom:8 }}>
                {[['#22C55E','Receitas'],['#EF4444','Despesas'],['#D4AF37','Saldo']].map(([c,l])=>(
                  <div key={l} style={{ display:'flex', alignItems:'center', gap:4 }}>
                    <div style={{ width:6, height:6, borderRadius:'50%', background:c }} />
                    <span style={{ color:'#52525B', fontSize:7.5 }}>{l}</span>
                  </div>
                ))}
              </div>
              <svg viewBox="0 0 280 80" style={{ width:'100%', height:70, display:'block' }}>
                <defs>
                  <linearGradient id="gR" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#22C55E" stopOpacity="0.18"/><stop offset="100%" stopColor="#22C55E" stopOpacity="0"/></linearGradient>
                  <linearGradient id="gD" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#EF4444" stopOpacity="0.12"/><stop offset="100%" stopColor="#EF4444" stopOpacity="0"/></linearGradient>
                </defs>
                {/* Receitas */}
                <path d="M0,52 C20,45 40,38 70,30 C100,22 120,18 150,15 C180,12 210,9 240,7 C260,5.5 272,4 280,3"
                  fill="none" stroke="#22C55E" strokeWidth="1.5"
                  strokeDasharray="420 420" style={{ animation:`drawLine1 ${DUR} ease-in-out infinite` }} />
                <path d="M0,52 C20,45 40,38 70,30 C100,22 120,18 150,15 C180,12 210,9 240,7 C260,5.5 272,4 280,3 L280,80 L0,80Z"
                  fill="url(#gR)" style={{ opacity:0.6 }} />
                {/* Despesas */}
                <path d="M0,62 C20,60 40,58 70,55 C100,52 130,50 160,52 C190,54 210,52 240,50 C260,48.5 272,47 280,46"
                  fill="none" stroke="#EF4444" strokeWidth="1.5"
                  strokeDasharray="390 390" style={{ animation:`drawLine2 ${DUR} ease-in-out infinite` }} />
                <path d="M0,62 C20,60 40,58 70,55 C100,52 130,50 160,52 C190,54 210,52 240,50 C260,48.5 272,47 280,46 L280,80 L0,80Z"
                  fill="url(#gD)" style={{ opacity:0.6 }} />
                {/* Saldo */}
                <path d="M0,67 C20,66 40,65 70,63 C100,61 130,60 160,59 C190,58 210,57 240,55 C260,54 272,53 280,52"
                  fill="none" stroke="#D4AF37" strokeWidth="1" strokeDasharray="3,2"
                  style={{ animation:`drawLine3 ${DUR} ease-in-out infinite` }} />
                {['Jan','Fev','Mar','Abr','Mai','Jun','Jul'].map((m,i)=>(
                  <text key={m} x={i*43} y={78} style={{ fill:'#3F3F46', fontSize:6.5, fontFamily:F.dm }}>{m}</text>
                ))}
              </svg>
            </div>
            {/* Donut */}
            <div style={{ borderRadius:10, padding:10, background:'#111111', border:'1px solid #1F1F1F' }}>
              <div style={{ color:'#52525B', fontSize:7.5, letterSpacing:'0.1em', textTransform:'uppercase' }}>CATEGORIAS</div>
              <div style={{ color:'#FFFFFF', fontFamily:F.syne, fontSize:11, fontWeight:600, marginBottom:8 }}>Por Categoria</div>
              <div style={{ display:'flex', justifyContent:'center', marginBottom:8 }}>
                <div style={{ position:'relative', width:70, height:70 }}>
                  <svg viewBox="0 0 70 70" style={{ width:'100%', height:'100%', transform:'rotate(-90deg)' }}>
                    <circle cx="35" cy="35" r="28" fill="none" stroke="#D4AF37" strokeWidth="10"
                      style={{ strokeDashoffset:0, animation:`dash1 ${DUR} ease-in-out infinite` }} />
                    <circle cx="35" cy="35" r="28" fill="none" stroke="#E8CC6A" strokeWidth="10"
                      strokeDashoffset={`${-32*1.759}`}
                      style={{ animation:`dash2 ${DUR} ease-in-out infinite` }} />
                    <circle cx="35" cy="35" r="28" fill="none" stroke="#B8952A" strokeWidth="10"
                      strokeDashoffset={`${-51*1.759}`}
                      style={{ animation:`dash3 ${DUR} ease-in-out infinite` }} />
                    <circle cx="35" cy="35" r="28" fill="none" stroke="#52525B" strokeWidth="10"
                      strokeDashoffset={`${-67*1.759}`}
                      style={{ animation:`dash4 ${DUR} ease-in-out infinite` }} />
                    <circle cx="35" cy="35" r="28" fill="none" stroke="#3F3F46" strokeWidth="10"
                      strokeDashoffset={`${-76*1.759}`}
                      style={{ animation:`dash5 ${DUR} ease-in-out infinite` }} />
                  </svg>
                  <div style={{ position:'absolute', inset:0, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center' }}>
                    <div style={{ color:'#52525B', fontSize:6.5, fontFamily:F.dm }}>TOTAL</div>
                    <div style={{ color:'#D4AF37', fontFamily:F.mono, fontSize:8.5, letterSpacing:'-0.03em' }}>R$ 9,8k</div>
                  </div>
                </div>
              </div>
              {[['Moradia','#D4AF37','32%'],['Alimentação','#E8CC6A','19%'],['Saúde','#B8952A','16%'],['Transporte','#52525B','9%'],['Lazer','#3F3F46','6%']].map(([l,c,p])=>(
                <div key={l} style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'2px 0' }}>
                  <div style={{ display:'flex', alignItems:'center', gap:5 }}><div style={{ width:5, height:5, borderRadius:'50%', background:c }} /><span style={{ color:'#A1A1AA', fontSize:7.5, fontFamily:F.dm }}>{l}</span></div>
                  <span style={{ color:'#52525B', fontSize:7.5, fontFamily:F.mono }}>{p}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── MOCK: CARTÕES ──────────────────────────────────────────── */
function MockCartoes() {
  const DUR = '10s';
  const cards = [
    { bank:'NUBANK', name:'Nubank Ultravioleta', last4:'4242', fatura:'R$ 8.420,50', venc:'Venc. dia 22', fecha:'Fecha dia 15', grad:'linear-gradient(135deg,#3B0764,#6D28D9)', bar:'#7C3AED', pct:34, anim:'cardSlide1', barAnim:'bar34' },
    { bank:'ITAÚ', name:'Itaú Black', last4:'8891', fatura:'R$ 12.840,00', venc:'Venc. dia 17', fecha:'Fecha dia 10', grad:'linear-gradient(135deg,#78350F,#A16207)', bar:'#F59E0B', pct:32, anim:'cardSlide2', barAnim:'bar32' },
    { bank:'XP', name:'XP Visa Infinite', last4:'1234', fatura:'R$ 3.200,00', venc:'Venc. dia 27', fecha:'Fecha dia 20', grad:'linear-gradient(135deg,#052e16,#065F46)', bar:'#10B981', pct:16, anim:'cardSlide3', barAnim:'bar16' },
  ];
  return (
    <div style={{ borderRadius:16, overflow:'hidden', fontFamily:F.dm, animation:`mockGlow ${DUR} ease-in-out infinite`, border:'1px solid #1F1F1F', background:'#0A0A0A' }}>
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'10px 18px', background:'#111111', borderBottom:'1px solid #1F1F1F' }}>
        <div>
          <div style={{ color:'#52525B', fontSize:8, fontWeight:600, letterSpacing:'0.14em', textTransform:'uppercase' }}>CRÉDITO</div>
          <div style={{ color:'#FFFFFF', fontFamily:F.syne, fontSize:14, fontWeight:700 }}>Cartões</div>
        </div>
        <div style={{ padding:'5px 12px', borderRadius:10, background:'linear-gradient(135deg,#D4AF37,#B8952A)', color:'#0A0A0A', fontSize:8.5, fontFamily:F.dm, fontWeight:700 }}>+ Adicionar Cartão</div>
      </div>
      <div style={{ display:'flex', minHeight:260 }}>
        <Sidebar active="Cartões" />
        <div style={{ flex:1, padding:14 }}>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:8, marginBottom:12 }}>
            {[
              { label:'LIMITE TOTAL', val:'R$ 85.000,00', color:'#FFFFFF' },
              { label:'UTILIZADO', val:'R$ 24.460,50', sub:'29% do limite', color:'#EF4444' },
              { label:'DISPONÍVEL', val:'R$ 60.539,50', color:'#D4AF37' },
            ].map((m)=>(
              <div key={m.label} style={{ borderRadius:10, padding:10, background:'#111111', border:'1px solid #1F1F1F' }}>
                <div style={{ color:'#52525B', fontSize:7.5, letterSpacing:'0.1em', textTransform:'uppercase', marginBottom:5 }}>{m.label}</div>
                <div style={{ color:m.color, fontFamily:F.mono, fontSize:11, letterSpacing:'-0.03em', animation:`goldPulse ${DUR} ease-in-out infinite` }}>{m.val}</div>
                {m.sub && <div style={{ color:'#52525B', fontSize:7.5, marginTop:2 }}>{m.sub}</div>}
              </div>
            ))}
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:8 }}>
            {cards.map((card)=>(
              <div key={card.name} style={{ borderRadius:12, overflow:'hidden', animation:`${card.anim} ${DUR} ease-in-out infinite` }}>
                <div style={{ background:card.grad, padding:11 }}>
                  <div style={{ display:'flex', justifyContent:'space-between', marginBottom:12 }}>
                    <div>
                      <div style={{ color:'rgba(255,255,255,0.5)', fontSize:7.5, letterSpacing:'0.1em' }}>{card.bank}</div>
                      <div style={{ color:'#FFFFFF', fontSize:9.5, fontWeight:600, fontFamily:F.dm }}>{card.name}</div>
                    </div>
                    <div style={{ width:18, height:14, borderRadius:3, background:'rgba(255,255,255,0.15)', border:'1px solid rgba(255,255,255,0.2)' }} />
                  </div>
                  <div style={{ color:'rgba(255,255,255,0.4)', fontSize:8, letterSpacing:'0.18em', marginBottom:8, fontFamily:F.mono }}>•••• {card.last4}</div>
                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end' }}>
                    <div>
                      <div style={{ color:'rgba(255,255,255,0.4)', fontSize:7 }}>Fatura</div>
                      <div style={{ color:'#FFFFFF', fontFamily:F.mono, fontSize:10 }}>{card.fatura}</div>
                    </div>
                    <div style={{ textAlign:'right' }}>
                      <div style={{ color:'rgba(255,255,255,0.4)', fontSize:7 }}>{card.venc}</div>
                      <div style={{ color:'#4ADE80', fontSize:7 }}>{card.fecha}</div>
                    </div>
                  </div>
                </div>
                <div style={{ background:card.grad, padding:'0 11px 10px' }}>
                  <div style={{ display:'flex', justifyContent:'space-between', marginBottom:4 }}>
                    <span style={{ color:'rgba(255,255,255,0.4)', fontSize:7 }}>Utilizado</span>
                    <span style={{ color:'rgba(255,255,255,0.7)', fontSize:7, fontFamily:F.mono }}>{card.pct}%</span>
                  </div>
                  <div style={{ background:'rgba(255,255,255,0.1)', height:3, borderRadius:99, overflow:'hidden' }}>
                    <div style={{ height:'100%', borderRadius:99, background:card.bar, animation:`${card.barAnim} ${DUR} ease-in-out infinite` }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── MOCK: INVESTIMENTOS ────────────────────────────────────── */
function MockInvestimentos() {
  const DUR = '10s';
  const ativos = [
    { name:'ITSA4', tipo:'Ação', inv:'R$ 8.000,00', atual:'R$ 9.840,00', rend:'+23.0%', anim:'rowIn1' },
    { name:'PETR4', tipo:'Ação', inv:'R$ 5.000,00', atual:'R$ 5.820,00', rend:'+16.4%', anim:'rowIn2' },
    { name:'BOVA11', tipo:'ETF', inv:'R$ 12.000,00', atual:'R$ 13.560,00', rend:'+13.0%', anim:'rowIn3' },
    { name:'CDB 110% CDI', tipo:'Renda Fixa', inv:'R$ 30.000,00', atual:'R$ 32.100,00', rend:'+7.0%', anim:'rowIn4' },
    { name:'Tesouro IPCA+', tipo:'Tesouro', inv:'R$ 25.000,00', atual:'R$ 27.800,00', rend:'+11.2%', anim:'rowIn5' },
  ];
  return (
    <div style={{ borderRadius:16, overflow:'hidden', fontFamily:F.dm, animation:`mockGlow ${DUR} ease-in-out infinite`, border:'1px solid #1F1F1F', background:'#0A0A0A' }}>
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'10px 18px', background:'#111111', borderBottom:'1px solid #1F1F1F' }}>
        <div>
          <div style={{ color:'#52525B', fontSize:8, fontWeight:600, letterSpacing:'0.14em', textTransform:'uppercase' }}>CARTEIRA</div>
          <div style={{ color:'#FFFFFF', fontFamily:F.syne, fontSize:14, fontWeight:700 }}>Investimentos</div>
        </div>
        <div style={{ padding:'5px 12px', borderRadius:10, background:'linear-gradient(135deg,#D4AF37,#B8952A)', color:'#0A0A0A', fontSize:8.5, fontFamily:F.dm, fontWeight:700 }}>+ Novo Ativo</div>
      </div>
      <div style={{ display:'flex', minHeight:300 }}>
        <Sidebar active="Investimentos" />
        <div style={{ flex:1, padding:14 }}>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:7, marginBottom:12 }}>
            {[
              { label:'INVESTIDO', val:'R$ 123.000,00', color:'#FFFFFF' },
              { label:'VALOR ATUAL', val:'R$ 138.000,00', color:'#FFFFFF' },
              { label:'LUCRO TOTAL', val:'R$ 15.000,00', color:'#22C55E' },
              { label:'RENTABILIDADE', val:'+12.2%', color:'#D4AF37' },
            ].map((m)=>(
              <div key={m.label} style={{ borderRadius:10, padding:9, background:'#111111', border:'1px solid #1F1F1F' }}>
                <div style={{ color:'#52525B', fontSize:7, letterSpacing:'0.1em', textTransform:'uppercase', marginBottom:4 }}>{m.label}</div>
                <div style={{ color:m.color, fontFamily:F.mono, fontSize:10, letterSpacing:'-0.03em', animation:`numShimmer ${DUR} ease-in-out infinite` }}>{m.val}</div>
              </div>
            ))}
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'2fr 3fr', gap:8 }}>
            {/* Donut */}
            <div style={{ borderRadius:10, padding:10, background:'#111111', border:'1px solid #1F1F1F' }}>
              <div style={{ color:'#52525B', fontSize:7.5, textTransform:'uppercase', letterSpacing:'0.1em' }}>DISTRIBUIÇÃO</div>
              <div style={{ color:'#FFFFFF', fontFamily:F.syne, fontSize:11, fontWeight:600, marginBottom:8 }}>Carteira</div>
              <div style={{ display:'flex', justifyContent:'center', marginBottom:8 }}>
                <div style={{ position:'relative', width:76, height:76 }}>
                  <svg viewBox="0 0 80 80" style={{ width:'100%', height:'100%', transform:'rotate(-90deg)' }}>
                    <circle cx="40" cy="40" r="32" fill="none" stroke="#D4AF37" strokeWidth="12"
                      style={{ strokeDashoffset:0, animation:`idash1 ${DUR} ease-in-out infinite` }} />
                    <circle cx="40" cy="40" r="32" fill="none" stroke="#E8CC6A" strokeWidth="12"
                      strokeDashoffset={`${-13*2.011}`}
                      style={{ animation:`idash2 ${DUR} ease-in-out infinite` }} />
                    <circle cx="40" cy="40" r="32" fill="none" stroke="#B8952A" strokeWidth="12"
                      strokeDashoffset={`${-40*2.011}`}
                      style={{ animation:`idash3 ${DUR} ease-in-out infinite` }} />
                    <circle cx="40" cy="40" r="32" fill="none" stroke="#52525B" strokeWidth="12"
                      strokeDashoffset={`${-84*2.011}`}
                      style={{ animation:`idash4 ${DUR} ease-in-out infinite` }} />
                    <circle cx="40" cy="40" r="32" fill="none" stroke="#3F3F46" strokeWidth="12"
                      strokeDashoffset={`${-107*2.011}`}
                      style={{ animation:`idash5 ${DUR} ease-in-out infinite` }} />
                  </svg>
                  <div style={{ position:'absolute', inset:0, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center' }}>
                    <div style={{ color:'#52525B', fontSize:6.5, fontFamily:F.dm }}>Total</div>
                    <div style={{ color:'#D4AF37', fontFamily:F.mono, fontSize:8.5 }}>R$ 138k</div>
                  </div>
                </div>
              </div>
              {[['Ações','#D4AF37','13.1%'],['ETFs','#E8CC6A','26.7%'],['Renda Fixa','#B8952A','44.3%'],['Tesouro','#52525B','23.2%'],['Cripto','#3F3F46','7.7%']].map(([l,c,p])=>(
                <div key={l} style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'2px 0' }}>
                  <div style={{ display:'flex', alignItems:'center', gap:4 }}><div style={{ width:5, height:5, borderRadius:'50%', background:c }} /><span style={{ color:'#A1A1AA', fontSize:7.5 }}>{l}</span></div>
                  <span style={{ color:'#D4AF37', fontSize:7.5, fontFamily:F.mono }}>{p}</span>
                </div>
              ))}
            </div>
            {/* Table */}
            <div style={{ borderRadius:10, padding:10, background:'#111111', border:'1px solid #1F1F1F' }}>
              <div style={{ color:'#52525B', fontSize:7.5, textTransform:'uppercase', letterSpacing:'0.1em' }}>POSIÇÕES</div>
              <div style={{ color:'#FFFFFF', fontFamily:F.syne, fontSize:11, fontWeight:600, marginBottom:8 }}>Ativos em Carteira</div>
              <div style={{ display:'grid', gridTemplateColumns:'1.6fr 1fr 1.2fr 1.2fr 0.9fr', gap:4, borderBottom:'1px solid #1F1F1F', paddingBottom:5, marginBottom:4 }}>
                {['ATIVO','TIPO','INVESTIDO','ATUAL','REND.'].map((h)=>(
                  <div key={h} style={{ color:'#3F3F46', fontSize:7, fontWeight:600, letterSpacing:'0.08em', textTransform:'uppercase' }}>{h}</div>
                ))}
              </div>
              {ativos.map((a)=>(
                <div key={a.name} style={{ display:'grid', gridTemplateColumns:'1.6fr 1fr 1.2fr 1.2fr 0.9fr', gap:4, padding:'5px 0', borderBottom:'1px solid #0F0F0F', animation:`${a.anim} ${DUR} ease-in-out infinite` }}>
                  <div>
                    <div style={{ color:'#FFFFFF', fontSize:8.5, fontWeight:600 }}>{a.name}</div>
                    <div style={{ color:'#52525B', fontSize:7 }}>{a.tipo}</div>
                  </div>
                  <div style={{ display:'flex', alignItems:'center' }}>
                    <span style={{ background:'#1F1F1F', color:'#A1A1AA', fontSize:7, padding:'1px 5px', borderRadius:4 }}>{a.tipo}</span>
                  </div>
                  <div style={{ color:'#A1A1AA', fontFamily:F.mono, fontSize:8, alignSelf:'center' }}>{a.inv}</div>
                  <div style={{ color:'#FFFFFF', fontFamily:F.mono, fontSize:8, alignSelf:'center' }}>{a.atual}</div>
                  <div style={{ display:'flex', alignItems:'center', gap:2, animation:`greenBlink ${DUR} ease-in-out infinite` }}>
                    <span style={{ color:'#22C55E', fontSize:8 }}>↗</span>
                    <span style={{ color:'#22C55E', fontFamily:F.mono, fontSize:8 }}>{a.rend}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── MOCK: VERA IA ──────────────────────────────────────────── */
function MockVera() {
  const DUR = '11s';
  return (
    <div style={{ borderRadius:16, overflow:'hidden', fontFamily:F.dm, animation:`mockGlow ${DUR} ease-in-out infinite`, border:'1px solid #1F1F1F', background:'#0A0A0A' }}>
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'10px 18px', background:'#111111', borderBottom:'1px solid #1F1F1F' }}>
        <div style={{ display:'flex', alignItems:'center', gap:8 }}>
          <div style={{ width:22, height:22, borderRadius:'50%', background:'linear-gradient(135deg,#D4AF37,#B8952A)', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:F.syne, fontWeight:800, fontSize:10, color:'#0A0A0A' }}>V</div>
          <div>
            <div style={{ color:'#52525B', fontSize:8, fontWeight:600, letterSpacing:'0.14em', textTransform:'uppercase' }}>INTELIGÊNCIA</div>
            <div style={{ color:'#FFFFFF', fontFamily:F.syne, fontSize:14, fontWeight:700 }}>IA Financeira</div>
          </div>
        </div>
        <div style={{ display:'flex', alignItems:'center', gap:5, padding:'4px 10px', borderRadius:99, background:'rgba(34,197,94,0.08)', border:'1px solid rgba(34,197,94,0.2)' }}>
          <div style={{ width:6, height:6, borderRadius:'50%', background:'#22C55E', animation:`onlinePing ${DUR} ease-in-out infinite` }} />
          <span style={{ color:'#22C55E', fontSize:8 }}>Vera online</span>
        </div>
      </div>
      <div style={{ display:'flex', minHeight:260 }}>
        <Sidebar active="IA Financeira" />
        <div style={{ flex:1, padding:14, display:'flex', flexDirection:'column', gap:10 }}>
          <div style={{ color:'#52525B', fontSize:8, textTransform:'uppercase', letterSpacing:'0.1em', fontWeight:600 }}>Converse com a Vera — sua gerente com IA</div>

          {/* Vera msg 1 */}
          <div style={{ display:'flex', gap:7, animation:`veraMsg1 ${DUR} ease-in-out infinite` }}>
            <div style={{ width:22, height:22, borderRadius:'50%', background:'linear-gradient(135deg,#D4AF37,#B8952A)', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:F.syne, fontWeight:800, fontSize:9, color:'#0A0A0A', flexShrink:0 }}>V</div>
            <div style={{ borderRadius:'10px 10px 10px 2px', padding:'8px 10px', background:'#171717', border:'1px solid #1F1F1F', color:'#A1A1AA', fontSize:10, lineHeight:1.5, maxWidth:'85%' }}>
              Olá! Sou a <strong style={{ color:'#D4AF37' }}>Vera</strong>, sua gerente financeira com IA. Em que posso ajudar hoje?
            </div>
          </div>

          {/* Typing indicator (shows while "waiting" for user) */}
          <div style={{ display:'flex', gap:7, animation:`typingShow ${DUR} ease-in-out infinite` }}>
            <div style={{ width:22, height:22, borderRadius:'50%', background:'linear-gradient(135deg,#D4AF37,#B8952A)', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:F.syne, fontWeight:800, fontSize:9, color:'#0A0A0A', flexShrink:0 }}>V</div>
            <div style={{ borderRadius:'10px 10px 10px 2px', padding:'8px 12px', background:'#171717', border:'1px solid #1F1F1F', display:'flex', alignItems:'center', gap:4 }}>
              <div style={{ width:5, height:5, borderRadius:'50%', background:'#52525B', animation:`typeDot1 1.2s ease-in-out infinite` }} />
              <div style={{ width:5, height:5, borderRadius:'50%', background:'#52525B', animation:`typeDot2 1.2s ease-in-out 0.2s infinite` }} />
              <div style={{ width:5, height:5, borderRadius:'50%', background:'#52525B', animation:`typeDot3 1.2s ease-in-out 0.4s infinite` }} />
            </div>
          </div>

          {/* User msg */}
          <div style={{ display:'flex', justifyContent:'flex-end', animation:`veraMsg2 ${DUR} ease-in-out infinite` }}>
            <div style={{ borderRadius:'10px 10px 2px 10px', padding:'8px 10px', background:'rgba(212,175,55,0.08)', border:'1px solid rgba(212,175,55,0.2)', color:'#E8CC6A', fontSize:10, maxWidth:'75%' }}>
              Onde estou gastando mais este mês?
            </div>
          </div>

          {/* Vera response */}
          <div style={{ display:'flex', gap:7, animation:`veraMsg3 ${DUR} ease-in-out infinite` }}>
            <div style={{ width:22, height:22, borderRadius:'50%', background:'linear-gradient(135deg,#D4AF37,#B8952A)', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:F.syne, fontWeight:800, fontSize:9, color:'#0A0A0A', flexShrink:0 }}>V</div>
            <div style={{ borderRadius:'10px 10px 10px 2px', padding:'8px 10px', background:'#171717', border:'1px solid #1F1F1F', color:'#A1A1AA', fontSize:10, lineHeight:1.5, maxWidth:'85%' }}>
              Analisando maio: <strong style={{ color:'#EF4444' }}>Moradia (32%)</strong> e <strong style={{ color:'#F59E0B' }}>Alimentação (19%)</strong> lideram. Posso sugerir cortes no Lazer — R$ 590 este mês.
            </div>
          </div>

          {/* Input */}
          <div style={{ marginTop:'auto', display:'flex', alignItems:'center', gap:8, borderRadius:12, padding:'9px 12px', background:'#171717', border:'1px solid #262626' }}>
            <span style={{ color:'#3F3F46', fontSize:9.5, flex:1 }}>Pergunte qualquer coisa à Vera...</span>
            <span style={{ color:'#3F3F46', fontSize:11, fontFamily:F.mono, animation:`cursor 1s steps(1) infinite` }}>|</span>
            <div style={{ width:20, height:20, borderRadius:'50%', background:'linear-gradient(135deg,#D4AF37,#B8952A)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
              <span style={{ color:'#0A0A0A', fontSize:10, fontWeight:700 }}>→</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── SECTION LABEL ──────────────────────────────────────────── */
function Label({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6"
      style={{ color:'#D4AF37', border:'1px solid rgba(212,175,55,0.2)', background:'rgba(212,175,55,0.05)', fontFamily:F.dm }}>
      {children}
    </div>
  );
}

function GoldText({ children }: { children: React.ReactNode }) {
  return (
    <span style={{ background:'linear-gradient(135deg,#D4AF37 0%,#E8CC6A 50%,#D4AF37 100%)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>
      {children}
    </span>
  );
}

/* ─── MAIN PAGE ──────────────────────────────────────────────── */
export default function LandingPage() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: globalStyles }} />
      <div style={{ background:'#0A0A0A', color:'#FFFFFF', fontFamily:F.dm, overflowX:'hidden' }}>

        {/* ── NAVBAR ──────────────────────────────────────── */}
        <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12"
          style={{ height:64, background:'rgba(10,10,10,0.92)', backdropFilter:'blur(24px)', borderBottom:'1px solid #1a1a1a' }}>
          <div style={{ display:'flex', alignItems:'center', gap:10 }}>
            <div style={{ width:34, height:34, borderRadius:10, background:'linear-gradient(135deg,#D4AF37,#B8952A)', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:F.syne, fontWeight:800, fontSize:16, color:'#0A0A0A' }}>A</div>
            <div>
              <div style={{ color:'#FFFFFF', fontFamily:F.syne, fontSize:17, fontWeight:800, letterSpacing:'0.04em', lineHeight:1 }}>AURUM</div>
              <div style={{ color:'rgba(212,175,55,0.45)', fontFamily:F.dm, fontSize:9, letterSpacing:'0.18em', textTransform:'uppercase' }}>Finance</div>
            </div>
          </div>
          <div className="hidden md:flex items-center" style={{ gap: 32 }}>
            {[['Funcionalidades','#funcionalidades'],['IA Financeira','#vera'],['Preço','#preco'],['FAQ','#faq']].map(([l,h])=>(
              <a key={l} href={h} style={{ color:'#A1A1AA', fontFamily:F.dm, fontSize:13, textDecoration:'none', transition:'color 0.2s', whiteSpace:'nowrap' }}
                onMouseEnter={e=>(e.currentTarget.style.color='#FFFFFF')} onMouseLeave={e=>(e.currentTarget.style.color='#A1A1AA')}>{l}</a>
            ))}
          </div>
          <button className="hidden md:block font-bold px-5 py-2.5 rounded-xl transition-all hover:scale-105"
            style={{ background:'linear-gradient(135deg,#D4AF37,#B8952A)', color:'#0A0A0A', fontSize:13, fontFamily:F.dm, fontWeight:700, boxShadow:'0 4px 20px rgba(212,175,55,0.25)' }}>
            Começar
          </button>
          <button className="md:hidden p-2" onClick={()=>setMenuOpen(!menuOpen)}>
            <div className="flex flex-col gap-1.5">{[0,1,2].map(i=><span key={i} className="block w-5 h-0.5 rounded" style={{ background:'#A1A1AA' }} />)}</div>
          </button>
        </nav>

        {menuOpen && (
          <div className="fixed inset-0 z-40 flex flex-col pt-20 px-6 gap-3" style={{ background:'rgba(10,10,10,0.98)' }}>
            {[['Funcionalidades','#funcionalidades'],['IA Financeira','#vera'],['Preço','#preco'],['FAQ','#faq']].map(([l,h])=>(
              <a key={l} href={h} className="py-4 text-lg font-semibold border-b" style={{ color:'#A1A1AA', borderColor:'#262626', fontFamily:F.dm }} onClick={()=>setMenuOpen(false)}>{l}</a>
            ))}
            <button className="mt-4 py-4 rounded-2xl font-bold" style={{ background:'linear-gradient(135deg,#D4AF37,#B8952A)', color:'#0A0A0A', fontFamily:F.dm }}>Começar Agora</button>
          </div>
        )}

        {/* ── HERO ────────────────────────────────────────── */}
        <section className="relative pt-28 pb-16 md:pt-40 md:pb-20 px-6 text-center overflow-hidden"
          style={{ background:'radial-gradient(ellipse 70% 50% at 50% -10%, rgba(212,175,55,0.11) 0%, transparent 65%)' }}>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] pointer-events-none"
            style={{ background:'radial-gradient(ellipse, rgba(212,175,55,0.06) 0%, transparent 70%)', filter:'blur(60px)' }} />

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8"
            style={{ background:'rgba(212,175,55,0.07)', border:'1px solid rgba(212,175,55,0.18)' }}>
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background:'#D4AF37' }} />
            <span style={{ color:'#D4AF37', fontFamily:F.dm, fontSize:11, fontWeight:600, letterSpacing:'0.14em', textTransform:'uppercase' }}>Sistema financeiro premium</span>
          </div>

          <h1 className="font-black leading-none mb-6 max-w-4xl mx-auto"
            style={{ fontFamily:F.syne, fontSize:'clamp(32px,4.2vw,58px)', letterSpacing:'-0.03em', fontWeight:800 }}>
            Tenha o <GoldText>Controle Total</GoldText><br />da Sua Vida Financeira<br />em Um Só Lugar
          </h1>

          <p className="max-w-2xl mx-auto mb-10 leading-relaxed" style={{ color:'#A1A1AA', fontSize:16, fontFamily:F.dm }}>
            Pare de viver no aperto. Organize finanças pessoais e empresariais, elimine a bagunça — com a ajuda da{' '}
            <strong style={{ color:'#D4AF37' }}>Vera</strong>, sua gerente de contas com Inteligência Artificial.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-5">
            <button className="w-full sm:w-auto font-black px-8 py-4 rounded-xl transition-all hover:scale-105"
              style={{ background:'linear-gradient(135deg,#D4AF37,#B8952A)', color:'#0A0A0A', fontSize:15, fontFamily:F.dm, fontWeight:700, boxShadow:'0 8px 32px rgba(212,175,55,0.3)' }}>
              Quero Organizar Minha Vida Financeira Agora →
            </button>
          </div>
          <div className="flex items-center justify-center gap-6 mb-16" style={{ color:'#3F3F46', fontSize:12, fontFamily:F.dm }}>
            <span>✓ Acesso imediato</span><span>✓ Garantia de 7 dias</span><span>✓ Pagamento único</span>
          </div>

          <div className="relative max-w-5xl mx-auto">
            <div className="absolute -inset-10 pointer-events-none"
              style={{ background:'radial-gradient(ellipse at 50% 80%, rgba(212,175,55,0.1) 0%, transparent 65%)', filter:'blur(24px)' }} />
            <MockDashboard />
          </div>
        </section>

        {/* ── MÉTRICAS ────────────────────────────────────── */}
        <section style={{ borderTop:'1px solid #1a1a1a', borderBottom:'1px solid #1a1a1a' }}>
          <div className="max-w-5xl mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { val:'+2.400', label:'Usuários Ativos' },
              { val:'R$ 1.2M', label:'Economizados' },
              { val:'4.9/5', label:'Avaliação Média' },
              { val:'98%', label:'Recomendariam' },
            ].map((m)=>(
              <div key={m.label}>
                <div style={{ fontFamily:F.mono, fontSize:34, fontWeight:400, letterSpacing:'-0.04em', background:'linear-gradient(135deg,#D4AF37,#E8CC6A)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text', marginBottom:4 }}>{m.val}</div>
                <div style={{ color:'#52525B', fontSize:10, fontWeight:600, letterSpacing:'0.14em', textTransform:'uppercase', fontFamily:F.dm }}>{m.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── PROBLEMA ────────────────────────────────────── */}
        <section className="py-20 md:py-28 px-6">
          <div className="max-w-5xl mx-auto text-center">
            <Label>O Problema Real</Label>
            <h2 className="font-black leading-tight mb-4 max-w-3xl mx-auto"
              style={{ fontFamily:F.syne, fontSize:'clamp(28px,4vw,52px)', letterSpacing:'-0.03em', fontWeight:800 }}>
              Se você se identifica com estes pontos,{' '}
              <GoldText>você está perdendo dinheiro agora.</GoldText>
            </h2>
            <p className="text-sm mb-14" style={{ color:'#A1A1AA', fontFamily:F.dm }}>
              Não é falta de esforço — é falta de <strong style={{ color:'#FFFFFF' }}>visão e controle.</strong>
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {['Você não sabe para onde seu dinheiro está indo todo mês','Vive no aperto financeiro mesmo recebendo bem','Cartão de crédito sempre estourado e sem controle','Parcelamentos invisíveis comendo seu salário','Sua empresa não tem previsibilidade de caixa','Fluxo de caixa bagunçado, decisões no escuro','Gastos pequenos que somam fortunas no fim do mês','Falta uma visão estratégica do seu dinheiro'].map((pain)=>(
                <div key={pain} className="flex items-center gap-4 px-5 py-4 rounded-xl text-left"
                  style={{ background:'#111111', border:'1px solid #1F1F1F' }}>
                  <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background:'rgba(239,68,68,0.08)', border:'1px solid rgba(239,68,68,0.2)' }}>
                    <span style={{ color:'#EF4444', fontSize:11 }}>✕</span>
                  </div>
                  <span style={{ color:'#A1A1AA', fontSize:13, fontFamily:F.dm }}>{pain}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SOLUÇÃO ─────────────────────────────────────── */}
        <section className="py-20 md:py-28 px-6" style={{ background:'#0D0D0D' }} id="funcionalidades">
          <div className="max-w-5xl mx-auto text-center">
            <Label>A Solução</Label>
            <h2 className="font-black leading-tight mb-4 max-w-3xl mx-auto"
              style={{ fontFamily:F.syne, fontSize:'clamp(28px,4vw,52px)', letterSpacing:'-0.03em', fontWeight:800 }}>
              Conheça o <GoldText>AURUM Finance</GoldText> — o sistema que muda o jogo financeiro
            </h2>
            <p className="text-sm mb-14 max-w-xl mx-auto leading-relaxed" style={{ color:'#A1A1AA', fontFamily:F.dm }}>
              Uma plataforma que une controle pessoal, gestão empresarial e inteligência artificial. Tudo para construir riqueza com clareza.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { n:'1', title:'Controle pessoal completo', desc:'Cada entrada, saída, parcela — visíveis em segundos.' },
                { n:'2', title:'Gestão empresarial profissional', desc:'Fluxo de caixa, DRE e previsibilidade nível enterprise.' },
                { n:'3', title:'Decisões inteligentes com IA', desc:'A Vera analisa seu comportamento e te diz o que fazer.' },
                { n:'4', title:'Crescimento sustentável', desc:'Planejamento baseado em dados reais, não em achismos.' },
              ].map((card)=>(
                <div key={card.n} className="flex flex-col items-start text-left p-6 rounded-2xl"
                  style={{ background:'#111111', border:'1px solid #1F1F1F' }}>
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center font-black mb-4"
                    style={{ background:'linear-gradient(135deg,#D4AF37,#B8952A)', color:'#0A0A0A', fontFamily:F.syne, fontSize:17, fontWeight:800 }}>{card.n}</div>
                  <h3 className="font-bold text-sm mb-2 text-white" style={{ fontFamily:F.syne, fontWeight:700 }}>{card.title}</h3>
                  <p style={{ color:'#52525B', fontSize:12, lineHeight:1.6, fontFamily:F.dm }}>{card.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FUNCIONALIDADES ─────────────────────────────── */}
        <section className="py-20 md:py-28 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <Label>Funcionalidades</Label>
              <h2 className="font-black leading-tight" style={{ fontFamily:F.syne, fontSize:'clamp(28px,4vw,52px)', letterSpacing:'-0.03em', fontWeight:800 }}>
                Tudo que você precisa, <GoldText>nada que você não precisa</GoldText>
              </h2>
            </div>

            {/* Cartões */}
            <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
              <div>
                <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-5"
                  style={{ background:'rgba(212,175,55,0.08)', color:'#D4AF37', border:'1px solid rgba(212,175,55,0.2)', fontFamily:F.dm }}>Cartões & Crédito</span>
                <h3 className="font-black mb-4 text-white" style={{ fontFamily:F.syne, fontSize:28, fontWeight:800, letterSpacing:'-0.02em' }}>Controle Total dos Seus Cartões</h3>
                <p className="text-sm mb-6 leading-relaxed" style={{ color:'#A1A1AA', fontFamily:F.dm }}>Visualize faturas, limites, parcelamentos e vencimentos de todos os seus cartões em um só lugar.</p>
                <div className="flex flex-col gap-3">
                  {['Múltiplos cartões centralizados','Faturas com detalhamento por gasto','Alertas de vencimento automáticos','Limite disponível em tempo real','Parcelamentos organizados por cartão','Score e utilização de crédito'].map((f)=>(
                    <div key={f} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ background:'rgba(212,175,55,0.08)', border:'1px solid rgba(212,175,55,0.25)' }}>
                        <span style={{ color:'#D4AF37', fontSize:10 }}>✓</span>
                      </div>
                      <span style={{ color:'#A1A1AA', fontSize:13, fontFamily:F.dm }}>{f}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative">
                <div className="absolute -inset-6 pointer-events-none rounded-3xl"
                  style={{ background:'radial-gradient(circle, rgba(212,175,55,0.07) 0%, transparent 70%)' }} />
                <MockCartoes />
              </div>
            </div>

            {/* Investimentos */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1 relative">
                <div className="absolute -inset-6 pointer-events-none rounded-3xl"
                  style={{ background:'radial-gradient(circle, rgba(212,175,55,0.07) 0%, transparent 70%)' }} />
                <MockInvestimentos />
              </div>
              <div className="order-1 md:order-2">
                <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-5"
                  style={{ background:'rgba(212,175,55,0.08)', color:'#D4AF37', border:'1px solid rgba(212,175,55,0.2)', fontFamily:F.dm }}>Investimentos</span>
                <h3 className="font-black mb-4 text-white" style={{ fontFamily:F.syne, fontSize:28, fontWeight:800, letterSpacing:'-0.02em' }}>Carteira de Investimentos Completa</h3>
                <p className="text-sm mb-6 leading-relaxed" style={{ color:'#A1A1AA', fontFamily:F.dm }}>Acompanhe ações, ETFs, renda fixa, tesouro e cripto em um único painel com rentabilidade em tempo real.</p>
                <div className="flex flex-col gap-3">
                  {['Portfólio unificado de todos os ativos','Rentabilidade por ativo e total','Distribuição por tipo de investimento','Evolução patrimonial histórica','Comparação com benchmarks (CDI, IPCA)','Alertas de oportunidades'].map((f)=>(
                    <div key={f} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ background:'rgba(212,175,55,0.08)', border:'1px solid rgba(212,175,55,0.25)' }}>
                        <span style={{ color:'#D4AF37', fontSize:10 }}>✓</span>
                      </div>
                      <span style={{ color:'#A1A1AA', fontSize:13, fontFamily:F.dm }}>{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── VERA IA ─────────────────────────────────────── */}
        <section className="py-20 md:py-28 px-6" style={{ background:'#0D0D0D' }} id="vera">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-14 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6"
                style={{ background:'rgba(212,175,55,0.05)', border:'1px solid rgba(212,175,55,0.18)', color:'#D4AF37', fontFamily:F.dm }}>
                ✦ Inteligência Artificial
              </div>
              <h2 className="font-black leading-tight mb-4"
                style={{ fontFamily:F.syne, fontSize:'clamp(28px,4vw,48px)', letterSpacing:'-0.03em', fontWeight:800 }}>
                Conheça a <GoldText>Vera</GoldText> — sua Gerente de Contas com IA
              </h2>
              <p className="text-sm mb-8 leading-relaxed" style={{ color:'#A1A1AA', fontFamily:F.dm }}>
                A Vera analisa seus gastos fixos, variáveis, fluxo de caixa, receitas, cartões e parcelamentos — e te entrega respostas claras como uma verdadeira gerente financeira pessoal faria.
              </p>
              <div className="mb-6">
                <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color:'#52525B', fontFamily:F.dm }}>Pergunte qualquer coisa:</p>
                <div className="flex flex-wrap gap-2">
                  {['"Onde estou gastando mais?"','"Onde posso economizar?"','"Como está meu fluxo?"','"Faça meu DRE"','"Como melhorar meu caixa?"','"Quais despesas cortar?"'].map((q)=>(
                    <span key={q} className="text-xs px-3 py-1.5 rounded-full"
                      style={{ background:'#171717', border:'1px solid #262626', color:'#A1A1AA', fontFamily:F.dm }}>{q}</span>
                  ))}
                </div>
              </div>
              <div className="p-4 rounded-2xl" style={{ background:'rgba(212,175,55,0.05)', border:'1px solid rgba(212,175,55,0.18)' }}>
                <p className="text-sm leading-relaxed" style={{ color:'#A1A1AA', fontFamily:F.dm }}>
                  <span style={{ color:'#D4AF37', fontWeight:700 }}>É como contratar um CFO 24/7</span> — sem custar uma fortuna. A Vera transforma dados em decisões e te diz exatamente o que fazer para crescer.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-6 pointer-events-none rounded-3xl"
                style={{ background:'radial-gradient(circle, rgba(212,175,55,0.07) 0%, transparent 70%)' }} />
              <MockVera />
            </div>
          </div>
        </section>

        {/* ── PARA QUEM É ─────────────────────────────────── */}
        <section className="py-20 md:py-28 px-6">
          <div className="max-w-5xl mx-auto text-center">
            <Label>Para quem é o AURUM</Label>
            <h2 className="font-black leading-tight mb-14"
              style={{ fontFamily:F.syne, fontSize:'clamp(28px,4vw,52px)', letterSpacing:'-0.03em', fontWeight:800 }}>
              Construído para quem <GoldText>leva dinheiro a sério</GoldText>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { title:'Pessoas que querem sair da desorganização', desc:'Sem mais planilhas confusas e cabeça pesada todo fim de mês.' },
                { title:'Empresários que precisam de controle real', desc:'Decisões baseadas em dados, não em sentimentos.' },
                { title:'Profissionais que buscam previsibilidade', desc:'Saiba exatamente quanto você terá em 30, 60 e 90 dias.' },
                { title:'Quem busca crescimento financeiro sólido', desc:'Construa riqueza com método — não com sorte.' },
              ].map((item)=>(
                <div key={item.title} className="flex items-start gap-4 px-6 py-5 rounded-2xl text-left"
                  style={{ background:'#111111', border:'1px solid #1F1F1F' }}>
                  <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background:'linear-gradient(135deg,#D4AF37,#B8952A)' }}>
                    <span style={{ color:'#0A0A0A', fontSize:13, fontWeight:900 }}>✓</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-white mb-1" style={{ fontFamily:F.syne, fontWeight:700 }}>{item.title}</h4>
                    <p style={{ color:'#52525B', fontSize:12, fontFamily:F.dm }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PAGAMENTO ÚNICO ─────────────────────────────── */}
        <section className="py-20 md:py-28 px-6" style={{ background:'#0D0D0D' }}>
          <div className="max-w-4xl mx-auto text-center">
            <Label>⚡ Atenção</Label>
            <h2 className="font-black leading-tight mb-4"
              style={{ fontFamily:F.syne, fontSize:'clamp(28px,4vw,52px)', letterSpacing:'-0.03em', fontWeight:800 }}>
              Você paga <GoldText>uma única vez</GoldText> e tem acesso <GoldText>para sempre</GoldText>
            </h2>
            <p className="text-sm mb-14" style={{ color:'#A1A1AA', fontFamily:F.dm }}>Esqueça mensalidades, assinaturas e cobranças recorrentes. O AURUM Finance é seu — definitivamente.</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { icon:'✓', title:'Pagamento único', desc:'Você paga uma vez e pronto.' },
                { icon:'∞', title:'Acesso vitalício', desc:'Use para sempre, sem prazo.' },
                { icon:'✕', title:'Sem mensalidade', desc:'Nenhuma cobrança recorrente.' },
                { icon:'🔒', title:'Sem surpresas', desc:'Zero cobranças no cartão.' },
              ].map((item)=>(
                <div key={item.title} className="flex flex-col items-center text-center p-5 rounded-2xl"
                  style={{ background:'#111111', border:'1px solid rgba(212,175,55,0.12)' }}>
                  <div className="w-12 h-12 rounded-full flex items-center justify-center text-lg mb-3"
                    style={{ background:'linear-gradient(135deg,#D4AF37,#B8952A)' }}>
                    <span style={{ color:'#0A0A0A', fontWeight:900, fontSize:18 }}>{item.icon}</span>
                  </div>
                  <h4 className="font-bold text-sm text-white mb-1" style={{ fontFamily:F.syne, fontWeight:700 }}>{item.title}</h4>
                  <p style={{ color:'#52525B', fontSize:12, fontFamily:F.dm }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── DEPOIMENTOS ─────────────────────────────────── */}
        <section className="py-20 md:py-28 px-6">
          <div className="max-w-5xl mx-auto text-center">
            <Label>Provas Reais</Label>
            <h2 className="font-black leading-tight mb-4"
              style={{ fontFamily:F.syne, fontSize:'clamp(28px,4vw,52px)', letterSpacing:'-0.03em', fontWeight:800 }}>
              Quem usa o AURUM <GoldText>não volta atrás</GoldText>
            </h2>
            <div className="flex items-center justify-center gap-2 mb-14">
              <span style={{ color:'#D4AF37', fontSize:16 }}>★★★★★</span>
              <span style={{ color:'#52525B', fontSize:13, fontFamily:F.dm }}>4.9/5 baseado em +2.300 avaliações</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {testimonials.map((t)=>(
                <div key={t.name} className="flex flex-col text-left p-6 rounded-2xl" style={{ background:'#111111', border:'1px solid #1F1F1F' }}>
                  <div className="mb-3" style={{ color:'#D4AF37', fontSize:14 }}>★★★★★</div>
                  <p className="text-sm flex-1 mb-5 leading-relaxed" style={{ color:'#A1A1AA', fontFamily:F.dm }}>&ldquo;{t.text}&rdquo;</p>
                  <div className="flex items-center gap-3 pt-4" style={{ borderTop:'1px solid #1F1F1F' }}>
                    <div className="w-9 h-9 rounded-full flex items-center justify-center font-black text-sm flex-shrink-0"
                      style={{ background:'linear-gradient(135deg,#D4AF37,#B8952A)', color:'#0A0A0A', fontFamily:F.syne, fontWeight:800 }}>{t.initial}</div>
                    <div>
                      <div className="font-bold text-sm text-white" style={{ fontFamily:F.syne, fontWeight:700 }}>{t.name}</div>
                      <div style={{ color:'#52525B', fontSize:12, fontFamily:F.dm }}>{t.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PREÇO ───────────────────────────────────────── */}
        <section className="py-20 md:py-28 px-6" id="preco"
          style={{ background:'radial-gradient(ellipse 70% 60% at 50% 100%, rgba(212,175,55,0.07) 0%, transparent 70%)' }}>
          <div className="max-w-xl mx-auto text-center">
            <Label>Oferta especial</Label>
            <h2 className="font-black leading-tight mb-12"
              style={{ fontFamily:F.syne, fontSize:'clamp(28px,4vw,52px)', letterSpacing:'-0.03em', fontWeight:800 }}>
              Tenha o <GoldText>controle total</GoldText> da sua vida financeira hoje
            </h2>
            <div className="relative p-8 rounded-3xl" style={{ background:'#111111', border:'1px solid rgba(212,175,55,0.25)', boxShadow:'0 0 60px rgba(212,175,55,0.06)' }}>
              <div className="absolute -top-4 right-6 px-4 py-1.5 rounded-full font-black text-sm"
                style={{ background:'linear-gradient(135deg,#D4AF37,#B8952A)', color:'#0A0A0A', fontFamily:F.dm, fontWeight:700 }}>67% OFF</div>
              <div className="text-base font-semibold mb-4" style={{ color:'#A1A1AA', fontFamily:F.dm }}>
                Adquira o <span style={{ color:'#FFFFFF' }}>AURUM Finance</span> Agora por apenas
              </div>
              <div className="flex items-center justify-center gap-3 mb-2">
                <span className="text-lg line-through" style={{ color:'#3F3F46', fontFamily:F.mono }}>R$ 297</span>
                <span style={{ fontFamily:F.mono, fontSize:48, letterSpacing:'-0.04em', background:'linear-gradient(135deg,#D4AF37,#E8CC6A)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>R$ 147,00</span>
              </div>
              <div className="text-sm mb-8" style={{ color:'#52525B', fontFamily:F.dm }}>à vista</div>
              <div className="grid grid-cols-2 gap-3 mb-8 text-left">
                {['Acesso completo ao Finance Pessoal + Empresarial','Acesso vitalício','Suporte humano dedicado','Acesso pelo celular, tablet e desktop'].map((b)=>(
                  <div key={b} className="flex items-start gap-2">
                    <span style={{ color:'#D4AF37', fontSize:12, marginTop:1 }}>✓</span>
                    <span style={{ color:'#A1A1AA', fontSize:12, fontFamily:F.dm }}>{b}</span>
                  </div>
                ))}
              </div>
              <button className="w-full py-4 rounded-2xl font-black transition-all hover:scale-105 mb-3"
                style={{ background:'linear-gradient(135deg,#D4AF37,#B8952A)', color:'#0A0A0A', fontSize:15, fontFamily:F.dm, fontWeight:700, boxShadow:'0 8px 32px rgba(212,175,55,0.25)' }}>
                Quero Garantir Meu Acesso Agora!
              </button>
              <p style={{ color:'#52525B', fontSize:12, fontFamily:F.dm }}>🔒 Pagamento 100% seguro · Acesso Imediato</p>
            </div>
          </div>
        </section>

        {/* ── FAQ ─────────────────────────────────────────── */}
        <section className="py-20 md:py-28 px-6" id="faq" style={{ background:'#0D0D0D' }}>
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-14">
              <Label>FAQ</Label>
              <h2 className="font-black text-white" style={{ fontFamily:F.syne, fontSize:'clamp(28px,4vw,44px)', letterSpacing:'-0.03em', fontWeight:800 }}>Perguntas frequentes</h2>
            </div>
            <div className="flex flex-col gap-3">
              {faqData.map((item)=><FAQItem key={item.q} q={item.q} a={item.a} />)}
            </div>
          </div>
        </section>

        {/* ── FOOTER CTA ──────────────────────────────────── */}
        <section className="py-20 md:py-28 px-6 text-center"
          style={{ background:'radial-gradient(ellipse 60% 60% at 50% 50%, rgba(212,175,55,0.06) 0%, transparent 70%)' }}>
          <div className="max-w-2xl mx-auto">
            <h2 className="font-black leading-tight mb-4"
              style={{ fontFamily:F.syne, fontSize:'clamp(28px,4vw,52px)', letterSpacing:'-0.03em', fontWeight:800 }}>
              Comece hoje. Seu futuro financeiro <GoldText>te agradece.</GoldText>
            </h2>
            <p className="text-base mb-10" style={{ color:'#A1A1AA', fontFamily:F.dm }}>
              Mais de 2.400 pessoas já transformaram sua vida financeira com o AURUM. A próxima pode ser você.
            </p>
            <button className="font-black px-10 py-4 rounded-2xl transition-all hover:scale-105 mb-5"
              style={{ background:'linear-gradient(135deg,#D4AF37,#B8952A)', color:'#0A0A0A', fontSize:15, fontFamily:F.dm, fontWeight:700, boxShadow:'0 8px 32px rgba(212,175,55,0.25)' }}>
              Quero Começar Agora →
            </button>
            <div className="flex items-center justify-center">
              <span style={{ color:'#52525B', fontSize:12, fontFamily:F.dm }}>🛡️ Garantia de 7 dias — sem perguntas</span>
            </div>
          </div>
        </section>

        {/* ── FOOTER ──────────────────────────────────────── */}
        <footer style={{ borderTop:'1px solid #1a1a1a' }}>
          <div className="max-w-5xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div style={{ display:'flex', alignItems:'center', gap:10 }}>
              <div style={{ width:28, height:28, borderRadius:8, background:'linear-gradient(135deg,#D4AF37,#B8952A)', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:F.syne, fontWeight:800, fontSize:14, color:'#0A0A0A' }}>A</div>
              <span style={{ color:'#FFFFFF', fontFamily:F.syne, fontSize:15, fontWeight:700, letterSpacing:'0.04em' }}>AURUM Finance</span>
            </div>
            <div className="flex items-center gap-6">
              {['Funcionalidades','IA Financeira','Preço','FAQ'].map((link)=>(
                <a key={link} href="#" className="hover:text-white transition-colors" style={{ color:'#52525B', fontSize:12, fontFamily:F.dm }}>{link}</a>
              ))}
            </div>
            <p style={{ color:'#3F3F46', fontSize:12, fontFamily:F.dm }}>© 2026 AURUM Finance. Todos os direitos reservados.</p>
          </div>
        </footer>

      </div>
    </>
  );
}
