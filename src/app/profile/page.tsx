import { ProtectedRoute } from '@/components/auth/protected-route'
import { ProfileContent } from './profile-content'
import { Suspense } from 'react'

export default function ProfilePage() {
  return (
    <ProtectedRoute requiredRole="user">
      <Suspense 
        fallback={
          <div className="flex items-center justify-center min-h-screen">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        }
      >
        <ProfileContent />
      </Suspense>
    </ProtectedRoute>
  )
}
