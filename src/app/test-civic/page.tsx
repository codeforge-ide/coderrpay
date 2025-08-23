'use client';

import { Typography, Box, Button } from '@mui/material';
import { UserButton } from '@civic/auth/react';
import { useCivicAuth } from '@/integrations/civic/providers/CivicAuthProvider';

export default function TestCivicPage() {
  const { user, isAuthenticated, isLoading, signIn } = useCivicAuth();

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Civic Auth Test
      </Typography>
      
      <Typography variant="body1" sx={{ mb: 2 }}>
        Loading: {isLoading ? 'Yes' : 'No'}
      </Typography>
      
      <Typography variant="body1" sx={{ mb: 2 }}>
        Authenticated: {isAuthenticated ? 'Yes' : 'No'}
      </Typography>
      
      {user && (
        <Box sx={{ mb: 2 }}>
          <Typography variant="h6">User Info:</Typography>
          <pre>{JSON.stringify(user, null, 2)}</pre>
        </Box>
      )}
      
      <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
        <UserButton />
        <Button onClick={signIn} variant="contained">
          Manual Sign In
        </Button>
      </Box>
    </Box>
  );
}