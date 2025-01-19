import { ProtectedRoute } from '@/components/auth/protected-route'
import { Suspense } from 'react'
import { UserDashboardContent } from '@/components/dashboard/user-dashboard-content'

export default function UserDashboardPage() {
  return (
    <ProtectedRoute>
      <Suspense 
        fallback={
          <div className="flex items-center justify-center min-h-screen">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        }
      >
        <div className="p-8">
          <UserDashboardContent />
        </div>
      </Suspense>
    </ProtectedRoute>
  )
}
