'use client';

import { Box, useMediaQuery, useTheme } from '@mui/material';
import DesktopSidebar from './DesktopSidebar';
import MobileBottomNav from './MobileBottomNav';
import AppThemeProvider from './AppThemeProvider';

const drawerWidth = 320;

function LayoutContent({ children }: { children: React.ReactNode }) {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {isDesktop && <DesktopSidebar />}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { md: `calc(100% - ${drawerWidth}px)` },
          pb: { xs: '100px', md: 3 },
          maxWidth: '960px',
          mx: 'auto',
        }}
      >
        {children}
      </Box>
      {!isDesktop && <MobileBottomNav />}
    </Box>
  );
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <AppThemeProvider>
      <LayoutContent>{children}</LayoutContent>
    </AppThemeProvider>
  );
}
