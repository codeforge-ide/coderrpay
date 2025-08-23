'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { account } from '../lib/appwrite';
import { sanitizeUsernameFromEmail } from '../utils/sanitizeUsername';

// Add missing context and necessary state/hooks
interface AuthContextType {
  user: any;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  loginWithCivic: (civicUser: any) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  sendOtp: (email: string) => Promise<void>;
  verifyOtp: (email: string, otp: string) => Promise<void>;
  registerWithOtp: (email: string, otp: string) => Promise<void>;
  logout: () => Promise<void>;
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
  const [isLoading, setIsLoading] = useState(false);
  const [showAuthDrawer, setShowAuthDrawer] = useState(false);

  // Dummy functions to avoid ReferenceError (since you requested syntax only)
  const login = async (email: string, password: string) => {
  setIsLoading(true);
  try {
    await account.createEmailPasswordSession(email, password);
    const currentUser = await account.get();
    setUser(mapAppwriteUserToUser(currentUser));
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  } finally {
    setIsLoading(false);
  }
};
  const syncCivicUserToAppwrite = async (civicUser: any) => {};
  const createCustomJWTForCivicUser = async (civicUser: any) => {};
  const mapAppwriteUserToUser = (user: any) => user;

  const register = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      await account.create('unique()', email, password, sanitizeUsernameFromEmail(email));
      await login(email, password);
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithCivic = async (civicUser: any) => {
    setIsLoading(true);
    try {
      await syncCivicUserToAppwrite(civicUser);
      await createCustomJWTForCivicUser(civicUser);
      const currentUser = await account.get();
      setUser({
        ...mapAppwriteUserToUser(currentUser),
        provider: 'civic',
        ethereum_address: civicUser.ethereum?.address,
      });
    } catch (error) {
      console.error('Error logging in with Civic:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const sendOtp = async (email: string) => {
    setIsLoading(true);
    try {
      await account.createEmailToken('unique()', email);
    } catch (error) {
      console.error('Send OTP error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const verifyOtp = async (email: string, otp: string) => {
    setIsLoading(true);
    try {
      await account.createSession('unique()', otp);
      const currentUser = await account.get();
      setUser(mapAppwriteUserToUser(currentUser));
    } catch (error) {
      console.error('Verify OTP error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const registerWithOtp = async (email: string, otp: string) => {
    setIsLoading(true);
    try {
      await account.create('unique()', email, '', sanitizeUsernameFromEmail(email));
      await verifyOtp(email, otp);
    } catch (error) {
      console.error('Register with OTP error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await account.deleteSession('current');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setUser(null);
    }
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated,
      isLoading,
      login,
      loginWithCivic,
      register,
      sendOtp,
      verifyOtp,
      registerWithOtp,
      logout,
      showAuthDrawer,
      setShowAuthDrawer,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, useAuth };