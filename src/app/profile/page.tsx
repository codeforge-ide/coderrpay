'use client';

import { Typography, Container, Toolbar, Card, CardContent, Box, Avatar, Button } from '@mui/material';
import ProtectedRoute from '@/components/ProtectedRoute';

export default function ProfilePage() {
  return (
    <ProtectedRoute requireAuth>
      <Container>
        <Toolbar />
        <Typography variant="h4" component="h1" gutterBottom sx={{ color: 'text.primary' }}>
          Profile
        </Typography>
        <Card>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
              <Avatar sx={{ width: 80, height: 80 }}>U</Avatar>
              <Box>
                <Typography variant="h5" component="h2" sx={{ color: 'text.primary' }}>
                  User Name
                </Typography>
                <Typography sx={{ color: 'text.secondary' }}>
                  user.name@example.com
                </Typography>
              </Box>
            </Box>
            <Box sx={{ mt: 3 }}>
              <Button variant="contained">Edit Profile</Button>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </ProtectedRoute>
  );
}
