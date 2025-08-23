'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  HomeIcon, 
  HeartIcon, 
  CodeIcon, 
  MoneyIcon, 
  WalletIcon,
  SettingsIcon,
  DiscoverIcon,
  BountiesIcon,
  OrganizationsIcon,
  ProjectsIcon
} from './Icons';

const navItems = [
  { text: 'Home', icon: HomeIcon, href: '/' },
  { text: 'Sponsorships', icon: HeartIcon, href: '/sponsorships' },
  { text: 'Hackathons', icon: CodeIcon, href: '/hackathons' },
  { text: 'Grants', icon: MoneyIcon, href: '/grants' },
  { text: 'Wallet', icon: WalletIcon, href: '/wallet' },
  { text: 'Discover', icon: DiscoverIcon, href: '/discover' },
  { text: 'Bounties', icon: BountiesIcon, href: '/bounties' },
  { text: 'Organizations', icon: OrganizationsIcon, href: '/organizations' },
  { text: 'Projects', icon: ProjectsIcon, href: '/projects' },
  { text: 'Settings', icon: SettingsIcon, href: '/settings' },
];

export default function DesktopSidebar() {
  const pathname = usePathname();

  return (
    <div 
      className="h-full flex flex-col p-4"
      style={{ 
        backgroundColor: 'var(--sidebar-bg)',
        borderRight: '1px solid var(--border-color)',
        width: '320px'
      }}
    >
      <div className="flex h-full min-h-[700px] flex-col justify-between">
        <div className="flex flex-col gap-4">
          {/* Logo */}
          <div className="flex gap-3 items-center mb-4">
            <div
              className="w-10 h-10 rounded-full bg-cover bg-center"
              style={{
                backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuA0gOqBL0VzSyvjURKBux-Z9KkXt1cxaCUddSWnXZkm9I8Fast_eJiF4uoFnkef4NMYzF1c734QWhUliRKVeGEc_9kz-n_ZQMFStyQUSSX8gReph3vZLL43L_OtYUtI8-wMrJjawoCZ_0aRunRCYSjUWNVcVgs9KJ3mPinKECMlckwTxJY2DVAfQtPO5sAVeOYWfM4b81xjyNqq1ygYFJDB5hPpI-6ZXLfaNiAnTP0vo7HMW4FGWPqRRvCyaplVAKt7jBk7hmFvIr8")'
              }}
            />
            <h1 
              className="text-base font-medium"
              style={{ color: 'var(--foreground)' }}
            >
              CoderPay
            </h1>
          </div>
          
          {/* Navigation */}
          <div className="flex flex-col gap-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              const IconComponent = item.icon;
              
              return (
                <Link key={item.text} href={item.href}>
                  <div
                    className="flex items-center gap-3 px-3 py-2 rounded-lg transition-all hover:opacity-80 cursor-pointer"
                    style={{
                      backgroundColor: isActive ? 'var(--card-bg)' : 'transparent',
                      color: 'var(--foreground)'
                    }}
                  >
                    <IconComponent className="w-6 h-6" />
                    <p className="text-sm font-medium">{item.text}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
        
        {/* New Button */}
        <button
          className="flex items-center justify-center rounded-lg h-10 px-4 text-white text-sm font-bold transition-opacity hover:opacity-90"
          style={{ backgroundColor: 'var(--accent-color)' }}
        >
          New
        </button>
      </div>
    </div>
  );
}
