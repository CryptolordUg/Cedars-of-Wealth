CREATE TABLE pilot_metrics (user_id UUID, wealth_delta NUMERIC, savings_rate NUMERIC, risk_breaches INT, recorded_at TIMESTAMPTZ DEFAULT now());
