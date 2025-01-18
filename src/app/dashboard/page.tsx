import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase'
import { routes } from '@/lib/routes'

export default async function DashboardPage() {
  const supabase = createClient()
  
  const { data: { session } } = await supabase.auth.getSession()
  if (!session) {
    redirect(routes.signin)
  }

  const { data: profile } = await supabase
    .from('user_profiles')
    .select('role')
    .eq('id', session.user.id)
    .single()

  if (profile?.role === 'admin') {
    redirect(routes.adminDashboard)
  } else {
    redirect(routes.userDashboard)
  }
}
