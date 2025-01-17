"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../../lib/utils";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: "login" | "signup";
}

export const AuthModal = ({ isOpen, onClose, initialMode = "login" }: AuthModalProps) => {
  const [mode, setMode] = useState<"login" | "signup">(initialMode);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // TODO: Implement authentication logic
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md z-50"
          >
            <div className="relative bg-black/80 border border-white/10 backdrop-blur-xl rounded-xl p-6 overflow-hidden">
              {/* Background Effects */}
              <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 to-purple-500/10" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,0,182,0.1))]" />

              {/* Content */}
              <div className="relative">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-white mb-2">
                    {mode === "login" ? "Welcome Back" : "Create Account"}
                  </h2>
                  <p className="text-neutral-300">
                    {mode === "login"
                      ? "Enter your credentials to continue"
                      : "Sign up to start your journey"}
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {mode === "signup" && (
                    <div>
                      <label htmlFor="username" className="block text-sm font-medium text-neutral-300 mb-1.5">
                        Username
                      </label>
                      <input
                        type="text"
                        id="username"
                        className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
                        placeholder="Choose a username"
                        required
                      />
                    </div>
                  )}
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-neutral-300 mb-1.5">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
                      placeholder="Enter your email"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-neutral-300 mb-1.5">
                      Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
                      placeholder={mode === "login" ? "Enter your password" : "Choose a password"}
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className={cn(
                      "w-full bg-blue-500 text-white rounded-lg py-2.5 font-medium transition-colors",
                      isLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
                    )}
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        <span>{mode === "login" ? "Signing in..." : "Creating account..."}</span>
                      </div>
                    ) : (
                      <span>{mode === "login" ? "Sign In" : "Create Account"}</span>
                    )}
                  </button>

                  <div className="text-center">
                    <button
                      type="button"
                      onClick={() => setMode(mode === "login" ? "signup" : "login")}
                      className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      {mode === "login"
                        ? "Don't have an account? Sign up"
                        : "Already have an account? Sign in"}
                    </button>
                  </div>
                </form>

                {/* Close Button */}
                <button
                  onClick={onClose}
                  className="absolute top-2 right-2 text-neutral-400 hover:text-white transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
