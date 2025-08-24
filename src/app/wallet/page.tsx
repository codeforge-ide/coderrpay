'use client';

import { Typography, Container, Toolbar, Card, CardContent, Box, Button } from '@mui/material';
import ProtectedRoute from '@/components/ProtectedRoute';

export default function WalletPage() {
  return (
    <ProtectedRoute requireAuth>
      <Container>
        <Toolbar />
        <Typography variant="h4" component="h1" gutterBottom sx={{ color: 'text.primary' }}>
          Wallet
        </Typography>
        <Card>
          <CardContent>
            <Typography variant="h6" sx={{ color: 'text.primary' }}>
              Current Balance
            </Typography>
            <Typography variant="h3" sx={{ color: 'text.primary', fontWeight: 'bold', my: 2 }}>
              $0.00
            </Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button variant="contained">Deposit</Button>
              <Button variant="outlined">Withdraw</Button>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </ProtectedRoute>
  );
}
