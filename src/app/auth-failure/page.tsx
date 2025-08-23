'use client';

import { useEffect } from 'react';
import { Box, Typography, Button, Alert } from '@mui/material';
import { useRouter } from 'next/navigation';

export default function AuthFailurePage() {
  const router = useRouter();

  useEffect(() => {
    // Auto-redirect after 5 seconds
    const timer = setTimeout(() => {
      router.push('/');
    }, 5000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        p: 3,
      }}
    >
      <Alert severity="error" sx={{ mb: 3, maxWidth: 400 }}>
        <Typography variant="h6" gutterBottom>
          Authentication Failed
        </Typography>
        <Typography variant="body2">
          There was an error during the authentication process. Please try again.
        </Typography>
      </Alert>
      
      <Button 
        variant="contained" 
        onClick={() => router.push('/')}
        sx={{ mt: 2 }}
      >
        Return to Home
      </Button>
      
      <Typography variant="caption" sx={{ mt: 2, textAlign: 'center' }}>
        You will be automatically redirected in 5 seconds.
      </Typography>
    </Box>
  );
}