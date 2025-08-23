'use client';

import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';
import { useThemeStore } from '@/store/useThemeStore';
import { useMemo } from 'react';

interface AppThemeProviderProps {
  children: React.ReactNode;
}

export default function AppThemeProvider({ children }: AppThemeProviderProps) {
  const { theme: currentTheme } = useThemeStore();

  const theme = useMemo(() => createTheme({
    palette: {
      mode: currentTheme,
      primary: {
        main: '#b35919',
        light: '#d4763e',
        dark: '#8a430e',
        contrastText: '#ffffff',
      },
      secondary: {
        main: currentTheme === 'light' ? '#6d5c4d' : '#b7a99e',
        light: currentTheme === 'light' ? '#9a8976' : '#e8ddd5',
        dark: currentTheme === 'light' ? '#463b30' : '#87796b',
        contrastText: currentTheme === 'light' ? '#ffffff' : '#000000',
      },
      background: {
        default: currentTheme === 'light' ? '#f5f3f0' : '#171411', // Brownish white for light
        paper: currentTheme === 'light' ? '#ffffff' : '#382f29',
      },
      text: {
        primary: currentTheme === 'light' ? '#2d2d2d' : '#ffffff',
        secondary: currentTheme === 'light' ? '#5f5f5f' : '#b7a99e',
      },
      divider: currentTheme === 'light' ? 'rgba(181, 89, 25, 0.12)' : 'rgba(255, 255, 255, 0.12)',
      action: {
        hover: currentTheme === 'light' ? 'rgba(181, 89, 25, 0.04)' : 'rgba(255, 255, 255, 0.04)',
        selected: currentTheme === 'light' ? 'rgba(181, 89, 25, 0.08)' : 'rgba(255, 255, 255, 0.08)',
      },
    },
    typography: {
      fontFamily: '"Manrope", "Noto Sans", "Roboto", "Helvetica", "Arial", sans-serif',
      h1: {
        fontSize: '2rem',
        fontWeight: 800,
        lineHeight: 1.2,
      },
      h2: {
        fontSize: '1.75rem',
        fontWeight: 700,
        lineHeight: 1.2,
      },
      h3: {
        fontSize: '1.5rem',
        fontWeight: 700,
        lineHeight: 1.3,
      },
      h4: {
        fontSize: '1.25rem',
        fontWeight: 700,
        lineHeight: 1.3,
      },
      h5: {
        fontSize: '1.125rem',
        fontWeight: 600,
        lineHeight: 1.4,
      },
      h6: {
        fontSize: '1rem',
        fontWeight: 600,
        lineHeight: 1.4,
      },
      body1: {
        fontSize: '1rem',
        fontWeight: 400,
        lineHeight: 1.5,
      },
      body2: {
        fontSize: '0.875rem',
        fontWeight: 400,
        lineHeight: 1.5,
      },
    },
    components: {
      MuiDrawer: {
        styleOverrides: {
          paper: {
            backgroundColor: currentTheme === 'light' ? '#f9f7f4' : '#2a211c',
            borderRight: currentTheme === 'light' ? '1px solid rgba(181, 89, 25, 0.12)' : '1px solid rgba(255, 255, 255, 0.12)',
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            textTransform: 'none',
            fontWeight: 600,
          },
          contained: {
            boxShadow: 'none',
            '&:hover': {
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
            },
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            borderRadius: 16,
            fontSize: '0.75rem',
          },
        },
      },
      MuiListItemButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            margin: '2px 0',
            '&.Mui-selected': {
              backgroundColor: '#b35919',
              color: '#ffffff',
              '& .MuiListItemIcon-root': {
                color: '#ffffff',
              },
              '&:hover': {
                backgroundColor: '#8a430e',
              },
            },
          },
        },
      },
    },
    shape: {
      borderRadius: 8,
    },
  }), [currentTheme]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="background-grid" />
      {children}
    </ThemeProvider>
  );
}
