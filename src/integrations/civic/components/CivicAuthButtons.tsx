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
      // Use iframe display mode to avoid popup/redirect conflicts
      await signIn("iframe");
      onAuthSuccess?.();
    } catch (error) {
      console.error('Civic auth error:', error);
    }
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
        onClick={handleSignIn}
        disabled={isLoading}
        sx={{ py: 1.5 }}
      >
        Web3 Wallet
      </Button>
    </Box>
  );
};