'use client';

import React, { useState } from 'react';
import {
  Box,
  Typography,
  Tabs,
  Tab,
  Card,
  CardContent,
  Switch,
  FormControlLabel,
  Avatar,
  TextField,
  Button,
  Chip,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  Divider,
  IconButton,
  Paper,
} from '@mui/material';
import {
  Settings,
  Person,
  LightMode,
  DarkMode,
  Notifications,
  Link as LinkIcon,
  GitHub,
  LinkedIn,
} from '@mui/icons-material';
import { useThemeStore } from '@/store/useThemeStore';

const SettingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'settings' | 'account'>('settings');
  const { theme, toggleTheme } = useThemeStore();

  const handleTabChange = (event: React.SyntheticEvent, newValue: 'settings' | 'account') => {
    setActiveTab(newValue);
  };

  return (
    <Box>
      {/* Page Header */}
      <Box sx={{ mb: 4 }}>
        <Typography 
          variant="h1" 
          sx={{ 
            fontSize: '2rem',
            fontWeight: 700,
            color: 'text.primary',
            letterSpacing: '-0.015em'
          }}
        >
          Settings
        </Typography>
      </Box>

      {/* Tab Navigation */}
      <Paper sx={{ mb: 3, borderRadius: 2 }}>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          variant="fullWidth"
          sx={{
            '& .MuiTab-root': {
              textTransform: 'none',
              fontSize: '0.875rem',
              fontWeight: 500,
              minHeight: 48,
            },
          }}
        >
          <Tab
            icon={<Settings sx={{ fontSize: 20 }} />}
            iconPosition="start"
            label="Settings"
            value="settings"
          />
          <Tab
            icon={<Person sx={{ fontSize: 20 }} />}
            iconPosition="start"
            label="Account"
            value="account"
          />
        </Tabs>
      </Paper>

      {/* Settings Tab */}
      {activeTab === 'settings' && (
        <Box sx={{ space: 3 }}>
          {/* Appearance Section */}
          <Card sx={{ mb: 3 }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                Appearance
              </Typography>

              {/* Theme Switcher */}
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between',
                p: 2,
                borderRadius: 2,
                backgroundColor: 'action.hover',
                mb: 3
              }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  {theme === 'dark' ? (
                    <DarkMode sx={{ color: 'primary.main' }} />
                  ) : (
                    <LightMode sx={{ color: 'primary.main' }} />
                  )}
                  <Box>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      Theme
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Choose your preferred color scheme
                    </Typography>
                  </Box>
                </Box>
                <Switch
                  checked={theme === 'dark'}
                  onChange={toggleTheme}
                  color="primary"
                />
              </Box>

              {/* Theme Preview */}
              <Box>
                <Typography variant="body1" sx={{ mb: 2, fontWeight: 500 }}>
                  Theme Preview
                </Typography>
                <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
                  <Paper
                    sx={{
                      p: 2,
                      border: theme === 'light' ? 2 : 1,
                      borderColor: theme === 'light' ? 'primary.main' : 'divider',
                      backgroundColor: '#f5f3f0',
                      color: '#2d2d2d',
                      cursor: 'pointer',
                      transition: 'border-color 0.2s',
                    }}
                    onClick={() => theme !== 'light' && toggleTheme()}
                  >
                    <Typography variant="caption" sx={{ fontWeight: 600 }}>
                      Light Theme
                    </Typography>
                    <Typography variant="caption" display="block" sx={{ opacity: 0.7 }}>
                      Brownish white background
                    </Typography>
                  </Paper>
                  <Paper
                    sx={{
                      p: 2,
                      border: theme === 'dark' ? 2 : 1,
                      borderColor: theme === 'dark' ? 'primary.main' : 'divider',
                      backgroundColor: '#171411',
                      color: '#ffffff',
                      cursor: 'pointer',
                      transition: 'border-color 0.2s',
                    }}
                    onClick={() => theme !== 'dark' && toggleTheme()}
                  >
                    <Typography variant="caption" sx={{ fontWeight: 600 }}>
                      Dark Theme
                    </Typography>
                    <Typography variant="caption" display="block" sx={{ opacity: 0.7 }}>
                      Dark background
                    </Typography>
                  </Paper>
                </Box>
              </Box>
            </CardContent>
          </Card>

          {/* Notifications Section */}
          <Card>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                Notifications
              </Typography>

              <List sx={{ p: 0 }}>
                <ListItem sx={{ px: 0 }}>
                  <ListItemAvatar>
                    <Avatar sx={{ backgroundColor: 'primary.main' }}>
                      <Notifications />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary="Email Notifications"
                    secondary="Receive updates about hackathons and grants"
                  />
                  <ListItemSecondaryAction>
                    <Switch defaultChecked color="primary" />
                  </ListItemSecondaryAction>
                </ListItem>
                <Divider sx={{ my: 1 }} />
                <ListItem sx={{ px: 0 }}>
                  <ListItemAvatar>
                    <Avatar sx={{ backgroundColor: 'secondary.main' }}>
                      <Notifications />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary="Push Notifications"
                    secondary="Get instant updates on your mobile device"
                  />
                  <ListItemSecondaryAction>
                    <Switch color="primary" />
                  </ListItemSecondaryAction>
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Box>
      )}

      {/* Account Tab */}
      {activeTab === 'account' && (
        <Box sx={{ space: 3 }}>
          {/* Profile Information */}
          <Card sx={{ mb: 3 }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                Profile Information
              </Typography>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                <Avatar
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuA0gOqBL0VzSyvjURKBux-Z9KkXt1cxaCUddSWnXZkm9I8Fast_eJiF4uoFnkef4NMYzF1c734QWhUliRKVeGEc_9kz-n_ZQMFStyQUSSX8gReph3vZLL43L_OtYUtI8-wMrJjawoCZ_0aRunRCYSjUWNVcVgs9KJ3mPinKECMlckwTxJY2DVAfQtPO5sAVeOYWfM4b81xjyNqq1ygYFJDB5hPpI-6ZXLfaNiAnTP0vo7HMW4FGWPqRRvCyaplVAKt7jBk7hmFvIr8"
                  sx={{ width: 64, height: 64 }}
                />
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    CoderPay
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    coder@example.com
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ display: 'grid', gap: 2, mb: 3 }}>
                <TextField
                  fullWidth
                  label="Display Name"
                  defaultValue="CoderPay"
                  variant="outlined"
                />
                <TextField
                  fullWidth
                  label="Email"
                  type="email"
                  defaultValue="coder@example.com"
                  variant="outlined"
                />
                <TextField
                  fullWidth
                  label="Bio"
                  multiline
                  rows={3}
                  defaultValue="Passionate developer working on open source projects and contributing to the developer community."
                  variant="outlined"
                />
              </Box>

              <Button
                variant="contained"
                color="primary"
                sx={{ fontWeight: 600 }}
              >
                Save Changes
              </Button>
            </CardContent>
          </Card>

          {/* Connected Accounts */}
          <Card>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                Connected Accounts
              </Typography>

              <List sx={{ p: 0 }}>
                <ListItem sx={{ px: 0 }}>
                  <ListItemAvatar>
                    <Avatar sx={{ backgroundColor: '#24292e' }}>
                      <GitHub />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary="GitHub"
                    secondary="Connected"
                  />
                  <ListItemSecondaryAction>
                    <Button
                      variant="outlined"
                      color="error"
                      size="small"
                      sx={{ textTransform: 'none' }}
                    >
                      Disconnect
                    </Button>
                  </ListItemSecondaryAction>
                </ListItem>
                <Divider sx={{ my: 1 }} />
                <ListItem sx={{ px: 0 }}>
                  <ListItemAvatar>
                    <Avatar sx={{ backgroundColor: '#0077b5' }}>
                      <LinkedIn />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary="LinkedIn"
                    secondary="Not connected"
                  />
                  <ListItemSecondaryAction>
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      sx={{ textTransform: 'none' }}
                    >
                      Connect
                    </Button>
                  </ListItemSecondaryAction>
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Box>
      )}
    </Box>
  );
};

export default SettingsPage;