'use client';

import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Typography,
  Chip,
  Alert,
  CircularProgress,
  IconButton,
  Stepper,
  Step,
  StepLabel,
  Link,
} from '@mui/material';
import {
  Close,
  CheckCircle,
  OpenInNew,
} from '@mui/icons-material';
import { useTransaction } from '../hooks/useTransaction';
import { useTurnkey } from '../providers/TurnkeyProvider';
import { formatAddress, formatSbtcAmount, getBlockExplorerUrl } from '../lib/stacks';

interface SupportModalProps {
  open: boolean;
  onClose: () => void;
  recipientName: string;
  recipientAddress: string;
  recipientAvatar?: string;
}

const SUGGESTED_AMOUNTS = [0.001, 0.005, 0.01, 0.05];

export const SupportModal: React.FC<SupportModalProps> = ({
  open,
  onClose,
  recipientName,
  recipientAddress,
}) => {
  const { wallet } = useTurnkey();
  const { status, txId, error, sendSbtc, reset } = useTransaction();
  const [amount, setAmount] = useState<string>('0.001');
  const [customAmount, setCustomAmount] = useState('');

  const handleAmountSelect = (value: number) => {
    setAmount(value.toString());
    setCustomAmount('');
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*\.?\d{0,8}$/.test(value)) {
      setCustomAmount(value);
      if (value) {
        setAmount(value);
      }
    }
  };

  const handleSend = async () => {
    const amountNum = parseFloat(amount);
    if (isNaN(amountNum) || amountNum <= 0) {
      return;
    }

    await sendSbtc({
      recipientAddress,
      amount: amountNum,
      recipientName,
    });
  };

  const handleClose = () => {
    reset();
    setAmount('0.001');
    setCustomAmount('');
    onClose();
  };

  const getActiveStep = () => {
    switch (status) {
      case 'idle':
      case 'confirming':
        return 0;
      case 'signing':
        return 1;
      case 'broadcasting':
        return 2;
      case 'success':
      case 'error':
        return 3;
      default:
        return 0;
    }
  };

  const steps = ['Confirm', 'Sign', 'Broadcast', 'Complete'];

  return (
    <Dialog 
      open={open} 
      onClose={status === 'idle' ? handleClose : undefined}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', pb: 2 }}>
        <Typography variant="h6" sx={{ flex: 1, fontWeight: 600 }}>
          Support with sBTC
        </Typography>
        {status === 'idle' && (
          <IconButton onClick={handleClose} size="small">
            <Close />
          </IconButton>
        )}
      </DialogTitle>

      <DialogContent>
        {status !== 'success' && status !== 'error' && (
          <Box sx={{ mb: 3 }}>
            <Stepper activeStep={getActiveStep()} alternativeLabel>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </Box>
        )}

        {status === 'idle' && (
          <>
            <Box sx={{ 
              p: 2, 
              bgcolor: 'action.hover', 
              borderRadius: 2,
              mb: 3,
              textAlign: 'center'
            }}>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                Supporting
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                {recipientName}
              </Typography>
              <Typography 
                variant="caption" 
                color="text.secondary"
                sx={{ fontFamily: 'monospace' }}
              >
                {formatAddress(recipientAddress, 10)}
              </Typography>
            </Box>

            <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
              Select Amount (sBTC)
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
              {SUGGESTED_AMOUNTS.map((value) => (
                <Chip
                  key={value}
                  label={formatSbtcAmount(value)}
                  onClick={() => handleAmountSelect(value)}
                  color={amount === value.toString() && !customAmount ? 'primary' : 'default'}
                  variant={amount === value.toString() && !customAmount ? 'filled' : 'outlined'}
                  clickable
                />
              ))}
            </Box>

            <TextField
              fullWidth
              label="Custom Amount"
              value={customAmount}
              onChange={handleCustomAmountChange}
              placeholder="0.00000000"
              helperText="Enter a custom amount in sBTC"
              type="text"
              inputProps={{
                inputMode: 'decimal',
              }}
            />

            <Box sx={{ 
              mt: 3, 
              p: 2, 
              bgcolor: 'action.hover', 
              borderRadius: 1 
            }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2">Amount:</Typography>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  {formatSbtcAmount(parseFloat(amount) || 0)} sBTC
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2">Network Fee:</Typography>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  ~0.0001 sBTC
                </Typography>
              </Box>
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                pt: 1,
                borderTop: '1px solid',
                borderColor: 'divider'
              }}>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  Total:
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 700 }}>
                  {formatSbtcAmount((parseFloat(amount) || 0) + 0.0001)} sBTC
                </Typography>
              </Box>
            </Box>

            {!wallet && (
              <Alert severity="warning" sx={{ mt: 2 }}>
                Please create a wallet first to send sBTC.
              </Alert>
            )}
          </>
        )}

        {(status === 'confirming' || status === 'signing' || status === 'broadcasting') && (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <CircularProgress size={60} sx={{ mb: 2 }} />
            <Typography variant="h6" sx={{ mb: 1 }}>
              {status === 'confirming' && 'Confirming transaction...'}
              {status === 'signing' && 'Signing with your wallet...'}
              {status === 'broadcasting' && 'Broadcasting to Stacks...'}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Please wait, do not close this window
            </Typography>
          </Box>
        )}

        {status === 'success' && (
          <Box sx={{ textAlign: 'center', py: 3 }}>
            <CheckCircle sx={{ fontSize: 80, color: 'success.main', mb: 2 }} />
            <Typography variant="h5" sx={{ mb: 1, fontWeight: 600 }}>
              Transaction Successful!
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              You&apos;ve successfully supported {recipientName} with {formatSbtcAmount(parseFloat(amount))} sBTC
            </Typography>

            {txId && (
              <Box sx={{ 
                p: 2, 
                bgcolor: 'action.hover', 
                borderRadius: 1,
                mb: 2
              }}>
                <Typography variant="caption" color="text.secondary">
                  Transaction ID
                </Typography>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    fontFamily: 'monospace',
                    wordBreak: 'break-all',
                    my: 1
                  }}
                >
                  {formatAddress(txId, 12)}
                </Typography>
                <Link
                  href={getBlockExplorerUrl(txId)}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ 
                    display: 'inline-flex', 
                    alignItems: 'center',
                    gap: 0.5,
                    mt: 1
                  }}
                >
                  View on Explorer
                  <OpenInNew fontSize="small" />
                </Link>
              </Box>
            )}
          </Box>
        )}

        {status === 'error' && (
          <Box sx={{ textAlign: 'center', py: 3 }}>
            <Alert severity="error" sx={{ mb: 2 }}>
              {error || 'Transaction failed. Please try again.'}
            </Alert>
          </Box>
        )}
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 3 }}>
        {status === 'idle' && (
          <>
            <Button onClick={handleClose}>
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={handleSend}
              disabled={!wallet || !amount || parseFloat(amount) <= 0}
            >
              Send sBTC
            </Button>
          </>
        )}

        {(status === 'success' || status === 'error') && (
          <Button variant="contained" onClick={handleClose} fullWidth>
            Close
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};
