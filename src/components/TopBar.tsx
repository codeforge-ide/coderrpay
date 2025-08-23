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
import { useAuth } from '@/contexts/AuthContext';

interface TopBarProps {
  onMessagesClick: () => void;
  onWalletClick: () => void;
  onSettingsClick: () => void;
}

export default function TopBar({ onMessagesClick, onWalletClick, onSettingsClick }: TopBarProps) {
  const theme = useTheme();
  const { isAuthenticated } = useAuth();

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        backgroundColor: theme.palette.background.paper,
        borderBottom: `1px solid ${theme.palette.divider}`,
        zIndex: 1100,
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
          {isAuthenticated && (
            <>
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
              
              <AccountMenu onSettingsClick={onSettingsClick} />
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}