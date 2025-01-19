'use client'

import { useAuth } from '@/context/auth-context'
import { useRBAC } from '@/hooks/useRBAC'
import Link from 'next/link'
import { useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { routes, StaticRoutes } from '@/lib/routes'

type StaticRoute = StaticRoutes[keyof StaticRoutes]
type NavPathname = StaticRoute | '#'

interface NavLinkChild {
  href: { pathname: StaticRoute }
  label: string
}

interface NavLink {
  href: { pathname: NavPathname }
  label: string
  children?: NavLinkChild[]
}

const createNavLink = (pathname: StaticRoute, label: string): NavLink => ({
  href: { pathname },
  label
})

const createNavLinkWithChildren = (label: string, children: NavLinkChild[]): NavLink => ({
  href: { pathname: '#' as const },
  label,
  children
})

const createNavLinkChild = (pathname: StaticRoute, label: string): NavLinkChild => ({
  href: { pathname },
  label
})

const getKey = (link: NavLink): string => {
  return link.href.pathname === '#' ? link.label : link.href.pathname
}

const getChildKey = (href: { pathname: StaticRoute }): string => {
  return href.pathname
}

const asHref = (href: { pathname: NavPathname }): { pathname: string } => {
  return { pathname: href.pathname === '#' ? '#' : href.pathname }
}

export function NavItems() {
  const { user, signOut } = useAuth()
  const { isAdmin } = useRBAC()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
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

  // Define admin navigation links
  const adminNavigationLinks: NavLink[] = [
    createNavLink(routes.adminDashboard, "Dashboard"),
    createNavLink(routes.manageUsers, "User Management"),
    createNavLinkWithChildren("Content", [
      createNavLinkChild(routes.createPost, "Create Post"),
      createNavLinkChild(routes.perspectives, "Manage Perspectives"),
    ]),
    createNavLink(routes.settings, "System Settings"),
  ]

  // Define user navigation links
  const userNavigationLinks: NavLink[] = [
    createNavLink(routes.userDashboard, "Dashboard"),
    createNavLinkWithChildren("Perspectives", [
      createNavLinkChild(routes.primaryPerspectives, "Primary"),
      createNavLinkChild(routes.advancedPerspectives, "Advanced"),
      createNavLinkChild(routes.masterPerspectives, "Master"),
    ]),
    createNavLink(routes.profile, "Profile"),
    createNavLink(routes.settings, "Settings"),
  ]

  // Determine which navigation links to use based on user role and current page
  const navigationLinks: NavLink[] = [
    createNavLink(routes.home, "Home"),
    ...(user ? [
      ...(isAdmin ? adminNavigationLinks : userNavigationLinks)
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
              <div key={getKey(link)} className="w-full">
                {link.children ? (
                  <div className="w-full">
                    <button
                      onClick={() => setOpenDropdown(openDropdown === link.label ? null : link.label)}
                      className="w-full text-left py-2 px-4 text-sm font-space-grotesk font-medium text-neutral-300 hover:text-white hover:bg-white/5 transition-colors rounded-lg flex items-center justify-between"
                    >
                      {link.label}
                      <svg
                        className={`w-4 h-4 transition-transform ${openDropdown === link.label ? 'rotate-180' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    <AnimatePresence>
                      {openDropdown === link.label && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          {link.children.map((child) => (
                            <Link
                              key={getChildKey(child.href)}
                              href={child.href}
                              onClick={() => {
                                setOpenDropdown(null);
                                setIsMobileMenuOpen(false);
                              }}
                              className="block w-full py-2 px-8 text-sm font-space-grotesk font-medium text-neutral-400 hover:text-white hover:bg-white/5 transition-colors"
                            >
                              {child.label}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    href={asHref(link.href)}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block w-full text-center py-2 text-sm font-space-grotesk font-medium text-neutral-300 hover:text-white hover:bg-white/5 transition-colors rounded-lg"
                  >
                    {link.label}
                  </Link>
                )}
              </div>
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
              <div key={getKey(link)} className="relative group">
                {link.children ? (
                  <>
                    <button
                      onClick={() => setOpenDropdown(openDropdown === link.label ? null : link.label)}
                      className="text-sm font-space-grotesk font-medium text-neutral-300 hover:text-white transition-colors relative group flex items-center gap-1"
                    >
                      {link.label}
                      <svg
                        className={`w-4 h-4 transition-transform ${openDropdown === link.label ? 'rotate-180' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-300" />
                    </button>
                    <AnimatePresence>
                      {openDropdown === link.label && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="absolute top-full left-0 mt-2 py-2 bg-black/90 backdrop-blur-sm rounded-lg border border-white/10 min-w-[200px] z-50"
                        >
                          {link.children.map((child) => (
                            <Link
                              key={getChildKey(child.href)}
                              href={child.href}
                              onClick={() => setOpenDropdown(null)}
                              className="block px-4 py-2 text-sm font-space-grotesk font-medium text-neutral-300 hover:text-white hover:bg-white/5 transition-colors"
                            >
                              {child.label}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                ) : (
                  <Link
                    href={asHref(link.href)}
                    className="text-sm font-space-grotesk font-medium text-neutral-300 hover:text-white transition-colors relative group"
                  >
                    {link.label}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-300" />
                  </Link>
                )}
              </div>
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
