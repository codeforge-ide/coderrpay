'use client';

import React from 'react';
import DesktopSidebar from './DesktopSidebar';
import MobileBottomNav from './MobileBottomNav';
import { ThemeProvider } from './ThemeProvider';

function LayoutContent({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden md:block fixed left-0 top-0 h-full w-80 z-10">
        <DesktopSidebar />
      </div>
      
      {/* Main Content */}
      <div className="md:ml-80 min-h-screen">
        <main className="p-6 pb-24 md:pb-6">
          {children}
        </main>
      </div>
      
      {/* Mobile Bottom Navigation */}
      <div className="md:hidden">
        <MobileBottomNav />
      </div>
    </>
  );
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <LayoutContent>{children}</LayoutContent>
    </ThemeProvider>
  );
}
