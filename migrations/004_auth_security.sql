CREATE TABLE IF NOT EXISTS devices (
 id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
 user_id UUID REFERENCES users(id) ON DELETE CASCADE,
 device_id TEXT NOT NULL, last_ip INET, created_at TIMESTAMPTZ DEFAULT now()
);
