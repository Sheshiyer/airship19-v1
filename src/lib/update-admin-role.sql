-- First ensure user exists and get their auth.users id
DO $$
DECLARE
    user_id UUID;
BEGIN
    -- Get user id from auth.users
    SELECT id INTO user_id
    FROM auth.users
    WHERE email = 'mrhigh3r@gmail.com';

    IF user_id IS NULL THEN
        RAISE EXCEPTION 'User not found';
    END IF;

    -- Create schema if it doesn't exist
    CREATE SCHEMA IF NOT EXISTS auth;
    
    -- Create type if it doesn't exist
    DO $$ BEGIN
        CREATE TYPE auth.user_role AS ENUM ('admin', 'moderator', 'user');
    EXCEPTION
        WHEN duplicate_object THEN null;
    END $$;

    -- Create tables if they don't exist
    CREATE TABLE IF NOT EXISTS auth.user_roles (
        user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
        role auth.user_role NOT NULL DEFAULT 'user'
    );

    CREATE TABLE IF NOT EXISTS public.user_profiles (
        id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
        username TEXT UNIQUE,
        full_name TEXT,
        avatar_url TEXT,
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );

    -- Update role in auth.user_roles
    INSERT INTO auth.user_roles (user_id, role)
    VALUES (user_id, 'admin')
    ON CONFLICT (user_id) 
    DO UPDATE SET role = 'admin';

    -- Update or create profile
    INSERT INTO public.user_profiles (id, username)
    VALUES (user_id, 'mrhigh3r@gmail.com')
    ON CONFLICT (id) 
    DO UPDATE SET username = 'mrhigh3r@gmail.com';
END $$;

-- Verify the updates
SELECT 
    u.email,
    ur.role,
    up.username
FROM auth.users u
LEFT JOIN auth.user_roles ur ON u.id = ur.user_id
LEFT JOIN public.user_profiles up ON u.id = up.id
WHERE u.email = 'mrhigh3r@gmail.com';
