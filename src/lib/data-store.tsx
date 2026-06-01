"use client";

import { createContext, useContext, useState, useCallback, useEffect, ReactNode } from "react";
import { createClient } from "@/lib/supabase/client";

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
      setUserId(uid_);
      if (uid_) {
        const saved = loadUserData(uid_);
        setTx(saved.transactions);
        setFE(saved.fixedExpenses);
        setInv(saved.investments);
        setBA(saved.bankAccounts);
        setCC(saved.creditCards);
        setGoals(saved.financialGoals);
        setSubs(saved.subscriptions);
        setReserve(saved.reserve);
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
