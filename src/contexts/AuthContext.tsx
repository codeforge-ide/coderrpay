'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
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
  login: (user: User) => void;
  loginWithCivic: (civicUser: any) => Promise<void>;
  logout: () => void;
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
    // Check for existing auth state
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = (userData: User) => {
    const userWithProvider = {
      ...userData,
      provider: userData.provider || 'appwrite' as const,
    };
    setUser(userWithProvider);
    localStorage.setItem('user', JSON.stringify(userWithProvider));
  };

  const loginWithCivic = async (civicUser: any) => {
    setIsLoading(true);
    try {
      // Sync Civic user to Appwrite
      await syncCivicUserToAppwrite(civicUser);
      
      // Create custom JWT for authentication
      await createCustomJWTForCivicUser(civicUser);
      
      // Create unified user object
      const unifiedUser: User = {
        id: civicUser.id,
        name: civicUser.name,
        email: civicUser.email,
        avatar: civicUser.avatar,
        provider: 'civic',
        ethereum_address: civicUser.ethereum?.address,
      };
      
      login(unifiedUser);
    } catch (error) {
      console.error('Error logging in with Civic:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated,
      isLoading,
      login,
      loginWithCivic,
      logout,
      showAuthDrawer,
      setShowAuthDrawer,
    }}>
      {children}
    </AuthContext.Provider>
  );
};