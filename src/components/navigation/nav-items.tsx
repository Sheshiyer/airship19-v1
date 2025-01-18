'use client'

import { useAuth } from '@/context/auth-context'
import { useRBAC } from '@/hooks/useRBAC'
import Link from 'next/link'
import { useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { routes, AppRoute } from '@/lib/routes'
import { cn } from '@/lib/utils'

interface NavLink {
  href: AppRoute
  label: string
}

export function NavItems() {
  const { user, signOut } = useAuth()
  const { isAdmin, isModerator } = useRBAC()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  // If we're on the signin page, only show the back to home link
  if (pathname === routes.signin) {
    return (
      <div className="flex items-center gap-8">
        <Link 
          href={routes.home}
          className="text-sm font-space-grotesk font-medium text-neutral-300 hover:text-white transition-colors relative group"
        >
          Back to Home
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-300" />
        </Link>
      </div>
    )
  }

  interface SectionLink {
    id: string
    label: string
  }

  const sectionLinks: SectionLink[] = [
    { id: "home", label: "Home" },
    { id: "perspectives", label: "Perspectives" },
    { id: "features", label: "Features" },
    { id: "timeline", label: "Timeline" },
    { id: "community", label: "Community" },
    { id: "blog", label: "Blog" },
    { id: "faq", label: "FAQ" }
  ]

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  // For the home page, show section navigation
  if (pathname === routes.home) {

    return (
      <>
        <div className="flex items-center gap-8">
          {sectionLinks.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="text-sm font-space-grotesk font-medium text-neutral-300 hover:text-white transition-colors relative group"
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-300" />
            </button>
          ))}
        </div>
        <div className="flex items-center gap-4 ml-8 pl-8 border-l border-white/10">
          {user ? (
            <button
              onClick={() => signOut()}
              className="text-sm font-space-grotesk font-medium text-white bg-red-500/20 hover:bg-red-500/30 transition-colors rounded-lg px-4 py-1.5"
            >
              Sign Out
            </button>
          ) : (
            <>
              <button
                onClick={() => router.push(routes.signin)}
                className="text-sm font-space-grotesk font-medium text-neutral-300 hover:text-white border border-white/10 hover:border-white/20 transition-colors rounded-lg px-4 py-1.5"
              >
                Sign In
              </button>
              <Link
                href={routes.signup}
                className="text-sm font-space-grotesk font-medium text-white bg-blue-500 hover:bg-blue-600 transition-colors rounded-lg px-4 py-1.5"
              >
                Create Account
              </Link>
            </>
          )}
        </div>
      </>
    )
  }

  // For other pages (profile, dashboard, etc.)
  const navigationLinks: NavLink[] = [
    { href: routes.home, label: "Home" },
    ...(user ? [
      { href: routes.profile, label: "Profile" },
      { href: routes.userDashboard, label: "Dashboard" },
      ...(isAdmin ? [
        { href: routes.adminDashboard, label: "Admin Dashboard" }
      ] : [])
    ] : [])
  ]

  const renderMobileMenu = () => (
    <div className="md:hidden relative">
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="p-2 text-white hover:text-blue-500 transition-colors"
        aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
      >
        <motion.div
          animate={isMobileMenuOpen ? "open" : "closed"}
          className="w-6 h-5 flex flex-col justify-between"
        >
          <motion.span
            variants={{
              closed: { rotate: 0, y: 0 },
              open: { rotate: 45, y: 9 },
            }}
            className="w-full h-0.5 bg-current transform origin-left transition-transform"
          />
          <motion.span
            variants={{
              closed: { opacity: 1 },
              open: { opacity: 0 },
            }}
            className="w-full h-0.5 bg-current"
          />
          <motion.span
            variants={{
              closed: { rotate: 0, y: 0 },
              open: { rotate: -45, y: -9 },
            }}
            className="w-full h-0.5 bg-current transform origin-left transition-transform"
          />
        </motion.div>
      </button>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{
          opacity: isMobileMenuOpen ? 1 : 0,
          y: isMobileMenuOpen ? 0 : -20,
          display: isMobileMenuOpen ? "flex" : "none",
        }}
        className="absolute top-full right-0 mt-4 w-screen -mr-4 sm:-mr-6 md:-mr-8 flex-col items-center bg-black/90 backdrop-blur-lg rounded-2xl border border-white/10 p-4 gap-2 z-50"
        style={{ maxWidth: "calc(100vw - 2rem)" }}
      >
        {pathname === routes.home ? (
          <>
            {sectionLinks.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  scrollToSection(item.id);
                  setIsMobileMenuOpen(false);
                }}
                className="w-full text-center py-2 text-sm font-space-grotesk font-medium text-neutral-300 hover:text-white hover:bg-white/5 transition-colors rounded-lg"
              >
                {item.label}
              </button>
            ))}
          </>
        ) : (
          <>
            {navigationLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full text-center py-2 text-sm font-space-grotesk font-medium text-neutral-300 hover:text-white hover:bg-white/5 transition-colors rounded-lg"
              >
                {link.label}
              </Link>
            ))}
          </>
        )}
        <div className="w-full pt-2 mt-2 border-t border-white/10">
          {user ? (
            <button
              onClick={() => {
                signOut();
                setIsMobileMenuOpen(false);
              }}
              className="w-full py-2 text-sm font-space-grotesk font-medium text-white bg-red-500/20 hover:bg-red-500/30 transition-colors rounded-lg"
            >
              Sign Out
            </button>
          ) : (
            <>
              <button
                onClick={() => {
                  router.push(routes.signin);
                  setIsMobileMenuOpen(false);
                }}
                className="w-full py-2 mb-2 text-sm font-space-grotesk font-medium text-neutral-300 hover:text-white border border-white/10 hover:border-white/20 transition-colors rounded-lg"
              >
                Sign In
              </button>
              <Link
                href={routes.signup}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block w-full py-2 text-center text-sm font-space-grotesk font-medium text-white bg-blue-500 hover:bg-blue-600 transition-colors rounded-lg"
              >
                Create Account
              </Link>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );

  return (
    <>
      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center gap-8">
        {pathname === routes.home ? (
          <>
            {sectionLinks.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-sm font-space-grotesk font-medium text-neutral-300 hover:text-white transition-colors relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-300" />
              </button>
            ))}
          </>
        ) : (
          <>
            {navigationLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-space-grotesk font-medium text-neutral-300 hover:text-white transition-colors relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
          </>
        )}
      </div>
      <div className="hidden md:flex items-center gap-4 ml-8 pl-8 border-l border-white/10">
        {user ? (
          <button
            onClick={() => signOut()}
            className="text-sm font-space-grotesk font-medium text-white bg-red-500/20 hover:bg-red-500/30 transition-colors rounded-lg px-4 py-1.5"
          >
            Sign Out
          </button>
        ) : (
          <>
            <button
              onClick={() => router.push(routes.signin)}
              className="text-sm font-space-grotesk font-medium text-neutral-300 hover:text-white border border-white/10 hover:border-white/20 transition-colors rounded-lg px-4 py-1.5"
            >
              Sign In
            </button>
            <Link
              href={routes.signup}
              className="text-sm font-space-grotesk font-medium text-white bg-blue-500 hover:bg-blue-600 transition-colors rounded-lg px-4 py-1.5"
            >
              Create Account
            </Link>
          </>
        )}
      </div>

      {/* Mobile Menu */}
      {pathname !== '/signin' && renderMobileMenu()}
    </>
  )
}
