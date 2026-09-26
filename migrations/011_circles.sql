CREATE TABLE circles (id UUID PRIMARY KEY DEFAULT uuid_generate_v4(), name TEXT NOT NULL, created_at TIMESTAMPTZ DEFAULT now());
CREATE TABLE circle_members (circle_id UUID REFERENCES circles(id), user_id UUID REFERENCES users(id), role TEXT DEFAULT 'member', PRIMARY KEY(circle_id,user_id));
