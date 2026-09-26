CREATE TABLE risk_events (
 id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
 user_id UUID REFERENCES users(id),
 type TEXT NOT NULL, -- kill_switch, daily_loss
 created_at TIMESTAMPTZ DEFAULT now()
);
CREATE TABLE audit_logs (
 id BIGSERIAL PRIMARY KEY,
 user_id UUID, action TEXT NOT NULL,
 payload JSONB, created_at TIMESTAMPTZ DEFAULT now()
);
-- immutable: REVOKE UPDATE, DELETE ON audit_logs, ledger_entries FROM app_user;
