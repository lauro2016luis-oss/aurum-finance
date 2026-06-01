'use client';

import { useState } from 'react';

/* ─── DATA ──────────────────────────────────────────────────── */
const faqData = [
  { q: 'Vou precisar pagar mensalidade?', a: 'Nunca. O AURUM Finance funciona com pagamento único — você investe uma vez e a plataforma é sua para sempre, sem nenhuma cobrança futura.' },
  { q: 'Serve tanto para mim quanto para minha empresa?', a: 'Sim. O AURUM reúne gestão financeira pessoal e empresarial em uma única conta. Você alterna entre os perfis com um clique.' },
  { q: 'Funciona no celular?', a: 'Funciona em qualquer dispositivo — celular, tablet ou computador. A experiência é idêntica em todos eles.' },
  { q: 'Preciso baixar algum aplicativo?', a: 'Não há nada para instalar. O AURUM Finance roda direto no navegador. Você acessa de qualquer lugar com internet.' },
  { q: 'A Vera IA já está disponível no meu plano?', a: 'Sim. A Vera faz parte do acesso completo desde o primeiro dia. Sem upgrades, sem pacotes extras, sem surpresas na fatura.' },
  { q: 'E se eu tiver dúvidas ou problemas?', a: 'Contamos com suporte humano real — não é bot. Nossa equipe está disponível para te ajudar a configurar, entender e aproveitar tudo da plataforma.' },
  { q: 'Quando recebo o acesso após o pagamento?', a: 'Na hora. Assim que o pagamento é confirmado, você recebe as instruções no e-mail cadastrado e já pode entrar na plataforma.' },
  { q: 'Por que o preço é tão baixo sendo acesso vitalício?', a: 'Porque acreditamos que controle financeiro não deveria ser caro. R$ 147 uma vez é menos do que a maioria das ferramentas cobra em dois meses de assinatura.' },
];

const testimonials = [
  { text: 'Nunca imaginei que organizar dinheiro pudesse ser tão simples. O AURUM me mostrou R$ 2.100 que eu jogava fora todo mês sem perceber.', name: 'Carolina M.', role: 'Empresária', initial: 'C' },
  { text: 'Minha agência cresceu 40% depois que eu comecei a tomar decisões baseadas em dados reais. O fluxo de caixa virou meu mapa.', name: 'Rafael S.', role: 'Dono de agência', initial: 'R' },
  { text: 'Trabalho por conta própria e sempre tive medo de não fechar o mês. Com o AURUM tenho previsibilidade de verdade — isso mudou tudo.', name: 'Juliana P.', role: 'Profissional liberal', initial: 'J' },
  { text: 'A Vera identificou um vazamento no nosso caixa que passava despercebido há meses. Economizamos R$ 8k só no primeiro trimestre.', name: 'Marcos T.', role: 'CEO de startup', initial: 'M' },
  { text: 'Em 3 meses juntei minha reserva de emergência do zero. Algo que tentava fazer há anos. O AURUM me deu o método que faltava.', name: 'Beatriz L.', role: 'Professora e investidora', initial: 'B' },
  { text: 'Tenho um mercado e nunca consegui separar bem o pessoal do empresarial. Hoje tudo fica no mesmo lugar, organizado, sem misturar.', name: 'Eduardo F.', role: 'Empresário do varejo', initial: 'E' },
];

/* ─── FONTS + ANIMATIONS + LAYOUT CSS ──────────────────────── */
const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,600;1,700;1,800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300&family=JetBrains+Mono:wght@300;400;500&display=swap');

  /* ─ Metric cards ─ */
  @keyframes metricIn {
    0%,100%{opacity:0;transform:translateY(6px)} 12%,85%{opacity:1;transform:translateY(0)}
  }
  /* ─ SVG lines ─ */
  @keyframes drawLine1 {
    0%,5%{stroke-dashoffset:420;opacity:0} 8%{opacity:1} 55%,100%{stroke-dashoffset:0;opacity:1}
  }
  @keyframes drawLine2 {
    0%,10%{stroke-dashoffset:390;opacity:0} 14%{opacity:1} 60%,100%{stroke-dashoffset:0;opacity:1}
  }
  @keyframes drawLine3 {
    0%,15%{stroke-dashoffset:380;opacity:0} 18%{opacity:1} 65%,100%{stroke-dashoffset:0;opacity:1}
  }
  /* ─ Donut dashboard ─ */
  @keyframes dash1{0%,8%{stroke-dasharray:0 175.9}55%,100%{stroke-dasharray:56.3 175.9}}
  @keyframes dash2{0%,14%{stroke-dasharray:0 175.9}58%,100%{stroke-dasharray:33.4 175.9}}
  @keyframes dash3{0%,20%{stroke-dasharray:0 175.9}61%,100%{stroke-dasharray:28.1 175.9}}
  @keyframes dash4{0%,26%{stroke-dasharray:0 175.9}64%,100%{stroke-dasharray:15.8 175.9}}
  @keyframes dash5{0%,32%{stroke-dasharray:0 175.9}67%,100%{stroke-dasharray:10.6 175.9}}
  /* ─ Donut investimentos ─ */
  @keyframes idash1{0%,8%{stroke-dasharray:0 201.1}55%,100%{stroke-dasharray:26.1 201.1}}
  @keyframes idash2{0%,15%{stroke-dasharray:0 201.1}58%,100%{stroke-dasharray:54.3 201.1}}
  @keyframes idash3{0%,22%{stroke-dasharray:0 201.1}62%,100%{stroke-dasharray:88.5 201.1}}
  @keyframes idash4{0%,30%{stroke-dasharray:0 201.1}66%,100%{stroke-dasharray:46.3 201.1}}
  @keyframes idash5{0%,38%{stroke-dasharray:0 201.1}70%,100%{stroke-dasharray:15.5 201.1}}
  /* ─ Card slides ─ */
  @keyframes cardSlide1{0%,8%,100%{opacity:0;transform:translateX(-14px)}18%,88%{opacity:1;transform:translateX(0)}}
  @keyframes cardSlide2{0%,18%,100%{opacity:0;transform:translateX(-14px)}28%,88%{opacity:1;transform:translateX(0)}}
  @keyframes cardSlide3{0%,28%,100%{opacity:0;transform:translateX(-14px)}38%,88%{opacity:1;transform:translateX(0)}}
  /* ─ Progress bars ─ */
  @keyframes bar34{0%,20%,100%{width:0%}50%,85%{width:34%}}
  @keyframes bar32{0%,27%,100%{width:0%}55%,85%{width:32%}}
  @keyframes bar16{0%,34%,100%{width:0%}60%,85%{width:16%}}
  /* ─ Table rows ─ */
  @keyframes rowIn1{0%,10%,100%{opacity:0;transform:translateX(-8px)}20%,85%{opacity:1;transform:translateX(0)}}
  @keyframes rowIn2{0%,17%,100%{opacity:0;transform:translateX(-8px)}27%,85%{opacity:1;transform:translateX(0)}}
  @keyframes rowIn3{0%,24%,100%{opacity:0;transform:translateX(-8px)}34%,85%{opacity:1;transform:translateX(0)}}
  @keyframes rowIn4{0%,31%,100%{opacity:0;transform:translateX(-8px)}41%,85%{opacity:1;transform:translateX(0)}}
  @keyframes rowIn5{0%,38%,100%{opacity:0;transform:translateX(-8px)}48%,85%{opacity:1;transform:translateX(0)}}
  /* ─ Vera messages ─ */
  @keyframes veraMsg1{0%,100%{opacity:0;transform:translateY(8px)}8%,88%{opacity:1;transform:translateY(0)}}
  @keyframes veraMsg2{0%,28%,100%{opacity:0;transform:translateY(8px)}36%,88%{opacity:1;transform:translateY(0)}}
  @keyframes veraMsg3{0%,50%,100%{opacity:0;transform:translateY(8px)}58%,88%{opacity:1;transform:translateY(0)}}
  @keyframes typingShow{0%,20%,52%,100%{opacity:0}25%,48%{opacity:1}}
  @keyframes typeDot1{0%,100%{transform:translateY(0);opacity:0.3}16%{transform:translateY(-3px);opacity:1}}
  @keyframes typeDot2{0%,100%{transform:translateY(0);opacity:0.3}33%{transform:translateY(-3px);opacity:1}}
  @keyframes typeDot3{0%,100%{transform:translateY(0);opacity:0.3}50%{transform:translateY(-3px);opacity:1}}
  /* ─ Effects ─ */
  @keyframes cursor{0%,100%{opacity:1}50%{opacity:0}}
  @keyframes onlinePing{0%,100%{transform:scale(1);opacity:1}50%{transform:scale(1.5);opacity:0.5}}
  @keyframes mockGlow{0%,100%{box-shadow:0 0 0 1px #1F1F1F,0 0 30px rgba(212,175,55,0.04)}50%{box-shadow:0 0 0 1px rgba(212,175,55,0.2),0 0 50px rgba(212,175,55,0.12)}}
  @keyframes numShimmer{0%,100%{opacity:1}35%,65%{opacity:0.7;filter:brightness(1.5)}}
  @keyframes goldPulse{0%,100%{filter:brightness(1)}50%{filter:brightness(1.4) drop-shadow(0 0 6px rgba(212,175,55,0.6))}}
  @keyframes greenBlink{0%,100%{opacity:1;color:#22C55E}40%,60%{opacity:0.4}}
  @keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}

  /* ─ Layout helpers ─ */
  .lp-wrap{max-width:1080px;margin:0 auto}
  .lp-wrap-sm{max-width:600px;margin:0 auto}
  .lp-wrap-md{max-width:800px;margin:0 auto}
  .lp-section{padding:96px 24px}
  .lp-section-dark{padding:96px 24px;background:#0D0D0D}
  .lp-grid-2{display:grid;grid-template-columns:1fr 1fr;gap:56px;align-items:center}
  .lp-grid-3{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}
  .lp-grid-4{display:grid;grid-template-columns:repeat(4,1fr);gap:16px}
  .lp-grid-pain{display:grid;grid-template-columns:1fr 1fr;gap:10px}
  .lp-grid-meta{display:grid;grid-template-columns:repeat(4,1fr);gap:32px}
  .lp-price-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px;text-align:left}
  .lp-footer-row{display:flex;align-items:center;justify-content:space-between;gap:24px}
  .lp-footer-links{display:flex;align-items:center;gap:24px}
  .lp-nav-links{display:flex;align-items:center;gap:32px}
  .lp-nav-cta{display:block}
  .lp-mob-btn{display:none}
  .lp-inv-a{order:1}.lp-inv-b{order:2}

  @media(max-width:900px){
    .lp-grid-2{grid-template-columns:1fr;gap:32px}
    .lp-grid-3{grid-template-columns:1fr}
    .lp-grid-4{grid-template-columns:1fr 1fr}
    .lp-grid-pain{grid-template-columns:1fr}
    .lp-grid-meta{grid-template-columns:1fr 1fr}
    .lp-price-grid{grid-template-columns:1fr}
    .lp-footer-row{flex-direction:column;text-align:center}
    .lp-footer-links{flex-wrap:wrap;justify-content:center}
    .lp-nav-links{display:none}
    .lp-nav-cta{display:none}
    .lp-mob-btn{display:flex}
    .lp-section{padding:64px 20px}
    .lp-section-dark{padding:64px 20px;background:#0D0D0D}
    .lp-inv-a{order:2}.lp-inv-b{order:1}
  }
  @media(max-width:600px){
    .lp-grid-4{grid-template-columns:1fr 1fr}
    .lp-grid-meta{grid-template-columns:1fr 1fr}
  }

  .lp-navlink{color:#A1A1AA;text-decoration:none;font-size:14px;white-space:nowrap;transition:color 0.2s;font-family:'DM Sans',sans-serif}
  .lp-navlink:hover{color:#FFFFFF}
  .lp-footer-link{color:#52525B;text-decoration:none;font-size:12px;transition:color 0.2s}
  .lp-footer-link:hover{color:#FFFFFF}
  .lp-btn{cursor:pointer;border:none;background:linear-gradient(135deg,#D4AF37,#B8952A);color:#0A0A0A;font-weight:700;border-radius:12px;transition:transform 0.2s,box-shadow 0.2s;box-shadow:0 6px 24px rgba(212,175,55,0.3);font-family:'Plus Jakarta Sans',sans-serif}
  .lp-btn:hover{transform:translateY(-2px);box-shadow:0 10px 36px rgba(212,175,55,0.4)}
  .lp-btn:active{transform:translateY(0)}
`;

/* ─── FONTS ─────────────────────────────────────────────────── */
const F = {
  head: "'Plus Jakarta Sans', sans-serif",
  dm: "'DM Sans', sans-serif",
  mono: "'JetBrains Mono', monospace",
};

/* ─── HELPERS ───────────────────────────────────────────────── */
function GoldText({ children }: { children: React.ReactNode }) {
  return (
    <span style={{ background: 'linear-gradient(135deg,#D4AF37 0%,#E8CC6A 50%,#D4AF37 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
      {children}
    </span>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: 'inline-block', padding: '5px 16px', borderRadius: 100, fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 20, color: '#D4AF37', border: '1px solid rgba(212,175,55,0.25)', background: 'rgba(212,175,55,0.06)', fontFamily: F.dm }}>
      {children}
    </div>
  );
}

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div onClick={() => setOpen(!open)} style={{ cursor: 'pointer', borderRadius: 14, transition: 'all 0.2s', background: open ? 'rgba(212,175,55,0.04)' : '#111111', border: `1px solid ${open ? 'rgba(212,175,55,0.3)' : '#262626'}` }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 22px' }}>
        <span style={{ fontWeight: 600, fontSize: 14, color: '#FFFFFF', fontFamily: F.head, paddingRight: 16 }}>{q}</span>
        <span style={{ color: '#D4AF37', fontSize: 20, flexShrink: 0, transform: open ? 'rotate(45deg)' : 'none', transition: 'transform 0.2s', display: 'block' }}>+</span>
      </div>
      {open && <div style={{ padding: '0 22px 18px', fontSize: 13, lineHeight: 1.7, color: '#A1A1AA', fontFamily: F.dm }}>{a}</div>}
    </div>
  );
}

/* ─── SIDEBAR (shared by all mocks) ────────────────────────── */
function Sidebar({ active }: { active: string }) {
  const groups = [
    { label: 'PRINCIPAL', items: ['Dashboard', 'Transações'] },
    { label: 'FINANÇAS', items: ['Receitas', 'Gastos Fixos', 'Cartões', 'Contas Bancárias'] },
    { label: 'PATRIMÔNIO', items: ['Investimentos', 'Metas Financeiras', 'Reserva de Emergência', 'Planejamento', 'Assinaturas'] },
    { label: 'INTELIGÊNCIA', items: ['IA Financeira'] },
  ];
  return (
    <div style={{ width: 180, background: '#111111', borderRight: '1px solid #1F1F1F', padding: '10px 0', flexShrink: 0, display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '0 12px', marginBottom: 10 }}>
        <div style={{ width: 24, height: 24, borderRadius: 7, background: 'linear-gradient(135deg,#D4AF37,#B8952A)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: F.head, fontWeight: 800, fontSize: 12, color: '#0A0A0A' }}>A</div>
        <div>
          <div style={{ color: '#FFFFFF', fontFamily: F.head, fontSize: 11, fontWeight: 800, letterSpacing: '0.04em', lineHeight: 1 }}>AURUM</div>
          <div style={{ color: '#52525B', fontFamily: F.dm, fontSize: 7.5, letterSpacing: '0.1em' }}>FINANCE</div>
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, margin: '0 8px 10px', padding: '5px 7px', borderRadius: 8, background: '#1A1A1A' }}>
        <div style={{ width: 20, height: 20, borderRadius: '50%', background: 'linear-gradient(135deg,#D4AF37,#B8952A)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 9, color: '#0A0A0A', fontFamily: F.head, flexShrink: 0 }}>L</div>
        <div><div style={{ color: '#FFFFFF', fontFamily: F.dm, fontSize: 9, fontWeight: 500 }}>Lauro Luis</div><div style={{ color: '#52525B', fontFamily: F.dm, fontSize: 7.5 }}>Pessoal</div></div>
      </div>
      {groups.map((g) => (
        <div key={g.label} style={{ marginBottom: 4 }}>
          <div style={{ padding: '0 12px', marginBottom: 2, color: '#3F3F46', fontFamily: F.dm, fontSize: 8, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase' }}>{g.label}</div>
          {g.items.map((item) => {
            const on = item === active;
            return (
              <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 6, margin: on ? '0 4px' : '0 6px', padding: '4px 8px', borderRadius: 7, background: on ? 'rgba(212,175,55,0.1)' : 'transparent', borderLeft: on ? '2px solid #D4AF37' : '2px solid transparent' }}>
                <span style={{ color: on ? '#D4AF37' : '#52525B', fontFamily: F.dm, fontSize: 9, fontWeight: on ? 600 : 400 }}>{item}</span>
                {item === 'IA Financeira' && <span style={{ marginLeft: 'auto', background: 'rgba(212,175,55,0.15)', color: '#D4AF37', fontSize: 6, fontFamily: F.dm, fontWeight: 700, padding: '1px 4px', borderRadius: 3 }}>PRO</span>}
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
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 18px', background: '#111111', borderBottom: '1px solid #1F1F1F' }}>
        <div>
          <div style={{ color: '#52525B', fontSize: 8, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', fontFamily: F.dm }}>VISÃO GERAL</div>
          <div style={{ color: '#FFFFFF', fontFamily: F.head, fontSize: 13, fontWeight: 700 }}>Dashboard</div>
        </div>
        <div style={{ display: 'flex', gap: 5 }}>
          {['Este mês', 'Escolher período', 'Ano'].map((b, i) => (
            <div key={b} style={{ padding: '4px 10px', borderRadius: 7, background: i === 0 ? '#1F1F1F' : 'transparent', color: i === 0 ? '#FFFFFF' : '#52525B', border: '1px solid #262626', fontSize: 8, fontFamily: F.dm }}>{b}</div>
          ))}
        </div>
      </div>
      <div style={{ display: 'flex', minHeight: 300 }}>
        <Sidebar active="Dashboard" />
        <div style={{ flex: 1, padding: 14, overflow: 'hidden' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: 7, marginBottom: 12 }}>
            {[
              { label: 'SALDO TOTAL', val: 'R$ 47.382,90', badge: '+12,4%', color: '#D4AF37', delay: '0s' },
              { label: 'RECEITAS', val: 'R$ 18.500,00', badge: '+8,2%', color: '#22C55E', delay: '0.6s' },
              { label: 'DESPESAS', val: 'R$ 9.847,30', badge: '-3,1%', color: '#EF4444', delay: '1.2s' },
              { label: 'PATRIMÔNIO', val: 'R$ 284,5k', badge: '+2,8%', color: '#FFFFFF', delay: '1.8s' },
              { label: 'LUCRO', val: 'R$ 8.652,70', badge: '+18,7%', color: '#D4AF37', delay: '2.4s' },
            ].map((m) => (
              <div key={m.label} style={{ borderRadius: 10, padding: 9, background: '#111111', border: '1px solid #1F1F1F', animation: `metricIn ${DUR} ease-in-out ${m.delay} infinite` }}>
                <div style={{ color: '#52525B', fontSize: 6.5, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 4, fontFamily: F.dm }}>{m.label}</div>
                <div style={{ color: m.color, fontFamily: F.mono, fontSize: 10, letterSpacing: '-0.03em', marginBottom: 3, animation: `numShimmer ${DUR} ease-in-out ${m.delay} infinite` }}>{m.val}</div>
                <div style={{ display: 'inline-block', padding: '1px 5px', borderRadius: 4, background: m.badge.startsWith('+') ? 'rgba(34,197,94,0.1)' : 'rgba(239,68,68,0.1)', color: m.badge.startsWith('+') ? '#22C55E' : '#EF4444', fontSize: 7, fontFamily: F.mono }}>{m.badge}</div>
              </div>
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 8 }}>
            <div style={{ borderRadius: 10, padding: 10, background: '#111111', border: '1px solid #1F1F1F' }}>
              <div style={{ color: '#52525B', fontSize: 7, letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: F.dm }}>FLUXO DE CAIXA</div>
              <div style={{ color: '#FFFFFF', fontFamily: F.head, fontSize: 11, fontWeight: 700, marginBottom: 8 }}>Receitas vs. Despesas</div>
              <div style={{ display: 'flex', gap: 10, marginBottom: 8 }}>
                {[['#22C55E', 'Receitas'], ['#EF4444', 'Despesas'], ['#D4AF37', 'Saldo']].map(([c, l]) => (
                  <div key={l} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: c }} />
                    <span style={{ color: '#52525B', fontSize: 7, fontFamily: F.dm }}>{l}</span>
                  </div>
                ))}
              </div>
              <svg viewBox="0 0 280 80" style={{ width: '100%', height: 70, display: 'block' }}>
                <defs>
                  <linearGradient id="gR" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#22C55E" stopOpacity="0.18" /><stop offset="100%" stopColor="#22C55E" stopOpacity="0" /></linearGradient>
                  <linearGradient id="gD" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#EF4444" stopOpacity="0.12" /><stop offset="100%" stopColor="#EF4444" stopOpacity="0" /></linearGradient>
                </defs>
                <path d="M0,52 C20,45 40,38 70,30 C100,22 120,18 150,15 C180,12 210,9 240,7 C260,5.5 272,4 280,3" fill="none" stroke="#22C55E" strokeWidth="1.5" strokeDasharray="420 420" style={{ animation: `drawLine1 ${DUR} ease-in-out infinite` }} />
                <path d="M0,52 C20,45 40,38 70,30 C100,22 120,18 150,15 C180,12 210,9 240,7 C260,5.5 272,4 280,3 L280,80 L0,80Z" fill="url(#gR)" style={{ opacity: 0.6 }} />
                <path d="M0,62 C20,60 40,58 70,55 C100,52 130,50 160,52 C190,54 210,52 240,50 C260,48.5 272,47 280,46" fill="none" stroke="#EF4444" strokeWidth="1.5" strokeDasharray="390 390" style={{ animation: `drawLine2 ${DUR} ease-in-out infinite` }} />
                <path d="M0,67 C20,66 40,65 70,63 C100,61 130,60 160,59 C190,58 210,57 240,55 C260,54 272,53 280,52" fill="none" stroke="#D4AF37" strokeWidth="1" strokeDasharray="3,2" style={{ animation: `drawLine3 ${DUR} ease-in-out infinite` }} />
                {['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul'].map((m, i) => (
                  <text key={m} x={i * 43} y={78} style={{ fill: '#3F3F46', fontSize: 6.5, fontFamily: F.dm }}>{m}</text>
                ))}
              </svg>
            </div>
            <div style={{ borderRadius: 10, padding: 10, background: '#111111', border: '1px solid #1F1F1F' }}>
              <div style={{ color: '#52525B', fontSize: 7, letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: F.dm }}>CATEGORIAS</div>
              <div style={{ color: '#FFFFFF', fontFamily: F.head, fontSize: 11, fontWeight: 700, marginBottom: 8 }}>Por Categoria</div>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 8 }}>
                <div style={{ position: 'relative', width: 70, height: 70 }}>
                  <svg viewBox="0 0 70 70" style={{ width: '100%', height: '100%', transform: 'rotate(-90deg)' }}>
                    <circle cx="35" cy="35" r="28" fill="none" stroke="#D4AF37" strokeWidth="10" style={{ strokeDashoffset: 0, animation: `dash1 ${DUR} ease-in-out infinite` }} />
                    <circle cx="35" cy="35" r="28" fill="none" stroke="#E8CC6A" strokeWidth="10" strokeDashoffset={`${-32 * 1.759}`} style={{ animation: `dash2 ${DUR} ease-in-out infinite` }} />
                    <circle cx="35" cy="35" r="28" fill="none" stroke="#B8952A" strokeWidth="10" strokeDashoffset={`${-51 * 1.759}`} style={{ animation: `dash3 ${DUR} ease-in-out infinite` }} />
                    <circle cx="35" cy="35" r="28" fill="none" stroke="#52525B" strokeWidth="10" strokeDashoffset={`${-67 * 1.759}`} style={{ animation: `dash4 ${DUR} ease-in-out infinite` }} />
                    <circle cx="35" cy="35" r="28" fill="none" stroke="#3F3F46" strokeWidth="10" strokeDashoffset={`${-76 * 1.759}`} style={{ animation: `dash5 ${DUR} ease-in-out infinite` }} />
                  </svg>
                  <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ color: '#FFFFFF', fontFamily: F.mono, fontSize: 9, fontWeight: 600 }}>R$ 9,8k</div>
                      <div style={{ color: '#52525B', fontFamily: F.dm, fontSize: 6.5 }}>total</div>
                    </div>
                  </div>
                </div>
              </div>
              {[['Moradia', '32%', '#D4AF37'], ['Alimentação', '19%', '#E8CC6A'], ['Saúde', '16%', '#B8952A'], ['Transporte', '9%', '#52525B'], ['Lazer', '6%', '#3F3F46']].map(([cat, pct, col]) => (
                <div key={cat} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 2 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <div style={{ width: 5, height: 5, borderRadius: '50%', background: col }} />
                    <span style={{ color: '#A1A1AA', fontSize: 7.5, fontFamily: F.dm }}>{cat}</span>
                  </div>
                  <span style={{ color: '#52525B', fontSize: 7.5, fontFamily: F.mono }}>{pct}</span>
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
  const DUR = '9s';
  const cards = [
    { name: 'Nubank', num: '•••• 4821', limit: 'R$ 8.500', used: 'R$ 2.890,00', color: '#7C3AED', pct: 34, anim: 'cardSlide1', barAnim: 'bar34', barDelay: '0.5s' },
    { name: 'Itaú', num: '•••• 7293', limit: 'R$ 12.000', used: 'R$ 3.840,00', color: '#F59E0B', pct: 32, anim: 'cardSlide2', barAnim: 'bar32', barDelay: '1s' },
    { name: 'XP Visa', num: '•••• 1047', limit: 'R$ 20.000', used: 'R$ 3.200,00', color: '#22C55E', pct: 16, anim: 'cardSlide3', barAnim: 'bar16', barDelay: '1.5s' },
  ];
  return (
    <div style={{ borderRadius: 16, overflow: 'hidden', fontFamily: F.dm, animation: `mockGlow ${DUR} ease-in-out infinite`, border: '1px solid #1F1F1F', background: '#0A0A0A' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 18px', background: '#111111', borderBottom: '1px solid #1F1F1F' }}>
        <div>
          <div style={{ color: '#52525B', fontSize: 8, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', fontFamily: F.dm }}>GESTÃO</div>
          <div style={{ color: '#FFFFFF', fontFamily: F.head, fontSize: 13, fontWeight: 700 }}>Cartões</div>
        </div>
        <div style={{ padding: '5px 12px', borderRadius: 8, background: 'linear-gradient(135deg,#D4AF37,#B8952A)', color: '#0A0A0A', fontSize: 8, fontWeight: 700, fontFamily: F.head }}>+ Novo Cartão</div>
      </div>
      <div style={{ display: 'flex', minHeight: 260 }}>
        <Sidebar active="Cartões" />
        <div style={{ flex: 1, padding: 14, display: 'flex', flexDirection: 'column', gap: 8, overflow: 'hidden' }}>
          {cards.map((c) => (
            <div key={c.name} style={{ borderRadius: 10, padding: '10px 12px', background: '#111111', border: '1px solid #1F1F1F', animation: `${c.anim} ${DUR} ease-in-out infinite` }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ width: 28, height: 18, borderRadius: 4, background: c.color, opacity: 0.9 }} />
                  <div>
                    <div style={{ color: '#FFFFFF', fontSize: 9.5, fontWeight: 600, fontFamily: F.head }}>{c.name}</div>
                    <div style={{ color: '#52525B', fontSize: 8, fontFamily: F.mono }}>{c.num}</div>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ color: '#FFFFFF', fontFamily: F.mono, fontSize: 10, animation: `goldPulse ${DUR} ease-in-out infinite` }}>{c.used}</div>
                  <div style={{ color: '#52525B', fontSize: 7.5, fontFamily: F.dm }}>de {c.limit}</div>
                </div>
              </div>
              <div style={{ height: 4, background: '#1F1F1F', borderRadius: 100, overflow: 'hidden' }}>
                <div style={{ height: '100%', background: `linear-gradient(90deg,${c.color},${c.color}cc)`, borderRadius: 100, width: '0%', animation: `${c.barAnim} ${DUR} ease-in-out ${c.barDelay} infinite` }} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 4 }}>
                <span style={{ color: '#52525B', fontSize: 7, fontFamily: F.dm }}>{c.pct}% utilizado</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── MOCK: INVESTIMENTOS ────────────────────────────────────── */
function MockInvestimentos() {
  const DUR = '9s';
  const assets = [
    { ticker: 'PETR4', name: 'Petrobras', type: 'Ação BR', val: 'R$ 18.400', rend: '+24,3%', rendColor: '#22C55E', delay: '0.2s' },
    { ticker: 'IVVB11', name: 'ETF S&P 500', type: 'ETF', val: 'R$ 32.100', rend: '+31,7%', rendColor: '#22C55E', delay: '0.5s' },
    { ticker: 'LCI-BB', name: 'LCI Banco Brasil', type: 'Renda Fixa', val: 'R$ 25.000', rend: '+12,4%', rendColor: '#22C55E', delay: '0.8s' },
    { ticker: 'BTC', name: 'Bitcoin', type: 'Cripto', val: 'R$ 11.200', rend: '+87,2%', rendColor: '#22C55E', delay: '1.1s' },
    { ticker: 'TESOURO', name: 'Tesouro Selic', type: 'Gov', val: 'R$ 14.900', rend: '+10,9%', rendColor: '#22C55E', delay: '1.4s' },
  ];
  const segments = [
    { color: '#D4AF37', anim: 'idash1', offset: 0 },
    { color: '#22C55E', anim: 'idash2', offset: -26 },
    { color: '#3B82F6', anim: 'idash3', offset: -80 },
    { color: '#E8CC6A', anim: 'idash4', offset: -168 },
    { color: '#52525B', anim: 'idash5', offset: -215 },
  ];
  return (
    <div style={{ borderRadius: 16, overflow: 'hidden', fontFamily: F.dm, animation: `mockGlow ${DUR} ease-in-out infinite`, border: '1px solid #1F1F1F', background: '#0A0A0A' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 18px', background: '#111111', borderBottom: '1px solid #1F1F1F' }}>
        <div>
          <div style={{ color: '#52525B', fontSize: 8, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', fontFamily: F.dm }}>PATRIMÔNIO</div>
          <div style={{ color: '#FFFFFF', fontFamily: F.head, fontSize: 13, fontWeight: 700 }}>Investimentos</div>
        </div>
        <div style={{ color: '#22C55E', fontFamily: F.mono, fontSize: 11, fontWeight: 600 }}>+R$ 24.130 <span style={{ fontSize: 8, color: '#52525B' }}>este ano</span></div>
      </div>
      <div style={{ display: 'flex', minHeight: 280 }}>
        <Sidebar active="Investimentos" />
        <div style={{ flex: 1, padding: 14, overflow: 'hidden' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 12 }}>
            <div style={{ borderRadius: 10, padding: 10, background: '#111111', border: '1px solid #1F1F1F' }}>
              <div style={{ color: '#52525B', fontSize: 7, letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: F.dm, marginBottom: 6 }}>CARTEIRA</div>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div style={{ position: 'relative', width: 64, height: 64 }}>
                  <svg viewBox="0 0 64 64" style={{ width: '100%', height: '100%', transform: 'rotate(-90deg)' }}>
                    {segments.map((s, i) => (
                      <circle key={i} cx="32" cy="32" r="26" fill="none" stroke={s.color} strokeWidth="9" strokeDashoffset={`${s.offset * (201.1 / 100)}`} style={{ animation: `${s.anim} ${DUR} ease-in-out infinite` }} />
                    ))}
                  </svg>
                  <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ color: '#FFFFFF', fontFamily: F.mono, fontSize: 8.5, fontWeight: 600 }}>R$ 101k</div>
                    </div>
                  </div>
                </div>
              </div>
              <div style={{ marginTop: 8 }}>
                {[['Ações BR', '#D4AF37', '18%'], ['ETFs', '#22C55E', '32%'], ['Renda Fixa', '#3B82F6', '25%'], ['Cripto', '#E8CC6A', '11%']].map(([l, c, p]) => (
                  <div key={l} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 2 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                      <div style={{ width: 5, height: 5, borderRadius: '50%', background: c }} />
                      <span style={{ color: '#A1A1AA', fontSize: 7, fontFamily: F.dm }}>{l}</span>
                    </div>
                    <span style={{ color: '#52525B', fontSize: 7, fontFamily: F.mono }}>{p}</span>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ borderRadius: 10, padding: 10, background: '#111111', border: '1px solid #1F1F1F' }}>
              <div style={{ color: '#52525B', fontSize: 7, letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: F.dm, marginBottom: 8 }}>RESUMO</div>
              {[
                { label: 'Patrimônio total', val: 'R$ 101.600', color: '#FFFFFF' },
                { label: 'Rendimento total', val: '+R$ 24.130', color: '#22C55E' },
                { label: 'Rentabilidade', val: '+31,2%', color: '#22C55E' },
                { label: 'Aporte mensal', val: 'R$ 2.500', color: '#D4AF37' },
              ].map((r) => (
                <div key={r.label} style={{ marginBottom: 8 }}>
                  <div style={{ color: '#52525B', fontSize: 7, fontFamily: F.dm }}>{r.label}</div>
                  <div style={{ color: r.color, fontFamily: F.mono, fontSize: 10, fontWeight: 500, animation: r.color === '#22C55E' ? `greenBlink ${DUR} ease-in-out infinite` : undefined }}>{r.val}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ borderRadius: 10, background: '#111111', border: '1px solid #1F1F1F', overflow: 'hidden' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', padding: '6px 10px', borderBottom: '1px solid #1F1F1F' }}>
              {['Ativo', 'Tipo', 'Valor', 'Rend.'].map((h) => (
                <div key={h} style={{ color: '#3F3F46', fontSize: 6.5, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', fontFamily: F.dm }}>{h}</div>
              ))}
            </div>
            {assets.map((a, idx) => (
              <div key={a.ticker} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', padding: '6px 10px', borderBottom: idx < assets.length - 1 ? '1px solid rgba(31,31,31,0.8)' : 'none', animation: `rowIn${idx + 1} ${DUR} ease-in-out ${a.delay} infinite` }}>
                <div>
                  <div style={{ color: '#FFFFFF', fontSize: 8.5, fontWeight: 600, fontFamily: F.head }}>{a.ticker}</div>
                  <div style={{ color: '#52525B', fontSize: 7, fontFamily: F.dm }}>{a.name}</div>
                </div>
                <div style={{ color: '#A1A1AA', fontSize: 8, fontFamily: F.dm, alignSelf: 'center' }}>{a.type}</div>
                <div style={{ color: '#FFFFFF', fontFamily: F.mono, fontSize: 8.5, alignSelf: 'center' }}>{a.val}</div>
                <div style={{ color: a.rendColor, fontFamily: F.mono, fontSize: 8.5, alignSelf: 'center', animation: `greenBlink ${DUR} ease-in-out ${a.delay} infinite` }}>{a.rend}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── MOCK: VERA ─────────────────────────────────────────────── */
function MockVera() {
  const DUR = '9s';
  return (
    <div style={{ borderRadius: 16, overflow: 'hidden', fontFamily: F.dm, animation: `mockGlow ${DUR} ease-in-out infinite`, border: '1px solid #1F1F1F', background: '#0A0A0A' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 18px', background: '#111111', borderBottom: '1px solid #1F1F1F' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ position: 'relative' }}>
            <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'linear-gradient(135deg,#D4AF37,#B8952A)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: F.head, fontWeight: 800, fontSize: 12, color: '#0A0A0A' }}>V</div>
            <div style={{ position: 'absolute', bottom: 0, right: 0, width: 7, height: 7, borderRadius: '50%', background: '#22C55E', border: '1.5px solid #0A0A0A', animation: `onlinePing ${DUR} ease-in-out infinite` }} />
          </div>
          <div>
            <div style={{ color: '#FFFFFF', fontFamily: F.head, fontSize: 12, fontWeight: 700 }}>Vera</div>
            <div style={{ color: '#22C55E', fontSize: 8, fontFamily: F.dm }}>● Online agora</div>
          </div>
        </div>
        <div style={{ color: '#52525B', fontSize: 8, fontFamily: F.dm }}>IA Financeira</div>
      </div>
      <div style={{ display: 'flex', minHeight: 280 }}>
        <Sidebar active="IA Financeira" />
        <div style={{ flex: 1, padding: 14, display: 'flex', flexDirection: 'column', gap: 10, overflow: 'hidden' }}>
          <div style={{ display: 'flex', gap: 7, animation: `veraMsg1 ${DUR} ease-in-out infinite` }}>
            <div style={{ width: 22, height: 22, borderRadius: '50%', background: 'linear-gradient(135deg,#D4AF37,#B8952A)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: F.head, fontWeight: 800, fontSize: 9, color: '#0A0A0A', flexShrink: 0 }}>V</div>
            <div style={{ borderRadius: '10px 10px 10px 2px', padding: '8px 10px', background: '#171717', border: '1px solid #1F1F1F', color: '#A1A1AA', fontSize: 10, lineHeight: 1.6, maxWidth: '85%', fontFamily: F.dm }}>
              Olá! Sou a <strong style={{ color: '#D4AF37' }}>Vera</strong>, sua gerente financeira com IA. Em que posso ajudar hoje?
            </div>
          </div>
          <div style={{ display: 'flex', gap: 7, animation: `typingShow ${DUR} ease-in-out infinite` }}>
            <div style={{ width: 22, height: 22, borderRadius: '50%', background: 'linear-gradient(135deg,#D4AF37,#B8952A)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: F.head, fontWeight: 800, fontSize: 9, color: '#0A0A0A', flexShrink: 0 }}>V</div>
            <div style={{ borderRadius: '10px 10px 10px 2px', padding: '8px 12px', background: '#171717', border: '1px solid #1F1F1F', display: 'flex', alignItems: 'center', gap: 4 }}>
              <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#52525B', animation: 'typeDot1 1.2s ease-in-out infinite' }} />
              <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#52525B', animation: 'typeDot2 1.2s ease-in-out 0.2s infinite' }} />
              <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#52525B', animation: 'typeDot3 1.2s ease-in-out 0.4s infinite' }} />
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', animation: `veraMsg2 ${DUR} ease-in-out infinite` }}>
            <div style={{ borderRadius: '10px 10px 2px 10px', padding: '8px 10px', background: 'rgba(212,175,55,0.08)', border: '1px solid rgba(212,175,55,0.2)', color: '#E8CC6A', fontSize: 10, maxWidth: '75%', fontFamily: F.dm }}>
              Onde estou gastando mais este mês?
            </div>
          </div>
          <div style={{ display: 'flex', gap: 7, animation: `veraMsg3 ${DUR} ease-in-out infinite` }}>
            <div style={{ width: 22, height: 22, borderRadius: '50%', background: 'linear-gradient(135deg,#D4AF37,#B8952A)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: F.head, fontWeight: 800, fontSize: 9, color: '#0A0A0A', flexShrink: 0 }}>V</div>
            <div style={{ borderRadius: '10px 10px 10px 2px', padding: '8px 10px', background: '#171717', border: '1px solid #1F1F1F', color: '#A1A1AA', fontSize: 10, lineHeight: 1.5, maxWidth: '85%', fontFamily: F.dm }}>
              Analisando maio: <strong style={{ color: '#EF4444' }}>Moradia (32%)</strong> e <strong style={{ color: '#F59E0B' }}>Alimentação (19%)</strong> lideram. Posso sugerir cortes no Lazer — R$ 590 este mês.
            </div>
          </div>
          <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: 8, borderRadius: 12, padding: '9px 12px', background: '#171717', border: '1px solid #262626' }}>
            <span style={{ color: '#3F3F46', fontSize: 9.5, flex: 1, fontFamily: F.dm }}>Pergunte qualquer coisa à Vera...</span>
            <span style={{ color: '#3F3F46', fontSize: 11, fontFamily: F.mono, animation: 'cursor 1s steps(1) infinite' }}>|</span>
            <div style={{ width: 20, height: 20, borderRadius: '50%', background: 'linear-gradient(135deg,#D4AF37,#B8952A)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <span style={{ color: '#0A0A0A', fontSize: 10, fontWeight: 700 }}>→</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── MAIN PAGE ──────────────────────────────────────────────── */
export default function LandingPage() {
  const [menuOpen, setMenuOpen] = useState(false);

  const h2Style: React.CSSProperties = {
    fontFamily: F.head,
    fontSize: 'clamp(26px,3.4vw,46px)',
    letterSpacing: '-0.02em',
    fontWeight: 800,
    lineHeight: 1.12,
    margin: 0,
    color: '#FFFFFF',
  };

  const cardStyle: React.CSSProperties = {
    background: '#111111',
    border: '1px solid #1F1F1F',
    borderRadius: 18,
    padding: 24,
  };

  const checkRow = (text: string) => (
    <div key={text} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <div style={{ width: 20, height: 20, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, background: 'rgba(212,175,55,0.1)', border: '1px solid rgba(212,175,55,0.3)' }}>
        <span style={{ color: '#D4AF37', fontSize: 10, fontWeight: 700 }}>✓</span>
      </div>
      <span style={{ color: '#A1A1AA', fontSize: 13, fontFamily: F.dm }}>{text}</span>
    </div>
  );

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: globalStyles }} />
      <div style={{ background: '#0A0A0A', color: '#FFFFFF', fontFamily: F.dm, overflowX: 'hidden' }}>

        {/* ── NAVBAR ──────────────────────────────────────── */}
        <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, height: 64, background: 'rgba(10,10,10,0.95)', backdropFilter: 'blur(24px)', borderBottom: '1px solid #1a1a1a', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 48px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 34, height: 34, borderRadius: 10, background: 'linear-gradient(135deg,#D4AF37,#B8952A)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: F.head, fontWeight: 800, fontSize: 16, color: '#0A0A0A', flexShrink: 0 }}>A</div>
            <div>
              <div style={{ color: '#FFFFFF', fontFamily: F.head, fontSize: 16, fontWeight: 800, letterSpacing: '0.02em', lineHeight: 1 }}>AURUM</div>
              <div style={{ color: 'rgba(212,175,55,0.5)', fontFamily: F.dm, fontSize: 8.5, letterSpacing: '0.2em', textTransform: 'uppercase' }}>Finance</div>
            </div>
          </div>
          <div className="lp-nav-links">
            {[['Funcionalidades', '#funcionalidades'], ['IA Financeira', '#vera'], ['Preço', '#preco'], ['FAQ', '#faq']].map(([l, h]) => (
              <a key={l} href={h} className="lp-navlink">{l}</a>
            ))}
          </div>
          <button className="lp-btn lp-nav-cta" style={{ padding: '10px 22px', fontSize: 13 }}>Começar</button>
          <button className="lp-mob-btn" onClick={() => setMenuOpen(!menuOpen)} style={{ flexDirection: 'column', gap: 5, background: 'none', border: 'none', cursor: 'pointer', padding: 8 }}>
            {[0, 1, 2].map(i => <span key={i} style={{ display: 'block', width: 22, height: 2, background: '#A1A1AA', borderRadius: 2 }} />)}
          </button>
        </nav>

        {menuOpen && (
          <div style={{ position: 'fixed', inset: 0, zIndex: 40, display: 'flex', flexDirection: 'column', padding: '80px 24px 24px', background: 'rgba(10,10,10,0.98)' }}>
            {[['Funcionalidades', '#funcionalidades'], ['IA Financeira', '#vera'], ['Preço', '#preco'], ['FAQ', '#faq']].map(([l, h]) => (
              <a key={l} href={h} onClick={() => setMenuOpen(false)} style={{ display: 'block', padding: '18px 0', fontSize: 18, fontWeight: 700, color: '#A1A1AA', borderBottom: '1px solid #262626', textDecoration: 'none', fontFamily: F.head }}>{l}</a>
            ))}
            <button className="lp-btn" style={{ marginTop: 24, padding: '16px', fontSize: 15, borderRadius: 14 }}>Começar Agora</button>
          </div>
        )}

        {/* ── HERO ────────────────────────────────────────── */}
        <section style={{ paddingTop: 136, paddingBottom: 80, paddingLeft: 24, paddingRight: 24, textAlign: 'center', position: 'relative', overflow: 'hidden', background: 'radial-gradient(ellipse 80% 55% at 50% -5%, rgba(212,175,55,0.10) 0%, transparent 65%)' }}>

          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '7px 18px', borderRadius: 100, marginBottom: 32, background: 'rgba(212,175,55,0.07)', border: '1px solid rgba(212,175,55,0.2)' }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#D4AF37', display: 'inline-block', animation: 'onlinePing 2s ease-in-out infinite' }} />
            <span style={{ color: '#D4AF37', fontFamily: F.dm, fontSize: 11, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase' }}>Gestão financeira com IA — pessoal e empresarial</span>
          </div>

          <h1 style={{ fontFamily: F.head, fontSize: 'clamp(32px,4.2vw,60px)', letterSpacing: '-0.025em', fontWeight: 800, lineHeight: 1.08, marginBottom: 24, maxWidth: 820, marginLeft: 'auto', marginRight: 'auto', color: '#FFFFFF' }}>
            Seu Dinheiro Finalmente<br /><GoldText>Trabalhando por Você</GoldText><br />— não contra você
          </h1>

          <p style={{ color: '#A1A1AA', fontSize: 16, fontFamily: F.dm, maxWidth: 540, margin: '0 auto 36px', lineHeight: 1.75 }}>
            Chega de mês no aperto sem saber o porquê. O AURUM une finanças pessoais, gestão empresarial e a{' '}
            <strong style={{ color: '#D4AF37' }}>Vera</strong>, sua consultora financeira com IA, numa plataforma só.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 18 }}>
            <button className="lp-btn" style={{ padding: '16px 36px', fontSize: 15 }}>
              Quero Assumir o Controle das Minhas Finanças →
            </button>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 28, marginBottom: 72, color: '#3F3F46', fontSize: 12, fontFamily: F.dm, flexWrap: 'wrap' }}>
            <span>✓ Acesso imediato</span><span>✓ Garantia de 7 dias</span><span>✓ Pagamento único</span>
          </div>

          <div style={{ maxWidth: 1060, margin: '0 auto', position: 'relative' }}>
            <div style={{ position: 'absolute', bottom: -40, left: '50%', transform: 'translateX(-50%)', width: 800, height: 200, background: 'radial-gradient(ellipse, rgba(212,175,55,0.08) 0%, transparent 70%)', filter: 'blur(40px)', pointerEvents: 'none' }} />
            <MockDashboard />
          </div>
        </section>

        {/* ── MÉTRICAS ────────────────────────────────────── */}
        <section style={{ borderTop: '1px solid #1a1a1a', borderBottom: '1px solid #1a1a1a' }}>
          <div className="lp-grid-meta lp-wrap" style={{ padding: '48px 24px', textAlign: 'center' }}>
            {[
              { val: '+2.400', label: 'Usuários Ativos' },
              { val: 'R$ 1.2M', label: 'Economizados' },
              { val: '4.9/5', label: 'Avaliação Média' },
              { val: '98%', label: 'Recomendariam' },
            ].map((m) => (
              <div key={m.label}>
                <div style={{ fontFamily: F.mono, fontSize: 34, letterSpacing: '-0.04em', background: 'linear-gradient(135deg,#D4AF37,#E8CC6A)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', marginBottom: 6 }}>{m.val}</div>
                <div style={{ color: '#52525B', fontSize: 10, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', fontFamily: F.dm }}>{m.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── PROBLEMA ────────────────────────────────────── */}
        <section className="lp-section">
          <div className="lp-wrap" style={{ textAlign: 'center' }}>
            <Label>Reconhece isso?</Label>
            <h2 style={{ ...h2Style, maxWidth: 700, margin: '0 auto 16px' }}>
              Esses problemas custam caro —{' '}
              <GoldText>e a maioria nem percebe.</GoldText>
            </h2>
            <p style={{ color: '#A1A1AA', fontFamily: F.dm, fontSize: 14, marginBottom: 52 }}>
              Não é descuido. É que ninguém te deu as <strong style={{ color: '#FFFFFF' }}>ferramentas certas.</strong>
            </p>
            <div className="lp-grid-pain">
              {[
                'Fim do mês chega e o saldo some — sem explicação',
                'Recebe bem mas ainda sente que o dinheiro não sobra',
                'Fatura do cartão sempre maior do que esperava',
                'Parcelas empilhadas que parecem nunca acabar',
                'Empresa sem previsão de caixa para os próximos 30 dias',
                'Decisões financeiras tomadas no instinto, sem dados',
                'Pequenas despesas esquecidas que somam R$ 500, R$ 1k por mês',
                'Sem clareza sobre onde está, nem para onde está indo',
              ].map((pain) => (
                <div key={pain} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '15px 18px', borderRadius: 12, textAlign: 'left', background: '#0F0F0F', border: '1px solid #1F1F1F' }}>
                  <div style={{ width: 28, height: 28, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)' }}>
                    <span style={{ color: '#EF4444', fontSize: 11 }}>✕</span>
                  </div>
                  <span style={{ color: '#A1A1AA', fontSize: 13, fontFamily: F.dm }}>{pain}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SOLUÇÃO ─────────────────────────────────────── */}
        <section className="lp-section-dark" id="funcionalidades">
          <div className="lp-wrap" style={{ textAlign: 'center' }}>
            <Label>A Virada</Label>
            <h2 style={{ ...h2Style, maxWidth: 680, margin: '0 auto 16px' }}>
              O <GoldText>AURUM Finance</GoldText> foi construído para acabar com essa confusão de vez
            </h2>
            <p style={{ color: '#A1A1AA', fontFamily: F.dm, fontSize: 14, maxWidth: 500, margin: '0 auto 52px', lineHeight: 1.7 }}>
              Pessoal, empresarial e inteligência artificial num só lugar. Clareza financeira real, não teoria.
            </p>
            <div className="lp-grid-4">
              {[
                { n: '1', title: 'Visão completa do seu dinheiro', desc: 'Entradas, saídas, parcelas e cartões — tudo num painel só.' },
                { n: '2', title: 'Sua empresa sob controle', desc: 'Fluxo de caixa, DRE e projeções prontos, sem planilha.' },
                { n: '3', title: 'IA que trabalha por você', desc: 'A Vera lê seus dados e aponta exatamente onde agir.' },
                { n: '4', title: 'Do caos ao crescimento', desc: 'Metas, reservas e patrimônio evoluindo com método.' },
              ].map((card) => (
                <div key={card.n} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', textAlign: 'left', padding: 22, borderRadius: 16, background: '#111111', border: '1px solid #1F1F1F' }}>
                  <div style={{ width: 36, height: 36, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16, background: 'linear-gradient(135deg,#D4AF37,#B8952A)', color: '#0A0A0A', fontFamily: F.head, fontSize: 18, fontWeight: 800 }}>{card.n}</div>
                  <h3 style={{ color: '#FFFFFF', fontFamily: F.head, fontWeight: 700, fontSize: 14, marginBottom: 8 }}>{card.title}</h3>
                  <p style={{ color: '#52525B', fontSize: 12, lineHeight: 1.65, fontFamily: F.dm }}>{card.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FUNCIONALIDADES ─────────────────────────────── */}
        <section className="lp-section">
          <div className="lp-wrap">
            <div style={{ textAlign: 'center', marginBottom: 64 }}>
              <Label>Funcionalidades</Label>
              <h2 style={h2Style}>Funcionalidades que <GoldText>fazem a diferença no dia a dia</GoldText></h2>
            </div>

            {/* Cartões */}
            <div className="lp-grid-2" style={{ marginBottom: 80 }}>
              <div>
                <span style={{ display: 'inline-block', padding: '4px 14px', borderRadius: 100, fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 18, background: 'rgba(212,175,55,0.08)', color: '#D4AF37', border: '1px solid rgba(212,175,55,0.2)', fontFamily: F.dm }}>Cartões & Crédito</span>
                <h3 style={{ color: '#FFFFFF', fontFamily: F.head, fontSize: 24, fontWeight: 800, letterSpacing: '-0.01em', marginBottom: 14 }}>Todos os Seus Cartões em um Só Lugar</h3>
                <p style={{ color: '#A1A1AA', fontSize: 14, marginBottom: 22, lineHeight: 1.7, fontFamily: F.dm }}>Chega de abrir cinco apps diferentes para checar fatura, limite e vencimento. O AURUM centraliza tudo com clareza.</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {['Todos os cartões reunidos num painel', 'Fatura detalhada por categoria de gasto', 'Notificação antes do vencimento', 'Limite real disponível atualizado', 'Histórico de parcelamentos por cartão', 'Utilização de crédito e saúde financeira'].map(checkRow)}
                </div>
              </div>
              <div style={{ position: 'relative' }}>
                <MockCartoes />
              </div>
            </div>

            {/* Investimentos */}
            <div className="lp-grid-2">
              <div className="lp-inv-a" style={{ position: 'relative' }}>
                <MockInvestimentos />
              </div>
              <div className="lp-inv-b">
                <span style={{ display: 'inline-block', padding: '4px 14px', borderRadius: 100, fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 18, background: 'rgba(212,175,55,0.08)', color: '#D4AF37', border: '1px solid rgba(212,175,55,0.2)', fontFamily: F.dm }}>Investimentos</span>
                <h3 style={{ color: '#FFFFFF', fontFamily: F.head, fontSize: 24, fontWeight: 800, letterSpacing: '-0.01em', marginBottom: 14 }}>Patrimônio Crescendo com Visibilidade</h3>
                <p style={{ color: '#A1A1AA', fontSize: 14, marginBottom: 22, lineHeight: 1.7, fontFamily: F.dm }}>Ações, ETFs, tesouro, renda fixa e cripto — tudo consolidado. Você vê quanto tem, quanto rendeu e onde está cada real.</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {['Portfólio unificado de todas as classes', 'Rentabilidade individual e consolidada', 'Distribuição por tipo de ativo', 'Linha do tempo do seu patrimônio', 'Comparativo com CDI, IPCA e Ibovespa', 'Análise de concentração de risco'].map(checkRow)}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── VERA IA ─────────────────────────────────────── */}
        <section className="lp-section-dark" id="vera">
          <div className="lp-grid-2 lp-wrap">
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 14px', borderRadius: 100, fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 22, background: 'rgba(212,175,55,0.05)', border: '1px solid rgba(212,175,55,0.2)', color: '#D4AF37', fontFamily: F.dm }}>
                ✦ Inteligência Artificial
              </div>
              <h2 style={{ ...h2Style, marginBottom: 16 }}>
                Conheça a <GoldText>Vera</GoldText> — a IA que entende suas finanças de verdade
              </h2>
              <p style={{ color: '#A1A1AA', fontSize: 14, marginBottom: 28, lineHeight: 1.75, fontFamily: F.dm }}>
                A Vera não é um chatbot genérico. Ela lê seus dados reais — receitas, despesas, cartões, caixa — e te responde como uma gerente financeira experiente responderia.
              </p>
              <div style={{ marginBottom: 24 }}>
                <p style={{ color: '#52525B', fontSize: 10, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 10, fontFamily: F.dm }}>Ela responde perguntas como:</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {['"No que estou gastando mais?"', '"Quanto posso economizar?"', '"Meu caixa fecha esse mês?"', '"Gere meu DRE"', '"Onde estão meus vazamentos?"', '"Que cortes fazem sentido?"'].map((q) => (
                    <span key={q} style={{ padding: '6px 12px', borderRadius: 100, fontSize: 11, background: '#171717', border: '1px solid #262626', color: '#A1A1AA', fontFamily: F.dm }}>{q}</span>
                  ))}
                </div>
              </div>
              <div style={{ padding: 18, borderRadius: 14, background: 'rgba(212,175,55,0.04)', border: '1px solid rgba(212,175,55,0.18)' }}>
                <p style={{ fontSize: 13, lineHeight: 1.7, color: '#A1A1AA', fontFamily: F.dm }}>
                  <span style={{ color: '#D4AF37', fontWeight: 700 }}>Imagine ter um especialista financeiro disponível a qualquer hora</span> — sem custo de consultoria. A Vera transforma seus números em ações concretas.
                </p>
              </div>
            </div>
            <div style={{ position: 'relative' }}>
              <MockVera />
            </div>
          </div>
        </section>

        {/* ── PARA QUEM É ─────────────────────────────────── */}
        <section className="lp-section">
          <div className="lp-wrap" style={{ textAlign: 'center' }}>
            <Label>É pra você?</Label>
            <h2 style={{ ...h2Style, marginBottom: 52 }}>
              O AURUM foi feito para quem <GoldText>quer resultados, não promessas</GoldText>
            </h2>
            <div className="lp-grid-pain">
              {[
                { title: 'Quem quer parar de improvisar no fim do mês', desc: 'Clareza de onde está cada centavo, sem planilha nem adivinhação.' },
                { title: 'Empresários que tomam decisões no escuro', desc: 'Tenha caixa, DRE e projeções reais para agir com segurança.' },
                { title: 'Autônomos que precisam de previsibilidade', desc: 'Saiba exatamente o que vai entrar e sair nos próximos 90 dias.' },
                { title: 'Quem quer construir patrimônio com consistência', desc: 'Metas, reservas e investimentos evoluindo todo mês — de verdade.' },
              ].map((item) => (
                <div key={item.title} style={{ display: 'flex', alignItems: 'flex-start', gap: 16, padding: '20px 22px', borderRadius: 16, textAlign: 'left', background: '#0F0F0F', border: '1px solid #1F1F1F' }}>
                  <div style={{ width: 32, height: 32, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, background: 'linear-gradient(135deg,#D4AF37,#B8952A)' }}>
                    <span style={{ color: '#0A0A0A', fontSize: 14, fontWeight: 900 }}>✓</span>
                  </div>
                  <div>
                    <h4 style={{ color: '#FFFFFF', fontFamily: F.head, fontWeight: 700, fontSize: 14, marginBottom: 6 }}>{item.title}</h4>
                    <p style={{ color: '#52525B', fontSize: 12, fontFamily: F.dm }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PAGAMENTO ÚNICO ─────────────────────────────── */}
        <section className="lp-section-dark">
          <div className="lp-wrap-md" style={{ textAlign: 'center' }}>
            <Label>💡 Diferente de tudo</Label>
            <h2 style={{ ...h2Style, marginBottom: 14 }}>
              Invista <GoldText>uma única vez</GoldText> — use <GoldText>para sempre</GoldText>
            </h2>
            <p style={{ color: '#A1A1AA', fontFamily: F.dm, fontSize: 14, marginBottom: 52 }}>Enquanto outras ferramentas cobram mensalidade indefinidamente, o AURUM é seu com um único investimento.</p>
            <div className="lp-grid-4">
              {[
                { icon: '✓', title: 'Uma vez só', desc: 'Paga agora, usa para sempre.' },
                { icon: '∞', title: 'Acesso eterno', desc: 'Sem prazo, sem renovação.' },
                { icon: '✕', title: 'Zero mensalidade', desc: 'Sua fatura não muda.' },
                { icon: '🔒', title: 'Sem pegadinhas', desc: 'O que você vê é o que paga.' },
              ].map((item) => (
                <div key={item.title} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '22px 16px', borderRadius: 16, background: '#111111', border: '1px solid rgba(212,175,55,0.14)' }}>
                  <div style={{ width: 48, height: 48, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 14, background: 'linear-gradient(135deg,#D4AF37,#B8952A)' }}>
                    <span style={{ color: '#0A0A0A', fontWeight: 900, fontSize: 20 }}>{item.icon}</span>
                  </div>
                  <h4 style={{ color: '#FFFFFF', fontFamily: F.head, fontWeight: 700, fontSize: 13, marginBottom: 6 }}>{item.title}</h4>
                  <p style={{ color: '#52525B', fontSize: 12, fontFamily: F.dm }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── DEPOIMENTOS ─────────────────────────────────── */}
        <section className="lp-section">
          <div className="lp-wrap" style={{ textAlign: 'center' }}>
            <Label>Resultados Reais</Label>
            <h2 style={{ ...h2Style, marginBottom: 16 }}>
              Mais de 2.400 pessoas já <GoldText>viraram o jogo financeiro</GoldText>
            </h2>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 52 }}>
              <span style={{ color: '#D4AF37', fontSize: 16 }}>★★★★★</span>
              <span style={{ color: '#52525B', fontSize: 13, fontFamily: F.dm }}>4.9/5 — média de +2.300 avaliações verificadas</span>
            </div>
            <div className="lp-grid-3">
              {testimonials.map((t) => (
                <div key={t.name} style={{ display: 'flex', flexDirection: 'column', textAlign: 'left', padding: 22, borderRadius: 16, background: '#0F0F0F', border: '1px solid #1F1F1F' }}>
                  <div style={{ color: '#D4AF37', fontSize: 13, marginBottom: 12 }}>★★★★★</div>
                  <p style={{ color: '#A1A1AA', fontSize: 13, flex: 1, marginBottom: 18, lineHeight: 1.7, fontFamily: F.dm }}>&ldquo;{t.text}&rdquo;</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, paddingTop: 14, borderTop: '1px solid #1F1F1F' }}>
                    <div style={{ width: 36, height: 36, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, background: 'linear-gradient(135deg,#D4AF37,#B8952A)', color: '#0A0A0A', fontFamily: F.head, fontWeight: 800, fontSize: 14 }}>{t.initial}</div>
                    <div>
                      <div style={{ color: '#FFFFFF', fontFamily: F.head, fontWeight: 700, fontSize: 13 }}>{t.name}</div>
                      <div style={{ color: '#52525B', fontSize: 11, fontFamily: F.dm }}>{t.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PREÇO ───────────────────────────────────────── */}
        <section id="preco" style={{ padding: '96px 24px', background: 'radial-gradient(ellipse 70% 60% at 50% 100%, rgba(212,175,55,0.07) 0%, transparent 70%)', textAlign: 'center' }}>
          <div className="lp-wrap-sm">
            <Label>Acesso completo</Label>
            <h2 style={{ ...h2Style, marginBottom: 44 }}>
              Comece hoje com tudo que precisa para <GoldText>mudar de vez</GoldText>
            </h2>
            <div style={{ position: 'relative', padding: '36px 36px 32px', borderRadius: 22, background: '#111111', border: '1px solid rgba(212,175,55,0.28)', boxShadow: '0 0 60px rgba(212,175,55,0.07)' }}>
              <div style={{ position: 'absolute', top: -16, right: 24, padding: '7px 18px', borderRadius: 100, fontWeight: 700, fontSize: 13, background: 'linear-gradient(135deg,#D4AF37,#B8952A)', color: '#0A0A0A', fontFamily: F.head }}>67% OFF</div>
              <div style={{ fontSize: 14, fontWeight: 500, marginBottom: 14, color: '#A1A1AA', fontFamily: F.dm }}>
                Acesso vitalício ao <span style={{ color: '#FFFFFF', fontWeight: 600 }}>AURUM Finance</span> por apenas
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14, marginBottom: 6 }}>
                <span style={{ fontSize: 16, textDecoration: 'line-through', color: '#3F3F46', fontFamily: F.mono }}>R$ 297</span>
                <span style={{ fontFamily: F.mono, fontSize: 48, letterSpacing: '-0.04em', background: 'linear-gradient(135deg,#D4AF37,#E8CC6A)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>R$ 147,00</span>
              </div>
              <div style={{ fontSize: 13, color: '#52525B', fontFamily: F.dm, marginBottom: 28 }}>à vista · pagamento único</div>
              <div className="lp-price-grid" style={{ marginBottom: 28 }}>
                {['Acesso completo ao Finance Pessoal + Empresarial', 'Acesso vitalício sem mensalidade', 'Suporte humano dedicado', 'Acesso pelo celular, tablet e desktop'].map((b) => (
                  <div key={b} style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                    <span style={{ color: '#D4AF37', fontSize: 13, flexShrink: 0, marginTop: 1 }}>✓</span>
                    <span style={{ color: '#A1A1AA', fontSize: 12, fontFamily: F.dm }}>{b}</span>
                  </div>
                ))}
              </div>
              <button className="lp-btn" style={{ width: '100%', padding: '16px', fontSize: 15, borderRadius: 12, marginBottom: 14 }}>
                Quero Entrar no AURUM Finance Agora →
              </button>
              <p style={{ color: '#52525B', fontSize: 12, fontFamily: F.dm }}>🔒 Pagamento 100% seguro · Acesso Imediato · Garantia de 7 dias</p>
            </div>
          </div>
        </section>

        {/* ── FAQ ─────────────────────────────────────────── */}
        <section id="faq" className="lp-section-dark">
          <div className="lp-wrap-sm">
            <div style={{ textAlign: 'center', marginBottom: 52 }}>
              <Label>FAQ</Label>
              <h2 style={h2Style}>Respostas antes de decidir</h2>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {faqData.map((item) => <FAQItem key={item.q} q={item.q} a={item.a} />)}
            </div>
          </div>
        </section>

        {/* ── FOOTER CTA ──────────────────────────────────── */}
        <section style={{ padding: '96px 24px', textAlign: 'center', background: 'radial-gradient(ellipse 60% 60% at 50% 50%, rgba(212,175,55,0.05) 0%, transparent 70%)' }}>
          <div className="lp-wrap-sm">
            <h2 style={{ ...h2Style, marginBottom: 16 }}>
              A decisão certa começa com <GoldText>uma ação agora.</GoldText>
            </h2>
            <p style={{ color: '#A1A1AA', fontSize: 15, marginBottom: 36, fontFamily: F.dm, lineHeight: 1.7 }}>
              Mais de 2.400 pessoas já usam o AURUM para tomar decisões financeiras com clareza. Você pode ser o próximo.
            </p>
            <button className="lp-btn" style={{ padding: '16px 44px', fontSize: 15, borderRadius: 12, marginBottom: 20 }}>
              Acessar o AURUM Finance →
            </button>
            <div>
              <span style={{ color: '#52525B', fontSize: 12, fontFamily: F.dm }}>🛡️ Garantia de 7 dias — sem perguntas</span>
            </div>
          </div>
        </section>

        {/* ── FOOTER ──────────────────────────────────────── */}
        <footer style={{ borderTop: '1px solid #1a1a1a' }}>
          <div className="lp-footer-row lp-wrap" style={{ padding: '36px 24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 28, height: 28, borderRadius: 8, background: 'linear-gradient(135deg,#D4AF37,#B8952A)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: F.head, fontWeight: 800, fontSize: 14, color: '#0A0A0A' }}>A</div>
              <span style={{ color: '#FFFFFF', fontFamily: F.head, fontSize: 15, fontWeight: 700, letterSpacing: '0.02em' }}>AURUM Finance</span>
            </div>
            <div className="lp-footer-links">
              {['Funcionalidades', 'IA Financeira', 'Preço', 'FAQ'].map((link) => (
                <a key={link} href="#" className="lp-footer-link" style={{ fontFamily: F.dm }}>{link}</a>
              ))}
            </div>
            <p style={{ color: '#3F3F46', fontSize: 12, fontFamily: F.dm }}>© 2026 AURUM Finance. Todos os direitos reservados.</p>
          </div>
        </footer>

      </div>
    </>
  );
}
