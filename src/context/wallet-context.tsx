"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";

interface WalletContextType {
  isConnected: boolean;
  address: string | null;
  balance: string | null;
  chainId: number | null;
  connect: (provider: string) => Promise<void>;
  disconnect: () => void;
  error: string | null;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

interface WalletProviderProps {
  children: ReactNode;
}

export function WalletProvider({ children }: WalletProviderProps) {
  const [isConnected, setIsConnected] = useState(false);
  const [address, setAddress] = useState<string | null>(null);
  const [balance, setBalance] = useState<string | null>(null);
  const [chainId, setChainId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const connect = useCallback(async (provider: string) => {
    try {
      setError(null);
      // TODO: Implement actual wallet connection logic based on provider
      // For now, simulate a connection
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setIsConnected(true);
      setAddress("0x1234...5678");
      setBalance("1.23 ETH");
      setChainId(1); // Ethereum Mainnet
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to connect wallet");
      setIsConnected(false);
      setAddress(null);
      setBalance(null);
      setChainId(null);
    }
  }, []);

  const disconnect = useCallback(() => {
    setIsConnected(false);
    setAddress(null);
    setBalance(null);
    setChainId(null);
    setError(null);
  }, []);

  return (
    <WalletContext.Provider
      value={{
        isConnected,
        address,
        balance,
        chainId,
        connect,
        disconnect,
        error
      }}
    >
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error("useWallet must be used within a WalletProvider");
  }
  return context;
}
