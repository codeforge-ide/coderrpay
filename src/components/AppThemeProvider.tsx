'use client';

import { ThemeProvider, CssBaseline, useMediaQuery } from '@mui/material';
import { responsiveLightTheme, responsiveDarkTheme } from '../theme';
import { useMemo } from 'react';

export default function AppThemeProvider({ children }: { children: React.ReactNode }) {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const theme = useMemo(
    () => (prefersDarkMode ? responsiveDarkTheme : responsiveLightTheme),
    [prefersDarkMode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
