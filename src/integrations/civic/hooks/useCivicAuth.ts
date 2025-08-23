'use client';

import { useState, useCallback } from 'react';
import { CivicUser } from '../types';
import { isCivicEnabled, getWeb3WalletUrl } from '../utils/config';
import { account, OAuthProvider } from '../../../lib/appwrite';

export const useCivicAuth = () => {
  const [user, setUser] = useState<CivicUser | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [walletCreationInProgress, setWalletCreationInProgress] = useState(false);

  const signInWithGitHub = useCallback(async () => {
    setIsLoading(true);
    try {
      console.log('Starting GitHub OAuth via Appwrite');
      // Use Appwrite OAuth for GitHub authentication
      account.createOAuth2Session(
        OAuthProvider.Github,
        `${window.location.origin}`,
        `${window.location.origin}/auth-failure`
      );
    } catch (error) {
      console.error('GitHub auth error:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const signInWithWallet = useCallback(async () => {
    setIsLoading(true);
    try {
      console.log('Opening Web3 wallet fallback');
      const walletUrl = getWeb3WalletUrl();
      window.open(walletUrl, '_blank', 'width=400,height=600');
    } catch (error) {
      console.error('Wallet auth error:', error);
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