-- Executar no SQL Editor do Supabase.
-- Tabela de membros: acesso só pelo servidor via service role key.
-- RLS ligado e sem policies = anon/authenticated não enxergam nada; service role sempre ignora RLS.

create extension if not exists pgcrypto;

create table if not exists membros (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  senha_hash text not null,
  produtos_liberados text[] not null default '{}',
  progresso jsonb not null default '{}'::jsonb,
  criado_em timestamptz not null default now()
);

alter table membros enable row level security;

-- Log de eventos de webhook já processados, pra não duplicar efeito
-- se a Cakto reenviar o mesmo evento (retry de rede, etc.).
create table if not exists webhook_eventos (
  id text primary key,
  tipo text not null,
  recebido_em timestamptz not null default now()
);

alter table webhook_eventos enable row level security;
