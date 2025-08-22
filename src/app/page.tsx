'use client';

import { Typography, Container, Toolbar } from '@mui/material';

export default function Home() {
  return (
    <Container>
      <Toolbar />
      <Typography variant="h4" component="h1" gutterBottom>
        Welcome to Coderrpay
      </Typography>
      <Typography variant="body1">
        This is the beginning of a beautiful application. You can navigate using the sidebar on desktop or the bottom bar on mobile.
      </Typography>
    </Container>
  );
}
