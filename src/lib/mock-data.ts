// Mock data for demonstration — replace with Supabase queries

export const cashFlowData = [
  { month: "Jan", receitas: 15200, despesas: 8400, saldo: 6800 },
  { month: "Fev", receitas: 16800, despesas: 9200, saldo: 7600 },
  { month: "Mar", receitas: 14500, despesas: 10100, saldo: 4400 },
  { month: "Abr", receitas: 18200, despesas: 8800, saldo: 9400 },
  { month: "Mai", receitas: 17600, despesas: 9600, saldo: 8000 },
  { month: "Jun", receitas: 19800, despesas: 11200, saldo: 8600 },
  { month: "Jul", receitas: 21000, despesas: 10400, saldo: 10600 },
  { month: "Ago", receitas: 18500, despesas: 9847, saldo: 8653 },
];

export const categoryData = [
  { name: "Moradia", value: 3200, color: "#D4AF37" },
  { name: "Alimentação", value: 1850, color: "#E8CC6A" },
  { name: "Transporte", value: 890, color: "#B8952A" },
  { name: "Saúde", value: 1020, color: "#F0D060" },
  { name: "Lazer", value: 640, color: "#A07820" },
  { name: "Educação", value: 480, color: "#786010" },
  { name: "Outros", value: 1767, color: "#4A3C08" },
];

export const patrimonyData = [
  { month: "Mar", patrimonio: 225000, investimentos: 142000 },
  { month: "Abr", patrimonio: 238000, investimentos: 151000 },
  { month: "Mai", patrimonio: 251000, investimentos: 158000 },
  { month: "Jun", patrimonio: 263000, investimentos: 165000 },
  { month: "Jul", patrimonio: 272000, investimentos: 170000 },
  { month: "Ago", patrimonio: 284500, investimentos: 178000 },
];

export const upcomingBills = [
  { name: "Aluguel", value: 2800, dueDate: "05/09", category: "Moradia", status: "upcoming" },
  { name: "Plano de Saúde", value: 850, dueDate: "08/09", category: "Saúde", status: "upcoming" },
  { name: "Internet", value: 149.9, dueDate: "10/09", category: "Serviços", status: "upcoming" },
  { name: "Energia Elétrica", value: 320, dueDate: "12/09", category: "Moradia", status: "upcoming" },
  { name: "Condomínio", value: 680, dueDate: "15/09", category: "Moradia", status: "overdue" },
];

export const transactions = [
  { id: "1", description: "Salário Agosto", category: "Renda", date: "2024-08-05", value: 12500, type: "income", account: "Nubank", status: "completed" },
  { id: "2", description: "Supermercado Extra", category: "Alimentação", date: "2024-08-06", value: -487.3, type: "expense", account: "Itaú", status: "completed" },
  { id: "3", description: "Netflix", category: "Entretenimento", date: "2024-08-07", value: -55.9, type: "expense", account: "Nubank", status: "completed" },
  { id: "4", description: "Spotify", category: "Entretenimento", date: "2024-08-07", value: -24.9, type: "expense", account: "Nubank", status: "completed" },
  { id: "5", description: "Freelance Design", category: "Renda Extra", date: "2024-08-09", value: 3500, type: "income", account: "Nubank", status: "completed" },
  { id: "6", description: "Posto Shell", category: "Transporte", date: "2024-08-11", value: -280.4, type: "expense", account: "Itaú", status: "completed" },
  { id: "7", description: "Farmácia São Paulo", category: "Saúde", date: "2024-08-12", value: -142.8, type: "expense", account: "Nubank", status: "completed" },
  { id: "8", description: "Restaurante Fogo", category: "Alimentação", date: "2024-08-14", value: -184.5, type: "expense", account: "Nubank", status: "completed" },
  { id: "9", description: "Amazon Prime", category: "Entretenimento", date: "2024-08-15", value: -21.9, type: "expense", account: "Nubank", status: "completed" },
  { id: "10", description: "Aluguel", category: "Moradia", date: "2024-08-05", value: -2800, type: "expense", account: "Itaú", status: "completed" },
  { id: "11", description: "Dividendos ITSA4", category: "Investimentos", date: "2024-08-16", value: 840, type: "income", account: "Rico", status: "completed" },
  { id: "12", description: "Academia Bodytech", category: "Saúde", date: "2024-08-18", value: -189.9, type: "expense", account: "Nubank", status: "completed" },
];

export const fixedExpenses = [
  { id: "1", name: "Aluguel", category: "Moradia", dueDay: 5, value: 2800, status: "paid", active: true },
  { id: "2", name: "Plano de Saúde", category: "Saúde", dueDay: 8, value: 850, status: "paid", active: true },
  { id: "3", name: "Internet Vivo", category: "Serviços", dueDay: 10, value: 149.9, status: "paid", active: true },
  { id: "4", name: "Energia Elétrica", category: "Moradia", dueDay: 12, value: 320, status: "pending", active: true },
  { id: "5", name: "Condomínio", category: "Moradia", dueDay: 15, value: 680, status: "overdue", active: true },
  { id: "6", name: "Academia", category: "Saúde", dueDay: 18, value: 189.9, status: "pending", active: true },
  { id: "7", name: "Netflix", category: "Entretenimento", dueDay: 7, value: 55.9, status: "paid", active: true },
  { id: "8", name: "Spotify", category: "Entretenimento", dueDay: 7, value: 24.9, status: "paid", active: true },
];

export const creditCards = [
  {
    id: "1",
    name: "Nubank Ultravioleta",
    bank: "Nubank",
    limit: 25000,
    used: 8420.5,
    available: 16579.5,
    closingDay: 15,
    dueDay: 22,
    color: "#8B5CF6",
    lastFour: "4242",
  },
  {
    id: "2",
    name: "Itaú Black",
    bank: "Itaú",
    limit: 40000,
    used: 12840.0,
    available: 27160.0,
    closingDay: 10,
    dueDay: 17,
    color: "#F59E0B",
    lastFour: "8891",
  },
  {
    id: "3",
    name: "XP Visa Infinite",
    bank: "XP",
    limit: 20000,
    used: 3200.0,
    available: 16800.0,
    closingDay: 20,
    dueDay: 27,
    color: "#22C55E",
    lastFour: "1234",
  },
];

export const bankAccounts = [
  { id: "1", bank: "Nubank", type: "Conta Corrente", balance: 18420.5, agency: "0001", account: "123456-7", color: "#8B5CF6" },
  { id: "2", bank: "Itaú", type: "Conta Corrente", balance: 8240.0, agency: "0067", account: "89012-3", color: "#F59E0B" },
  { id: "3", bank: "Inter", type: "Conta Digital", balance: 5680.0, agency: "0001", account: "45678-9", color: "#F97316" },
  { id: "4", bank: "XP Investimentos", type: "Conta Investimento", balance: 178000.0, agency: "—", account: "012345-6", color: "#22C55E" },
];

export const investments = [
  { id: "1", name: "ITSA4", type: "Ação", amount: 8000, currentValue: 9840, yield: 23.0, category: "Ações" },
  { id: "2", name: "PETR4", type: "Ação", amount: 5000, currentValue: 5820, yield: 16.4, category: "Ações" },
  { id: "3", name: "BOVA11", type: "ETF", amount: 12000, currentValue: 13560, yield: 13.0, category: "ETFs" },
  { id: "4", name: "IVVB11", type: "ETF", amount: 15000, currentValue: 18400, yield: 22.7, category: "ETFs" },
  { id: "5", name: "CDB Nubank 110% CDI", type: "Renda Fixa", amount: 30000, currentValue: 32100, yield: 7.0, category: "Renda Fixa" },
  { id: "6", name: "Tesouro IPCA+ 2029", type: "Renda Fixa", amount: 25000, currentValue: 27800, yield: 11.2, category: "Tesouro" },
  { id: "7", name: "LCI Itaú 95% CDI", type: "Renda Fixa", amount: 20000, currentValue: 21200, yield: 6.0, category: "Renda Fixa" },
  { id: "8", name: "HASH11", type: "Cripto ETF", amount: 8000, currentValue: 9280, yield: 16.0, category: "Cripto" },
];

export const financialGoals = [
  { id: "1", name: "Reserva de Emergência", target: 60000, current: 32400, deadline: "2025-12-31", category: "Segurança", icon: "🛡️" },
  { id: "2", name: "Viagem Europa", target: 25000, current: 8750, deadline: "2025-07-01", category: "Lazer", icon: "✈️" },
  { id: "3", name: "Entrada Apartamento", target: 120000, current: 47000, deadline: "2026-06-01", category: "Imóvel", icon: "🏠" },
  { id: "4", name: "Carro Novo", target: 80000, current: 28000, deadline: "2025-12-01", category: "Transporte", icon: "🚗" },
];

export const investmentPortfolioData = [
  { name: "Ações", value: 15660, percentage: 13.1, color: "#D4AF37" },
  { name: "ETFs", value: 31960, percentage: 26.7, color: "#E8CC6A" },
  { name: "Renda Fixa", value: 53100, percentage: 44.3, color: "#B8952A" },
  { name: "Tesouro", value: 27800, percentage: 23.2, color: "#F0D060" },
  { name: "Cripto", value: 9280, percentage: 7.7, color: "#A07820" },
];

export const subscriptions = [
  { id: "1", name: "Netflix", price: 55.9, billingDay: 7, category: "Streaming", status: "active", nextBilling: "2024-09-07" },
  { id: "2", name: "Spotify", price: 24.9, billingDay: 7, category: "Música", status: "active", nextBilling: "2024-09-07" },
  { id: "3", name: "Amazon Prime", price: 21.9, billingDay: 15, category: "Streaming", status: "active", nextBilling: "2024-09-15" },
  { id: "4", name: "Apple iCloud", price: 12.9, billingDay: 20, category: "Armazenamento", status: "active", nextBilling: "2024-09-20" },
  { id: "5", name: "Office 365", price: 38.9, billingDay: 1, category: "Produtividade", status: "active", nextBilling: "2024-09-01" },
  { id: "6", name: "Adobe CC", price: 248.0, billingDay: 12, category: "Design", status: "active", nextBilling: "2024-09-12" },
  { id: "7", name: "Notion", price: 32.0, billingDay: 18, category: "Produtividade", status: "paused", nextBilling: "—" },
];

export const companyData = {
  revenue: 85000,
  expenses: 52000,
  profit: 33000,
  receivables: 28000,
  payables: 14000,
  customers: [
    { name: "TechCorp Ltda", value: 18500, status: "active" },
    { name: "StartupXP", value: 12000, status: "active" },
    { name: "Grupo Solar", value: 22000, status: "pending" },
  ],
  suppliers: [
    { name: "Fornecedor A", value: 8400, dueDate: "2024-09-10", status: "pending" },
    { name: "Fornecedor B", value: 3200, dueDate: "2024-09-15", status: "paid" },
  ],
};
