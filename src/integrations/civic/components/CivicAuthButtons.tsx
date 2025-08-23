'use client';

import React from 'react';
import { Button, Box } from '@mui/material';
import { GitHub, AccountBalanceWallet } from '@mui/icons-material';
import { useUser } from '@civic/auth/react';

interface CivicAuthButtonsProps {
  variant?: 'outlined' | 'contained';
  fullWidth?: boolean;
  onAuthSuccess?: () => void;
  onClose?: () => void; // Add close callback
}

export const CivicAuthButtons: React.FC<CivicAuthButtonsProps> = ({
  variant = 'outlined',
  fullWidth = true,
  onAuthSuccess,
  onClose,
}) => {
  const { user, signIn, isLoading } = useUser();

  const handleSignIn = async () => {
    try {
      // Close the auth modal first so Civic's overlay appears on top
      onClose?.();
      await signIn();
      onAuthSuccess?.();
    } catch (error) {
      console.error('Civic auth error:', error);
    }
  };

  const handleWeb3WalletClick = () => {
    // Close the auth modal and open Web3 wallet onboarding
    onClose?.();
    window.open('https://wallet.web3lancer.website/onboarding', '_blank', 'width=500,height=700,scrollbars=yes,resizable=yes');
  };

  // If user is already authenticated, don't show buttons
  if (user) {
    return null;
  }

  return (
    <Box sx={{ display: 'flex', gap: 2 }}>
      <Button
        fullWidth={fullWidth}
        variant={variant}
        startIcon={<GitHub />}
        onClick={handleSignIn}
        disabled={isLoading}
        sx={{ py: 1.5 }}
      >
        GitHub
      </Button>
      <Button
        fullWidth={fullWidth}
        variant={variant}
        startIcon={<AccountBalanceWallet />}
        onClick={handleWeb3WalletClick}
        disabled={isLoading}
        sx={{ py: 1.5 }}
      >
        Web3 Wallet
      </Button>
    </Box>
  );
};