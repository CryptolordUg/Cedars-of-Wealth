-- Cedars of Wealth - Fixed Database Schema - Benchmark Wireframe - $5-$100k - PostgreSQL - Benchmark Fixed Errors
-- Treasury 6XQv1XJ5EceCmZq6uGrnrsxBKSnLKSvXeT7MCFF6fTb Solana Only

CREATE TYPE kyc_status_enum AS ENUM ('Pending','Verified','Rejected');
CREATE TYPE account_status_enum AS ENUM ('Active','Blocked');
CREATE TYPE plan_status_enum AS ENUM ('Active','Inactive');
CREATE TYPE tx_status_enum AS ENUM ('Pending','Completed','Failed','Approved');
CREATE TYPE gateway_enum AS ENUM ('MTN_MoMo','Airtel_Money','Flutterwave','Solana_USDC_SPL','Bank_Transfer','Card');

CREATE TABLE users (
 user_id BIGSERIAL PRIMARY KEY,
 fullname VARCHAR(150) NOT NULL,
 email VARCHAR(150) UNIQUE NOT NULL,
 phone VARCHAR(50) NOT NULL,
 password_hash VARCHAR(255) NOT NULL,
 country VARCHAR(100),
 referral_code VARCHAR(50) UNIQUE,
 referred_by BIGINT REFERENCES users(user_id),
 kyc_status kyc_status_enum DEFAULT 'Pending',
 account_status account_status_enum DEFAULT 'Active',
 phone_verified BOOLEAN DEFAULT FALSE,
 created_at TIMESTAMP DEFAULT NOW()
);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_referral ON users(referral_code);

CREATE TABLE wallets (
 wallet_id BIGSERIAL PRIMARY KEY,
 user_id BIGINT UNIQUE REFERENCES users(user_id) ON DELETE CASCADE,
 balance DECIMAL(18,2) CHECK (balance >=0) DEFAULT 0,
 total_deposits DECIMAL(18,2) DEFAULT 0,
 total_withdrawals DECIMAL(18,2) DEFAULT 0,
 total_earnings DECIMAL(18,2) DEFAULT 0,
 updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE investment_plans (
 plan_id BIGSERIAL PRIMARY KEY,
 plan_name VARCHAR(100) NOT NULL, -- Bronze Silver Gold VIP
 minimum_amount DECIMAL(18,2) CHECK (minimum_amount >=5),
 maximum_amount DECIMAL(18,2) CHECK (maximum_amount <=100000),
 roi_rate DECIMAL(5,2) DEFAULT 1.5, -- Fixed Error: missing roi_rate added
 duration_days INT DEFAULT 720,
 status plan_status_enum DEFAULT 'Active'
);
INSERT INTO investment_plans (plan_name,minimum_amount,maximum_amount,roi_rate) VALUES ('Bronze',5,499,1.5),('Silver',500,1999,1.5),('Gold',2000,9999,1.5),('VIP Grove',10000,49999,1.5),('VIP Legacy MAX',50000,100000,1.5);

CREATE TABLE investments (
 investment_id BIGSERIAL PRIMARY KEY,
 user_id BIGINT REFERENCES users(user_id) ON DELETE CASCADE,
 plan_id BIGINT REFERENCES investment_plans(plan_id),
 amount DECIMAL(18,2) CHECK (amount BETWEEN 5 AND 100000),
 start_date TIMESTAMP DEFAULT NOW(),
 end_date TIMESTAMP DEFAULT NOW() + INTERVAL '720 days',
 earnings_generated DECIMAL(18,2) DEFAULT 0,
 status tx_status_enum DEFAULT 'Completed'
);
CREATE INDEX idx_investments_user ON investments(user_id);

CREATE TABLE earnings_ledger (
 earning_id BIGSERIAL PRIMARY KEY,
 user_id BIGINT REFERENCES users(user_id),
 investment_id BIGINT REFERENCES investments(investment_id) ON DELETE CASCADE,
 amount DECIMAL(18,2),
 earning_date DATE DEFAULT CURRENT_DATE,
 status tx_status_enum DEFAULT 'Completed'
);
CREATE INDEX idx_earnings_date ON earnings_ledger(earning_date);

CREATE TABLE deposits (
 deposit_id BIGSERIAL PRIMARY KEY,
 user_id BIGINT REFERENCES users(user_id),
 amount DECIMAL(18,2) CHECK (amount BETWEEN 5 AND 100000),
 gateway gateway_enum DEFAULT 'Solana_USDC_SPL',
 transaction_reference VARCHAR(255) UNIQUE,
 status tx_status_enum DEFAULT 'Completed',
 created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE withdrawals (
 withdrawal_id BIGSERIAL PRIMARY KEY,
 user_id BIGINT REFERENCES users(user_id),
 amount DECIMAL(18,2),
 fee DECIMAL(18,2) DEFAULT 10, -- Fixed Error: fee missing added $10
 net_amount DECIMAL(18,2) GENERATED ALWAYS AS (amount - fee) STORED,
 method VARCHAR(100),
 destination_account VARCHAR(255),
 status tx_status_enum DEFAULT 'Pending',
 approved_by BIGINT REFERENCES users(user_id),
 requested_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE referrals (
 referral_id BIGSERIAL PRIMARY KEY,
 sponsor_id BIGINT REFERENCES users(user_id),
 investor_id BIGINT REFERENCES users(user_id),
 level INT CHECK (level BETWEEN 1 AND 3), -- 10%/5%/1% ∞
 commission DECIMAL(18,2),
 status tx_status_enum DEFAULT 'Completed'
);

CREATE TABLE transactions (
 transaction_id BIGSERIAL PRIMARY KEY,
 user_id BIGINT REFERENCES users(user_id),
 transaction_type VARCHAR(50), -- Deposit, Investment, Profit Credit, Withdrawal
 amount DECIMAL(18,2),
 reference_no VARCHAR(255),
 status tx_status_enum DEFAULT 'Completed',
 created_at TIMESTAMP DEFAULT NOW()
);
CREATE INDEX idx_tx_user ON transactions(user_id);

CREATE TABLE notifications (
 notification_id BIGSERIAL PRIMARY KEY,
 user_id BIGINT REFERENCES users(user_id),
 title VARCHAR(255),
 message TEXT,
 is_read BOOLEAN DEFAULT FALSE,
 created_at TIMESTAMP DEFAULT NOW()
);

-- Treasury Verified Solana
-- 6XQv1XJ5EceCmZq6uGrnrsxBKSnLKSvXeT7MCFF6fTb - Network MUST BE SOLANA - Avoid expensive error
