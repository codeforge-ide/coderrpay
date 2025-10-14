'use client';

import React, { useState, useEffect } from 'react';
import { 
  Typography, 
  Box, 
  Card, 
  CardContent, 
  Skeleton,
  useTheme,
  alpha,
  Chip
} from '@mui/material';
import { 
  MonetizationOn,
  Code,
  GitHub,
  TrendingUp,
  EmojiEvents,
  People
} from '@mui/icons-material';
import { useAppStore } from '@/store/useAppStore';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const { totalEarned, activeSponsorships, hackathonsParticipated, recentActivity } = useAppStore();
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'sponsorship':
        return <MonetizationOn sx={{ fontSize: 20 }} />;
      case 'hackathon':
        return <Code sx={{ fontSize: 20 }} />;
      case 'connection':
        return <GitHub sx={{ fontSize: 20 }} />;
      default:
        return <MonetizationOn sx={{ fontSize: 20 }} />;
    }
  };

  const StatCard = ({ title, value, icon, color }: { title: string; value: string | number; icon: React.ReactNode; color: string }) => (
    <Card
      sx={{
        flex: 1,
        minWidth: { xs: '100%', sm: 200 },
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 4,
          background: color,
        },
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Box
            sx={{
              width: 48,
              height: 48,
              borderRadius: '12px',
              background: isDark
                ? `linear-gradient(135deg, ${alpha(color, 0.2)}, ${alpha(color, 0.1)})`
                : `linear-gradient(135deg, ${alpha(color, 0.15)}, ${alpha(color, 0.05)})`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: color,
              boxShadow: isDark
                ? `0 8px 16px ${alpha(color, 0.2)}`
                : `0 8px 16px ${alpha(color, 0.15)}`,
            }}
          >
            {icon}
          </Box>
        </Box>
        <Typography 
          variant="body2" 
          sx={{ 
            color: 'text.secondary', 
            mb: 0.5,
            fontWeight: 600,
            fontSize: '0.8125rem',
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
          }}
        >
          {title}
        </Typography>
        <Typography 
          variant="h4" 
          sx={{ 
            color: 'text.primary',
            fontWeight: 800,
            fontSize: '2rem',
            letterSpacing: '-0.02em',
            background: isDark
              ? `linear-gradient(135deg, ${theme.palette.text.primary}, ${alpha(theme.palette.text.primary, 0.7)})`
              : `linear-gradient(135deg, ${theme.palette.text.primary}, ${alpha(theme.palette.text.primary, 0.8)})`,
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          {value}
        </Typography>
      </CardContent>
    </Card>
  );

  return (
    <Box sx={{ pb: 4 }}>
      {/* Hero Header */}
      <Box 
        sx={{ 
          mb: 6,
          position: 'relative',
          p: 4,
          borderRadius: 4,
          background: isDark
            ? 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(124, 58, 237, 0.1) 100%)'
            : 'linear-gradient(135deg, rgba(37, 99, 235, 0.05) 0%, rgba(124, 58, 237, 0.05) 100%)',
          border: isDark
            ? '1px solid rgba(59, 130, 246, 0.2)'
            : '1px solid rgba(37, 99, 235, 0.1)',
        }}
      >
        <Typography 
          variant="h1" 
          sx={{ 
            fontSize: { xs: '2rem', md: '2.5rem' },
            fontWeight: 800,
            background: isDark
              ? 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)'
              : 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            letterSpacing: '-0.02em',
            mb: 1,
          }}
        >
          Welcome Back! 👋
        </Typography>
        <Typography 
          variant="body1" 
          sx={{ 
            color: 'text.secondary',
            fontSize: '1.125rem',
          }}
        >
          Here&apos;s what&apos;s happening with your projects today
        </Typography>
      </Box>

      {/* Stats Section */}
      <Typography 
        variant="h5" 
        sx={{ 
          fontWeight: 700,
          color: 'text.primary',
          mb: 3,
          display: 'flex',
          alignItems: 'center',
          gap: 1,
        }}
      >
        <TrendingUp sx={{ color: 'primary.main' }} />
        Overview
      </Typography>

      {isLoading ? (
        <Box sx={{ display: 'flex', gap: 2, mb: 6, flexWrap: 'wrap' }}>
          {[1, 2, 3].map((i) => (
            <Card key={i} sx={{ flex: 1, minWidth: { xs: '100%', sm: 200 } }}>
              <CardContent sx={{ p: 3 }}>
                <Skeleton variant="circular" width={48} height={48} sx={{ mb: 2 }} />
                <Skeleton height={24} width="60%" sx={{ mb: 1 }} />
                <Skeleton height={40} width="80%" />
              </CardContent>
            </Card>
          ))}
        </Box>
      ) : (
        <Box sx={{ display: 'flex', gap: 2, mb: 6, flexWrap: 'wrap' }}>
          <StatCard
            title="Total Earned"
            value={`$${totalEarned.toLocaleString()}`}
            icon={<MonetizationOn sx={{ fontSize: 24 }} />}
            color={theme.palette.success.main}
          />
          <StatCard
            title="Sponsorships"
            value={activeSponsorships}
            icon={<People sx={{ fontSize: 24 }} />}
            color={theme.palette.primary.main}
          />
          <StatCard
            title="Hackathons"
            value={hackathonsParticipated}
            icon={<EmojiEvents sx={{ fontSize: 24 }} />}
            color={theme.palette.warning.main}
          />
        </Box>
      )}

      {/* Recent Activity Section */}
      <Typography 
        variant="h5" 
        sx={{ 
          fontWeight: 700,
          color: 'text.primary',
          mb: 3,
          display: 'flex',
          alignItems: 'center',
          gap: 1,
        }}
      >
        <GitHub sx={{ color: 'primary.main' }} />
        Recent Activity
      </Typography>

      {isLoading ? (
        <Card>
          <CardContent sx={{ p: 3 }}>
            {[1, 2, 3].map((i) => (
              <Box key={i} sx={{ display: 'flex', gap: 2, mb: i < 3 ? 3 : 0 }}>
                <Skeleton variant="circular" width={40} height={40} />
                <Box sx={{ flex: 1 }}>
                  <Skeleton height={24} width="70%" sx={{ mb: 0.5 }} />
                  <Skeleton height={20} width="50%" />
                </Box>
              </Box>
            ))}
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent sx={{ p: 3 }}>
            {recentActivity.map((activity, index) => (
              <Box 
                key={activity.id} 
                sx={{ 
                  display: 'flex',
                  gap: 2,
                  mb: index < recentActivity.length - 1 ? 3 : 0,
                  pb: index < recentActivity.length - 1 ? 3 : 0,
                  borderBottom: index < recentActivity.length - 1 
                    ? `1px solid ${isDark ? 'rgba(248, 250, 252, 0.08)' : 'rgba(15, 23, 42, 0.08)'}`
                    : 'none',
                }}
              >
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: '10px',
                    background: isDark
                      ? 'linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(59, 130, 246, 0.1))'
                      : 'linear-gradient(135deg, rgba(37, 99, 235, 0.1), rgba(37, 99, 235, 0.05))',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: theme.palette.primary.main,
                    flexShrink: 0,
                  }}
                >
                  {getActivityIcon(activity.type)}
                </Box>
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Typography 
                    variant="body1" 
                    sx={{ 
                      color: 'text.primary',
                      fontWeight: 600,
                      mb: 0.5,
                    }}
                  >
                    {activity.title}
                  </Typography>
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      color: 'text.secondary',
                      lineHeight: 1.5,
                    }}
                  >
                    {activity.description}
                  </Typography>
                </Box>
              </Box>
            ))}
          </CardContent>
        </Card>
      )}

    </Box>
  );
}
