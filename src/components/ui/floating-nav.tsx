"use client";

import { cn } from "../../lib/utils";
import { motion, HTMLMotionProps } from "framer-motion";
import { useEffect, useState, Children } from "react";

interface FloatingNavProps extends Omit<HTMLMotionProps<"div">, "children"> {
  children: React.ReactNode;
}

export const FloatingNav = ({ 
  children,
  className,
  ...props 
}: FloatingNavProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuItems = Children.toArray(children);

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
      className={cn(
        "fixed top-4 sm:top-6 inset-x-4 sm:inset-x-6 md:inset-x-0 max-w-3xl mx-auto z-50",
        className
      )}
      {...motionProps}
    >
      <div className="relative">
        <div className="absolute inset-0 bg-black/10 rounded-full blur-xl" />
        <nav className="relative bg-black/40 backdrop-blur-sm border border-white/10 rounded-full px-4 sm:px-6 md:px-8 py-3 sm:py-4 shadow-lg">
          <div className="flex items-center justify-between">
            <motion.span 
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
            <div className="hidden md:flex items-center gap-8">
              {children}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-white hover:text-blue-500 transition-colors"
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
          </div>

          {/* Mobile Menu Overlay */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{
              opacity: isMobileMenuOpen ? 1 : 0,
              y: isMobileMenuOpen ? 0 : -20,
              display: isMobileMenuOpen ? "flex" : "none",
            }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 mt-4 bg-black/80 backdrop-blur-lg rounded-2xl border border-white/10 max-h-[80vh] overflow-y-auto overflow-x-hidden"
          >
            <div className="w-full py-4 px-6 flex flex-col gap-4 min-w-0">
              {menuItems.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="w-full [&>*]:w-full [&>*]:flex [&>*]:flex-col [&>*]:items-center [&>button]:justify-center"
                >
                  {item}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </nav>
      </div>
    </motion.div>
  );
};
