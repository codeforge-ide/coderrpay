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
  AccountTree
} from '@mui/icons-material';

const drawerWidth = 320;

const navItems = [
  { text: 'Home', icon: Home, href: '/' },
  { text: 'Sponsorships', icon: Favorite, href: '/sponsorships' },
  { text: 'Hackathons', icon: Code, href: '/hackathons' },
  { text: 'Grants', icon: MonetizationOn, href: '/grants' },
  { text: 'Wallet', icon: AccountBalanceWallet, href: '/wallet' },
  { text: 'Discover', icon: Explore, href: '/discover' },
  { text: 'Bounties', icon: EmojiEvents, href: '/bounties' },
  { text: 'Organizations', icon: Business, href: '/organizations' },
  { text: 'Projects', icon: AccountTree, href: '/projects' },
  { text: 'Settings', icon: Settings, href: '/settings' },
];

export default function DesktopSidebar() {
  const pathname = usePathname();

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
            
            return (
              <ListItem key={item.text} disablePadding sx={{ mb: 0.25 }}>
                <ListItemButton
                  component={Link}
                  href={item.href}
                  selected={isActive}
                  sx={{
                    borderRadius: 2,
                    px: 1.5,
                    py: 1,
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 36 }}>
                    <IconComponent sx={{ fontSize: 24 }} />
                  </ListItemIcon>
                  <ListItemText 
                    primary={item.text}
                    primaryTypographyProps={{
                      fontSize: '0.875rem',
                      fontWeight: 500,
                    }}
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Box>

      {/* New Button */}
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
    </Drawer>
  );
}
