'use client';

import React, { useState, useEffect } from 'react';
import { 
  Typography, 
  Box, 
  Card, 
  CardContent, 
  Button,
  Avatar,
  IconButton,
  Skeleton
} from '@mui/material';
import { 
  MonetizationOn,
  Code,
  GitHub,
  MoreVert
} from '@mui/icons-material';
import { useAppStore } from '@/store/useAppStore';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const { totalEarned, activeSponsorships, hackathonsParticipated, recentActivity } = useAppStore();

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'sponsorship':
        return <MonetizationOn sx={{ color: 'text.primary' }} />;
      case 'hackathon':
        return <Code sx={{ color: 'text.primary' }} />;
      case 'connection':
        return <GitHub sx={{ color: 'text.primary' }} />;
      default:
        return <MonetizationOn sx={{ color: 'text.primary' }} />;
    }
  };

  return (
    <Box>
      {/* Page Header */}
      <Box sx={{ mb: 4 }}>
        <Typography 
          variant="h1" 
          sx={{ 
            fontSize: '2rem',
            fontWeight: 700,
            color: 'text.primary',
            letterSpacing: '-0.015em'
          }}
        >
          Dashboard
        </Typography>
      </Box>

      {/* Overview Section */}
      <Typography 
        variant="h3" 
        sx={{ 
          fontSize: '1.125rem',
          fontWeight: 700,
          color: 'text.primary',
          mb: 2,
          mt: 4
        }}
      >
        Overview
      </Typography>

      {isLoading ? (
        <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
          {[1, 2, 3].map((i) => (
            <Card key={i} sx={{ flex: 1, minWidth: 158 }}>
              <CardContent sx={{ p: 3 }}>
                <Skeleton height={24} width="60%" sx={{ mb: 1 }} />
                <Skeleton height={32} width="40%" />
              </CardContent>
            </Card>
          ))}
        </Box>
      ) : (
        <Box sx={{ display: 'flex', gap: 2, mb: 4, flexWrap: 'wrap' }}>
          <Card sx={{ flex: 1, minWidth: 158 }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="body1" sx={{ color: 'text.primary', mb: 1, fontWeight: 500 }}>
                Total Earned
              </Typography>
              <Typography 
                variant="h4" 
                sx={{ 
                  color: 'text.primary',
                  fontWeight: 700,
                  fontSize: '1.5rem',
                  letterSpacing: '-0.01em'
                }}
              >
                ${totalEarned.toLocaleString()}
              </Typography>
            </CardContent>
          </Card>

          <Card sx={{ flex: 1, minWidth: 158 }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="body1" sx={{ color: 'text.primary', mb: 1, fontWeight: 500 }}>
                Active Sponsorships
              </Typography>
              <Typography 
                variant="h4" 
                sx={{ 
                  color: 'text.primary',
                  fontWeight: 700,
                  fontSize: '1.5rem',
                  letterSpacing: '-0.01em'
                }}
              >
                {activeSponsorships}
              </Typography>
            </CardContent>
          </Card>

          <Card sx={{ flex: 1, minWidth: 158 }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="body1" sx={{ color: 'text.primary', mb: 1, fontWeight: 500 }}>
                Hackathons Participated
              </Typography>
              <Typography 
                variant="h4" 
                sx={{ 
                  color: 'text.primary',
                  fontWeight: 700,
                  fontSize: '1.5rem',
                  letterSpacing: '-0.01em'
                }}
              >
                {hackathonsParticipated}
              </Typography>
            </CardContent>
          </Card>
        </Box>
      )}

      {/* Recent Activity Section */}
      <Typography 
        variant="h3" 
        sx={{ 
          fontSize: '1.125rem',
          fontWeight: 700,
          color: 'text.primary',
          mb: 2,
          mt: 4
        }}
      >
        Recent Activity
      </Typography>

      {isLoading ? (
        <Box sx={{ mb: 4 }}>
          {[1, 2, 3].map((i) => (
            <Box key={i} sx={{ display: 'grid', gridTemplateColumns: '40px 1fr', gap: 1, mb: 3 }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', pt: 1 }}>
                <Skeleton variant="circular" width={24} height={24} />
                {i < 3 && <Box sx={{ width: '1.5px', height: 16, backgroundColor: 'divider', mt: 0.5 }} />}
              </Box>
              <Box sx={{ py: 1 }}>
                <Skeleton height={20} width="80%" sx={{ mb: 0.5 }} />
                <Skeleton height={16} width="40%" />
              </Box>
            </Box>
          ))}
        </Box>
      ) : (
        <Box sx={{ mb: 4 }}>
          {recentActivity.map((activity, index) => (
            <Box key={activity.id} sx={{ display: 'grid', gridTemplateColumns: '40px 1fr', gap: 1 }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', pt: 1.5 }}>
                {getActivityIcon(activity.type)}
                {index < recentActivity.length - 1 && (
                  <Box sx={{ 
                    width: '1.5px', 
                    height: 16, 
                    backgroundColor: 'divider',
                    mt: 0.5,
                    flexGrow: 1 
                  }} />
                )}
              </Box>
              <Box sx={{ py: 1.5 }}>
                <Typography 
                  variant="body1" 
                  sx={{ 
                    color: 'text.primary',
                    fontWeight: 500,
                    mb: 0.5
                  }}
                >
                  {activity.title}
                </Typography>
                <Typography 
                  variant="body2" 
                  sx={{ color: 'text.secondary' }}
                >
                  {activity.description}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      )}

    </Box>
  );
}
