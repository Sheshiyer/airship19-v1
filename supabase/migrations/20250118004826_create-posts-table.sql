-- Create posts table
CREATE TABLE IF NOT EXISTS public.posts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    status TEXT NOT NULL CHECK (status IN ('draft', 'published')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE
);

-- Enable RLS
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view published posts" ON public.posts
    FOR SELECT
    USING (status = 'published' OR auth.uid() = user_id);

CREATE POLICY "Users can create posts" ON public.posts
    FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own posts" ON public.posts
    FOR UPDATE
    USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own posts" ON public.posts
    FOR DELETE
    USING (auth.uid() = user_id);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER handle_posts_updated_at
    BEFORE UPDATE ON public.posts
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

-- Create activity log trigger
CREATE OR REPLACE FUNCTION public.handle_post_activity()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        INSERT INTO public.activity_logs (user_id, action, details)
        VALUES (
            NEW.user_id,
            'post_create',
            jsonb_build_object(
                'post_id', NEW.id,
                'title', NEW.title,
                'status', NEW.status
            )
        );
    ELSIF TG_OP = 'UPDATE' THEN
        IF OLD.status != NEW.status THEN
            INSERT INTO public.activity_logs (user_id, action, details)
            VALUES (
                NEW.user_id,
                'post_status_change',
                jsonb_build_object(
                    'post_id', NEW.id,
                    'title', NEW.title,
                    'old_status', OLD.status,
                    'new_status', NEW.status
                )
            );
        END IF;
    ELSIF TG_OP = 'DELETE' THEN
        INSERT INTO public.activity_logs (user_id, action, details)
        VALUES (
            OLD.user_id,
            'post_delete',
            jsonb_build_object(
                'post_id', OLD.id,
                'title', OLD.title
            )
        );
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER handle_post_activity
    AFTER INSERT OR UPDATE OR DELETE ON public.posts
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_post_activity();

-- Create indexes
CREATE INDEX posts_user_id_idx ON public.posts(user_id);
CREATE INDEX posts_status_idx ON public.posts(status);
CREATE INDEX posts_created_at_idx ON public.posts(created_at DESC);
