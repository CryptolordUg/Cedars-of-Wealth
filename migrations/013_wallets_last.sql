CREATE TABLE wallet_addresses (id UUID PRIMARY KEY DEFAULT uuid_generate_v4(), user_id UUID REFERENCES users(id), chain TEXT, address TEXT UNIQUE);
