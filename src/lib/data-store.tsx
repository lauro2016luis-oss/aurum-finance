"use client";

import { createContext, useContext, useState, useCallback, useEffect, ReactNode } from "react";
import { createClient } from "@/lib/supabase/client";

/* ─────────────── Dados demo (conta lauro212luis@hotmail.com) ─── */
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

/* ─────────────── Types ─────────────── */

export interface Transaction {
  id: string; description: string; category: string;
  date: string; value: number; type: "income" | "expense";
  account: string; status: "completed" | "pending";
}
export interface FixedExpense {
  id: string; name: string; category: string; dueDay: number;
  value: number; status: "paid" | "pending" | "overdue"; active: boolean;
}
export interface Investment {
  id: string; name: string; type: string; amount: number;
  currentValue: number; yield: number; category: string;
  instituicao?: string; dataInicio?: string;
  aporteMenusal?: number; rentabilidade?: number; observacao?: string;
}
export interface BankAccount {
  id: string; bank: string; type: string; balance: number;
  agency: string; account: string; color: string;
}
export interface CreditCard {
  id: string; name: string; bank: string; limit: number; used: number;
  available: number; closingDay: number; dueDay: number;
  color: string; lastFour: string;
}
export interface FinancialGoal {
  id: string; name: string; target: number; current: number;
  deadline: string; category: string; icon: string;
}
export interface Subscription {
  id: string; name: string; price: number; billingDay: number;
  category: string; status: "active" | "paused"; nextBilling: string;
}

/* ─────────────── Dados vazios para novos usuários ─────────────── */

const EMPTY_STATE = {
  transactions:   [] as Transaction[],
  fixedExpenses:  [] as FixedExpense[],
  investments:    [] as Investment[],
  bankAccounts:   [] as BankAccount[],
  creditCards:    [] as CreditCard[],
  financialGoals: [] as FinancialGoal[],
  subscriptions:  [] as Subscription[],
  reserve:        0,
};

/* ─────────────── localStorage helpers ─────────────── */

function loadUserData(userId: string) {
  try {
    const raw = localStorage.getItem(`aurum_data_${userId}`);
    if (!raw) return EMPTY_STATE;
    return { ...EMPTY_STATE, ...JSON.parse(raw) };
  } catch {
    return EMPTY_STATE;
  }
}

function saveUserData(userId: string, data: typeof EMPTY_STATE) {
  try {
    localStorage.setItem(`aurum_data_${userId}`, JSON.stringify(data));
  } catch { /* ignore */ }
}

/* ─────────────── Context ─────────────── */

interface DS {
  transactions: Transaction[];
  addTransaction: (t: Omit<Transaction, "id">) => void;
  deleteTransaction: (id: string) => void;

  fixedExpenses: FixedExpense[];
  addFixedExpense: (e: Omit<FixedExpense, "id">) => void;
  updateFixedExpense: (id: string, data: Partial<FixedExpense>) => void;
  deleteFixedExpense: (id: string) => void;
  toggleFixedExpenseStatus: (id: string) => void;

  investments: Investment[];
  addInvestment: (i: Omit<Investment, "id">) => void;
  deleteInvestment: (id: string) => void;

  bankAccounts: BankAccount[];
  addBankAccount: (a: Omit<BankAccount, "id">) => void;
  updateBankAccount: (id: string, data: Partial<BankAccount>) => void;
  deleteBankAccount: (id: string) => void;

  creditCards: CreditCard[];
  addCreditCard: (c: Omit<CreditCard, "id">) => void;
  deleteCreditCard: (id: string) => void;

  financialGoals: FinancialGoal[];
  addGoal: (g: Omit<FinancialGoal, "id">) => void;
  addGoalContribution: (id: string, amount: number) => void;
  deleteGoal: (id: string) => void;

  subscriptions: Subscription[];
  addSubscription: (s: Omit<Subscription, "id">) => void;
  toggleSubscription: (id: string) => void;
  deleteSubscription: (id: string) => void;

  reserve: number;
  depositReserve: (amount: number) => void;
  withdrawReserve: (amount: number) => void;
}

const uid = () => Math.random().toString(36).slice(2, 10);
const DataContext = createContext<DS>({} as DS);

export function DataProvider({ children }: { children: ReactNode }) {
  const [userId,   setUserId]  = useState<string | null>(null);
  const [ready,    setReady]   = useState(false);

  const [transactions,   setTx]    = useState<Transaction[]>([]);
  const [fixedExpenses,  setFE]    = useState<FixedExpense[]>([]);
  const [investments,    setInv]   = useState<Investment[]>([]);
  const [bankAccounts,   setBA]    = useState<BankAccount[]>([]);
  const [creditCards,    setCC]    = useState<CreditCard[]>([]);
  const [financialGoals, setGoals] = useState<FinancialGoal[]>([]);
  const [subscriptions,  setSubs]  = useState<Subscription[]>([]);
  const [reserve,        setReserve] = useState(0);

  /* ── Carregar dados do usuário logado ── */
  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => {
      const uid_ = data.user?.id ?? null;
      const email_ = data.user?.email?.toLowerCase() ?? "";
      setUserId(uid_);
      if (uid_) {
        const existing = localStorage.getItem(`aurum_data_${uid_}`);
        // Se é a conta demo e ainda não tem dados, popula automaticamente
        const isDemoAccount = email_ === "lauro212luis@hotmail.com";
        const saved = existing
          ? { ...EMPTY_STATE, ...JSON.parse(existing) }
          : isDemoAccount ? DEMO_DATA : EMPTY_STATE;

        if (!existing && isDemoAccount) {
          localStorage.setItem(`aurum_data_${uid_}`, JSON.stringify(DEMO_DATA));
        }

        setTx(saved.transactions as Transaction[]);
        setFE(saved.fixedExpenses as FixedExpense[]);
        setInv(saved.investments as Investment[]);
        setBA(saved.bankAccounts as BankAccount[]);
        setCC(saved.creditCards as CreditCard[]);
        setGoals(saved.financialGoals as FinancialGoal[]);
        setSubs(saved.subscriptions as Subscription[]);
        setReserve(saved.reserve as number);
      }
      setReady(true);
    });
  }, []);

  /* ── Salvar automaticamente no localStorage sempre que mudar ── */
  useEffect(() => {
    if (!userId || !ready) return;
    saveUserData(userId, {
      transactions, fixedExpenses, investments, bankAccounts,
      creditCards, financialGoals, subscriptions, reserve,
    });
  }, [userId, ready, transactions, fixedExpenses, investments, bankAccounts,
      creditCards, financialGoals, subscriptions, reserve]);

  /* ─── Actions ─── */

  // Transactions — atualiza saldo da conta automaticamente
  const addTransaction = useCallback((t: Omit<Transaction,"id">) => {
    const newTx = { ...t, id: uid() };
    setTx(prev => [newTx, ...prev]);
    if (t.status === "completed") {
      setBA(prev => prev.map(a => {
        if (a.bank !== t.account) return a;
        const delta = t.type === "income" ? t.value : -t.value;
        return { ...a, balance: Math.max(0, a.balance + delta) };
      }));
    }
  }, []);

  const deleteTransaction = useCallback((id: string) => {
    setTx(prev => {
      const tx = prev.find(t => t.id === id);
      if (tx && tx.status === "completed") {
        setBA(ba => ba.map(a => {
          if (a.bank !== tx.account) return a;
          const delta = tx.type === "income" ? -tx.value : tx.value;
          return { ...a, balance: Math.max(0, a.balance + delta) };
        }));
      }
      return prev.filter(t => t.id !== id);
    });
  }, []);

  // Fixed expenses
  const addFixedExpense = useCallback((e: Omit<FixedExpense,"id">) => setFE(prev => [...prev, { ...e, id: uid() }]), []);
  const updateFixedExpense = useCallback((id: string, data: Partial<FixedExpense>) =>
    setFE(prev => prev.map(e => e.id === id ? { ...e, ...data } : e)), []);
  const deleteFixedExpense = useCallback((id: string) => setFE(prev => prev.filter(e => e.id !== id)), []);
  const toggleFixedExpenseStatus = useCallback((id: string) =>
    setFE(prev => prev.map(e => e.id === id
      ? { ...e, status: e.status === "paid" ? "pending" : "paid" }
      : e)), []);

  // Investments
  const addInvestment    = useCallback((i: Omit<Investment,"id">) => setInv(prev => [...prev, { ...i, id: uid() }]), []);
  const deleteInvestment = useCallback((id: string) => setInv(prev => prev.filter(i => i.id !== id)), []);

  // Bank accounts
  const addBankAccount    = useCallback((a: Omit<BankAccount,"id">) => setBA(prev => [...prev, { ...a, id: uid() }]), []);
  const updateBankAccount = useCallback((id: string, data: Partial<BankAccount>) => setBA(prev => prev.map(a => a.id === id ? { ...a, ...data } : a)), []);
  const deleteBankAccount = useCallback((id: string) => setBA(prev => prev.filter(a => a.id !== id)), []);

  // Credit cards
  const addCreditCard    = useCallback((c: Omit<CreditCard,"id">) => setCC(prev => [...prev, { ...c, id: uid() }]), []);
  const deleteCreditCard = useCallback((id: string) => setCC(prev => prev.filter(c => c.id !== id)), []);

  // Goals
  const addGoal = useCallback((g: Omit<FinancialGoal,"id">) => setGoals(prev => [...prev, { ...g, id: uid() }]), []);
  const addGoalContribution = useCallback((id: string, amount: number) =>
    setGoals(prev => prev.map(g => g.id === id ? { ...g, current: Math.min(g.current + amount, g.target) } : g)), []);
  const deleteGoal = useCallback((id: string) => setGoals(prev => prev.filter(g => g.id !== id)), []);

  // Subscriptions
  const addSubscription = useCallback((s: Omit<Subscription,"id">) => setSubs(prev => [...prev, { ...s, id: uid() }]), []);
  const toggleSubscription = useCallback((id: string) =>
    setSubs(prev => prev.map(s => s.id === id ? { ...s, status: s.status === "active" ? "paused" : "active" } : s)), []);
  const deleteSubscription = useCallback((id: string) => setSubs(prev => prev.filter(s => s.id !== id)), []);

  // Reserve
  const depositReserve  = useCallback((a: number) => setReserve(p => p + a), []);
  const withdrawReserve = useCallback((a: number) => setReserve(p => Math.max(0, p - a)), []);

  return (
    <DataContext.Provider value={{
      transactions, addTransaction, deleteTransaction,
      fixedExpenses, addFixedExpense, updateFixedExpense, deleteFixedExpense, toggleFixedExpenseStatus,
      investments, addInvestment, deleteInvestment,
      bankAccounts, addBankAccount, updateBankAccount, deleteBankAccount,
      creditCards, addCreditCard, deleteCreditCard,
      financialGoals, addGoal, addGoalContribution, deleteGoal,
      subscriptions, addSubscription, toggleSubscription, deleteSubscription,
      reserve, depositReserve, withdrawReserve,
    }}>
      {children}
    </DataContext.Provider>
  );
}

export const useData = () => useContext(DataContext);
