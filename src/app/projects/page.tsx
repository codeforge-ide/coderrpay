'use client';

import { Typography, Container, Toolbar } from '@mui/material';
import ProtectedRoute from '@/components/ProtectedRoute';

export default function ProjectsPage() {
  return (
    <ProtectedRoute requireAuth>
      <Container>
        <Toolbar />
        <Typography variant="h4" component="h1" gutterBottom>
          Projects
        </Typography>
      </Container>
    </ProtectedRoute>
  );
}
