import { ProtectedRoute } from '@/components/auth/protected-route'
import { DashboardLayout } from '@/components/dashboard/dashboard-layout'
import { Suspense } from 'react'
import { UserDashboardContent } from '@/components/dashboard/user-dashboard-content'

export default function UserDashboardPage() {
  return (
    <ProtectedRoute>
      <DashboardLayout>
        <Suspense 
          fallback={
            <div className="flex items-center justify-center min-h-screen">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          }
        >
          <div className="p-8">
            <h1 className="text-2xl font-bold text-white mb-6">Welcome to Your Dashboard</h1>
            <UserDashboardContent />
          </div>
        </Suspense>
      </DashboardLayout>
    </ProtectedRoute>
  )
}
