'use client';

import React from 'react';
import { FallbackAuthButtons } from './fallback/FallbackAuthButtons';

interface IntegrationAuthButtonsProps {
  variant?: 'outlined' | 'contained';
  fullWidth?: boolean;
  onAuthSuccess?: () => void;
  onClose?: () => void;
}

export const IntegrationAuthButtons: React.FC<IntegrationAuthButtonsProps> = (props) => {
  return <FallbackAuthButtons {...props} />;
};