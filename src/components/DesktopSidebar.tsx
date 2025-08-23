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

const drawerWidth = 320;

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
      className="fixed left-0 top-0 h-full flex flex-col"
      style={{ 
        width: drawerWidth,
        backgroundColor: 'var(--sidebar-bg)',
        borderRight: '1px solid var(--border-color)'
      }}
    >
      <div className="flex h-full min-h-[700px] flex-col justify-between p-4">
        <div className="flex flex-col gap-4">
          <div className="flex gap-3 items-center">
            <div
              className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10"
              style={{
                backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuA0gOqBL0VzSyvjURKBux-Z9KkXt1cxaCUddSWnXZkm9I8Fast_eJiF4uoFnkef4NMYzF1c734QWhUliRKVeGEc_9kz-n_ZQMFStyQUSSX8gReph3vZLL43L_OtYUtI8-wMrJjawoCZ_0aRunRCYSjUWNVcVgs9KJ3mPinKECMlckwTxJY2DVAfQtPO5sAVeOYWfM4b81xjyNqq1ygYFJDB5hPpI-6ZXLfaNiAnTP0vo7HMW4FGWPqRRvCyaplVAKt7jBk7hmFvIr8")'
              }}
            />
            <h1 className="text-current text-base font-medium leading-normal">CoderPay</h1>
          </div>
          
          <div className="flex flex-col gap-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              const IconComponent = item.icon;
              
              return (
                <Link key={item.text} href={item.href}>
                  <div
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors hover:opacity-80 ${
                      isActive ? '' : ''
                    }`}
                    style={{
                      backgroundColor: isActive ? 'var(--card-bg)' : 'transparent'
                    }}
                  >
                    <IconComponent className="w-6 h-6 text-current" />
                    <p className="text-current text-sm font-medium leading-normal">{item.text}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
        
        <button
          className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 text-white text-sm font-bold leading-normal tracking-[0.015em] hover:opacity-90 transition-opacity"
          style={{ backgroundColor: 'var(--accent-color)' }}
        >
          <span className="truncate">New</span>
        </button>
      </div>
    </div>
  );
}
