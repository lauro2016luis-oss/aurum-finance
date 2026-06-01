"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

const DEMO_DATA = {
  transactions: [
    { id: "t1", description: "Salário", category: "Salário", date: "2026-06-01", value: 12500, type: "income", account: "Nubank", status: "completed" },
    { id: "t2", description: "Aluguel", category: "Moradia", date: "2026-06-05", value: 2800, type: "expense", account: "Nubank", status: "completed" },
    { id: "t3", description: "Supermercado", category: "Alimentação", date: "2026-06-08", value: 650, type: "expense", account: "Itaú", status: "completed" },
    { id: "t4", description: "Freelance", category: "Renda Extra", date: "2026-06-10", value: 3200, type: "income", account: "Nubank", status: "completed" },
    { id: "t5", description: "Academia", category: "Saúde", date: "2026-06-12", value: 120, type: "expense", account: "Itaú", status: "completed" },
    { id: "t6", description: "Restaurante", category: "Alimentação", date: "2026-06-14", value: 180, type: "expense", account: "Nubank", status: "completed" },
    { id: "t7", description: "Uber", category: "Transporte", date: "2026-06-15", value: 45, type: "expense", account: "Nubank", status: "completed" },
    { id: "t8", description: "Dividendos", category: "Investimentos", date: "2026-06-18", value: 840, type: "income", account: "XP Investimentos", status: "completed" },
  ],
  fixedExpenses: [
    { id: "fe1", name: "Aluguel", category: "Moradia", dueDay: 5, value: 2800, status: "paid", active: true },
    { id: "fe2", name: "Internet", category: "Utilidades", dueDay: 10, value: 120, status: "paid", active: true },
    { id: "fe3", name: "Energia", category: "Utilidades", dueDay: 15, value: 280, status: "pending", active: true },
    { id: "fe4", name: "Plano de Saúde", category: "Saúde", dueDay: 20, value: 580, status: "pending", active: true },
    { id: "fe5", name: "Condomínio", category: "Moradia", dueDay: 8, value: 650, status: "paid", active: true },
    { id: "fe6", name: "Celular", category: "Utilidades", dueDay: 25, value: 89, status: "pending", active: true },
  ],
  investments: [
    { id: "inv1", name: "Tesouro Selic 2029", type: "Renda Fixa", amount: 45000, currentValue: 48200, yield: 7.1, category: "Renda Fixa", instituicao: "XP Investimentos" },
    { id: "inv2", name: "PETR4", type: "Ações", amount: 12000, currentValue: 14800, yield: 23.3, category: "Ações", instituicao: "XP Investimentos" },
    { id: "inv3", name: "MXRF11", type: "FII", amount: 8000, currentValue: 9200, yield: 15.0, category: "FII", instituicao: "XP Investimentos" },
    { id: "inv4", name: "CDB 110% CDI", type: "Renda Fixa", amount: 20000, currentValue: 21400, yield: 10.0, category: "Renda Fixa", instituicao: "Nubank" },
    { id: "inv5", name: "Bitcoin", type: "Cripto", amount: 5000, currentValue: 8900, yield: 78.0, category: "Cripto", instituicao: "Binance" },
  ],
  bankAccounts: [
    { id: "ba1", bank: "Nubank", type: "Conta Corrente", balance: 18420.50, agency: "0001", account: "123456-7", color: "#8B5CF6" },
    { id: "ba2", bank: "Itaú", type: "Conta Corrente", balance: 8240.00, agency: "0082", account: "88102-3", color: "#F59E0B" },
    { id: "ba3", bank: "Inter", type: "Conta Digital", balance: 5680.00, agency: "0001", account: "45678-9", color: "#F97316" },
    { id: "ba4", bank: "XP Investimentos", type: "Conta Investimento", balance: 178000.00, agency: "", account: "002545-6", color: "#22C55E" },
  ],
  creditCards: [
    { id: "cc1", name: "Nubank", bank: "Nubank", limit: 15000, used: 4200, available: 10800, closingDay: 18, dueDay: 25, color: "#8B5CF6", lastFour: "4521" },
    { id: "cc2", name: "Itaú Personnalité", bank: "Itaú", limit: 25000, used: 8750, available: 16250, closingDay: 12, dueDay: 19, color: "#F59E0B", lastFour: "8834" },
  ],
  financialGoals: [
    { id: "g1", name: "Viagem para Europa", target: 25000, current: 12500, deadline: "2026-12-01", category: "Viagem", icon: "✈️" },
    { id: "g2", name: "Entrada do Apartamento", target: 80000, current: 35000, deadline: "2027-06-01", category: "Imóvel", icon: "🏠" },
    { id: "g3", name: "Fundo de Emergência", target: 50000, current: 32400, deadline: "2026-09-01", category: "Segurança", icon: "🛡️" },
  ],
  subscriptions: [
    { id: "s1", name: "Netflix", price: 55.90, billingDay: 15, category: "Streaming", status: "active", nextBilling: "2026-07-15" },
    { id: "s2", name: "Spotify", price: 21.90, billingDay: 20, category: "Música", status: "active", nextBilling: "2026-07-20" },
    { id: "s3", name: "Adobe Creative", price: 284.00, billingDay: 1, category: "Software", status: "active", nextBilling: "2026-07-01" },
    { id: "s4", name: "Amazon Prime", price: 19.90, billingDay: 10, category: "Streaming", status: "active", nextBilling: "2026-07-10" },
  ],
  reserve: 32400,
};

export default function SeedDemoPage() {
  const router = useRouter();
  const [status, setStatus] = useState("Verificando sessão...");

  useEffect(() => {
    const run = async () => {
      try {
        setStatus("Obtendo usuário...");
        const supabase = createClient();

        // Tenta até 3x com delay (mobile pode ser lento)
        let userId: string | null = null;
        for (let i = 0; i < 3; i++) {
          const { data } = await supabase.auth.getUser();
          if (data.user?.id) { userId = data.user.id; break; }
          await new Promise(r => setTimeout(r, 800));
        }

        if (!userId) {
          setStatus("Não logado. Redirecionando...");
          setTimeout(() => router.push("/login"), 1500);
          return;
        }

        setStatus("Carregando dados demo...");
        localStorage.setItem(`aurum_data_${userId}`, JSON.stringify(DEMO_DATA));

        setStatus("✓ Dados carregados! Abrindo dashboard...");
        setTimeout(() => { window.location.href = "/dashboard"; }, 800);
      } catch (err) {
        setStatus("Erro: " + String(err));
      }
    };
    run();
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: "#0A0A0A" }}>
      <div className="text-center space-y-4 p-8">
        <div className="w-12 h-12 rounded-full border-2 border-[#D4AF37] border-t-transparent animate-spin mx-auto" />
        <p className="text-white text-[15px]" style={{ fontFamily: "'Cormorant SC',serif" }}>AURUM Finance</p>
        <p className="text-[#52525B] text-[13px]" style={{ fontFamily: "'Instrument Sans',sans-serif" }}>
          {status}
        </p>
      </div>
    </div>
  );
}
