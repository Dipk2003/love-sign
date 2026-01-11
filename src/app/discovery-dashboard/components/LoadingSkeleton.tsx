import React from 'react';

const LoadingSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {[1, 2, 3, 4, 5, 6]?.map((item) => (
        <div
          key={item}
          className="bg-card rounded-xl shadow-subtle overflow-hidden border border-border animate-pulse"
        >
          <div className="h-80 bg-muted" />
          <div className="p-6 space-y-4">
            <div className="h-4 bg-muted rounded w-3/4" />
            <div className="h-4 bg-muted rounded w-full" />
            <div className="h-4 bg-muted rounded w-5/6" />
            <div className="flex space-x-2">
              <div className="h-6 bg-muted rounded-full w-20" />
              <div className="h-6 bg-muted rounded-full w-24" />
              <div className="h-6 bg-muted rounded-full w-16" />
            </div>
            <div className="flex space-x-3 pt-4">
              <div className="flex-1 h-12 bg-muted rounded-lg" />
              <div className="flex-1 h-12 bg-muted rounded-lg" />
              <div className="flex-1 h-12 bg-muted rounded-lg" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LoadingSkeleton;