-- Create auth schema and user_roles if they don't exist
CREATE SCHEMA IF NOT EXISTS auth;

DO $$ BEGIN
  CREATE TYPE auth.user_role AS ENUM ('admin', 'moderator', 'user');
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

CREATE TABLE IF NOT EXISTS auth.user_roles (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  role auth.user_role NOT NULL DEFAULT 'user'
);

-- Create new tables for dashboard functionality
CREATE TABLE IF NOT EXISTS public.witness_tokens (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  amount INTEGER DEFAULT 0,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.animal_perspectives (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  image_url TEXT
);

CREATE TABLE IF NOT EXISTS public.user_perspectives (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  perspective_id UUID REFERENCES public.animal_perspectives(id) ON DELETE CASCADE,
  unlocked_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, perspective_id)
);

CREATE TABLE IF NOT EXISTS public.raffles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  start_date TIMESTAMPTZ NOT NULL,
  end_date TIMESTAMPTZ NOT NULL,
  status TEXT DEFAULT 'active',
  prize_description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.raffle_entries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  raffle_id UUID REFERENCES public.raffles(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  tokens_used INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(raffle_id, user_id)
);

CREATE TABLE IF NOT EXISTS public.activity_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  action TEXT NOT NULL,
  details JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS on all tables
ALTER TABLE public.witness_tokens ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.animal_perspectives ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_perspectives ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.raffles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.raffle_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activity_logs ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can view their own tokens"
  ON public.witness_tokens FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "Only system can update tokens"
  ON public.witness_tokens FOR ALL
  USING (false)
  WITH CHECK (false);

CREATE POLICY "Anyone can view perspectives"
  ON public.animal_perspectives FOR SELECT
  USING (true);

CREATE POLICY "Users can view their unlocked perspectives"
  ON public.user_perspectives FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "Anyone can view active raffles"
  ON public.raffles FOR SELECT
  USING (status = 'active' OR auth.uid() IN (
    SELECT user_id FROM auth.user_roles WHERE role = 'admin'
  ));

CREATE POLICY "Users can view their own entries"
  ON public.raffle_entries FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "Users can create their own entries"
  ON public.raffle_entries FOR INSERT
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Admins can view all logs"
  ON public.activity_logs FOR SELECT
  USING (auth.uid() IN (
    SELECT user_id FROM auth.user_roles WHERE role = 'admin'
  ));

-- Create helper functions
CREATE OR REPLACE FUNCTION public.get_user_role(user_id UUID)
RETURNS auth.user_role
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT role FROM auth.user_roles WHERE user_id = user_id;
$$;

CREATE OR REPLACE FUNCTION public.get_user_tokens(user_id UUID)
RETURNS INTEGER
LANGUAGE sql
SECURITY DEFINER
AS $$
  SELECT amount FROM public.witness_tokens WHERE user_id = user_id;
$$;

CREATE OR REPLACE FUNCTION public.get_user_perspectives(user_id UUID)
RETURNS TABLE (
  perspective_id UUID,
  name TEXT,
  description TEXT,
  image_url TEXT,
  unlocked_at TIMESTAMPTZ
)
LANGUAGE sql
SECURITY DEFINER
AS $$
  SELECT 
    ap.id,
    ap.name,
    ap.description,
    ap.image_url,
    up.unlocked_at
  FROM public.animal_perspectives ap
  JOIN public.user_perspectives up ON ap.id = up.perspective_id
  WHERE up.user_id = user_id;
$$;

CREATE OR REPLACE FUNCTION public.get_user_raffle_entries(user_id UUID)
RETURNS TABLE (
  raffle_id UUID,
  title TEXT,
  tokens_used INTEGER
)
LANGUAGE sql
SECURITY DEFINER
AS $$
  SELECT 
    r.id,
    r.title,
    re.tokens_used
  FROM public.raffles r
  JOIN public.raffle_entries re ON r.id = re.raffle_id
  WHERE re.user_id = user_id;
$$;

-- Insert initial data
INSERT INTO public.animal_perspectives (name, description, image_url) VALUES
('Wolf', 'The strategic hunter perspective', '/perspectives/wolf.png'),
('Rabbit', 'The swift survivor perspective', '/perspectives/rabbit.png'),
('Wisp', 'The ethereal observer perspective', '/perspectives/wisp.png'),
('Pilot', 'The aerial commander perspective', '/perspectives/pilot.png');

INSERT INTO public.raffles (title, description, start_date, end_date, status, prize_description) VALUES
('Genesis Raffle', 'Win exclusive NFTs and Witness Tokens', NOW(), NOW() + INTERVAL '7 days', 'active', '1000 Witness Tokens + Exclusive NFT');
