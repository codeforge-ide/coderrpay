'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { getAccount } from '../lib/appwrite';
import { sanitizeUsernameFromEmail } from '../utils/sanitizeUsername';

interface AuthContextType {
  user: any;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  sendOtp: (email: string) => Promise<{ userId: string; secret?: string }>;
  verifyOtp: (userId: string, otp: string) => Promise<void>;
  registerWithOtp: (userId: string, otp: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshSession: () => Promise<void>;
  showAuthDrawer: boolean;
  setShowAuthDrawer: React.Dispatch<React.SetStateAction<boolean>>;
}

const AuthContext = createContext<AuthContextType | null>(null);

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showAuthDrawer, setShowAuthDrawer] = useState(false);

  const checkSession = useCallback(async () => {
    try {
      const account = getAccount();
      const currentUser = await account.get();
      const userData = mapAppwriteUserToUser(currentUser);
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
    } catch (_error) {
      setUser(null);
      localStorage.removeItem('user');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    checkSession();
  }, [checkSession]);

  const mapAppwriteUserToUser = (user: any) => user;

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const account = getAccount();
      await account.createEmailPasswordSession(email, password);
      const currentUser = await account.get();
      const userData = mapAppwriteUserToUser(currentUser);
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const account = getAccount();
      try {
        await account.create('unique()', email, password, sanitizeUsernameFromEmail(email));
      } catch (error: any) {
        if (error.code === 409 || error.message?.includes('already exists')) {
          await login(email, password);
          return;
        }
        throw error;
      }
      await login(email, password);
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const sendOtp = async (email: string) => {
    setIsLoading(true);
    try {
      const account = getAccount();
      const response = await account.createEmailToken('unique()', email);
      return { userId: response.userId, secret: response.secret };
    } catch (error) {
      console.error('Send OTP error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const verifyOtp = async (userId: string, otp: string) => {
    setIsLoading(true);
    try {
      // Check if there's already an active session
      try {
        const existingUser = await account.get();
        if (existingUser) {
          const userData = mapAppwriteUserToUser(existingUser);
          setUser(userData);
          localStorage.setItem('user', JSON.stringify(userData));
          return;
        }
      } catch {
        // No existing session, proceed with OTP verification
      }

      // Use createSession with userId and OTP (secret)
      await account.createSession(userId, otp);
      const currentUser = await account.get();
      const userData = mapAppwriteUserToUser(currentUser);
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
    } catch (error) {
      console.error('Verify OTP error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const registerWithOtp = async (userId: string, otp: string) => {
    setIsLoading(true);
    try {
      // For Email OTP, account creation is handled by the sendOtp flow
      // We just need to verify the OTP with the userId
      await verifyOtp(userId, otp);
    } catch (error) {
      console.error('Register with OTP error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const refreshSession = async () => {
    try {
      const currentUser = await account.get();
      setUser(mapAppwriteUserToUser(currentUser));
    } catch (error) {
      setUser(null);
    }
  };

  const logout = async () => {
    try {
      await account.deleteSession('current');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setUser(null);
      localStorage.removeItem('user');
    }
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated,
      isLoading,
      login,
      register,
      sendOtp,
      verifyOtp,
      registerWithOtp,
      logout,
      refreshSession,
      showAuthDrawer,
      setShowAuthDrawer,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, useAuth };