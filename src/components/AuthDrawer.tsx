'use client';

import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  Box,
  Typography,
  TextField,
  Button,
  Tabs,
  Tab,
  IconButton,
} from '@mui/material';
import { Close } from '@mui/icons-material';
import Image from 'next/image';
import { useAuth } from '../contexts/AuthContext';
import { IntegrationAuthButtons } from '../integrations/IntegrationAuthButtons';

interface AuthDrawerProps {
  open: boolean;
  onClose: () => void;
  onAuthSuccess: () => void;
}

export default function AuthDrawer({ open, onClose, onAuthSuccess }: AuthDrawerProps) {
  const [activeTab, setActiveTab] = useState(0);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const { login } = useAuth();

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate Appwrite authentication
    const mockUser = {
      id: Date.now().toString(),
      name: name || 'Demo User',
      email: email,
      provider: 'appwrite' as const,
    };
    
    login(mockUser);
    onAuthSuccess();
    onClose();
  };

  const handleCivicAuthSuccess = () => {
    onAuthSuccess();
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      slotProps={{
        paper: {
          sx: {
            borderRadius: 3,
            minHeight: '500px',
          },
        },
        backdrop: {
          sx: {
            backdropFilter: 'blur(8px)',
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
          },
        },
      }}
    >
      <DialogContent sx={{ p: 0 }}>
        <Box sx={{ position: 'relative' }}>
          {/* Close Button */}
          <IconButton
            onClick={onClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              zIndex: 1,
            }}
          >
            <Close />
          </IconButton>

          {/* Header */}
          <Box sx={{ p: 4, pb: 2, textAlign: 'center' }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
              <Image
                src="/logo.jpg"
                alt="CoderPay"
                width={64}
                height={64}
                style={{ borderRadius: '16px' }}
              />
            </Box>
            <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
              Welcome to CoderPay
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Join thousands of developers earning through open source
            </Typography>
          </Box>

          {/* Tabs */}
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            centered
            sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}
          >
            <Tab label="Sign In" />
            <Tab label="Sign Up" />
          </Tabs>

          {/* Auth Form */}
          <Box sx={{ px: 4, pb: 4 }}>
            <form onSubmit={handleSubmit}>
              <Box sx={{ mb: 3 }}>
                {activeTab === 1 && (
                  <TextField
                    fullWidth
                    label="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    variant="outlined"
                    sx={{ mb: 2 }}
                  />
                )}
                <TextField
                  fullWidth
                  label="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  variant="outlined"
                  sx={{ mb: 2 }}
                />
                <TextField
                  fullWidth
                  label="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  variant="outlined"
                />
              </Box>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                sx={{ mb: 3, py: 1.5 }}
              >
                {activeTab === 0 ? 'Sign In' : 'Create Account'}
              </Button>
            </form>

            {/* Divider */}
            <Box sx={{ position: 'relative', mb: 3 }}>
              <Box
                sx={{
                  height: 1,
                  backgroundColor: 'divider',
                }}
              />
              <Typography
                variant="body2"
                sx={{
                  position: 'absolute',
                  top: -12,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  backgroundColor: 'background.paper',
                  px: 2,
                  color: 'text.secondary',
                }}
              >
                or continue with
              </Typography>
            </Box>

            {/* Social Auth */}
            <Box sx={{ mb: 2 }}>
              <IntegrationAuthButtons onAuthSuccess={handleCivicAuthSuccess} />
            </Box>

            {/* Footer */}
            <Typography
              variant="body2"
              color="text.secondary"
              align="center"
              sx={{ mt: 3 }}
            >
              By continuing, you agree to our Terms of Service and Privacy Policy
            </Typography>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
}