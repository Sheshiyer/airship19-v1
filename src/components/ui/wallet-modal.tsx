"use client";

import { useState, useEffect } from "react";
import { useWallet } from "../../context/wallet-context";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../../lib/utils";

interface WalletModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const WALLET_OPTIONS = [
  {
    id: "metamask",
    name: "MetaMask",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 35 33" fill="none">
        <path d="M32.9582 1L19.8241 10.7183L22.2665 4.99099L32.9582 1Z" fill="#E17726" stroke="#E17726" strokeWidth="0.25" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M2.65479 1L15.6466 10.809L13.3459 4.99098L2.65479 1Z" fill="#E27625" stroke="#E27625" strokeWidth="0.25" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M28.2861 23.7347L24.8137 29.1533L32.3583 31.2341L34.5172 23.8569L28.2861 23.7347Z" fill="#E27625" stroke="#E27625" strokeWidth="0.25" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M1.10303 23.8569L3.24846 31.2341L10.793 29.1533L7.33407 23.7347L1.10303 23.8569Z" fill="#E27625" stroke="#E27625" strokeWidth="0.25" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  },
  {
    id: "walletconnect",
    name: "WalletConnect",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 32 32" fill="none">
        <path d="M9.58818 11.8556C13.1293 8.31442 18.8706 8.31442 22.4117 11.8556L22.8379 12.2818C23.015 12.4589 23.015 12.7459 22.8379 12.923L21.3801 14.3808C21.2915 14.4694 21.148 14.4694 21.0595 14.3808L20.473 13.7944C18.0026 11.324 13.9973 11.324 11.5269 13.7944L10.8989 14.4224C10.8104 14.511 10.6668 14.511 10.5783 14.4224L9.12053 12.9646C8.94342 12.7875 8.94342 12.5005 9.12053 12.3234L9.58818 11.8556ZM25.4268 14.8706L26.7243 16.168C26.9014 16.3451 26.9014 16.6321 26.7243 16.8092L20.8737 22.6598C20.6966 22.8369 20.4096 22.8369 20.2325 22.6598L16.0802 18.5075C16.0359 18.4632 15.9641 18.4632 15.9198 18.5075L11.7675 22.6598C11.5904 22.8369 11.3034 22.8369 11.1263 22.6598L5.27566 16.8092C5.09856 16.6321 5.09856 16.3451 5.27566 16.168L6.57315 14.8706C6.75025 14.6935 7.03729 14.6935 7.21439 14.8706L11.3668 19.0229C11.411 19.0672 11.4828 19.0672 11.5271 19.0229L15.6793 14.8706C15.8565 14.6935 16.1435 14.6935 16.3206 14.8706L20.4729 19.0229C20.5172 19.0672 20.589 19.0672 20.6332 19.0229L24.7856 14.8706C24.9627 14.6935 25.2497 14.6935 25.4268 14.8706Z" fill="#3B99FC"/>
      </svg>
    )
  },
  {
    id: "coinbase",
    name: "Coinbase Wallet",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 32 32" fill="none">
        <path d="M16 0C7.164 0 0 7.164 0 16s7.164 16 16 16 16-7.164 16-16S24.836 0 16 0zm-3.384 22.783l-.099.081a7.636 7.636 0 01-4.8-7.073c0-3.158 1.914-5.868 4.645-7.025l.254.246v13.771zm3.49.434c-1.092 0-2.139-.191-3.112-.541V9.295A8.485 8.485 0 0116 8.782c1.19 0 2.32.246 3.35.687v13.276a8.353 8.353 0 01-3.244.472zm6.862-7.426c0 3.015-1.736 5.625-4.265 6.882V9.327c2.529 1.257 4.265 3.867 4.265 6.882v.582z" fill="#0052FF"/>
      </svg>
    )
  }
];

export const WalletModal = ({ isOpen, onClose }: WalletModalProps) => {
  const { connect, error, isConnected } = useWallet();
  const [isConnecting, setIsConnecting] = useState(false);
  const [selectedWallet, setSelectedWallet] = useState<string | null>(null);

  useEffect(() => {
    if (isConnected) {
      onClose();
    }
  }, [isConnected, onClose]);

  const handleConnect = async (walletId: string) => {
    setIsConnecting(true);
    setSelectedWallet(walletId);
    
    try {
      await connect(walletId);
    } catch (err) {
      // Error is handled by the context
    } finally {
      setIsConnecting(false);
    }
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
                <div className="text-center mb-6">
                  {error && (
                    <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-sm text-red-400">
                      {error}
                    </div>
                  )}
                  <h2 className="text-2xl font-bold text-white mb-2">
                    Connect Wallet
                  </h2>
                  <p className="text-neutral-300">
                    Choose your preferred wallet to connect
                  </p>
                </div>

                <div className="space-y-3">
                  {WALLET_OPTIONS.map((wallet) => (
                    <button
                      key={wallet.id}
                      onClick={() => handleConnect(wallet.id)}
                      disabled={isConnecting}
                      className={cn(
                        "w-full flex items-center gap-3 p-4 rounded-lg border transition-colors",
                        selectedWallet === wallet.id && isConnecting
                          ? "bg-blue-500/20 border-blue-500"
                          : "bg-black/50 border-white/10 hover:border-blue-500/50"
                      )}
                    >
                      {wallet.icon}
                      <span className="flex-1 text-left font-medium text-white">
                        {wallet.name}
                      </span>
                      {selectedWallet === wallet.id && isConnecting ? (
                        <svg className="animate-spin h-5 w-5 text-blue-500" viewBox="0 0 24 24">
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
                      ) : (
                        <svg className="w-5 h-5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      )}
                    </button>
                  ))}
                </div>

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
