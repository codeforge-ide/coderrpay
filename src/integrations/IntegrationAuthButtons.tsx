'use client';

import React from 'react';
import { CivicAuthButtons, isCivicEnabled } from '../civic';
import { FallbackAuthButtons } from '../fallback/FallbackAuthButtons';

interface IntegrationAuthButtonsProps {
  variant?: 'outlined' | 'contained';
  fullWidth?: boolean;
  onAuthSuccess?: () => void;
}

export const IntegrationAuthButtons: React.FC<IntegrationAuthButtonsProps> = (props) => {
  return isCivicEnabled() ? (
    <CivicAuthButtons {...props} />
  ) : (
    <FallbackAuthButtons {...props} />
  );
};