"use client";

import { useWallet } from "../../context/wallet-context";

export const WalletStatus = () => {
  const { isConnected, address, balance, disconnect } = useWallet();

  if (!isConnected) return null;

  return (
    <div className="flex items-center gap-3 px-3 py-1.5 bg-blue-500/10 border border-blue-500/20 rounded-lg">
      <div className="flex flex-col">
        <span className="text-xs text-neutral-400">Connected</span>
        <span className="text-sm font-medium text-white">{address}</span>
      </div>
      <div className="h-8 w-px bg-white/10" />
      <div className="flex flex-col">
        <span className="text-xs text-neutral-400">Balance</span>
        <span className="text-sm font-medium text-white">{balance}</span>
      </div>
      <button
        onClick={disconnect}
        className="ml-2 p-1.5 text-neutral-400 hover:text-white transition-colors"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
        </svg>
      </button>
    </div>
  );
};
