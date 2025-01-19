"use client";

import { cn } from "../../lib/utils";
import { motion, HTMLMotionProps } from "framer-motion";
import { useEffect, useState } from "react";

interface FloatingNavProps extends Omit<HTMLMotionProps<"div">, "children"> {
  children: React.ReactNode | React.ReactNode[];
}

export const FloatingNav = ({ 
  children,
  className,
  ...props 
}: FloatingNavProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsVisible(lastScrollY > currentScrollY || currentScrollY < 100);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const motionProps: HTMLMotionProps<"div"> = {
    initial: { y: -100, opacity: 0 },
    animate: { 
      y: isVisible ? 0 : -100,
      opacity: isVisible ? 1 : 0
    },
    transition: {
      duration: 0.2
    },
    ...props
  };

  return (
    <motion.div
      role="banner"
      aria-label="Main navigation"
      className={cn(
        "fixed top-4 sm:top-6 inset-x-4 sm:inset-x-6 md:inset-x-8 max-w-7xl mx-auto z-50",
        className
      )}
      {...motionProps}
    >
      <div className="relative">
        <div className="absolute inset-0 bg-black/10 rounded-full blur-xl" />
        <nav 
          aria-label="Primary navigation" 
          className="relative bg-black/40 backdrop-blur-sm border border-white/10 rounded-full px-4 sm:px-6 md:px-8 py-3 sm:py-4 shadow-lg"
        >
          <div className="flex items-center justify-between relative">
            <div className="flex items-center gap-4 sm:gap-8">
              <motion.span 
                role="heading"
                aria-level={1}
                className="text-lg sm:text-xl md:text-2xl font-space-grotesk font-bold text-white tracking-wider relative group cursor-pointer"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <span className="relative">
                  airship
                  <span className="text-blue-500">19</span>
                  <span className="absolute -inset-x-4 -inset-y-2 bg-blue-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="absolute -inset-x-4 -inset-y-2 bg-blue-500/5 rounded-lg blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </span>
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500/0 via-blue-500 to-blue-500/0 group-hover:w-full transition-all duration-300" />
              </motion.span>

              {/* Desktop Menu */}
              <div className="hidden md:flex items-center gap-6">
                {Array.isArray(children) ? children[0] : children}
              </div>
            </div>

            {/* Action Menu */}
            <div className="hidden md:flex items-center gap-4">
              {Array.isArray(children) ? children[1] : null}
            </div>

            {/* Mobile Menu Container */}
            <div className="md:hidden relative">
              {Array.isArray(children) ? children : null}
            </div>
          </div>
        </nav>
      </div>
    </motion.div>
  );
};
