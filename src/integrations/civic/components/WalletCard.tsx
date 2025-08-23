'use client';

import React from 'react';
import { Box, Card, CardContent, Typography, Button, Chip } from '@mui/material';
import { AccountBalanceWallet, ContentCopy } from '@mui/icons-material';
import { useCivicAuth } from '../hooks/useCivicAuth';

interface WalletCardProps {
  onCreateWallet?: () => void;
}

export const WalletCard: React.FC<WalletCardProps> = ({ onCreateWallet }) => {
  const { user, createWallet, walletCreationInProgress } = useCivicAuth();

  const handleCopyAddress = (address: string) => {
    navigator.clipboard.writeText(address);
  };

  const handleCreateWallet = async () => {
    await createWallet();
    onCreateWallet?.();
  };

  if (!user) {
    return null;
  }

  const hasWallet = user.ethereum?.address;

  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <AccountBalanceWallet sx={{ mr: 1 }} />
          <Typography variant="h6">Web3 Wallet</Typography>
          {hasWallet && (
            <Chip 
              label="Connected" 
              color="success" 
              size="small" 
              sx={{ ml: 'auto' }} 
            />
          )}
        </Box>

        {!hasWallet ? (
          <Box>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Create a secure embedded wallet to interact with Web3 applications.
            </Typography>
            <Button
              variant="contained"
              onClick={handleCreateWallet}
              disabled={walletCreationInProgress}
              startIcon={<AccountBalanceWallet />}
            >
              {walletCreationInProgress ? 'Creating Wallet...' : 'Create Wallet'}
            </Button>
          </Box>
        ) : (
          <Box>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              Wallet Address:
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography 
                variant="body2" 
                sx={{ 
                  fontFamily: 'monospace',
                  wordBreak: 'break-all',
                  flex: 1 
                }}
              >
                {user.ethereum?.address}
              </Typography>
              <Button
                size="small"
                onClick={() => handleCopyAddress(user.ethereum?.address || '')}
                startIcon={<ContentCopy />}
              >
                Copy
              </Button>
            </Box>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};