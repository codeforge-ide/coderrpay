'use client';

import { Typography, Container, Toolbar, Card, CardContent, Box } from '@mui/material';

export default function HackathonsPage() {
  return (
    <Container>
      <Toolbar />
      <Typography variant="h4" component="h1" gutterBottom sx={{ color: 'text.primary' }}>
        Hackathons
      </Typography>
      <Box sx={{ display: 'grid', gap: 3, gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}>
        {[...Array(3)].map((_, index) => (
          <Card key={index}>
            <CardContent>
              <Typography variant="h6" component="h2" sx={{ color: 'text.primary', mb: 1 }}>
                Hackathon #{index + 1}
              </Typography>
              <Typography sx={{ color: 'text.secondary' }}>
                This is a placeholder for a hackathon description. More details about the hackathon and its requirements will go here.
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Container>
  );
}
