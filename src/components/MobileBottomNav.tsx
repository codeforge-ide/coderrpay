'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  HomeIcon, 
  ProjectsIcon, 
  BountiesIcon, 
  WalletIcon, 
  SettingsIcon 
} from './Icons';

const navItems = [
  { label: 'Home', icon: HomeIcon, href: '/' },
  { label: 'Projects', icon: ProjectsIcon, href: '/projects' },
  { label: 'Bounties', icon: BountiesIcon, href: '/bounties' },
  { label: 'Wallet', icon: WalletIcon, href: '/wallet' },
  { label: 'Settings', icon: SettingsIcon, href: '/settings' },
];

export default function MobileBottomNav() {
  const pathname = usePathname();

  return (
    <div
      className="fixed bottom-4 left-4 right-4 rounded-3xl shadow-lg z-50"
      style={{ backgroundColor: 'var(--card-bg)' }}
    >
      <div className="flex items-center justify-around py-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const IconComponent = item.icon;
          
          return (
            <Link key={item.label} href={item.href} className="flex-1">
              <div className="flex flex-col items-center py-2 px-1">
                <div
                  className={`p-2 rounded-xl transition-all ${
                    isActive ? 'scale-110' : 'scale-100'
                  }`}
                  style={{
                    backgroundColor: isActive ? 'var(--accent-color)' : 'transparent',
                    color: isActive ? 'white' : 'var(--foreground)'
                  }}
                >
                  <IconComponent className="w-5 h-5" />
                </div>
                <span 
                  className={`text-xs mt-1 transition-colors ${
                    isActive ? 'font-medium' : 'font-normal'
                  }`}
                  style={{ 
                    color: isActive ? 'var(--accent-color)' : 'var(--foreground)'
                  }}
                >
                  {item.label}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
