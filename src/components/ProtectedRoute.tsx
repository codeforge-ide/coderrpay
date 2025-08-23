'use client';

import { useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAuth?: boolean;
}

export default function ProtectedRoute({ children, requireAuth = false }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading, setShowAuthDrawer } = useAuth();

  useEffect(() => {
    if (!isLoading && requireAuth && !isAuthenticated) {
      setShowAuthDrawer(true);
    }
  }, [isAuthenticated, isLoading, requireAuth, setShowAuthDrawer]);

  if (isLoading) {
    return null; // or loading component
  }

  if (requireAuth && !isAuthenticated) {
    return null; // Auth drawer will be shown
  }

  return <>{children}</>;
}