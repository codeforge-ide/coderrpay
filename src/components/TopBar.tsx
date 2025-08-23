'use client';

import { 
  AppBar, 
  Toolbar, 
  Box, 
  IconButton, 
  useTheme 
} from '@mui/material';
import { 
  Message, 
  AccountBalanceWallet
} from '@mui/icons-material';
import Image from 'next/image';
import AccountMenu from './AccountMenu';

interface TopBarProps {
  onMessagesClick: () => void;
  onWalletClick: () => void;
  onSettingsClick: () => void;
  onLoginClick: () => void;
}

export default function TopBar({ onMessagesClick, onWalletClick, onSettingsClick, onLoginClick }: TopBarProps) {
  const theme = useTheme();

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        backgroundColor: 'transparent',
        backdropFilter: 'blur(10px)',
        borderBottom: 'none',
        zIndex: 1100,
        left: 16,
        right: 16,
        top: 16,
        width: 'calc(100% - 32px)',
        borderRadius: '12px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between', px: 3 }}>
        {/* Logo */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Image
            src="/logo.jpg"
            alt="CoderRPay"
            width={40}
            height={40}
            style={{ borderRadius: '8px' }}
          />
        </Box>

        {/* Action Icons */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconButton
            onClick={onMessagesClick}
            sx={{ 
              color: theme.palette.text.primary,
              '&:hover': { backgroundColor: theme.palette.action.hover }
            }}
          >
            <Message />
          </IconButton>
          
          <IconButton
            onClick={onWalletClick}
            sx={{ 
              color: theme.palette.text.primary,
              '&:hover': { backgroundColor: theme.palette.action.hover }
            }}
          >
            <AccountBalanceWallet />
          </IconButton>
          
          <AccountMenu onSettingsClick={onSettingsClick} onLoginClick={onLoginClick} />
        </Box>
      </Toolbar>
    </AppBar>
  );
}