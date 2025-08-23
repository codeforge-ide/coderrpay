'use client';

import { 
  Box, 
  List, 
  ListItem, 
  ListItemText, 
  Switch, 
  Typography, 
  Divider, 
  Card, 
  CardContent,
  Button,
  Avatar
} from '@mui/material';
import { useState } from 'react';
import { useThemeStore } from '@/store/useThemeStore';
import Image from 'next/image';

export default function SettingsDrawerContent() {
  const { theme, toggleTheme } = useThemeStore();
  const isDark = theme === 'dark';
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    hackathons: true,
    grants: true,
    messages: true,
  });

  const handleNotificationChange = (key: keyof typeof notifications) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', p: 2 }}>
      {/* Profile Section */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Avatar sx={{ width: 60, height: 60, mr: 2 }}>
              <Image
                src="/logo.jpg"
                alt="Profile"
                width={60}
                height={60}
                style={{ borderRadius: '50%' }}
              />
            </Avatar>
            <Box>
              <Typography variant="h6">John Doe</Typography>
              <Typography variant="body2" color="text.secondary">
                john.doe@example.com
              </Typography>
            </Box>
          </Box>
          <Button variant="outlined" fullWidth>
            Edit Profile
          </Button>
        </CardContent>
      </Card>

      {/* Theme Settings */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Appearance
          </Typography>
          <ListItem sx={{ px: 0 }}>
            <ListItemText
              primary="Dark Mode"
              secondary="Switch between light and dark themes"
            />
            <Switch
              checked={isDark}
              onChange={toggleTheme}
            />
          </ListItem>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Notifications
          </Typography>
          
          <List sx={{ p: 0 }}>
            <ListItem sx={{ px: 0 }}>
              <ListItemText
                primary="Email Notifications"
                secondary="Receive updates via email"
              />
              <Switch
                checked={notifications.email}
                onChange={() => handleNotificationChange('email')}
              />
            </ListItem>
            
            <Divider />
            
            <ListItem sx={{ px: 0 }}>
              <ListItemText
                primary="Push Notifications"
                secondary="Receive browser notifications"
              />
              <Switch
                checked={notifications.push}
                onChange={() => handleNotificationChange('push')}
              />
            </ListItem>
            
            <Divider />
            
            <ListItem sx={{ px: 0 }}>
              <ListItemText
                primary="Hackathon Updates"
                secondary="Get notified about new hackathons"
              />
              <Switch
                checked={notifications.hackathons}
                onChange={() => handleNotificationChange('hackathons')}
              />
            </ListItem>
            
            <Divider />
            
            <ListItem sx={{ px: 0 }}>
              <ListItemText
                primary="Grant Opportunities"
                secondary="Receive updates about hackathons and grants"
              />
              <Switch
                checked={notifications.grants}
                onChange={() => handleNotificationChange('grants')}
              />
            </ListItem>
            
            <Divider />
            
            <ListItem sx={{ px: 0 }}>
              <ListItemText
                primary="Message Notifications"
                secondary="Get notified about new messages"
              />
              <Switch
                checked={notifications.messages}
                onChange={() => handleNotificationChange('messages')}
              />
            </ListItem>
          </List>
        </CardContent>
      </Card>

      {/* Account Actions */}
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Account
          </Typography>
          
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Button variant="outlined" fullWidth>
              Privacy Settings
            </Button>
            <Button variant="outlined" fullWidth>
              Security
            </Button>
            <Button variant="outlined" color="error" fullWidth>
              Sign Out
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}