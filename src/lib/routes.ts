export type StaticRoutes = {
  home: '/'
  signin: '/signin'
  signup: '/signup'
  profile: '/dashboard/profile'
  dashboard: '/dashboard'
  adminDashboard: '/dashboard/admin'
  userDashboard: '/dashboard/user'
  createPost: '/dashboard/post/create'
  settings: '/dashboard/settings'
  manageUsers: '/dashboard/admin/users'
  perspectives: '/dashboard/perspectives'
  primaryPerspectives: '/dashboard/perspectives/primary'
  advancedPerspectives: '/dashboard/perspectives/advanced'
  masterPerspectives: '/dashboard/perspectives/master'
}

type DynamicRoutes = {
  editPost: (id: string) => `/dashboard/post/edit/${string}`
  perspective: (id: string) => `/dashboard/perspectives/${string}`
}

export const routes: StaticRoutes & DynamicRoutes = {
  home: '/',
  signin: '/signin',
  signup: '/signup',
  profile: '/dashboard/profile',
  dashboard: '/dashboard',
  adminDashboard: '/dashboard/admin',
  userDashboard: '/dashboard/user',
  createPost: '/dashboard/post/create',
  editPost: (id: string) => `/dashboard/post/edit/${id}` as const,
  settings: '/dashboard/settings',
  manageUsers: '/dashboard/admin/users',
  // Perspective routes
  perspectives: '/dashboard/perspectives',
  primaryPerspectives: '/dashboard/perspectives/primary',
  advancedPerspectives: '/dashboard/perspectives/advanced',
  masterPerspectives: '/dashboard/perspectives/master',
  // Individual perspective route
  perspective: (id: string) => `/dashboard/perspectives/${id}` as const,
}

export type AppRoute = StaticRoutes[keyof StaticRoutes] | ReturnType<DynamicRoutes[keyof DynamicRoutes]>
