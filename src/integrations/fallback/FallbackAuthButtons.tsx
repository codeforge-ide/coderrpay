'use client';

import React from 'react';
import { Button, Box } from '@mui/material';
import { GitHub } from '@mui/icons-material';

interface FallbackAuthButtonsProps {
  variant?: 'outlined' | 'contained';
  fullWidth?: boolean;
  onAuthSuccess?: () => void;
  onClose?: () => void;
}

export const FallbackAuthButtons: React.FC<FallbackAuthButtonsProps> = ({
  variant = 'outlined',
  fullWidth = true,
  onAuthSuccess,
}) => {
  const handleGitHubAuth = async () => {
    // TODO: Implement GitHub OAuth via Appwrite
    console.log('GitHub auth via Appwrite OAuth');
    onAuthSuccess?.();
  };

  return (
    <Box>
      <Button
        fullWidth={fullWidth}
        variant={variant}
        startIcon={<GitHub />}
        onClick={handleGitHubAuth}
        sx={{ py: 1.5 }}
      >
        Continue with GitHub
      </Button>
    </Box>
  );
};