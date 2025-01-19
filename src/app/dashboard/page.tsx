import Link from 'next/link'
import { routes } from '@/lib/routes'

export default function DashboardPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-8">
      <h1 className="text-3xl font-bold text-white">Development Dashboard</h1>
      <div className="flex gap-4">
        <Link 
          href={routes.adminDashboard}
          className="px-6 py-3 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors"
        >
          Admin Dashboard
        </Link>
        <Link 
          href={routes.userDashboard}
          className="px-6 py-3 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors"
        >
          User Dashboard
        </Link>
      </div>
    </div>
  )
}
