'use client';

import React from 'react';
import { Button, Box } from '@mui/material';
import { GitHub, AccountBalanceWallet } from '@mui/icons-material';
import { UserButton } from '@civic/auth/react';
import { useCivicAuth } from '../providers/CivicAuthProvider';
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
  const { signIn, isLoading, isAuthenticated } = useCivicAuth();

  const handleCivicAuth = async () => {
    try {
      await signIn();
      onAuthSuccess?.();
    } catch (error) {
      console.error('Civic auth error:', error);
    }
  };

  if (!isCivicEnabled()) {
    return (
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Button
          fullWidth={fullWidth}
          variant={variant}
          startIcon={<GitHub />}
          onClick={() => console.log('Fallback GitHub auth')}
          disabled={isLoading}
          sx={{ py: 1.5 }}
        >
          GitHub (Fallback)
        </Button>
        <Button
          fullWidth={fullWidth}
          variant={variant}
          startIcon={<AccountBalanceWallet />}
          onClick={() => console.log('Fallback Wallet auth')}
          disabled={isLoading}
          sx={{ py: 1.5 }}
        >
          Web3 Wallet (Fallback)
        </Button>
      </Box>
    );
  }

  // If user is already authenticated with Civic, show user button
  if (isAuthenticated) {
    return <UserButton />;
  }

  // Show Civic auth buttons
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {/* Use Civic's UserButton which handles sign in */}
      <UserButton />
      
      {/* Custom buttons that trigger Civic auth */}
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Button
          fullWidth={fullWidth}
          variant={variant}
          startIcon={<GitHub />}
          onClick={handleCivicAuth}
          disabled={isLoading}
          sx={{ py: 1.5 }}
        >
          GitHub
        </Button>
        <Button
          fullWidth={fullWidth}
          variant={variant}
          startIcon={<AccountBalanceWallet />}
          onClick={handleCivicAuth}
          disabled={isLoading}
          sx={{ py: 1.5 }}
        >
          Web3 Wallet
        </Button>
      </Box>
    </Box>
  );
};