'use client';

import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Chip,
  CircularProgress,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  AccountBalanceWallet,
  ContentCopy,
  OpenInNew,
  Add,
} from '@mui/icons-material';
import { useTurnkey } from '../providers/TurnkeyProvider';
import { formatAddress } from '../lib/stacks';

interface TurnkeyWalletCardProps {
  showCreateButton?: boolean;
  compact?: boolean;
}

export const TurnkeyWalletCard: React.FC<TurnkeyWalletCardProps> = ({
  showCreateButton = true,
  compact = false,
}) => {
  const { wallet, isLoading, createWallet } = useTurnkey();

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 3 }}>
            <CircularProgress />
          </Box>
        </CardContent>
      </Card>
    );
  }

  if (!wallet && !showCreateButton) {
    return null;
  }

  return (
    <Card>
      <CardContent sx={{ p: compact ? 2 : 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: wallet ? 2 : 0 }}>
          <AccountBalanceWallet sx={{ mr: 1, color: 'primary.main' }} />
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            sBTC Wallet
          </Typography>
          {wallet && (
            <Chip
              label="Connected"
              color="success"
              size="small"
              sx={{ ml: 'auto' }}
            />
          )}
        </Box>

        {!wallet ? (
          <Box>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Create an embedded wallet powered by Turnkey to send and receive sBTC on Stacks testnet.
            </Typography>
            <Button
              variant="contained"
              onClick={createWallet}
              startIcon={<Add />}
              fullWidth={compact}
            >
              Create sBTC Wallet
            </Button>
          </Box>
        ) : (
          <Box>
            <Box sx={{ mb: 2 }}>
              <Typography variant="caption" color="text.secondary" sx={{ mb: 0.5, display: 'block' }}>
                Stacks Address:
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography
                  variant="body2"
                  sx={{
                    fontFamily: 'monospace',
                    flex: 1,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {compact ? formatAddress(wallet.stacksAddress, 8) : wallet.stacksAddress}
                </Typography>
                <Tooltip title="Copy address">
                  <IconButton
                    size="small"
                    onClick={() => handleCopy(wallet.stacksAddress)}
                  >
                    <ContentCopy fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>

            <Box sx={{ 
              p: 2, 
              bgcolor: 'action.hover', 
              borderRadius: 1,
              mb: 2 
            }}>
              <Typography variant="caption" color="text.secondary">
                Balance
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: 700, mt: 0.5 }}>
                0.00000000 sBTC
              </Typography>
              <Typography variant="caption" color="text.secondary">
                ≈ $0.00 USD
              </Typography>
            </Box>

            {!compact && (
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button
                  variant="outlined"
                  size="small"
                  startIcon={<OpenInNew />}
                  href={`https://explorer.hiro.so/address/${wallet.stacksAddress}?chain=testnet`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View on Explorer
                </Button>
              </Box>
            )}
          </Box>
        )}
      </CardContent>
    </Card>
  );
};
