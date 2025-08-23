import React from 'react';

interface SkeletonProps {
  className?: string;
  width?: string | number;
  height?: string | number;
  rounded?: boolean;
  lines?: number;
}

export const Skeleton: React.FC<SkeletonProps> = ({ 
  className = '', 
  width, 
  height, 
  rounded = false,
  lines = 1 
}) => {
  const baseClasses = `skeleton ${rounded ? 'rounded-full' : 'rounded'} ${className}`;
  
  if (lines > 1) {
    return (
      <div className="space-y-2">
        {Array.from({ length: lines }).map((_, index) => (
          <div
            key={index}
            className={baseClasses}
            style={{
              width: index === lines - 1 ? '70%' : width || '100%',
              height: height || '1rem',
            }}
          />
        ))}
      </div>
    );
  }

  return (
    <div
      className={baseClasses}
      style={{
        width: width || '100%',
        height: height || '1rem',
      }}
    />
  );
};

export const SkeletonCard: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`space-y-3 ${className}`}>
    <Skeleton height="1.5rem" width="60%" />
    <Skeleton height="2rem" width="40%" />
    <Skeleton lines={2} height="0.875rem" />
  </div>
);

export const SkeletonStats: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`flex gap-4 ${className}`}>
    {Array.from({ length: 3 }).map((_, index) => (
      <div key={index} className="flex-1 space-y-2 p-6 rounded-lg" style={{ backgroundColor: 'var(--card-bg)' }}>
        <Skeleton height="1rem" width="70%" />
        <Skeleton height="1.5rem" width="50%" />
      </div>
    ))}
  </div>
);

export const SkeletonActivity: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`space-y-4 ${className}`}>
    {Array.from({ length: 3 }).map((_, index) => (
      <div key={index} className="grid grid-cols-[40px_1fr] gap-x-2">
        <div className="flex flex-col items-center gap-1 pt-3">
          <Skeleton width={24} height={24} rounded />
          <div className="w-[1.5px] h-2 skeleton"></div>
        </div>
        <div className="flex flex-1 flex-col py-3 space-y-2">
          <Skeleton height="1rem" width="80%" />
          <Skeleton height="0.875rem" width="40%" />
        </div>
      </div>
    ))}
  </div>
);