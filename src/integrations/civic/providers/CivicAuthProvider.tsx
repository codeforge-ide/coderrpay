'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { CivicUser, CivicAuthContextType } from '../types';
import { useUser } from '@civic/auth/react';
import { useAuth } from '@/contexts/AuthContext';

const CivicAuthContext = createContext<CivicAuthContextType | null>(null);

export const useCivicAuth = () => {
  const context = useContext(CivicAuthContext);
  if (!context) {
    throw new Error('useCivicAuth must be used within CivicAuthProvider');
  }
  return context;
};

interface CivicAuthProviderProps {
  children: React.ReactNode;
}

export const CivicAuthProvider: React.FC<CivicAuthProviderProps> = ({ children }) => {
  const civicUser = useUser(); // Get user from Civic
  const { loginWithCivic } = useAuth(); // Get Appwrite auth methods
  const [isLoading, setIsLoading] = useState(false);
  const [walletCreationInProgress, setWalletCreationInProgress] = useState(false);

  // Handle Civic user changes
  useEffect(() => {
    if (civicUser.user && !civicUser.isLoading) {
      handleCivicAuth(civicUser.user);
    }
  }, [civicUser.user, civicUser.isLoading]);

  const handleCivicAuth = async (user: any) => {
    if (!user || isLoading) return;
    
    setIsLoading(true);
    try {
      // Map Civic user to our format
      const mappedUser: CivicUser = {
        id: user.id || user.sub || 'unknown',
        email: user.email || '',
        name: user.name || user.username || 'Unknown',
        phone: (user as any).phone,
        walletAddress: (user as any).ethereum?.address || (user as any).wallet?.address,
        avatar: (user as any).image || (user as any).picture,
      };

      // Authenticate with Appwrite using custom token
      await loginWithCivic(mappedUser);
    } catch (error) {
      console.error('Error handling Civic auth:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const signIn = async () => {
    setIsLoading(true);
    try {
      // The signIn will be handled by Civic components
      console.log('Civic sign in triggered');
    } catch (error) {
      console.error('Civic sign in error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    try {
      // The signOut will be handled by Civic components
      console.log('Civic sign out triggered');
    } catch (error) {
      console.error('Civic sign out error:', error);
    }
  };

  const createWallet = async () => {
    setWalletCreationInProgress(true);
    try {
      // This would trigger wallet creation flow in Civic
      console.log('Creating wallet - implementation pending');
    } finally {
      setWalletCreationInProgress(false);
    }
  };

  const isAuthenticated = !!civicUser.user && !civicUser.isLoading;

  const value: CivicAuthContextType = {
    user: civicUser.user ? {
      id: civicUser.user.id || (civicUser.user as any).sub || 'unknown',
      email: civicUser.user.email || '',
      name: civicUser.user.name || (civicUser.user as any).username || 'Unknown',
      phone: (civicUser.user as any).phone,
      walletAddress: (civicUser.user as any).ethereum?.address || (civicUser.user as any).wallet?.address,
      avatar: (civicUser.user as any).image || (civicUser.user as any).picture,
    } : null,
    isAuthenticated,
    isLoading: civicUser.isLoading || isLoading,
    signIn,
    signOut,
    createWallet,
    walletCreationInProgress,
  };

  return (
    <CivicAuthContext.Provider value={value}>
      {children}
    </CivicAuthContext.Provider>
  );
};