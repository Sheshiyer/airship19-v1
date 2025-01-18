import { createBrowserClient, createServerClient } from '@supabase/ssr'

export const createClient = () => {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}

export const createServerSupabaseClient = () => {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) throw new Error('Missing env.NEXT_PUBLIC_SUPABASE_URL')
  if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) throw new Error('Missing env.NEXT_PUBLIC_SUPABASE_ANON_KEY')

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        get(name: string) {
          return document.cookie
            .split('; ')
            .find((row) => row.startsWith(`${name}=`))
            ?.split('=')[1]
        },
        set(name: string, value: string, options: any) {
          let cookie = `${name}=${value}`
          if (options.maxAge) {
            cookie += `; Max-Age=${options.maxAge}`
          }
          if (options.path) {
            cookie += `; Path=${options.path}`
          }
          document.cookie = cookie
        },
        remove(name: string, options: any) {
          document.cookie = `${name}=; Max-Age=0${options?.path ? `; Path=${options.path}` : ''}`
        },
      },
    }
  )
}
