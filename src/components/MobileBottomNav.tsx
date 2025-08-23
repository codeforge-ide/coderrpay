'use client';

import { 
  Paper, 
  BottomNavigation, 
  BottomNavigationAction,
  Box,
  useTheme,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useState } from 'react';
import { 
  Home,
  AccountTree,
  EmojiEvents,
  RssFeed,
  MoreHoriz,
  Code,
  MonetizationOn,
  Business,
  Explore
} from '@mui/icons-material';

const navItems = [
  { label: 'Home', icon: Home, href: '/' },
  { label: 'Feed', icon: RssFeed, href: '/feed' },
  { label: 'Projects', icon: AccountTree, href: '/projects' },
  { label: 'Bounties', icon: EmojiEvents, href: '/bounties' },
];

const moreItems = [
  { label: 'Hackathons', icon: Code, href: '/hackathons' },
  { label: 'Grants', icon: MonetizationOn, href: '/grants' },
  { label: 'Organizations', icon: Business, href: '/organizations' },
];

export default function MobileBottomNav() {
  const pathname = usePathname();
  const theme = useTheme();
  const [moreAnchorEl, setMoreAnchorEl] = useState<null | HTMLElement>(null);

  const handleMoreClick = (event: React.MouseEvent<HTMLElement>) => {
    setMoreAnchorEl(event.currentTarget);
  };

  const handleMoreClose = () => {
    setMoreAnchorEl(null);
  };

  return (
    <>
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
            
            <BottomNavigationAction
              label="More"
              icon={<MoreHoriz />}
              onClick={handleMoreClick}
              sx={{
                minWidth: 'auto',
                px: 1,
              }}
            />
          </BottomNavigation>
        </Paper>
      </Box>

      {/* More Menu */}
      <Menu
        anchorEl={moreAnchorEl}
        open={Boolean(moreAnchorEl)}
        onClose={handleMoreClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        sx={{
          '& .MuiPaper-root': {
            borderRadius: '16px',
            minWidth: 200,
          }
        }}
      >
        {moreItems.map((item) => (
          <MenuItem
            key={item.label}
            component={Link}
            href={item.href}
            onClick={handleMoreClose}
            sx={{ py: 1.5, px: 2 }}
          >
            <ListItemIcon sx={{ minWidth: 36 }}>
              <item.icon sx={{ fontSize: 20 }} />
            </ListItemIcon>
            <ListItemText primary={item.label} />
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
