'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { TurnkeyUser, TurnkeyWallet } from '../types';
import { deriveStacksAddress } from '../lib/stacks';
import { useAuth } from '@/contexts/AuthContext';

interface TurnkeyContextType {
  user: TurnkeyUser | null;
  wallet: TurnkeyWallet | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  createWallet: () => Promise<void>;
  signTransaction: (txHex: string) => Promise<string>;
  logout: () => void;
}

const TurnkeyContext = createContext<TurnkeyContextType | undefined>(undefined);

interface TurnkeyProviderProps {
  children: ReactNode;
}

export const TurnkeyProvider: React.FC<TurnkeyProviderProps> = ({ children }) => {
  const [user, setUser] = useState<TurnkeyUser | null>(null);
  const [wallet, setWallet] = useState<TurnkeyWallet | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasCheckedAuth, setHasCheckedAuth] = useState(false);

  useEffect(() => {
    // Initialize Turnkey and check for existing session
    initializeTurnkey();
  }, []);

  // Auto-create wallet if user is authenticated but has no wallet
  useEffect(() => {
    if (!isLoading && hasCheckedAuth && user && !wallet) {
      createWallet().catch(error => {
        console.error('Auto wallet creation failed:', error);
      });
    }
  }, [isLoading, hasCheckedAuth, user, wallet]);

  const initializeTurnkey = async () => {
    try {
      setIsLoading(true);
      
      // Check for stored user session
      const storedUser = localStorage.getItem('turnkey_user');
      if (storedUser) {
        const userData = JSON.parse(storedUser);
        setUser(userData);
        
        // Load wallet if exists
        const storedWallet = localStorage.getItem('turnkey_wallet');
        if (storedWallet) {
          setWallet(JSON.parse(storedWallet));
        }
      }
    } catch (error) {
      console.error('Failed to initialize Turnkey:', error);
    } finally {
      setIsLoading(false);
      setHasCheckedAuth(true);
    }
  };

  const createWallet = async () => {
    try {
      setIsLoading(true);

      // For demo purposes, create a mock user and wallet
      // In production, this would use actual Turnkey SDK
      const mockUserId = `user_${Date.now()}`;
      const mockOrgId = `org_${Date.now()}`;
      
      // Generate a mock public key (in production, this comes from Turnkey)
      const mockPublicKey = '04' + Array.from({ length: 64 }, () => 
        Math.floor(Math.random() * 16).toString(16)
      ).join('');
      
      // Derive Stacks address from public key
      let stacksAddress: string;
      try {
        stacksAddress = deriveStacksAddress(mockPublicKey);
      } catch (error) {
        // Fallback to mock address for demo
        stacksAddress = 'ST' + Array.from({ length: 39 }, () => 
          '0123456789ABCDEFGHJKMNPQRSTVWXYZ'[Math.floor(Math.random() * 33)]
        ).join('');
      }

      const newUser: TurnkeyUser = {
        userId: mockUserId,
        organizationId: mockOrgId,
      };

      const newWallet: TurnkeyWallet = {
        address: `0x${Array.from({ length: 40 }, () => 
          Math.floor(Math.random() * 16).toString(16)
        ).join('')}`,
        stacksAddress,
        publicKey: mockPublicKey,
        walletId: `wallet_${Date.now()}`,
      };

      // Store in localStorage (in production, would use secure storage)
      localStorage.setItem('turnkey_user', JSON.stringify(newUser));
      localStorage.setItem('turnkey_wallet', JSON.stringify(newWallet));

      setUser(newUser);
      setWallet(newWallet);
    } catch (error) {
      console.error('Failed to create wallet:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signTransaction = async (txHex: string): Promise<string> => {
    if (!wallet) {
      throw new Error('No wallet available');
    }

    try {
      // In production, this would use Turnkey SDK to sign the transaction
      // For demo, return a mock signature
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockSignature = Array.from({ length: 128 }, () => 
        Math.floor(Math.random() * 16).toString(16)
      ).join('');

      return mockSignature;
    } catch (error) {
      console.error('Failed to sign transaction:', error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('turnkey_user');
    localStorage.removeItem('turnkey_wallet');
    setUser(null);
    setWallet(null);
  };

  const value: TurnkeyContextType = {
    user,
    wallet,
    isLoading,
    isAuthenticated: !!user,
    createWallet,
    signTransaction,
    logout,
  };

  return (
    <TurnkeyContext.Provider value={value}>
      {children}
    </TurnkeyContext.Provider>
  );
};

export const useTurnkey = (): TurnkeyContextType => {
  const context = useContext(TurnkeyContext);
  if (context === undefined) {
    throw new Error('useTurnkey must be used within a TurnkeyProvider');
  }
  return context;
};
