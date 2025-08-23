'use client';

import { 
  Box, 
  IconButton, 
  Slide, 
  useTheme,
  Skeleton,
  Paper
} from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { ReactNode, useState } from 'react';

interface PageDrawerProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  loading?: boolean;
}

export default function PageDrawer({ open, onClose, title, children, loading = false }: PageDrawerProps) {
  const theme = useTheme();

  return (
    <Slide direction="down" in={open} mountOnEnter unmountOnExit>
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 1200,
          backgroundColor: theme.palette.background.default,
        }}
      >
        {/* Header with back button */}
        <Paper
          elevation={0}
          sx={{
            position: 'sticky',
            top: 0,
            backgroundColor: theme.palette.background.paper,
            borderBottom: `1px solid ${theme.palette.divider}`,
            zIndex: 1,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              px: 2,
              py: 1.5,
              minHeight: 64,
            }}
          >
            <IconButton
              onClick={onClose}
              sx={{ 
                mr: 2,
                color: theme.palette.text.primary,
              }}
            >
              <ArrowBack />
            </IconButton>
            
            <Box
              component="h1"
              sx={{
                fontSize: '1.25rem',
                fontWeight: 600,
                color: theme.palette.text.primary,
                margin: 0,
              }}
            >
              {title}
            </Box>
          </Box>
        </Paper>

        {/* Content */}
        <Box
          sx={{
            flex: 1,
            overflow: 'auto',
            p: 2,
          }}
        >
          {loading ? (
            <PageDrawerSkeleton />
          ) : (
            children
          )}
        </Box>
      </Box>
    </Slide>
  );
}

function PageDrawerSkeleton() {
  return (
    <Box sx={{ space: 2 }}>
      <Skeleton variant="rectangular" width="100%" height={200} sx={{ mb: 2 }} />
      <Skeleton variant="text" width="60%" height={40} sx={{ mb: 1 }} />
      <Skeleton variant="text" width="80%" height={30} sx={{ mb: 1 }} />
      <Skeleton variant="text" width="70%" height={30} sx={{ mb: 3 }} />
      
      <Skeleton variant="rectangular" width="100%" height={120} sx={{ mb: 2 }} />
      <Skeleton variant="text" width="50%" height={30} sx={{ mb: 1 }} />
      <Skeleton variant="text" width="90%" height={30} sx={{ mb: 1 }} />
      
      <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
        <Skeleton variant="rectangular" width={100} height={40} />
        <Skeleton variant="rectangular" width={100} height={40} />
      </Box>
    </Box>
  );
}