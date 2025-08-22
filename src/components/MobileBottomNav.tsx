'use client';

import { Paper, BottomNavigation, BottomNavigationAction } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import PersonIcon from '@mui/icons-material/Person';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

const navItems = [
  { label: 'Home', icon: <HomeIcon />, href: '/' },
  { label: 'Projects', icon: <AccountTreeIcon />, href: '/projects' },
  { label: 'Bounties', icon: <MonetizationOnIcon />, href: '/bounties' },
  { label: 'Wallet', icon: <AccountBalanceWalletIcon />, href: '/wallet' },
  { label: 'Profile', icon: <PersonIcon />, href: '/profile' },
];

export default function MobileBottomNav() {
  const pathname = usePathname();

  return (
    <Paper
      sx={{
        position: 'fixed',
        bottom: 16,
        left: 16,
        right: 16,
        borderRadius: '24px', // Rounded corners
        boxShadow: 3,
        overflow: 'hidden', // Ensures the BottomNavigation respects the border radius
      }}
      elevation={3}
    >
      <BottomNavigation showLabels value={pathname}>
        {navItems.map((item) => (
          <BottomNavigationAction
            key={item.label}
            label={item.label}
            icon={item.icon}
            value={item.href}
            component={Link}
            href={item.href}
          />
        ))}
      </BottomNavigation>
    </Paper>
  );
}
