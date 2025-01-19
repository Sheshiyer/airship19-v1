'use client'

import { usePathname } from 'next/navigation'
import { NavItems } from './nav-items'
import { FloatingNav } from '../ui/floating-nav'

export function NavWrapper() {
  const pathname = usePathname()
  const isHomePage = pathname === '/'
  const isDashboardPage = pathname.startsWith('/dashboard')

  if (isDashboardPage) {
    return null
  }

  return isHomePage ? (
    <FloatingNav>
      <NavItems />
    </FloatingNav>
  ) : (
    <div className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-sm border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <NavItems />
      </div>
    </div>
  )
}
