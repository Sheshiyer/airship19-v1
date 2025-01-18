-- Create test users with different roles
-- Create test users with passwords (password is 'password123' for all users)
INSERT INTO auth.users (
  id,
  instance_id,
  email,
  encrypted_password,
  raw_app_meta_data,
  raw_user_meta_data,
  aud,
  role
)
VALUES 
  (
    '00000000-0000-0000-0000-000000000001',
    '00000000-0000-0000-0000-000000000000',
    'admin@test.com',
    crypt('password123', gen_salt('bf')),
    '{"provider": "email", "providers": ["email"]}',
    '{"name": "Admin User"}',
    'authenticated',
    'authenticated'
  ),
  (
    '00000000-0000-0000-0000-000000000002',
    '00000000-0000-0000-0000-000000000000',
    'moderator@test.com',
    crypt('password123', gen_salt('bf')),
    '{"provider": "email", "providers": ["email"]}',
    '{"name": "Moderator User"}',
    'authenticated',
    'authenticated'
  ),
  (
    '00000000-0000-0000-0000-000000000003',
    '00000000-0000-0000-0000-000000000000',
    'user@test.com',
    crypt('password123', gen_salt('bf')),
    '{"provider": "email", "providers": ["email"]}',
    '{"name": "Regular User"}',
    'authenticated',
    'authenticated'
  );

-- Assign roles
INSERT INTO auth.user_roles (user_id, role)
VALUES 
  ('00000000-0000-0000-0000-000000000001', 'admin'),
  ('00000000-0000-0000-0000-000000000002', 'moderator'),
  ('00000000-0000-0000-0000-000000000003', 'user');

-- Create initial witness tokens
INSERT INTO public.witness_tokens (user_id, amount)
VALUES 
  ('00000000-0000-0000-0000-000000000001', 1000),
  ('00000000-0000-0000-0000-000000000002', 500),
  ('00000000-0000-0000-0000-000000000003', 100);

-- Create some unlocked perspectives
INSERT INTO public.user_perspectives (user_id, perspective_id)
SELECT 
  '00000000-0000-0000-0000-000000000001',
  id
FROM public.animal_perspectives;

-- Create some activity logs
INSERT INTO public.activity_logs (user_id, action, details)
VALUES 
  ('00000000-0000-0000-0000-000000000001', 'login', '{"ip": "127.0.0.1"}'),
  ('00000000-0000-0000-0000-000000000002', 'perspective_unlocked', '{"perspective": "Wolf"}'),
  ('00000000-0000-0000-0000-000000000003', 'raffle_entry', '{"raffle": "Genesis Raffle", "tokens": 50}');
