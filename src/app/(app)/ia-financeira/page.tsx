"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { Sparkles, Send, TrendingUp, AlertTriangle, Lightbulb, BarChart3, User, Bot } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { formatCurrency } from "@/lib/utils";

const suggestions = [
  "Como reduzir minhas despesas mensais?",
  "Qual o melhor investimento para meu perfil?",
  "Meu fluxo de caixa está saudável?",
  "Quanto posso economizar em 12 meses?",
  "Como atingir minha reserva de emergência?",
];

const insights = [
  {
    icon: TrendingUp,
    title: "Tendência de gastos",
    desc: "Seus gastos com alimentação aumentaram 23% nos últimos 3 meses. Considere revisar esse hábito.",
    color: "#F59E0B",
    action: "Ver detalhes",
  },
  {
    icon: Lightbulb,
    title: "Oportunidade de economia",
    desc: "Você tem 7 assinaturas ativas totalizando R$ 434,30/mês. 3 delas tiveram uso menor que 2h/mês.",
    color: "#D4AF37",
    action: "Ver assinaturas",
  },
  {
    icon: AlertTriangle,
    title: "Alerta de padrão",
    desc: "Gastos com transporte estão 40% acima da média dos últimos 6 meses.",
    color: "#EF4444",
    action: "Analisar",
  },
  {
    icon: BarChart3,
    title: "Projeção patrimonial",
    desc: "Mantendo o ritmo atual, seu patrimônio pode superar R$ 400.000 em 18 meses.",
    color: "#22C55E",
    action: "Ver projeção",
  },
];

interface Message {
  role: "user" | "ai";
  content: string;
  timestamp: Date;
}

const aiResponses: Record<string, string> = {
  default: "Analisando seus dados financeiros... Com base no seu perfil, identifiquei algumas oportunidades interessantes. Seus gastos fixos representam 53% da renda, o que está ligeiramente acima do ideal (máximo 50%). Recomendo revisar assinaturas e serviços recorrentes.",
  "despesas": "Sua maior oportunidade de redução está em **Alimentação** (R$ 1.850/mês) e **Assinaturas** (R$ 434/mês). Se reduzir alimentação em 20%, economizaria R$ 370/mês — R$ 4.440/ano. Esse valor investido em renda fixa a 11% a.a. valeria R$ 16.700 em 3 anos.",
  "investimento": "Com seu perfil moderado e horizonte de 5+ anos, sugiro: 40% Renda Fixa (CDB/LCI), 35% ETFs de ações (BOVA11 + IVVB11), 15% Ações individuais e 10% Tesouro IPCA+. Isso equilibra segurança e crescimento.",
  "fluxo": "Seu fluxo de caixa está **positivo** com saldo de R$ 8.652/mês. O índice de poupança é de 46,8% — excelente! A ONU recomenda mínimo 20%. Continue assim e você atingirá independência financeira mais cedo.",
  "economizar": "Projeção a 12 meses: mantendo a taxa atual de poupança (R$ 8.652/mês), você acumulará R$ 103.824. Reinvestindo mensalmente em CDB 110% CDI, o montante chega a R$ 109.200 com juros.",
  "reserva": "Sua reserva atual (R$ 32.400) cobre 3,3 meses de despesas. Para atingir 6 meses (R$ 60.000), faltam R$ 27.600. Aportando R$ 2.300/mês, você chegará lá em 12 meses.",
};

export default function IAFinanceiraPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "ai",
      content: "Olá! Sou a VERA, sua assistente financeira com inteligência artificial. Analisei seus dados e estou pronta para ajudá-lo a tomar as melhores decisões financeiras. Como posso ajudar hoje?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;
    setInput("");

    const userMsg: Message = { role: "user", content: text, timestamp: new Date() };
    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    await new Promise((r) => setTimeout(r, 1200 + Math.random() * 800));

    const lower = text.toLowerCase();
    let response = aiResponses.default;
    if (lower.includes("despesa") || lower.includes("reduzir") || lower.includes("cortar")) response = aiResponses.despesas;
    else if (lower.includes("investimento") || lower.includes("investir")) response = aiResponses.investimento;
    else if (lower.includes("fluxo") || lower.includes("saud")) response = aiResponses.fluxo;
    else if (lower.includes("economizar") || lower.includes("poupar")) response = aiResponses.economizar;
    else if (lower.includes("reserva") || lower.includes("emergência")) response = aiResponses.reserva;

    setIsTyping(false);
    setMessages((prev) => [...prev, { role: "ai", content: response, timestamp: new Date() }]);
  };

  return (
    <div className="flex flex-col min-h-full">
      <Header title="IA Financeira" subtitle="Vera · Assistente">
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] text-[#D4AF37]"
          style={{ background: "rgba(212,175,55,0.08)", border: "1px solid rgba(212,175,55,0.2)" }}>
          <div className="w-1.5 h-1.5 rounded-full bg-[#22C55E] animate-pulse" />
          Online
        </div>
      </Header>

      <div className="flex-1 flex overflow-hidden">
        {/* Insights sidebar */}
        <div className="w-80 flex-shrink-0 border-r border-[#1A1A1A] p-5 overflow-y-auto space-y-4">
          <div>
            <p className="text-[11px] text-[#52525B] uppercase tracking-wider mb-3">Insights Automáticos</p>
            {insights.map((insight, i) => {
              const Icon = insight.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="mb-3 p-4 rounded-xl cursor-pointer hover:bg-[#152015] transition-all duration-200"
                  style={{ border: `1px solid ${insight.color}18`, background: "#141414" }}
                >
                  <div className="flex items-start gap-2.5">
                    <div
                      className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ background: `${insight.color}12` }}
                    >
                      <Icon size={13} style={{ color: insight.color }} />
                    </div>
                    <div>
                      <p className="text-[12.5px] font-medium text-white mb-1">{insight.title}</p>
                      <p className="text-[11.5px] text-[#52525B] leading-relaxed">{insight.desc}</p>
                      <button
                        className="text-[11px] mt-2 font-medium"
                        style={{ color: insight.color }}
                      >
                        {insight.action} →
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Financial summary for AI */}
          <div className="p-4 rounded-xl" style={{ background: "#141414", border: "1px solid #1E1E1E" }}>
            <p className="text-[11px] text-[#52525B] uppercase tracking-wider mb-3">Contexto Financeiro</p>
            {[
              { label: "Saldo", value: "R$ 47.382,90", color: "#D4AF37" },
              { label: "Receitas/mês", value: "R$ 18.500,00", color: "#22C55E" },
              { label: "Despesas/mês", value: "R$ 9.847,30", color: "#EF4444" },
              { label: "Investido", value: "R$ 178.000,00", color: "#A1A1AA" },
            ].map((item) => (
              <div key={item.label} className="flex justify-between py-1.5 border-b border-[#1A1A1A] last:border-0">
                <span className="text-[12px] text-[#52525B]">{item.label}</span>
                <span className="metric-value text-[12px]" style={{ color: item.color }}>{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Chat */}
        <div className="flex-1 flex flex-col">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
              >
                <div
                  className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{
                    background: msg.role === "ai"
                      ? "linear-gradient(135deg, #D4AF37, #B8952A)"
                      : "#1F1F1F",
                    border: msg.role === "user" ? "1px solid #262626" : "none",
                  }}
                >
                  {msg.role === "ai"
                    ? <Sparkles size={14} className="text-black" />
                    : <User size={14} className="text-[#A1A1AA]" />
                  }
                </div>
                <div
                  className="max-w-[72%] px-4 py-3 rounded-2xl text-[13.5px] leading-relaxed"
                  style={{
                    background: msg.role === "ai" ? "#171717" : "rgba(212,175,55,0.08)",
                    border: msg.role === "ai" ? "1px solid #262626" : "1px solid rgba(212,175,55,0.2)",
                    color: msg.role === "ai" ? "#E4E4E7" : "#F5E07A",
                    borderRadius: msg.role === "ai" ? "4px 16px 16px 16px" : "16px 4px 16px 16px",
                  }}
                >
                  {msg.content}
                </div>
              </motion.div>
            ))}

            {/* Typing indicator */}
            <AnimatePresence>
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex gap-3"
                >
                  <div
                    className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: "linear-gradient(135deg, #D4AF37, #B8952A)" }}
                  >
                    <Sparkles size={14} className="text-black" />
                  </div>
                  <div className="px-4 py-3 rounded-2xl flex items-center gap-1.5" style={{ background: "#171717", border: "1px solid #262626" }}>
                    {[0, 0.15, 0.3].map((delay) => (
                      <motion.div
                        key={delay}
                        className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]"
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ repeat: Infinity, duration: 1, delay }}
                      />
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            <div ref={endRef} />
          </div>

          {/* Suggestions */}
          <div className="px-6 pb-2 flex gap-2 overflow-x-auto">
            {suggestions.map((s) => (
              <button
                key={s}
                onClick={() => sendMessage(s)}
                className="px-3 py-1.5 rounded-full text-[12px] whitespace-nowrap flex-shrink-0 transition-all duration-200 hover:border-[#D4AF37]/40 hover:text-[#D4AF37]"
                style={{ background: "#141414", border: "1px solid #1E1E1E", color: "#52525B" }}
              >
                {s}
              </button>
            ))}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-[#1A1A1A]">
            <div
              className="flex items-center gap-3 px-4 py-3 rounded-2xl"
              style={{ background: "#141414", border: "1px solid #262626" }}
            >
              <Sparkles size={15} className="text-[#D4AF37] flex-shrink-0" />
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
                placeholder="Pergunte sobre suas finanças..."
                className="flex-1 bg-transparent outline-none text-[13.5px] text-white placeholder:text-[#3F3F46]"
              />
              <button
                onClick={() => sendMessage(input)}
                disabled={!input.trim()}
                className="w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-200 disabled:opacity-30"
                style={{
                  background: input.trim() ? "linear-gradient(135deg, #D4AF37, #B8952A)" : "#1F1F1F",
                }}
              >
                <Send size={13} className={input.trim() ? "text-black" : "text-[#52525B]"} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
