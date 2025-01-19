'use client'

import { AdminRoute } from '@/components/auth/admin-route'
import { DashboardContent } from '@/app/dashboard/dashboard-content'
import { UserDashboardContent } from '@/components/dashboard/user-dashboard-content'
import { useViewAs } from '@/hooks/useViewAs'
import { Suspense } from 'react'

export default function AdminDashboardPage() {
  const { viewAsUser, setViewAsUser } = useViewAs()

  return (
    <AdminRoute>
      <Suspense 
        fallback={
          <div className="flex items-center justify-center min-h-screen">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        }
      >
        <div className="p-8">
          {viewAsUser ? (
            <>
              <div className="flex justify-end mb-6">
                <button
                  onClick={() => setViewAsUser(false)}
                  className="px-4 py-2 rounded-lg text-sm font-medium bg-blue-500 text-white hover:bg-blue-600 transition-colors"
                >
                  Exit User View
                </button>
              </div>
              <UserDashboardContent />
            </>
          ) : (
            <>
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
                <button
                  onClick={() => setViewAsUser(true)}
                  className="px-4 py-2 rounded-lg text-sm font-medium bg-white/10 text-white hover:bg-white/20 transition-colors"
                >
                  View as User
                </button>
              </div>
              <DashboardContent />
            </>
          )}
        </div>
      </Suspense>
    </AdminRoute>
  )
}
