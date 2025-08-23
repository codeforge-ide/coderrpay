'use client';

import React, { createContext, useContext, useEffect, ReactNode } from 'react';
import { useThemeStore } from '@/store/useThemeStore';

const ThemeContext = createContext<{
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
  toggleTheme: () => void;
} | null>(null);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const { theme, setTheme, toggleTheme } = useThemeStore();

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      <div className={`theme-provider ${theme}`}>
        <div className="background-grid" />
        <div className="content-wrapper">
          {children}
        </div>
      </div>
    </ThemeContext.Provider>
  );
};