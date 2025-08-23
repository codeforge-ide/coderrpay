'use client';

import { Box, useMediaQuery, useTheme } from '@mui/material';
import { useState } from 'react';
import DesktopSidebar from './DesktopSidebar';
import MobileBottomNav from './MobileBottomNav';
import TopBar from './TopBar';
import PageDrawer from './PageDrawer';
import MessagesDrawerContent from './MessagesDrawerContent';
import WalletDrawerContent from './WalletDrawerContent';
import SettingsDrawerContent from './SettingsDrawerContent';
import AppThemeProvider from './AppThemeProvider';
import AuthDrawer from './AuthDrawer';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';

const drawerWidth = 320;

function LayoutContent({ children }: { children: React.ReactNode }) {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  const { showAuthDrawer, setShowAuthDrawer } = useAuth();
  
  // Drawer states
  const [messagesOpen, setMessagesOpen] = useState(false);
  const [walletOpen, setWalletOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  const handleAuthSuccess = () => {
    setShowAuthDrawer(false);
  };

  const handleLoginClick = () => {
    setShowAuthDrawer(true);
  };

  return (
    <>
      {/* Top Bar - shown on all devices */}
      <TopBar
        onMessagesClick={() => setMessagesOpen(true)}
        onWalletClick={() => setWalletOpen(true)}
        onSettingsClick={() => setSettingsOpen(true)}
        onLoginClick={handleLoginClick}
      />

      <Box sx={{ display: 'flex', minHeight: '100vh', pt: '80px' }}>
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

      {/* Page Drawers */}
      <PageDrawer
        open={messagesOpen}
        onClose={() => setMessagesOpen(false)}
        title="Messages"
      >
        <MessagesDrawerContent />
      </PageDrawer>

      <PageDrawer
        open={walletOpen}
        onClose={() => setWalletOpen(false)}
        title="Wallet"
      >
        <WalletDrawerContent />
      </PageDrawer>

      <PageDrawer
        open={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        title="Settings"
      >
        <SettingsDrawerContent />
      </PageDrawer>

      <AuthDrawer
        open={showAuthDrawer}
        onClose={() => setShowAuthDrawer(false)}
        onAuthSuccess={handleAuthSuccess}
      />
    </>
  );
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <AppThemeProvider>
      <AuthProvider>
        <LayoutContent>{children}</LayoutContent>
      </AuthProvider>
    </AppThemeProvider>
  );
}
