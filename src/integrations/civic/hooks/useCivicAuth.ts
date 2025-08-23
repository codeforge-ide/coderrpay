'use client';

import { useState, useCallback } from 'react';
import { CivicUser } from '../types';
import { isCivicEnabled, getWeb3WalletUrl } from '../utils/config';

export const useCivicAuth = () => {
  const [user, setUser] = useState<CivicUser | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [walletCreationInProgress, setWalletCreationInProgress] = useState(false);

  const signInWithGitHub = useCallback(async () => {
    if (!isCivicEnabled()) {
      console.log('Civic not enabled, falling back to Appwrite GitHub OAuth');
      return;
    }

    setIsLoading(true);
    try {
      console.log('Civic GitHub sign in - implementation pending');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const signInWithWallet = useCallback(async () => {
    if (!isCivicEnabled()) {
      const walletUrl = getWeb3WalletUrl();
      window.open(walletUrl, '_blank', 'width=400,height=600');
      return;
    }

    setIsLoading(true);
    try {
      console.log('Civic Web3 wallet sign in - implementation pending');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createWallet = useCallback(async () => {
    if (!user) return;

    setWalletCreationInProgress(true);
    try {
      console.log('Creating embedded wallet - implementation pending');
    } finally {
      setWalletCreationInProgress(false);
    }
  }, [user]);

  const signOut = useCallback(async () => {
    setUser(null);
  }, []);

  return {
    user,
    isAuthenticated: !!user,
    isLoading,
    walletCreationInProgress,
    signInWithGitHub,
    signInWithWallet,
    createWallet,
    signOut,
  };
};