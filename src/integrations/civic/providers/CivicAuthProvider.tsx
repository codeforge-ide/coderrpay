'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider, createConfig, http } from "wagmi";
import { mainnet, sepolia, polygon } from "wagmi/chains";
import { CivicUser, CivicAuthContextType } from '../types';

const queryClient = new QueryClient();

const CivicAuthContext = createContext<CivicAuthContextType | null>(null);

export const useCivicAuth = () => {
  const context = useContext(CivicAuthContext);
  if (!context) {
    throw new Error('useCivicAuth must be used within CivicAuthProvider');
  }
  return context;
};

const wagmiConfig = createConfig({
  chains: [mainnet, sepolia, polygon],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
    [polygon.id]: http(),
  },
  connectors: [],
});

interface CivicAuthProviderProps {
  children: React.ReactNode;
}

export const CivicAuthProvider: React.FC<CivicAuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<CivicUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [walletCreationInProgress, setWalletCreationInProgress] = useState(false);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  const signIn = async () => {
    console.log('Civic sign in - implementation pending');
  };

  const signOut = async () => {
    setUser(null);
  };

  const createWallet = async () => {
    setWalletCreationInProgress(true);
    try {
      console.log('Creating wallet - implementation pending');
    } finally {
      setWalletCreationInProgress(false);
    }
  };

  const isAuthenticated = !!user;

  const value: CivicAuthContextType = {
    user,
    isAuthenticated,
    isLoading,
    signIn,
    signOut,
    createWallet,
    walletCreationInProgress,
  };

  return (
    <QueryClientProvider client={queryClient}>
      <WagmiProvider config={wagmiConfig}>
        <CivicAuthContext.Provider value={value}>
          {children}
        </CivicAuthContext.Provider>
      </WagmiProvider>
    </QueryClientProvider>
  );
};