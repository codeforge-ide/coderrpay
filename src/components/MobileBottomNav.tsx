'use client';

import { 
  Paper, 
  BottomNavigation, 
  BottomNavigationAction,
  Box,
  useTheme
} from '@mui/material';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { 
  Home,
  AccountTree,
  EmojiEvents,
  AccountBalanceWallet,
  Settings
} from '@mui/icons-material';

const navItems = [
  { label: 'Home', icon: Home, href: '/' },
  { label: 'Projects', icon: AccountTree, href: '/projects' },
  { label: 'Bounties', icon: EmojiEvents, href: '/bounties' },
  { label: 'Wallet', icon: AccountBalanceWallet, href: '/wallet' },
  { label: 'Settings', icon: Settings, href: '/settings' },
];

export default function MobileBottomNav() {
  const pathname = usePathname();
  const theme = useTheme();

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 16,
        left: 16,
        right: 16,
        zIndex: 1000,
      }}
    >
      <Paper
        elevation={8}
        sx={{
          borderRadius: '24px',
          overflow: 'hidden',
          backdropFilter: 'blur(10px)',
          backgroundColor: theme.palette.mode === 'dark' 
            ? 'rgba(45, 30, 19, 0.9)' // Dark brown with transparency
            : 'rgba(255, 255, 255, 0.9)', // Light with transparency
        }}
      >
        <BottomNavigation 
          showLabels 
          value={pathname}
          sx={{
            backgroundColor: 'transparent',
            '& .MuiBottomNavigationAction-root': {
              color: 'text.secondary',
              '&.Mui-selected': {
                color: 'primary.main',
              },
            },
          }}
        >
          {navItems.map((item) => (
            <BottomNavigationAction
              key={item.label}
              label={item.label}
              icon={<item.icon />}
              value={item.href}
              component={Link}
              href={item.href}
              sx={{
                minWidth: 'auto',
                px: 1,
              }}
            />
          ))}
        </BottomNavigation>
      </Paper>
    </Box>
  );
}
