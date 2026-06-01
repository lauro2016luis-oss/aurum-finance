"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import {
  transactions as initTx,
  fixedExpenses as initFE,
  investments as initInv,
  bankAccounts as initBA,
  creditCards as initCC,
  financialGoals as initGoals,
  subscriptions as initSubs,
} from "./mock-data";

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
  const [transactions, setTx]     = useState<Transaction[]>(initTx as Transaction[]);
  const [fixedExpenses, setFE]    = useState<FixedExpense[]>(initFE as FixedExpense[]);
  const [investments, setInv]     = useState<Investment[]>(initInv as Investment[]);
  const [bankAccounts, setBA]     = useState<BankAccount[]>(initBA as BankAccount[]);
  const [creditCards, setCC]      = useState<CreditCard[]>(initCC as CreditCard[]);
  const [financialGoals, setGoals]= useState<FinancialGoal[]>(initGoals as FinancialGoal[]);
  const [subscriptions, setSubs]  = useState<Subscription[]>(initSubs as Subscription[]);
  const [reserve, setReserve]     = useState(32400);

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
          // reverter: se era despesa devolve, se era receita desconta
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
