'use client';

import { useState } from 'react';
import { 
  IconButton, 
  Menu, 
  MenuItem, 
  ListItemIcon, 
  ListItemText, 
  Avatar, 
  Divider,
  Typography,
  Box
} from '@mui/material';
import { 
  AccountCircle, 
  Settings, 
  Person, 
  Logout 
} from '@mui/icons-material';
import { useAuth } from '@/contexts/AuthContext';

interface AccountMenuProps {
  onSettingsClick: () => void;
}

export default function AccountMenu({ onSettingsClick }: AccountMenuProps) {
  const { user, logout, isAuthenticated } = useAuth();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    await logout();
    handleClose();
  };

  const handleSettingsClick = () => {
    onSettingsClick();
    handleClose();
  };

  // Get user initials for avatar
  const getUserInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0).toUpperCase())
      .slice(0, 2)
      .join('');
  };

  if (!isAuthenticated || !user) {
    return null;
  }

  return (
    <>
      <IconButton
        onClick={handleClick}
        size="small"
        sx={{ ml: 2 }}
        aria-controls={open ? 'account-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
      >
        {user.avatar ? (
          <Avatar 
            src={user.avatar} 
            sx={{ width: 32, height: 32 }}
          />
        ) : (
          <Avatar sx={{ width: 32, height: 32, fontSize: '0.875rem' }}>
            {getUserInitials(user.name)}
          </Avatar>
        )}
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              '&:before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {/* User Info */}
        <Box sx={{ px: 2, py: 1.5, borderBottom: '1px solid', borderColor: 'divider' }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
            {user.name}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.75rem' }}>
            {user.email}
          </Typography>
        </Box>

        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Person fontSize="small" />
          </ListItemIcon>
          <ListItemText>Account</ListItemText>
        </MenuItem>
        
        <MenuItem onClick={handleSettingsClick}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          <ListItemText>Settings</ListItemText>
        </MenuItem>
        
        <Divider />
        
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          <ListItemText>Logout</ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
}