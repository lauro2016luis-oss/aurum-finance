-- ============================================================
-- customer_subscriptions
-- Criada automaticamente quando um pagamento é aprovado.
-- O usuário só consegue acesso após ativar via token de e-mail.
-- ============================================================

create table if not exists public.customer_subscriptions (
  id                    uuid primary key default gen_random_uuid(),
  email                 text not null,
  customer_name         text not null,
  transaction_id        text not null unique,
  plan                  text not null default 'basic',
  payment_status        text not null default 'approved'
                          check (payment_status in ('approved','refunded','chargeback')),
  subscription_status   text not null default 'pending_activation'
                          check (subscription_status in ('pending_activation','active','suspended','cancelled')),
  activation_token      text unique,
  activation_expires_at timestamptz,
  auth_user_id          uuid references auth.users(id) on delete set null,
  created_at            timestamptz not null default now(),
  updated_at            timestamptz not null default now()
);

-- índices para buscas rápidas
create index if not exists idx_cs_email             on public.customer_subscriptions (email);
create index if not exists idx_cs_transaction_id    on public.customer_subscriptions (transaction_id);
create index if not exists idx_cs_activation_token  on public.customer_subscriptions (activation_token);
create index if not exists idx_cs_auth_user_id      on public.customer_subscriptions (auth_user_id);

-- atualiza updated_at automaticamente
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_cs_updated_at on public.customer_subscriptions;
create trigger trg_cs_updated_at
  before update on public.customer_subscriptions
  for each row execute function public.set_updated_at();

-- RLS: apenas o próprio usuário (ou service_role) lê seus dados
alter table public.customer_subscriptions enable row level security;

create policy "service_role_full_access"
  on public.customer_subscriptions
  for all
  using (auth.role() = 'service_role');

create policy "user_reads_own"
  on public.customer_subscriptions
  for select
  using (auth_user_id = auth.uid());

-- tabela de log de webhooks recebidos
create table if not exists public.webhook_logs (
  id           uuid primary key default gen_random_uuid(),
  source       text not null,
  event        text,
  payload      jsonb,
  status       text not null default 'received',
  error        text,
  created_at   timestamptz not null default now()
);

alter table public.webhook_logs enable row level security;

create policy "service_role_webhook_logs"
  on public.webhook_logs
  for all
  using (auth.role() = 'service_role');
