'use client';

import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import ExploreIcon from '@mui/icons-material/Explore';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import BusinessIcon from '@mui/icons-material/Business';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import PersonIcon from '@mui/icons-material/Person';
import Link from 'next/link';

const drawerWidth = 240;

const navItems = [
  { text: 'Home', icon: <HomeIcon />, href: '/' },
  { text: 'My Projects', icon: <AccountTreeIcon />, href: '/projects' },
  { text: 'Discover', icon: <ExploreIcon />, href: '/discover' },
  { text: 'Hackathons', icon: <EmojiEventsIcon />, href: '/hackathons' },
  { text: 'Bounties', icon: <MonetizationOnIcon />, href: '/bounties' },
  { text: 'Organizations', icon: <BusinessIcon />, href: '/organizations' },
  { text: 'Wallet', icon: <AccountBalanceWalletIcon />, href: '/wallet' },
  { text: 'Profile', icon: <PersonIcon />, href: '/profile' },
];

export default function DesktopSidebar() {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
      }}
    >
      <Toolbar />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton component={Link} href={item.href}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}
