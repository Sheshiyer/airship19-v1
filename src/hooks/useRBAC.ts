'use client'

import { useAuth } from '@/context/auth-context'
import { createClient } from '@/lib/supabase'
import { useEffect, useState } from 'react'

type UserRole = 'admin' | 'moderator' | 'user'

export function useRBAC() {
  // For development, always return admin role
  const [role] = useState<UserRole>('admin')
  const [loading] = useState(false)

  const isAdmin = role === 'admin'
  const isModerator = role === 'moderator' || isAdmin
  const isUser = true // Everyone has basic user privileges

  // For development, all permissions are granted
  const hasPermission = (permission: string) => true
  const hasRole = (role: UserRole) => true
  const hasAnyPermission = (permissions: string[]) => true
  const hasAllPermissions = (permissions: string[]) => true

  return {
    role,
    isAdmin,
    isModerator,
    isUser,
    loading,
    hasPermission,
    hasRole,
    hasAnyPermission,
    hasAllPermissions
  }
}
