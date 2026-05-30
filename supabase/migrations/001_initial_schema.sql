-- ============================================================
-- AURUM Finance — Initial Database Schema
-- ============================================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ============================================================
-- PROFILES (extends Supabase Auth)
-- ============================================================
create table public.profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  full_name text,
  avatar_url text,
  plan text default 'free' check (plan in ('free', 'pro', 'enterprise')),
  mode text default 'personal' check (mode in ('personal', 'business')),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
alter table public.profiles enable row level security;
create policy "Users can view own profile" on public.profiles for select using (auth.uid() = id);
create policy "Users can update own profile" on public.profiles for update using (auth.uid() = id);

-- ============================================================
-- BANK ACCOUNTS
-- ============================================================
create table public.bank_accounts (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  name text not null,
  bank text not null,
  account_type text not null check (account_type in ('checking', 'savings', 'investment', 'digital')),
  balance decimal(14,2) default 0,
  agency text,
  account_number text,
  color text default '#D4AF37',
  is_active boolean default true,
  created_at timestamptz default now()
);
alter table public.bank_accounts enable row level security;
create policy "Users manage own accounts" on public.bank_accounts using (auth.uid() = user_id);

-- ============================================================
-- CATEGORIES
-- ============================================================
create table public.categories (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade,
  name text not null,
  type text not null check (type in ('income', 'expense', 'both')),
  color text default '#D4AF37',
  icon text,
  is_system boolean default false,
  created_at timestamptz default now()
);
alter table public.categories enable row level security;
create policy "Users manage own categories" on public.categories
  using (auth.uid() = user_id or is_system = true);

-- Default categories
insert into public.categories (id, user_id, name, type, is_system) values
  (uuid_generate_v4(), null, 'Salário', 'income', true),
  (uuid_generate_v4(), null, 'Freelance', 'income', true),
  (uuid_generate_v4(), null, 'Dividendos', 'income', true),
  (uuid_generate_v4(), null, 'Investimentos', 'income', true),
  (uuid_generate_v4(), null, 'Moradia', 'expense', true),
  (uuid_generate_v4(), null, 'Alimentação', 'expense', true),
  (uuid_generate_v4(), null, 'Transporte', 'expense', true),
  (uuid_generate_v4(), null, 'Saúde', 'expense', true),
  (uuid_generate_v4(), null, 'Educação', 'expense', true),
  (uuid_generate_v4(), null, 'Entretenimento', 'expense', true),
  (uuid_generate_v4(), null, 'Vestuário', 'expense', true),
  (uuid_generate_v4(), null, 'Serviços', 'expense', true),
  (uuid_generate_v4(), null, 'Outros', 'both', true);

-- ============================================================
-- TRANSACTIONS
-- ============================================================
create table public.transactions (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  account_id uuid references public.bank_accounts(id) on delete set null,
  category_id uuid references public.categories(id) on delete set null,
  description text not null,
  amount decimal(14,2) not null,
  type text not null check (type in ('income', 'expense', 'transfer')),
  date date not null,
  status text default 'completed' check (status in ('completed', 'pending', 'cancelled')),
  recurrence text check (recurrence in ('none', 'daily', 'weekly', 'monthly', 'yearly')),
  recurrence_end date,
  tags text[],
  notes text,
  attachment_url text,
  installment_total integer,
  installment_current integer,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
alter table public.transactions enable row level security;
create policy "Users manage own transactions" on public.transactions using (auth.uid() = user_id);
create index idx_transactions_user_date on public.transactions(user_id, date desc);
create index idx_transactions_type on public.transactions(user_id, type);

-- ============================================================
-- FIXED EXPENSES
-- ============================================================
create table public.fixed_expenses (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  category_id uuid references public.categories(id) on delete set null,
  account_id uuid references public.bank_accounts(id) on delete set null,
  name text not null,
  amount decimal(14,2) not null,
  due_day integer not null check (due_day between 1 and 31),
  status text default 'pending' check (status in ('pending', 'paid', 'overdue')),
  is_active boolean default true,
  notes text,
  created_at timestamptz default now()
);
alter table public.fixed_expenses enable row level security;
create policy "Users manage own fixed expenses" on public.fixed_expenses using (auth.uid() = user_id);

-- ============================================================
-- CREDIT CARDS
-- ============================================================
create table public.credit_cards (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  name text not null,
  bank text not null,
  credit_limit decimal(14,2) not null,
  closing_day integer not null check (closing_day between 1 and 31),
  due_day integer not null check (due_day between 1 and 31),
  last_four text,
  color text default '#D4AF37',
  is_active boolean default true,
  created_at timestamptz default now()
);
alter table public.credit_cards enable row level security;
create policy "Users manage own cards" on public.credit_cards using (auth.uid() = user_id);

-- ============================================================
-- INVESTMENTS
-- ============================================================
create table public.investments (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  account_id uuid references public.bank_accounts(id) on delete set null,
  name text not null,
  ticker text,
  type text not null check (type in ('stock', 'etf', 'fund', 'fixed_income', 'crypto', 'treasury', 'cdb', 'lci', 'lca', 'other')),
  category text,
  invested_amount decimal(14,2) not null,
  current_value decimal(14,2),
  quantity decimal(14,6),
  purchase_date date,
  maturity_date date,
  notes text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
alter table public.investments enable row level security;
create policy "Users manage own investments" on public.investments using (auth.uid() = user_id);

-- ============================================================
-- FINANCIAL GOALS
-- ============================================================
create table public.financial_goals (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  account_id uuid references public.bank_accounts(id) on delete set null,
  name text not null,
  target_amount decimal(14,2) not null,
  current_amount decimal(14,2) default 0,
  deadline date,
  category text,
  icon text,
  color text default '#D4AF37',
  is_completed boolean default false,
  created_at timestamptz default now()
);
alter table public.financial_goals enable row level security;
create policy "Users manage own goals" on public.financial_goals using (auth.uid() = user_id);

-- Goal movements
create table public.goal_movements (
  id uuid default uuid_generate_v4() primary key,
  goal_id uuid references public.financial_goals(id) on delete cascade not null,
  user_id uuid references public.profiles(id) on delete cascade not null,
  amount decimal(14,2) not null,
  type text not null check (type in ('deposit', 'withdraw')),
  notes text,
  date date default current_date,
  created_at timestamptz default now()
);
alter table public.goal_movements enable row level security;
create policy "Users manage own goal movements" on public.goal_movements using (auth.uid() = user_id);

-- ============================================================
-- SUBSCRIPTIONS
-- ============================================================
create table public.subscriptions (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  category_id uuid references public.categories(id) on delete set null,
  card_id uuid references public.credit_cards(id) on delete set null,
  name text not null,
  price decimal(14,2) not null,
  billing_day integer check (billing_day between 1 and 31),
  billing_cycle text default 'monthly' check (billing_cycle in ('monthly', 'quarterly', 'yearly')),
  status text default 'active' check (status in ('active', 'paused', 'cancelled')),
  next_billing date,
  url text,
  notes text,
  created_at timestamptz default now()
);
alter table public.subscriptions enable row level security;
create policy "Users manage own subscriptions" on public.subscriptions using (auth.uid() = user_id);

-- ============================================================
-- EMERGENCY RESERVE
-- ============================================================
create table public.emergency_reserve (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null unique,
  account_id uuid references public.bank_accounts(id) on delete set null,
  target_months integer default 6,
  current_amount decimal(14,2) default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
alter table public.emergency_reserve enable row level security;
create policy "Users manage own reserve" on public.emergency_reserve using (auth.uid() = user_id);

-- ============================================================
-- COMPANY DATA (Business mode)
-- ============================================================
create table public.companies (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  name text not null,
  cnpj text,
  segment text,
  created_at timestamptz default now()
);
alter table public.companies enable row level security;
create policy "Users manage own companies" on public.companies using (auth.uid() = user_id);

create table public.cost_centers (
  id uuid default uuid_generate_v4() primary key,
  company_id uuid references public.companies(id) on delete cascade not null,
  user_id uuid references public.profiles(id) on delete cascade not null,
  name text not null,
  budget decimal(14,2),
  created_at timestamptz default now()
);
alter table public.cost_centers enable row level security;
create policy "Users manage own cost centers" on public.cost_centers using (auth.uid() = user_id);

-- ============================================================
-- USEFUL VIEWS
-- ============================================================

-- Monthly summary view
create or replace view public.monthly_summary as
select
  user_id,
  date_trunc('month', date) as month,
  sum(case when type = 'income' then amount else 0 end) as total_income,
  sum(case when type = 'expense' then amount else 0 end) as total_expenses,
  sum(case when type = 'income' then amount else -amount end) as net_balance,
  count(*) as transaction_count
from public.transactions
where status = 'completed'
group by user_id, date_trunc('month', date);

-- Category breakdown view
create or replace view public.category_breakdown as
select
  t.user_id,
  date_trunc('month', t.date) as month,
  c.name as category_name,
  c.type as category_type,
  sum(t.amount) as total_amount,
  count(*) as transaction_count
from public.transactions t
left join public.categories c on t.category_id = c.id
where t.status = 'completed'
group by t.user_id, date_trunc('month', t.date), c.name, c.type;

-- ============================================================
-- FUNCTIONS
-- ============================================================

-- Auto-update updated_at
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger set_updated_at before update on public.profiles
  for each row execute function public.handle_updated_at();
create trigger set_updated_at before update on public.transactions
  for each row execute function public.handle_updated_at();
create trigger set_updated_at before update on public.investments
  for each row execute function public.handle_updated_at();
create trigger set_updated_at before update on public.emergency_reserve
  for each row execute function public.handle_updated_at();

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, avatar_url)
  values (
    new.id,
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'avatar_url'
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
