'use client'

import { useAuth } from '@/context/auth-context'
import { createClient } from '@/lib/supabase'
import { useEffect, useState } from 'react'

type UserRole = 'admin' | 'moderator' | 'user'

export function useRBAC() {
  const { user } = useAuth()
  const [role, setRole] = useState<UserRole>('user')
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    async function getUserRole() {
      if (!user) {
        setRole('user')
        setLoading(false)
        return
      }

      try {
        const { data, error } = await supabase
          .rpc('get_user_role', {
            user_id: user.id
          })

        if (error) throw error

        setRole(data as UserRole || 'user')
      } catch (error) {
        console.error('Error fetching user role:', error)
        setRole('user') // Default to user role on error
      } finally {
        setLoading(false)
      }
    }

    getUserRole()
  }, [user])

  const isAdmin = role === 'admin'
  const isModerator = role === 'moderator' || isAdmin
  const isUser = true // Everyone has basic user privileges

  const hasPermission = (permission: string) => {
    switch (permission) {
      case 'create:post':
      case 'edit:post':
        return isModerator
      case 'delete:post':
      case 'manage:users':
        return isAdmin
      default:
        return isUser
    }
  }

  return {
    role,
    isAdmin,
    isModerator,
    isUser,
    loading,
    hasPermission,
  }
}
