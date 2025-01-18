'use client'

import { AdminRoute } from '@/components/auth/admin-route'
import { DashboardLayout } from '@/components/dashboard/dashboard-layout'
import { DashboardContent } from '@/app/dashboard/dashboard-content'
import { UserDashboardContent } from '@/components/dashboard/user-dashboard-content'
import { useViewAs } from '@/hooks/useViewAs'
import { Suspense } from 'react'

export default function AdminDashboardPage() {
  const { viewAsUser, setViewAsUser } = useViewAs()

  return (
    <AdminRoute>
      <DashboardLayout>
        <Suspense 
          fallback={
            <div className="flex items-center justify-center min-h-screen">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          }
        >
          <div className="p-8">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
              <button
                onClick={() => setViewAsUser(!viewAsUser)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  viewAsUser
                    ? 'bg-blue-500 text-white hover:bg-blue-600'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                {viewAsUser ? 'Exit User View' : 'View as User'}
              </button>
            </div>
            {viewAsUser ? <UserDashboardContent /> : <DashboardContent />}
          </div>
        </Suspense>
      </DashboardLayout>
    </AdminRoute>
  )
}
