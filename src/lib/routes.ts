export const routes = {
  home: '/',
  signin: '/signin',
  signup: '/signup',
  profile: '/profile',
  dashboard: '/dashboard',
  adminDashboard: '/dashboard/admin',
  userDashboard: '/dashboard/user',
} as const

export type AppRoute = typeof routes[keyof typeof routes]
