'use client'

import { User } from '@supabase/supabase-js'
import { createContext, useContext, useState } from 'react'
import { useRouter } from 'next/navigation'

interface AuthContextType {
  user: User | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<boolean>
  signUp: (email: string, password: string) => Promise<boolean>
  signOut: () => Promise<void>
  error: string | null
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  // Mock user for development
  const [user] = useState<User>({
    id: 'dev-user',
    email: 'dev@example.com',
    created_at: new Date().toISOString(),
    app_metadata: {},
    user_metadata: {},
    aud: 'authenticated',
    role: 'authenticated'
  } as User)
  const [loading] = useState(false)
  const [error] = useState<string | null>(null)
  const router = useRouter()

  // Development versions of auth functions
  const signIn = async (_email: string, _password: string): Promise<boolean> => {
    return true
  }

  const signUp = async (_email: string, _password: string): Promise<boolean> => {
    return true
  }

  const signOut = async () => {
    router.push('/')
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signIn,
        signUp,
        signOut,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
