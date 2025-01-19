'use client'

import { useRBAC } from '@/hooks/useRBAC'
import { useRouter } from 'next/navigation'
import { routes } from '@/lib/routes'
import { useEffect } from 'react'

export function AdminRoute({ children }: { children: React.ReactNode }) {
  const { isAdmin, loading } = useRBAC()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !isAdmin) {
      router.replace(routes.userDashboard)
    }
  }, [isAdmin, loading, router])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  return isAdmin ? <>{children}</> : null
}
