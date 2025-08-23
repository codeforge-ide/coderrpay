'use client';

import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  Alert,
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
  const [authMode, setAuthMode] = useState<'password' | 'otp'>('password');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpUserId, setOtpUserId] = useState(''); // Store userId from OTP response
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { login, register, sendOtp, verifyOtp } = useAuth();

  // Clear all sensitive input fields when drawer closes
  const handleClose = () => {
    setEmail('');
    setPassword('');
    setOtp('');
    setOtpSent(false);
    setOtpUserId('');
    setError('');
    setAuthMode('password');
    onClose();
  };

  const handleAuthModeChange = (mode: 'password' | 'otp') => {
    setAuthMode(mode);
    setError('');
    setOtpSent(false);
    setOtp('');
    setOtpUserId(''); // Reset userId when changing modes
  };

  const handleSendOtp = async () => {
    if (!email) {
      setError('Please enter your email address');
      return;
    }
    setIsLoading(true);
    setError('');
    try {
      const response = await sendOtp(email);
      setOtpUserId(response.userId); // Store the userId for verification
      setOtpSent(true);
    } catch (error: any) {
      setError(error.message || 'Failed to send OTP');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    if (authMode === 'password') {
      try {
        await register(email, password);
        onAuthSuccess();
        handleClose();
      } catch (regError: any) {
        if (regError?.code === 409 || (regError?.message && regError.message.toLowerCase().includes('already exists'))) {
          try {
            await login(email, password); // login only needs email, password
            onAuthSuccess();
            handleClose();
          } catch (loginError: any) {
            setError('Invalid credentials. Please check the email and password.');
          }
        } else {
          setError(regError.message || 'Authentication failed');
        }
      } finally {
        setIsLoading(false);
      }
    } else {
      // OTP mode
      try {
        if (!otpSent) {
          const response = await sendOtp(email);
          setOtpUserId(response.userId); // Store the userId for verification
          setOtpSent(true);
        } else {
          await verifyOtp(otpUserId, otp); // Use userId from OTP response
          onAuthSuccess();
          handleClose();
        }
      } catch (error: any) {
        setError(error.message || 'Authentication failed');
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleCivicAuthSuccess = () => {
    onAuthSuccess();
    handleClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
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
            onClick={handleClose}
            sx={{ position: 'absolute', right: 8, top: 8, zIndex: 1 }}
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

          {/* Auth Mode Toggle */}
          <Box sx={{ px: 4, mb: 2 }}>
            <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
              <Button
                variant={authMode === 'password' ? 'contained' : 'outlined'}
                onClick={() => handleAuthModeChange('password')}
                size="small"
                sx={{ flex: 1 }}
              >
                Password
              </Button>
              <Button
                variant={authMode === 'otp' ? 'contained' : 'outlined'}
                onClick={() => handleAuthModeChange('otp')}
                size="small"
                sx={{ flex: 1 }}
              >
                Email OTP
              </Button>
            </Box>
          </Box>

          {/* Auth Form */}
          <Box sx={{ px: 4, pb: 4 }}>
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}
            <form onSubmit={handleSubmit}>
              <Box sx={{ mb: 3 }}>
                <TextField
                  fullWidth
                  label="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  variant="outlined"
                  sx={{ mb: 2 }}
                  required
                />
                {authMode === 'password' ? (
                  <TextField
                    fullWidth
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    variant="outlined"
                    required
                  />
                ) : (
                  <>
                    {otpSent && (
                      <TextField
                        fullWidth
                        label="Enter OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        variant="outlined"
                        placeholder="6-digit code"
                        slotProps={{ htmlInput: { maxLength: 6 } }}
                        required
                        sx={{ mb: 2 }}
                      />
                    )}
                    {otpSent && (
                      <Button
                        variant="text"
                        onClick={handleSendOtp}
                        disabled={isLoading}
                        sx={{ mt: 1 }}
                      >
                        Resend OTP
                      </Button>
                    )}
                  </>
                )}
              </Box>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                sx={{ mb: 3, py: 1.5 }}
                disabled={isLoading}
              >
                {isLoading ? 'Loading...' : (
                  authMode === 'otp' && !otpSent ? 'Send OTP' :
                  authMode === 'otp' && otpSent ? 'Verify OTP' :
                  'Sign In'
                )}
              </Button>
            </form>
            {/* Divider */}
            <Box sx={{ position: 'relative', mb: 3 }}>
              <Box sx={{ height: 1, backgroundColor: 'divider' }} />
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
              <IntegrationAuthButtons 
                onAuthSuccess={handleCivicAuthSuccess} 
                onClose={handleClose}
              />
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
