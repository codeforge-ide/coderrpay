'use client';

import React from 'react';
import { Button, Box } from '@mui/material';
import { GitHub } from '@mui/icons-material';
import { OAuthProvider } from 'appwrite';
import { getAccount } from '@/lib/appwrite';

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
    try {
      const account = getAccount();
      const success = `${window.location.origin}/`;
      const failure = `${window.location.origin}/auth-failure`;
      await account.createOAuth2Session(OAuthProvider.Github, success, failure);
      onAuthSuccess?.();
    } catch (error) {
      console.error('GitHub OAuth error:', error);
    }
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