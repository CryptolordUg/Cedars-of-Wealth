CREATE TABLE ledger_accounts (
 id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
 user_id UUID REFERENCES users(id),
 type TEXT CHECK(type IN ('wallet','trading','profit','community')),
 balance NUMERIC(20,4) DEFAULT 0
);
CREATE TABLE ledger_entries (
 id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
 debit_account UUID REFERENCES ledger_accounts(id),
 credit_account UUID REFERENCES ledger_accounts(id),
 amount NUMERIC(20,4) NOT NULL CHECK(amount>0),
 created_at TIMESTAMPTZ DEFAULT now()
);
