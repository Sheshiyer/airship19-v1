'use client'

import { useState } from 'react'

type UserRole = 'admin' | 'moderator' | 'user'

export function useRBAC() {
  // For development, always return admin role
  const [role] = useState<UserRole>('admin')
  const [loading] = useState(false)

  const isAdmin = role === 'admin'
  const isModerator = role === 'moderator' || isAdmin
  const isUser = true // Everyone has basic user privileges

  // For development, all permissions are granted
  const hasPermission = (_permission: string) => true
  const hasRole = (_role: UserRole) => true
  const hasAnyPermission = (_permissions: string[]) => true
  const hasAllPermissions = (_permissions: string[]) => true

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
