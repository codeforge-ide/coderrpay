'use client';

import React, { useState } from 'react';
import { Box, Typography, Button, Tab, Tabs, Card, CardContent } from '@mui/material';
import ProtectedRoute from '@/components/ProtectedRoute';

export default function GrantsPage() {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  return (
    <ProtectedRoute requireAuth>
      <Box maxWidth="960px" width="100%" sx={{ p: 4 }}>
        {/* Header */}
        <Box pb={3}>
          <Typography variant="h3" sx={{ color: 'text.primary', fontWeight: 'bold' }}>
            My Grants
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>
            Manage your grant applications and funding
          </Typography>
        </Box>

        {/* Tabs */}
        <Box pb={3}>
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            textColor="inherit"
            sx={{
              borderBottom: 1,
              borderColor: 'divider',
              '& .MuiTabs-indicator': {
                backgroundColor: 'text.primary',
              },
            }}
          >
            <Tab label="Applications" sx={{ textTransform: 'none', color: 'text.primary' }} />
            <Tab label="Funding Opportunities" sx={{ textTransform: 'none', color: 'text.primary' }} />
            <Tab label="Received Funds" sx={{ textTransform: 'none', color: 'text.primary' }} />
          </Tabs>
        </Box>

        {/* Active Applications Section */}
        <Box py={2}>
          <Typography variant="h6" sx={{ color: 'text.primary', fontWeight: 'bold', mb: 2 }}>
            Active Applications
          </Typography>
          <Card>
            <CardContent sx={{ textAlign: 'center', p: 4 }}>
              <Typography variant="h6" sx={{ color: 'text.primary', mb: 1 }}>
                No active applications
              </Typography>
              <Typography sx={{ color: 'text.secondary', mb: 2 }}>
                You haven't submitted any grant applications yet. Browse funding opportunities to get started.
              </Typography>
              <Button variant="contained">Browse Opportunities</Button>
            </CardContent>
          </Card>
        </Box>

        {/* Past Applications Section */}
        <Box py={2}>
          <Typography variant="h6" sx={{ color: 'text.primary', fontWeight: 'bold', mb: 2 }}>
            Past Applications
          </Typography>
          <Card>
            <CardContent sx={{ textAlign: 'center', p: 4 }}>
              <Typography variant="h6" sx={{ color: 'text.primary', mb: 1 }}>
                No past applications
              </Typography>
              <Typography sx={{ color: 'text.secondary', mb: 2 }}>
                You haven't submitted any grant applications yet. Browse funding opportunities to get started.
              </Typography>
              <Button variant="contained">Browse Opportunities</Button>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </ProtectedRoute>
  );
}