-- ============================================
-- THE QUADRANT TRACKER — SUPABASE SCHEMA
-- Run this in your Supabase SQL editor
-- ============================================

-- ACCOUNTS
create table accounts (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  type text not null check (type in ('single', 'multi')),
  splits integer default 4 check (splits in (3, 4)),
  total_size numeric not null,
  currency text default 'USD',
  broker text,
  created_at timestamptz default now()
);

-- QUADRANTS (4 per account)
create table quadrants (
  id uuid default gen_random_uuid() primary key,
  account_id uuid references accounts(id) on delete cascade,
  label text not null check (label in ('Q1', 'Q2', 'Q3', 'Q4')),
  starting_balance numeric not null,
  current_balance numeric not null,
  risk_state text default 'green' check (risk_state in ('green', 'recovery')),
  wins integer default 0,
  losses integer default 0,
  missed integer default 0,
  created_at timestamptz default now()
);

-- TRADES (signal entries)
create table trades (
  id uuid default gen_random_uuid() primary key,
  account_id uuid references accounts(id) on delete cascade,
  pair text,
  direction text not null check (direction in ('long', 'short')),
  entry numeric not null,
  sl numeric not null,
  tp numeric not null,
  zone_size numeric not null,
  q1_entry numeric not null,
  q1_sl numeric not null,
  q2_entry numeric not null,
  q2_sl numeric not null,
  q3_entry numeric not null,
  q3_sl numeric not null,
  q4_entry numeric not null,
  q4_sl numeric not null,
  status text default 'open' check (status in ('open', 'closed')),
  notes text,
  created_at timestamptz default now()
);

-- TRADE OUTCOMES (one per quadrant per trade)
create table trade_outcomes (
  id uuid default gen_random_uuid() primary key,
  trade_id uuid references trades(id) on delete cascade,
  quadrant_id uuid references quadrants(id) on delete cascade,
  quadrant_label text not null,
  result text not null check (result in ('win', 'loss', 'missed')),
  lot_size numeric,
  risk_amount numeric,
  pnl numeric default 0,
  commission numeric(12,4) default 0,
  rr_achieved numeric,
  created_at timestamptz default now()
);

-- INDEXES
create index on quadrants(account_id);
create index on trades(account_id);
create index on trade_outcomes(trade_id);
create index on trade_outcomes(quadrant_id);

-- ENABLE RLS (optional — remove if not using auth)
alter table accounts enable row level security;
alter table quadrants enable row level security;
alter table trades enable row level security;
alter table trade_outcomes enable row level security;

-- OPEN POLICIES (use these for now, restrict later with auth)
create policy "allow all" on accounts for all using (true) with check (true);
create policy "allow all" on quadrants for all using (true) with check (true);
create policy "allow all" on trades for all using (true) with check (true);
create policy "allow all" on trade_outcomes for all using (true) with check (true);
