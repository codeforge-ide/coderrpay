'use client';

import React from 'react';
import { Button, Alert, Box } from '@mui/material';
import { GitHub, AccountBalanceWallet, Info } from '@mui/icons-material';
import { getWeb3WalletUrl } from '../civic/utils/config';

interface FallbackAuthButtonsProps {
  variant?: 'outlined' | 'contained';
  fullWidth?: boolean;
  onAuthSuccess?: () => void;
}

export const FallbackAuthButtons: React.FC<FallbackAuthButtonsProps> = ({
  variant = 'outlined',
  fullWidth = true,
  onAuthSuccess,
}) => {
  const handleGitHubAuth = async () => {
    console.log('Fallback GitHub auth via Appwrite OAuth');
    onAuthSuccess?.();
  };

  const handleWalletAuth = async () => {
    const walletUrl = getWeb3WalletUrl();
    const popup = window.open(
      walletUrl, 
      'web3wallet', 
      'width=400,height=600,scrollbars=yes,resizable=yes'
    );
    
    // Listen for messages from the wallet popup
    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== new URL(walletUrl).origin) return;
      
      if (event.data.type === 'WALLET_AUTH_SUCCESS') {
        popup?.close();
        onAuthSuccess?.();
      }
    };

    window.addEventListener('message', handleMessage);
    
    // Clean up listener when popup closes
    const checkClosed = setInterval(() => {
      if (popup?.closed) {
        clearInterval(checkClosed);
        window.removeEventListener('message', handleMessage);
      }
    }, 1000);
  };

  return (
    <Box>
      <Alert severity="info" sx={{ mb: 2, fontSize: '0.875rem' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Info fontSize="small" />
          Civic integration is disabled. Using fallback authentication.
        </Box>
      </Alert>
      
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Button
          fullWidth={fullWidth}
          variant={variant}
          startIcon={<GitHub />}
          onClick={handleGitHubAuth}
          sx={{ py: 1.5 }}
        >
          GitHub
        </Button>
        <Button
          fullWidth={fullWidth}
          variant={variant}
          startIcon={<AccountBalanceWallet />}
          onClick={handleWalletAuth}
          sx={{ py: 1.5 }}
        >
          Web3 Wallet
        </Button>
      </Box>
    </Box>
  );
};