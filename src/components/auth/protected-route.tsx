'use client'

import { useAuth } from '@/context/auth-context'
import { useRBAC } from '@/hooks/useRBAC'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

interface ProtectedRouteProps {
  children: React.ReactNode
  requiredRole?: 'admin' | 'moderator' | 'user'
  requiredPermissions?: Array<'create:post' | 'edit:post' | 'delete:post' | 'manage:users'>
  requireAllPermissions?: boolean
}

export function ProtectedRoute({
  children,
  requiredRole,
  requiredPermissions,
  requireAllPermissions = false,
}: ProtectedRouteProps) {
  const { user, loading } = useAuth()
  const { hasRole, hasAnyPermission, hasAllPermissions } = useRBAC()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push('/')
      return
    }

    if (requiredRole && !hasRole(requiredRole)) {
      router.push('/')
      return
    }

    if (requiredPermissions) {
      const hasPermissions = requireAllPermissions
        ? hasAllPermissions(requiredPermissions)
        : hasAnyPermission(requiredPermissions)

      if (!hasPermissions) {
        router.push('/')
        return
      }
    }
  }, [
    user,
    loading,
    requiredRole,
    requiredPermissions,
    requireAllPermissions,
    hasAllPermissions,
    hasAnyPermission,
    hasRole,
    router
  ])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return <>{children}</>
}

// Example usage:
// <ProtectedRoute requiredRole="admin" requiredPermissions={['manage:users']}>
//   <AdminDashboard />
// </ProtectedRoute>
