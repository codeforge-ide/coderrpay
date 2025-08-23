'use client';

import { 
  Drawer, 
  List, 
  ListItem, 
  ListItemButton, 
  ListItemIcon, 
  ListItemText, 
  Avatar,
  Typography,
  Button,
  Box
} from '@mui/material';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { 
  Home,
  Favorite,
  Code,
  MonetizationOn,
  AccountBalanceWallet,
  Settings,
  Explore,
  EmojiEvents,
  Business,
  AccountTree,
  Login
} from '@mui/icons-material';
import { useAuth } from '@/contexts/AuthContext';

const drawerWidth = 320;

const navItems = [
  { text: 'Home', icon: Home, href: '/', requireAuth: false },
  { text: 'Discover', icon: Explore, href: '/discover', requireAuth: false },
  { text: 'Sponsorships', icon: Favorite, href: '/sponsorships', requireAuth: true },
  { text: 'Hackathons', icon: Code, href: '/hackathons', requireAuth: true },
  { text: 'Grants', icon: MonetizationOn, href: '/grants', requireAuth: true },
  { text: 'Bounties', icon: EmojiEvents, href: '/bounties', requireAuth: true },
  { text: 'Projects', icon: AccountTree, href: '/projects', requireAuth: true },
  { text: 'Organizations', icon: Business, href: '/organizations', requireAuth: true },
  { text: 'Wallet', icon: AccountBalanceWallet, href: '/wallet', requireAuth: true },
  { text: 'Settings', icon: Settings, href: '/settings', requireAuth: true },
];

export default function DesktopSidebar() {
  const pathname = usePathname();
  const { isAuthenticated, setShowAuthDrawer } = useAuth();

  const handleProtectedNavigation = (item: typeof navItems[0]) => {
    if (item.requireAuth && !isAuthenticated) {
      setShowAuthDrawer(true);
      return;
    }
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': { 
          width: drawerWidth,
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          minHeight: '700px',
          p: 2,
        },
      }}
    >
      <Box>
        {/* Logo Section */}
        <Box sx={{ 
          display: 'flex', 
          gap: 1.5, 
          alignItems: 'center',
          mb: 3,
          mt: 1
        }}>
          <Avatar 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuA0gOqBL0VzSyvjURKBux-Z9KkXt1cxaCUddSWnXZkm9I8Fast_eJiF4uoFnkef4NMYzF1c734QWhUliRKVeGEc_9kz-n_ZQMFStyQUSSX8gReph3vZLL43L_OtYUtI8-wMrJjawoCZ_0aRunRCYSjUWNVcVgs9KJ3mPinKECMlckwTxJY2DVAfQtPO5sAVeOYWfM4b81xjyNqq1ygYFJDB5hPpI-6ZXLfaNiAnTP0vo7HMW4FGWPqRRvCyaplVAKt7jBk7hmFvIr8"
            sx={{ width: 40, height: 40 }}
          />
          <Typography 
            variant="h6" 
            component="h1" 
            sx={{ 
              fontWeight: 500,
              fontSize: '1rem',
              color: 'text.primary'
            }}
          >
            CoderPay
          </Typography>
        </Box>

        {/* Navigation List */}
        <List sx={{ p: 0 }}>
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const IconComponent = item.icon;
            const isDisabled = item.requireAuth && !isAuthenticated;
            
            return (
              <ListItem key={item.text} disablePadding sx={{ mb: 0.25 }}>
                <ListItemButton
                  component={item.requireAuth && !isAuthenticated ? 'div' : Link}
                  href={item.requireAuth && !isAuthenticated ? undefined : item.href}
                  selected={isActive}
                  onClick={() => handleProtectedNavigation(item)}
                  disabled={isDisabled}
                  sx={{
                    borderRadius: 2,
                    px: 1.5,
                    py: 1,
                    opacity: isDisabled ? 0.5 : 1,
                    cursor: isDisabled ? 'pointer' : 'default',
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 36 }}>
                    <IconComponent sx={{ fontSize: 24 }} />
                  </ListItemIcon>
                  <ListItemText 
                    primary={item.text}
                    sx={{
                      '& .MuiTypography-root': {
                        fontSize: '0.875rem',
                        fontWeight: 500,
                      }
                    }}
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Box>

      {/* Action Button */}
      {isAuthenticated ? (
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{
            py: 1.5,
            fontWeight: 700,
            fontSize: '0.875rem',
            letterSpacing: '0.015em',
          }}
        >
          New
        </Button>
      ) : (
        <Button
          variant="contained"
          color="primary"
          fullWidth
          startIcon={<Login />}
          onClick={() => setShowAuthDrawer(true)}
          sx={{
            py: 1.5,
            fontWeight: 700,
            fontSize: '0.875rem',
            letterSpacing: '0.015em',
          }}
        >
          Sign In
        </Button>
      )}
    </Drawer>
  );
}
