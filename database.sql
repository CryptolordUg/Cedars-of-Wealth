-- CEDARS OF WEALTH - SOLANA ONLY - TREASURY 6XQviXJ5EceCmZq6uGrnrsxBKSnLKSvXeT7MCFF6fTb
create table if not exists users (id uuid primary key default gen_random_uuid(), wallet_address text unique not null, email text, created_at timestamp default now(), total_deposited numeric default 0, total_withdrawn numeric default 0, balance numeric default 0);
create table if not exists deposits (id uuid primary key default gen_random_uuid(), user_wallet text not null, amount_usd numeric not null, tx_sig text unique not null, treasury text default '6XQviXJ5EceCmZq6uGrnrsxBKSnLKSvXeT7MCFF6fTb', network text default 'solana', status text default 'pending', verified boolean default false, created_at timestamp default now());
create table if not exists withdraws (id uuid primary key default gen_random_uuid(), user_wallet text not null, amount_usd numeric not null, fee_usd numeric default 10, net_usd numeric not null, to_wallet text not null, from_treasury text default '6XQviXJ5EceCmZq6uGrnrsxBKSnLKSvXeT7MCFF6fTb', network text default 'solana', status text default 'pending', created_at timestamp default now());
-- Enable RLS
alter table users enable row level security; alter table deposits enable row level security; alter table withdraws enable row level security;
create policy "public all" on users for all using (true) with check (true);
create policy "public all" on deposits for all using (true) with check (true);
create policy "public all" on withdraws for all using (true) with check (true);
