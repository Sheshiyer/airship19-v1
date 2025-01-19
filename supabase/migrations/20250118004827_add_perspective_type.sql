-- Add type column to animal_perspectives
ALTER TABLE public.animal_perspectives
ADD COLUMN type TEXT NOT NULL DEFAULT 'Primary';

-- Update existing perspectives with their types
UPDATE public.animal_perspectives
SET type = 'Primary'
WHERE name IN ('Wolf', 'Rabbit', 'Wisp', 'Pilot');

-- Add check constraint to ensure valid types
ALTER TABLE public.animal_perspectives
ADD CONSTRAINT valid_perspective_type
CHECK (type IN ('Primary', 'Advanced', 'Master'));

-- Create advanced and master versions of each perspective
INSERT INTO public.animal_perspectives (name, description, image_url, type)
SELECT 
  name || ' Advanced',
  'Advanced version of the ' || name || ' perspective',
  image_url,
  'Advanced'
FROM public.animal_perspectives
WHERE type = 'Primary';

INSERT INTO public.animal_perspectives (name, description, image_url, type)
SELECT 
  name || ' Master',
  'Master version of the ' || name || ' perspective',
  image_url,
  'Master'
FROM public.animal_perspectives
WHERE type = 'Primary';
