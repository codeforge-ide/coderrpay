'use client';

import { Typography, Container, Toolbar, Box, Card, CardContent, Button, Chip } from '@mui/material';
import { OpenInNew, Send, History } from '@mui/icons-material';
import ProtectedRoute from '@/components/ProtectedRoute';
import { TurnkeyWalletCard } from '@/integrations/turnkey';
import { useState, useEffect } from 'react';

export default function WalletPage() {
  const [transactions, setTransactions] = useState<Array<{
    id: string;
    type: string;
    amount: string;
    recipient?: string;
    timestamp: number;
    status: string;
  }>>([]);

  useEffect(() => {
    // Load transaction history
    const history = JSON.parse(localStorage.getItem('tx_history') || '[]');
    setTransactions(history);
  }, []);

  return (
    <ProtectedRoute requireAuth>
      <Container maxWidth="md">
        <Toolbar />
        
        <Typography 
          variant="h4" 
          component="h1" 
          gutterBottom 
          sx={{ 
            color: 'text.primary',
            fontWeight: 700,
            mb: 3
          }}
        >
          Wallet
        </Typography>

        <Box sx={{ mb: 3 }}>
          <TurnkeyWalletCard showCreateButton={true} />
        </Box>

        <Typography 
          variant="h6" 
          sx={{ 
            color: 'text.primary',
            fontWeight: 600,
            mb: 2,
            mt: 4
          }}
        >
          Transaction History
        </Typography>

        {transactions.length === 0 ? (
          <Card>
            <CardContent sx={{ textAlign: 'center', py: 4 }}>
              <History sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
              <Typography variant="body2" color="text.secondary">
                No transactions yet
              </Typography>
            </CardContent>
          </Card>
        ) : (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {transactions.map((tx) => (
              <Card key={tx.id}>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Send sx={{ color: 'primary.main' }} />
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          Sent sBTC
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {new Date(tx.timestamp).toLocaleString()}
                        </Typography>
                      </Box>
                    </Box>
                    <Chip
                      label={tx.status}
                      size="small"
                      color={tx.status === 'confirmed' ? 'success' : 'warning'}
                    />
                  </Box>

                  <Box sx={{ 
                    display: 'grid', 
                    gridTemplateColumns: '1fr 1fr',
                    gap: 2,
                    mb: 2
                  }}>
                    <Box>
                      <Typography variant="caption" color="text.secondary">
                        Amount
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {tx.amount.toFixed(8)} sBTC
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="caption" color="text.secondary">
                        Fee
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {tx.fee.toFixed(8)} sBTC
                      </Typography>
                    </Box>
                  </Box>

                  {tx.blockExplorerUrl && (
                    <Button
                      size="small"
                      startIcon={<OpenInNew />}
                      href={tx.blockExplorerUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View on Explorer
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </Box>
        )}
      </Container>
    </ProtectedRoute>
  );
}

