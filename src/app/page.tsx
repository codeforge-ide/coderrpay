'use client';

import React, { useState, useEffect } from 'react';
import { useAppStore } from '@/store/useAppStore';
import { Skeleton, SkeletonStats, SkeletonActivity } from '@/components/Skeleton';
import { MoneyIcon, CodeIcon, GithubIcon } from '@/components/Icons';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const { totalEarned, activeSponsorships, hackathonsParticipated, recentActivity } = useAppStore();

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'sponsorship':
        return <MoneyIcon className="w-6 h-6 text-current" />;
      case 'hackathon':
        return <CodeIcon className="w-6 h-6 text-current" />;
      case 'connection':
        return <GithubIcon className="w-6 h-6 text-current" />;
      default:
        return <MoneyIcon className="w-6 h-6 text-current" />;
    }
  };

  return (
    <div className="flex flex-col max-w-[960px] flex-1">
      <div className="flex flex-wrap justify-between gap-3 p-4">
        <p className="text-current tracking-light text-[32px] font-bold leading-tight min-w-72">
          Dashboard
        </p>
      </div>

      <h3 className="text-current text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">
        Overview
      </h3>

      {isLoading ? (
        <div className="p-4">
          <SkeletonStats />
        </div>
      ) : (
        <div className="flex flex-wrap gap-4 p-4">
          <div className="flex min-w-[158px] flex-1 flex-col gap-2 rounded-lg p-6" style={{ backgroundColor: 'var(--card-bg)' }}>
            <p className="text-current text-base font-medium leading-normal">Total Earned</p>
            <p className="text-current tracking-light text-2xl font-bold leading-tight">
              ${totalEarned.toLocaleString()}
            </p>
          </div>
          <div className="flex min-w-[158px] flex-1 flex-col gap-2 rounded-lg p-6" style={{ backgroundColor: 'var(--card-bg)' }}>
            <p className="text-current text-base font-medium leading-normal">Active Sponsorships</p>
            <p className="text-current tracking-light text-2xl font-bold leading-tight">
              {activeSponsorships}
            </p>
          </div>
          <div className="flex min-w-[158px] flex-1 flex-col gap-2 rounded-lg p-6" style={{ backgroundColor: 'var(--card-bg)' }}>
            <p className="text-current text-base font-medium leading-normal">Hackathons Participated</p>
            <p className="text-current tracking-light text-2xl font-bold leading-tight">
              {hackathonsParticipated}
            </p>
          </div>
        </div>
      )}

      <h3 className="text-current text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">
        Recent Activity
      </h3>

      {isLoading ? (
        <div className="px-4">
          <SkeletonActivity />
        </div>
      ) : (
        <div className="grid grid-cols-[40px_1fr] gap-x-2 px-4">
          {recentActivity.map((activity, index) => (
            <React.Fragment key={activity.id}>
              <div className="flex flex-col items-center gap-1 pt-3">
                <div className="text-current">
                  {getActivityIcon(activity.type)}
                </div>
                {index < recentActivity.length - 1 && (
                  <div className="w-[1.5px] h-2 grow" style={{ backgroundColor: 'var(--border-color)' }}></div>
                )}
              </div>
              <div className="flex flex-1 flex-col py-3">
                <p className="text-current text-base font-medium leading-normal">
                  {activity.title}
                </p>
                <p className="text-current/70 text-base font-normal leading-normal">
                  {activity.description}
                </p>
              </div>
            </React.Fragment>
          ))}
        </div>
      )}

      <h3 className="text-current text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">
        Project Updates
      </h3>

      {isLoading ? (
        <div className="p-4 space-y-4">
          <div className="space-y-3">
            <Skeleton height="1rem" width="30%" />
            <Skeleton height="1.5rem" width="60%" />
            <Skeleton lines={2} height="0.875rem" />
          </div>
          <div className="space-y-3">
            <Skeleton height="1rem" width="30%" />
            <Skeleton height="1.5rem" width="60%" />
            <Skeleton lines={2} height="0.875rem" />
          </div>
        </div>
      ) : (
        <>
          <div className="p-4">
            <div className="flex items-stretch justify-between gap-4 rounded-lg">
              <div className="flex flex-[2_2_0px] flex-col gap-4">
                <div className="flex flex-col gap-1">
                  <p className="text-current/70 text-sm font-normal leading-normal">Project Alpha</p>
                  <p className="text-current text-base font-bold leading-tight">Refactor Database Schema</p>
                  <p className="text-current/70 text-sm font-normal leading-normal">
                    Updated schema for improved performance and scalability.
                  </p>
                </div>
                <button
                  className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-8 px-4 flex-row-reverse text-current text-sm font-medium leading-normal w-fit"
                  style={{ backgroundColor: 'var(--card-bg)' }}
                >
                  <span className="truncate">View Details</span>
                </button>
              </div>
              <div className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-lg flex-1" style={{ backgroundColor: 'var(--card-bg)' }}></div>
            </div>
          </div>
          <div className="p-4">
            <div className="flex items-stretch justify-between gap-4 rounded-lg">
              <div className="flex flex-[2_2_0px] flex-col gap-4">
                <div className="flex flex-col gap-1">
                  <p className="text-current/70 text-sm font-normal leading-normal">Project Beta</p>
                  <p className="text-current text-base font-bold leading-tight">Implement New API Endpoints</p>
                  <p className="text-current/70 text-sm font-normal leading-normal">
                    Added endpoints for user authentication and data retrieval.
                  </p>
                </div>
                <button
                  className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-8 px-4 flex-row-reverse text-current text-sm font-medium leading-normal w-fit"
                  style={{ backgroundColor: 'var(--card-bg)' }}
                >
                  <span className="truncate">View Details</span>
                </button>
              </div>
              <div className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-lg flex-1" style={{ backgroundColor: 'var(--card-bg)' }}></div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
