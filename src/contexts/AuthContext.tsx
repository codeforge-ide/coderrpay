'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { account } from '../lib/appwrite';
import { sanitizeUsernameFromEmail } from '../utils/sanitizeUsername';


  
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