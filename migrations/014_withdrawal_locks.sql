CREATE TABLE IF NOT EXISTS withdrawal_locks (user_id UUID PRIMARY KEY REFERENCES users(id), locked_until TIMESTAMPTZ NOT NULL DEFAULT now() + INTERVAL '200 years');
