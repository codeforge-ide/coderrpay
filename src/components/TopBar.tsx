'use client';

import { 
  AppBar, 
  Toolbar, 
  Box, 
  IconButton, 
  useTheme,
  alpha
} from '@mui/material';
import { 
  Message, 
  AccountBalanceWallet,
  Notifications
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
  const isDark = theme.palette.mode === 'dark';

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        background: isDark
          ? 'linear-gradient(135deg, rgba(30, 41, 59, 0.95) 0%, rgba(51, 65, 85, 0.95) 100%)'
          : 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.95) 100%)',
        backdropFilter: 'blur(20px) saturate(180%)',
        borderBottom: isDark
          ? '1px solid rgba(248, 250, 252, 0.08)'
          : '1px solid rgba(15, 23, 42, 0.08)',
        boxShadow: isDark
          ? '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.05)'
          : '0 8px 32px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.8)',
        zIndex: 1100,
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 2, md: 4 }, minHeight: 70 }}>
        {/* Logo with 3D effect */}
        <Box 
          sx={{ 
            display: 'flex', 
            alignItems: 'center',
            gap: 2,
          }}
        >
          <Box
            sx={{
              position: 'relative',
              width: 48,
              height: 48,
              borderRadius: '14px',
              background: isDark
                ? 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)'
                : 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
              boxShadow: isDark
                ? '0 8px 24px rgba(59, 130, 246, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
                : '0 8px 24px rgba(37, 99, 235, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: isDark
                  ? '0 12px 32px rgba(59, 130, 246, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
                  : '0 12px 32px rgba(37, 99, 235, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.5)',
              },
            }}
          >
            <Image
              src="/logo.jpg"
              alt="CoderRPay"
              width={48}
              height={48}
              style={{ borderRadius: '14px' }}
            />
          </Box>
        </Box>

        {/* Action Icons with 3D buttons */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconButton
            onClick={onMessagesClick}
            sx={{ 
              width: 44,
              height: 44,
              borderRadius: '12px',
              background: isDark
                ? 'linear-gradient(145deg, #1e293b, #334155)'
                : 'linear-gradient(145deg, #ffffff, #f8fafc)',
              border: isDark
                ? '1px solid rgba(248, 250, 252, 0.05)'
                : '1px solid rgba(15, 23, 42, 0.08)',
              boxShadow: isDark
                ? '0 4px 12px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.05)'
                : '0 4px 12px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.8)',
              color: theme.palette.text.primary,
              transition: 'all 0.2s ease',
              '&:hover': {
                transform: 'translateY(-2px)',
                background: isDark
                  ? 'linear-gradient(145deg, #334155, #475569)'
                  : 'linear-gradient(145deg, #f8fafc, #f1f5f9)',
                boxShadow: isDark
                  ? '0 8px 20px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.08)'
                  : '0 8px 20px rgba(0, 0, 0, 0.12), inset 0 1px 0 rgba(255, 255, 255, 1)',
              },
              '&:active': {
                transform: 'translateY(0)',
              },
            }}
          >
            <Message />
          </IconButton>

          <IconButton
            onClick={() => {}}
            sx={{ 
              width: 44,
              height: 44,
              borderRadius: '12px',
              background: isDark
                ? 'linear-gradient(145deg, #1e293b, #334155)'
                : 'linear-gradient(145deg, #ffffff, #f8fafc)',
              border: isDark
                ? '1px solid rgba(248, 250, 252, 0.05)'
                : '1px solid rgba(15, 23, 42, 0.08)',
              boxShadow: isDark
                ? '0 4px 12px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.05)'
                : '0 4px 12px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.8)',
              color: theme.palette.text.primary,
              transition: 'all 0.2s ease',
              '&:hover': {
                transform: 'translateY(-2px)',
                background: isDark
                  ? 'linear-gradient(145deg, #334155, #475569)'
                  : 'linear-gradient(145deg, #f8fafc, #f1f5f9)',
                boxShadow: isDark
                  ? '0 8px 20px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.08)'
                  : '0 8px 20px rgba(0, 0, 0, 0.12), inset 0 1px 0 rgba(255, 255, 255, 1)',
              },
              '&:active': {
                transform: 'translateY(0)',
              },
            }}
          >
            <Notifications />
          </IconButton>
          
          <IconButton
            onClick={onWalletClick}
            sx={{ 
              width: 44,
              height: 44,
              borderRadius: '12px',
              background: isDark
                ? 'linear-gradient(145deg, #1e293b, #334155)'
                : 'linear-gradient(145deg, #ffffff, #f8fafc)',
              border: isDark
                ? '1px solid rgba(248, 250, 252, 0.05)'
                : '1px solid rgba(15, 23, 42, 0.08)',
              boxShadow: isDark
                ? '0 4px 12px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.05)'
                : '0 4px 12px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.8)',
              color: theme.palette.text.primary,
              transition: 'all 0.2s ease',
              '&:hover': {
                transform: 'translateY(-2px)',
                background: isDark
                  ? 'linear-gradient(145deg, #334155, #475569)'
                  : 'linear-gradient(145deg, #f8fafc, #f1f5f9)',
                boxShadow: isDark
                  ? '0 8px 20px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.08)'
                  : '0 8px 20px rgba(0, 0, 0, 0.12), inset 0 1px 0 rgba(255, 255, 255, 1)',
              },
              '&:active': {
                transform: 'translateY(0)',
              },
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