'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { account } from '../lib/appwrite';
import { sanitizeUsernameFromEmail } from '../utils/sanitizeUsername';
import { Models } from 'appwrite';
import { syncCivicUserToAppwrite, createCustomJWTForCivicUser } from '../integrations/appwrite/civic-auth';

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  provider?: 'appwrite' | 'civic';
  ethereum_address?: string;
}

interface AuthContextType {
  user: User | null;
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
  setShowAuthDrawer: (show: boolean) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showAuthDrawer, setShowAuthDrawer] = useState(false);

  useEffect(() => {
    checkAuthState();
  }, []);

  const checkAuthState = async () => {
    try {
      const currentUser = await account.get();
      setUser(mapAppwriteUserToUser(currentUser));
    } catch (error) {
      // User is not authenticated
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const mapAppwriteUserToUser = (appwriteUser: Models.User<Models.Preferences>): User => ({
    id: appwriteUser.$id,
    name: appwriteUser.name,
    email: appwriteUser.email,
    avatar: (appwriteUser.prefs as any)?.avatar,
    provider: 'appwrite',
    ethereum_address: (appwriteUser.prefs as any)?.ethereum_address,
  });

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

  const register = async (email: string, password: string) => { // name param removed, now uses email as name

    setIsLoading(true);
    try {
      import { sanitizeUsernameFromEmail } from '../utils/sanitizeUsername';
...
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
      // Sync Civic user to Appwrite
      await syncCivicUserToAppwrite(civicUser);
      
      // Create custom JWT for authentication
      await createCustomJWTForCivicUser(civicUser);
      
      // Get the updated user from Appwrite
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
      // For email OTP, we use createEmailToken instead of createPhoneToken
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
      // Create session with email token
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

  const registerWithOtp = async (email: string, otp: string) => { // username param removed, now uses email as name

    setIsLoading(true);
    try {
      // For registration with OTP, we first create the user account
      // Then verify with the OTP to create a session
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