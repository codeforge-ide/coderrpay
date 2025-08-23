'use client';

import React from 'react';
import { Button, Box } from '@mui/material';
import { GitHub, AccountBalanceWallet } from '@mui/icons-material';
import { useCivicAuth } from '../hooks/useCivicAuth';
import { isCivicEnabled } from '../utils/config';

interface CivicAuthButtonsProps {
  variant?: 'outlined' | 'contained';
  fullWidth?: boolean;
  onAuthSuccess?: () => void;
}

export const CivicAuthButtons: React.FC<CivicAuthButtonsProps> = ({
  variant = 'outlined',
  fullWidth = true,
  onAuthSuccess,
}) => {
  const { signInWithGitHub, signInWithWallet, isLoading } = useCivicAuth();

  const handleGitHubAuth = async () => {
    await signInWithGitHub();
    onAuthSuccess?.();
  };

  const handleWalletAuth = async () => {
    await signInWithWallet();
    onAuthSuccess?.();
  };

  if (!isCivicEnabled()) {
    return (
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Button
          fullWidth={fullWidth}
          variant={variant}
          startIcon={<GitHub />}
          onClick={handleGitHubAuth}
          disabled={isLoading}
          sx={{ py: 1.5 }}
        >
          GitHub (Appwrite)
        </Button>
        <Button
          fullWidth={fullWidth}
          variant={variant}
          startIcon={<AccountBalanceWallet />}
          onClick={handleWalletAuth}
          disabled={isLoading}
          sx={{ py: 1.5 }}
        >
          Web3 Wallet
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', gap: 2 }}>
      <Button
        fullWidth={fullWidth}
        variant={variant}
        startIcon={<GitHub />}
        onClick={handleGitHubAuth}
        disabled={isLoading}
        sx={{ py: 1.5 }}
      >
        GitHub
      </Button>
      <Button
        fullWidth={fullWidth}
        variant={variant}
        startIcon={<AccountBalanceWallet />}
        onClick={handleWalletAuth}
        disabled={isLoading}
        sx={{ py: 1.5 }}
      >
        Web3 Wallet
      </Button>
    </Box>
  );
};