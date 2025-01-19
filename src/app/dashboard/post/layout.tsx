'use client'

import { useAuth } from '@/context/auth-context'
import { useRBAC } from '@/hooks/useRBAC'
import { useEffect } from 'react'
import { routes } from '@/lib/routes'

export default function PostLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user } = useAuth()
  const { hasPermission } = useRBAC()

  // Check if user has permission to access post management
  useEffect(() => {
    if (!hasPermission('create:post')) {
      window.location.href = routes.dashboard
    }
  }, [hasPermission])

  if (!user) {
    return null
  }

  return children
}
