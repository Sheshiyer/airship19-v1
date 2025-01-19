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

-- Create animal perspectives with their types
INSERT INTO public.animal_perspectives (name, description, image_url, type) VALUES
-- Primary Perspectives
('Rabbit', 'Begin your journey with swift navigation and intuitive resource gathering. Learn to move through digital spaces with agility and adaptability.', '/perspectives/rabbit.png', 'Primary'),
('Wolf', 'Start as a strategic hunter, developing pack coordination and territorial awareness in the digital realm.', '/perspectives/wolf.png', 'Primary'),
('Stag', 'Embrace nobility and leadership, learning to guide others through digital landscapes with grace and wisdom.', '/perspectives/stag.png', 'Primary'),
('Doe', 'Master the art of gentle awareness and nurturing connections in the digital ecosystem.', '/perspectives/doe.png', 'Primary'),

-- Advanced Perspectives
('Fox', 'Develop cunning strategies and masterful adaptation skills in complex digital environments.', '/perspectives/fox.png', 'Advanced'),
('Bear', 'Harness powerful presence and protective abilities while maintaining balance in the digital realm.', '/perspectives/bear.png', 'Advanced'),
('Boar', 'Channel determination and breakthrough power to overcome digital obstacles and forge new paths.', '/perspectives/boar.png', 'Advanced'),
('Sheep', 'Cultivate community harmony and collective wisdom in digital spaces.', '/perspectives/sheep.png', 'Advanced'),

-- Master Perspectives
('Goat', 'Achieve supreme adaptability and mastery of digital elevation, conquering any technical terrain.', '/perspectives/goat.png', 'Master'),
('Lion', 'Command sovereign authority and leadership in the digital kingdom with noble purpose.', '/perspectives/lion.png', 'Master'),
('Elephant', 'Embody ancient wisdom and unshakeable memory in the digital consciousness.', '/perspectives/elephant.png', 'Master'),
('Cow', 'Manifest abundance and nurturing sustenance throughout the digital ecosystem.', '/perspectives/cow.png', 'Master');

-- Create some unlocked perspectives for admin
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
