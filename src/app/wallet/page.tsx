'use client';

import { Typography, Container, Toolbar } from '@mui/material';
import ProtectedRoute from '@/components/ProtectedRoute';

export default function WalletPage() {
  return (
    <ProtectedRoute requireAuth>
      <Container>
        <Toolbar />
        <Typography variant="h4" component="h1" gutterBottom>
          Wallet
        </Typography>
      </Container>
    </ProtectedRoute>
  );
}
