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
        main: currentTheme === 'light' ? '#2563eb' : '#3b82f6',
        light: currentTheme === 'light' ? '#60a5fa' : '#93c5fd',
        dark: currentTheme === 'light' ? '#1e40af' : '#1d4ed8',
        contrastText: '#ffffff',
      },
      secondary: {
        main: currentTheme === 'light' ? '#7c3aed' : '#8b5cf6',
        light: currentTheme === 'light' ? '#a78bfa' : '#c4b5fd',
        dark: currentTheme === 'light' ? '#5b21b6' : '#6d28d9',
        contrastText: '#ffffff',
      },
      success: {
        main: currentTheme === 'light' ? '#10b981' : '#34d399',
        light: currentTheme === 'light' ? '#6ee7b7' : '#86efac',
        dark: currentTheme === 'light' ? '#059669' : '#10b981',
      },
      warning: {
        main: currentTheme === 'light' ? '#f59e0b' : '#fbbf24',
        light: currentTheme === 'light' ? '#fcd34d' : '#fde047',
        dark: currentTheme === 'light' ? '#d97706' : '#f59e0b',
      },
      error: {
        main: currentTheme === 'light' ? '#ef4444' : '#f87171',
        light: currentTheme === 'light' ? '#fca5a5' : '#fecaca',
        dark: currentTheme === 'light' ? '#dc2626' : '#ef4444',
      },
      background: {
        default: currentTheme === 'light' ? '#f8fafc' : '#0f172a',
        paper: currentTheme === 'light' ? '#ffffff' : '#1e293b',
      },
      text: {
        primary: currentTheme === 'light' ? '#0f172a' : '#f8fafc',
        secondary: currentTheme === 'light' ? '#475569' : '#cbd5e1',
      },
      divider: currentTheme === 'light' ? 'rgba(15, 23, 42, 0.08)' : 'rgba(248, 250, 252, 0.08)',
      action: {
        hover: currentTheme === 'light' ? 'rgba(37, 99, 235, 0.04)' : 'rgba(59, 130, 246, 0.08)',
        selected: currentTheme === 'light' ? 'rgba(37, 99, 235, 0.08)' : 'rgba(59, 130, 246, 0.12)',
      },
    },
    typography: {
      fontFamily: '"Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", sans-serif',
      h1: {
        fontSize: '2.5rem',
        fontWeight: 800,
        lineHeight: 1.2,
        letterSpacing: '-0.02em',
      },
      h2: {
        fontSize: '2rem',
        fontWeight: 700,
        lineHeight: 1.2,
        letterSpacing: '-0.01em',
      },
      h3: {
        fontSize: '1.75rem',
        fontWeight: 700,
        lineHeight: 1.3,
        letterSpacing: '-0.01em',
      },
      h4: {
        fontSize: '1.5rem',
        fontWeight: 700,
        lineHeight: 1.3,
      },
      h5: {
        fontSize: '1.25rem',
        fontWeight: 600,
        lineHeight: 1.4,
      },
      h6: {
        fontSize: '1.125rem',
        fontWeight: 600,
        lineHeight: 1.4,
      },
      body1: {
        fontSize: '1rem',
        fontWeight: 400,
        lineHeight: 1.6,
      },
      body2: {
        fontSize: '0.875rem',
        fontWeight: 400,
        lineHeight: 1.6,
      },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            backgroundImage: currentTheme === 'light' 
              ? 'linear-gradient(to bottom right, #f8fafc, #f1f5f9)'
              : 'linear-gradient(to bottom right, #0f172a, #1e293b)',
            backgroundAttachment: 'fixed',
          },
        },
      },
      MuiDrawer: {
        styleOverrides: {
          paper: {
            backgroundColor: currentTheme === 'light' ? 'rgba(255, 255, 255, 0.95)' : 'rgba(30, 41, 59, 0.95)',
            backdropFilter: 'blur(12px)',
            borderRight: currentTheme === 'light' 
              ? '1px solid rgba(15, 23, 42, 0.08)' 
              : '1px solid rgba(248, 250, 252, 0.08)',
            boxShadow: currentTheme === 'light'
              ? '4px 0 24px rgba(0, 0, 0, 0.04)'
              : '4px 0 24px rgba(0, 0, 0, 0.3)',
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 16,
            border: currentTheme === 'light' 
              ? '1px solid rgba(15, 23, 42, 0.08)'
              : '1px solid rgba(248, 250, 252, 0.08)',
            background: currentTheme === 'light'
              ? 'linear-gradient(145deg, #ffffff, #f8fafc)'
              : 'linear-gradient(145deg, #1e293b, #334155)',
            boxShadow: currentTheme === 'light'
              ? '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03), inset 0 1px 0 rgba(255, 255, 255, 0.5)'
              : '0 4px 6px -1px rgba(0, 0, 0, 0.5), 0 2px 4px -1px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: currentTheme === 'light'
                ? '0 12px 24px -4px rgba(0, 0, 0, 0.1), 0 8px 16px -4px rgba(0, 0, 0, 0.06), inset 0 1px 0 rgba(255, 255, 255, 0.5)'
                : '0 12px 24px -4px rgba(0, 0, 0, 0.6), 0 8px 16px -4px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
            },
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            textTransform: 'none',
            fontWeight: 600,
            fontSize: '0.9375rem',
            padding: '10px 20px',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          },
          contained: {
            background: currentTheme === 'light'
              ? 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)'
              : 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
            boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
            '&:hover': {
              background: currentTheme === 'light'
                ? 'linear-gradient(135deg, #1d4ed8 0%, #1e40af 100%)'
                : 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
              transform: 'translateY(-1px)',
              boxShadow: '0 8px 20px rgba(37, 99, 235, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
            },
            '&:active': {
              transform: 'translateY(0)',
            },
          },
          outlined: {
            borderWidth: 2,
            borderColor: currentTheme === 'light' ? '#2563eb' : '#3b82f6',
            '&:hover': {
              borderWidth: 2,
              background: currentTheme === 'light' 
                ? 'rgba(37, 99, 235, 0.04)'
                : 'rgba(59, 130, 246, 0.08)',
              transform: 'translateY(-1px)',
            },
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            fontSize: '0.8125rem',
            fontWeight: 600,
            height: 28,
            border: currentTheme === 'light'
              ? '1px solid rgba(15, 23, 42, 0.08)'
              : '1px solid rgba(248, 250, 252, 0.08)',
            transition: 'all 0.2s ease',
            '&:hover': {
              transform: 'translateY(-1px)',
            },
          },
          filled: {
            background: currentTheme === 'light'
              ? 'linear-gradient(135deg, #f1f5f9, #e2e8f0)'
              : 'linear-gradient(135deg, #334155, #475569)',
          },
        },
      },
      MuiListItemButton: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            margin: '4px 8px',
            transition: 'all 0.2s ease',
            '&.Mui-selected': {
              background: currentTheme === 'light'
                ? 'linear-gradient(135deg, #2563eb, #1d4ed8)'
                : 'linear-gradient(135deg, #3b82f6, #2563eb)',
              color: '#ffffff',
              boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3)',
              '& .MuiListItemIcon-root': {
                color: '#ffffff',
              },
              '&:hover': {
                background: currentTheme === 'light'
                  ? 'linear-gradient(135deg, #1d4ed8, #1e40af)'
                  : 'linear-gradient(135deg, #2563eb, #1d4ed8)',
              },
            },
            '&:hover': {
              background: currentTheme === 'light'
                ? 'rgba(37, 99, 235, 0.08)'
                : 'rgba(59, 130, 246, 0.12)',
              transform: 'translateX(4px)',
            },
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            '& .MuiOutlinedInput-root': {
              borderRadius: 12,
              background: currentTheme === 'light'
                ? 'rgba(255, 255, 255, 0.8)'
                : 'rgba(30, 41, 59, 0.5)',
              transition: 'all 0.2s ease',
              '& fieldset': {
                borderWidth: 2,
                borderColor: currentTheme === 'light'
                  ? 'rgba(15, 23, 42, 0.1)'
                  : 'rgba(248, 250, 252, 0.1)',
              },
              '&:hover fieldset': {
                borderColor: currentTheme === 'light'
                  ? 'rgba(37, 99, 235, 0.3)'
                  : 'rgba(59, 130, 246, 0.3)',
              },
              '&.Mui-focused fieldset': {
                borderWidth: 2,
                borderColor: currentTheme === 'light' ? '#2563eb' : '#3b82f6',
              },
            },
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',
          },
          elevation1: {
            boxShadow: currentTheme === 'light'
              ? '0 1px 3px rgba(0, 0, 0, 0.05)'
              : '0 1px 3px rgba(0, 0, 0, 0.3)',
          },
        },
      },
    },
    shape: {
      borderRadius: 12,
    },
  }), [currentTheme]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
