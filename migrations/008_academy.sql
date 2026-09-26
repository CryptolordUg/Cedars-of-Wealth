CREATE TABLE course_completions (user_id UUID REFERENCES users(id), course TEXT NOT NULL, passed_at TIMESTAMPTZ DEFAULT now(), PRIMARY KEY(user_id,course));
