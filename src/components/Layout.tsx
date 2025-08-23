'use client';

import { Box, useMediaQuery, useTheme } from '@mui/material';
import DesktopSidebar from './DesktopSidebar';
import MobileBottomNav from './MobileBottomNav';
import AppThemeProvider from './AppThemeProvider';
import AuthDrawer from './AuthDrawer';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';

const drawerWidth = 320;

function LayoutContent({ children }: { children: React.ReactNode }) {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  const { showAuthDrawer, setShowAuthDrawer, login } = useAuth();

  const handleAuthSuccess = () => {
    // Mock user data for demo
    const mockUser = {
      id: '1',
      name: 'CoderPay',
      email: 'coder@example.com',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA0gOqBL0VzSyvjURKBux-Z9KkXt1cxaCUddSWnXZkm9I8Fast_eJiF4uoFnkef4NMYzF1c734QWhUliRKVeGEc_9kz-n_ZQMFStyQUSSX8gReph3vZLL43L_OtYUtI8-wMrJjawoCZ_0aRunRCYSjUWNVcVgs9KJ3mPinKECMlckwTxJY2DVAfQtPO5sAVeOYWfM4b81xjyNqq1ygYFJDB5hPpI-6ZXLfaNiAnTP0vo7HMW4FGWPqRRvCyaplVAKt7jBk7hmFvIr8',
    };
    login(mockUser);
  };

  return (
    <>
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
