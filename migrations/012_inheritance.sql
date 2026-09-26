CREATE TABLE beneficiaries (id UUID PRIMARY KEY DEFAULT uuid_generate_v4(), user_id UUID REFERENCES users(id), share_pct NUMERIC);
