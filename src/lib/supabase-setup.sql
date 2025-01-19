-- Enable Row Level Security
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- Create auth schema for storing user roles
CREATE SCHEMA IF NOT EXISTS auth;

-- Create roles enum
CREATE TYPE auth.user_role AS ENUM ('admin', 'moderator', 'user');

-- Create user_roles table
CREATE TABLE IF NOT EXISTS auth.user_roles (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  role auth.user_role NOT NULL DEFAULT 'user'
);

-- Create posts table
CREATE TABLE IF NOT EXISTS public.posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  content TEXT,
  status TEXT NOT NULL DEFAULT 'draft',
  author_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create user_profiles table
CREATE TABLE IF NOT EXISTS public.user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT UNIQUE,
  full_name TEXT,
  avatar_url TEXT,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create function to get user's role
CREATE OR REPLACE FUNCTION auth.user_role(user_id UUID)
RETURNS auth.user_role
LANGUAGE sql
SECURITY DEFINER
AS $$
  SELECT role FROM auth.user_roles WHERE user_id = user_id;
$$;

-- Policies for posts table
CREATE POLICY "Users can read published posts"
  ON posts FOR SELECT
  USING (status = 'published');

CREATE POLICY "Authors can read their own drafts"
  ON posts FOR SELECT
  USING (author_id = auth.uid());

CREATE POLICY "Authors can create posts"
  ON posts FOR INSERT
  WITH CHECK (author_id = auth.uid());

CREATE POLICY "Authors can update their own posts"
  ON posts FOR UPDATE
  USING (author_id = auth.uid());

CREATE POLICY "Moderators can update any post"
  ON posts FOR UPDATE
  USING (EXISTS (
    SELECT 1 FROM auth.user_roles
    WHERE user_id = auth.uid()
    AND role IN ('admin', 'moderator')
  ));

CREATE POLICY "Only admins can delete posts"
  ON posts FOR DELETE
  USING (EXISTS (
    SELECT 1 FROM auth.user_roles
    WHERE user_id = auth.uid()
    AND role = 'admin'
  ));

-- Policies for user_profiles table
CREATE POLICY "Users can read any profile"
  ON user_profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can update their own profile"
  ON user_profiles FOR UPDATE
  USING (id = auth.uid());

-- Function to handle user creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  -- Create user role
  INSERT INTO auth.user_roles (user_id, role)
  VALUES (NEW.id, 'user');
  
  -- Create user profile
  INSERT INTO public.user_profiles (id, username)
  VALUES (NEW.id, NEW.email);
  
  RETURN NEW;
END;
$$;

-- Trigger for new user creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

-- Add updated_at triggers
CREATE TRIGGER update_posts_updated_at
  BEFORE UPDATE ON posts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_profiles_updated_at
  BEFORE UPDATE ON user_profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
