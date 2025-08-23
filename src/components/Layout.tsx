'use client';

import React from 'react';
import DesktopSidebar from './DesktopSidebar';
import MobileBottomNav from './MobileBottomNav';
import { ThemeProvider } from './ThemeProvider';

function LayoutContent({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <div className="hidden md:block">
        <DesktopSidebar />
      </div>
      
      <main 
        className="flex-1 p-6 md:pl-0"
        style={{ 
          marginLeft: 'clamp(0px, 100vw - 100vw, 320px)',
          paddingLeft: 'max(24px, calc((100vw - 320px - 960px) / 2))',
          paddingBottom: '100px'
        }}
      >
        <div className="md:ml-[320px]">
          {children}
        </div>
      </main>
      
      <div className="md:hidden">
        <MobileBottomNav />
      </div>
    </div>
  );
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <LayoutContent>{children}</LayoutContent>
    </ThemeProvider>
  );
}
