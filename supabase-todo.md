# Supabase Setup Todo

## 1. Initialize Supabase Project (if not done)
```bash
supabase init
```

## 2. Create Tables & Types

### Phase 1: Core Tables
```sql
-- Already done in supabase-setup.sql:
-- ✓ auth.user_roles (user_id, role)
-- ✓ public.user_profiles (id, username, full_name, avatar_url)
-- ✓ public.posts (id, title, content, status, author_id)

-- New tables needed:
CREATE TABLE public.witness_tokens (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  amount INTEGER DEFAULT 0,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.animal_perspectives (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  image_url TEXT
);

CREATE TABLE public.user_perspectives (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  perspective_id UUID REFERENCES public.animal_perspectives(id) ON DELETE CASCADE,
  unlocked_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, perspective_id)
);

CREATE TABLE public.raffles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  start_date TIMESTAMPTZ NOT NULL,
  end_date TIMESTAMPTZ NOT NULL,
  status TEXT DEFAULT 'active',
  prize_description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.raffle_entries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  raffle_id UUID REFERENCES public.raffles(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  tokens_used INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(raffle_id, user_id)
);

CREATE TABLE public.activity_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  action TEXT NOT NULL,
  details JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

## 3. Set up RLS Policies

```sql
-- Witness Tokens
ALTER TABLE public.witness_tokens ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own tokens"
  ON public.witness_tokens FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "Only system can update tokens"
  ON public.witness_tokens FOR ALL
  USING (false)
  WITH CHECK (false);

-- Animal Perspectives
ALTER TABLE public.animal_perspectives ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view perspectives"
  ON public.animal_perspectives FOR SELECT
  USING (true);

-- User Perspectives
ALTER TABLE public.user_perspectives ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their unlocked perspectives"
  ON public.user_perspectives FOR SELECT
  USING (user_id = auth.uid());

-- Raffles
ALTER TABLE public.raffles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active raffles"
  ON public.raffles FOR SELECT
  USING (status = 'active' OR auth.uid() IN (
    SELECT user_id FROM auth.user_roles WHERE role = 'admin'
  ));

-- Raffle Entries
ALTER TABLE public.raffle_entries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own entries"
  ON public.raffle_entries FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "Users can create their own entries"
  ON public.raffle_entries FOR INSERT
  WITH CHECK (user_id = auth.uid());

-- Activity Logs
ALTER TABLE public.activity_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view all logs"
  ON public.activity_logs FOR SELECT
  USING (auth.uid() IN (
    SELECT user_id FROM auth.user_roles WHERE role = 'admin'
  ));
```

## 4. Create Helper Functions

```sql
-- Get user's witness token balance
CREATE OR REPLACE FUNCTION public.get_user_tokens(user_id UUID)
RETURNS INTEGER
LANGUAGE sql
SECURITY DEFINER
AS $$
  SELECT amount FROM public.witness_tokens WHERE user_id = user_id;
$$;

-- Get user's unlocked perspectives
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

-- Get user's raffle entries
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
```

## 5. Initial Data Setup

```sql
-- Insert default animal perspectives
INSERT INTO public.animal_perspectives (name, description, image_url) VALUES
('Wolf', 'The strategic hunter perspective', '/perspectives/wolf.png'),
('Rabbit', 'The swift survivor perspective', '/perspectives/rabbit.png'),
('Wisp', 'The ethereal observer perspective', '/perspectives/wisp.png'),
('Pilot', 'The aerial commander perspective', '/perspectives/pilot.png');

-- Create initial raffle
INSERT INTO public.raffles (title, description, start_date, end_date, status, prize_description) VALUES
('Genesis Raffle', 'Win exclusive NFTs and Witness Tokens', NOW(), NOW() + INTERVAL '7 days', 'active', '1000 Witness Tokens + Exclusive NFT');
```

## 6. Next Steps

1. Test all tables and policies:
```bash
supabase test db
```

2. Apply migrations:
```bash
supabase db push
```

3. Generate TypeScript types:
```bash
supabase gen types typescript --local > src/lib/database.types.ts
```

4. Update supabase.ts client with new types and helper functions

5. Implement frontend components to interact with new tables:
   - Witness token display/management
   - Raffle entry system
   - Perspective unlocking mechanism
   - Admin dashboard data fetching
   - Activity logging system
