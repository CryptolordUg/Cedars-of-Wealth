CREATE TABLE IF NOT EXISTS beneficiaries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  relationship TEXT,
  share_pct NUMERIC CHECK (share_pct > 0 AND share_pct <= 100),
  created_at TIMESTAMPTZ DEFAULT now()
);
