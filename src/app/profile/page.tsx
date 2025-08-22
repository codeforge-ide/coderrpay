'use client';

import { Typography, Container, Toolbar } from '@mui/material';

export default function ProfilePage() {
  return (
    <Container>
      <Toolbar />
      <Typography variant="h4" component="h1" gutterBottom>
        Profile
      </Typography>
    </Container>
  );
}
