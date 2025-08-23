'use client';

import React, { useState } from 'react';
import { useTheme } from '@/components/ThemeProvider';
import { MoonIcon, SunIcon, SettingsIcon, UserIcon } from '@/components/Icons';
import { Skeleton } from '@/components/Skeleton';

const SettingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'settings' | 'account'>('settings');
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="flex flex-col max-w-[960px] flex-1">
      <div className="flex flex-wrap justify-between gap-3 p-4">
        <p className="text-current tracking-light text-[32px] font-bold leading-tight min-w-72">
          Settings
        </p>
      </div>

      <div className="flex border-b" style={{ borderColor: 'var(--border-color)' }}>
        <button
          onClick={() => setActiveTab('settings')}
          className={`flex items-center gap-2 px-4 py-3 font-medium text-sm transition-colors border-b-2 ${
            activeTab === 'settings'
              ? 'border-[var(--accent-color)] text-[var(--accent-color)]'
              : 'border-transparent text-current/70 hover:text-current'
          }`}
        >
          <SettingsIcon className="w-4 h-4" />
          Settings
        </button>
        <button
          onClick={() => setActiveTab('account')}
          className={`flex items-center gap-2 px-4 py-3 font-medium text-sm transition-colors border-b-2 ${
            activeTab === 'account'
              ? 'border-[var(--accent-color)] text-[var(--accent-color)]'
              : 'border-transparent text-current/70 hover:text-current'
          }`}
        >
          <UserIcon className="w-4 h-4" />
          Account
        </button>
      </div>

      <div className="flex-1 p-4">
        {activeTab === 'settings' && (
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-current text-lg font-bold leading-tight tracking-[-0.015em]">
                Appearance
              </h3>
              
              <div className="flex items-center justify-between p-4 rounded-lg" style={{ backgroundColor: 'var(--card-bg)' }}>
                <div className="flex items-center gap-3">
                  {theme === 'dark' ? (
                    <MoonIcon className="w-6 h-6 text-current" />
                  ) : (
                    <SunIcon className="w-6 h-6 text-current" />
                  )}
                  <div>
                    <p className="text-current text-base font-medium leading-normal">
                      Theme
                    </p>
                    <p className="text-current/70 text-sm font-normal leading-normal">
                      Choose your preferred color scheme
                    </p>
                  </div>
                </div>
                
                <button
                  onClick={toggleTheme}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--accent-color)] focus:ring-offset-2 ${
                    theme === 'dark' ? 'bg-[var(--accent-color)]' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      theme === 'dark' ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-lg" style={{ backgroundColor: 'var(--card-bg)' }}>
                <div className="flex-1">
                  <p className="text-current text-base font-medium leading-normal mb-2">
                    Theme Preview
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    <div 
                      className={`p-3 rounded border-2 cursor-pointer transition-colors ${
                        theme === 'light' ? 'border-[var(--accent-color)]' : 'border-transparent'
                      }`}
                      style={{ backgroundColor: '#f5f3f0', color: '#2d2d2d' }}
                      onClick={() => theme !== 'light' && toggleTheme()}
                    >
                      <div className="text-xs font-medium">Light Theme</div>
                      <div className="text-xs opacity-70">Brownish white background</div>
                    </div>
                    <div 
                      className={`p-3 rounded border-2 cursor-pointer transition-colors ${
                        theme === 'dark' ? 'border-[var(--accent-color)]' : 'border-transparent'
                      }`}
                      style={{ backgroundColor: '#171411', color: '#ffffff' }}
                      onClick={() => theme !== 'dark' && toggleTheme()}
                    >
                      <div className="text-xs font-medium">Dark Theme</div>
                      <div className="text-xs opacity-70">Dark background</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-current text-lg font-bold leading-tight tracking-[-0.015em]">
                Notifications
              </h3>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 rounded-lg" style={{ backgroundColor: 'var(--card-bg)' }}>
                  <div>
                    <p className="text-current text-base font-medium leading-normal">
                      Email Notifications
                    </p>
                    <p className="text-current/70 text-sm font-normal leading-normal">
                      Receive updates about sponsorships and hackathons
                    </p>
                  </div>
                  <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-[var(--accent-color)] transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--accent-color)] focus:ring-offset-2">
                    <span className="inline-block h-4 w-4 transform rounded-full bg-white translate-x-6 transition-transform" />
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg" style={{ backgroundColor: 'var(--card-bg)' }}>
                  <div>
                    <p className="text-current text-base font-medium leading-normal">
                      Push Notifications
                    </p>
                    <p className="text-current/70 text-sm font-normal leading-normal">
                      Get instant updates on your mobile device
                    </p>
                  </div>
                  <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--accent-color)] focus:ring-offset-2">
                    <span className="inline-block h-4 w-4 transform rounded-full bg-white translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'account' && (
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-current text-lg font-bold leading-tight tracking-[-0.015em]">
                Profile Information
              </h3>
              
              <div className="p-4 rounded-lg space-y-4" style={{ backgroundColor: 'var(--card-bg)' }}>
                <div className="flex items-center gap-4">
                  <div 
                    className="bg-center bg-no-repeat aspect-square bg-cover rounded-full w-16 h-16"
                    style={{ 
                      backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuA0gOqBL0VzSyvjURKBux-Z9KkXt1cxaCUddSWnXZkm9I8Fast_eJiF4uoFnkef4NMYzF1c734QWhUliRKVeGEc_9kz-n_ZQMFStyQUSSX8gReph3vZLL43L_OtYUtI8-wMrJjawoCZ_0aRunRCYSjUWNVcVgs9KJ3mPinKECMlckwTxJY2DVAfQtPO5sAVeOYWfM4b81xjyNqq1ygYFJDB5hPpI-6ZXLfaNiAnTP0vo7HMW4FGWPqRRvCyaplVAKt7jBk7hmFvIr8")' 
                    }}
                  />
                  <div>
                    <p className="text-current text-lg font-bold leading-tight">CoderPay</p>
                    <p className="text-current/70 text-sm font-normal leading-normal">coder@example.com</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="block text-current text-sm font-medium mb-2">Display Name</label>
                    <input 
                      type="text" 
                      defaultValue="CoderPay"
                      className="w-full p-3 rounded-lg border text-current bg-transparent"
                      style={{ borderColor: 'var(--border-color)' }}
                    />
                  </div>
                  <div>
                    <label className="block text-current text-sm font-medium mb-2">Email</label>
                    <input 
                      type="email" 
                      defaultValue="coder@example.com"
                      className="w-full p-3 rounded-lg border text-current bg-transparent"
                      style={{ borderColor: 'var(--border-color)' }}
                    />
                  </div>
                  <div>
                    <label className="block text-current text-sm font-medium mb-2">Bio</label>
                    <textarea 
                      rows={3}
                      defaultValue="Passionate developer working on open source projects and contributing to the developer community."
                      className="w-full p-3 rounded-lg border text-current bg-transparent resize-none"
                      style={{ borderColor: 'var(--border-color)' }}
                    />
                  </div>
                </div>
                
                <button 
                  className="px-6 py-2 rounded-lg text-white font-medium hover:opacity-90 transition-opacity"
                  style={{ backgroundColor: 'var(--accent-color)' }}
                >
                  Save Changes
                </button>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-current text-lg font-bold leading-tight tracking-[-0.015em]">
                Connected Accounts
              </h3>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 rounded-lg" style={{ backgroundColor: 'var(--card-bg)' }}>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gray-900 flex items-center justify-center">
                      <span className="text-white text-sm font-bold">G</span>
                    </div>
                    <div>
                      <p className="text-current text-base font-medium leading-normal">GitHub</p>
                      <p className="text-current/70 text-sm font-normal leading-normal">Connected</p>
                    </div>
                  </div>
                  <button className="px-4 py-2 text-sm font-medium text-red-600 hover:text-red-700 transition-colors">
                    Disconnect
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg" style={{ backgroundColor: 'var(--card-bg)' }}>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
                      <span className="text-white text-sm font-bold">L</span>
                    </div>
                    <div>
                      <p className="text-current text-base font-medium leading-normal">LinkedIn</p>
                      <p className="text-current/70 text-sm font-normal leading-normal">Not connected</p>
                    </div>
                  </div>
                  <button 
                    className="px-4 py-2 text-sm font-medium rounded-lg transition-colors"
                    style={{ backgroundColor: 'var(--accent-color)', color: 'white' }}
                  >
                    Connect
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SettingsPage;