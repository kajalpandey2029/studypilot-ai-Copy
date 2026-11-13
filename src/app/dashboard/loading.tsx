import React from 'react';

export default function DashboardLoading() {
  return (
    <div className="min-h-screen bg-[#03060f] p-4 sm:p-8 max-w-7xl mx-auto space-y-8 animate-pulse">
      {/* Header Skeleton */}
      <div className="flex justify-between items-center pb-4">
        <div className="space-y-2">
          <div className="h-6 w-48 bg-white/10 rounded-xl" />
          <div className="h-4 w-72 bg-white/5 rounded-lg" />
        </div>
        <div className="h-9 w-32 bg-white/10 rounded-xl" />
      </div>

      {/* 4 Top Metric Cards Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-28 rounded-2xl bg-white/[0.04] border border-white/5 p-4 flex justify-between items-center">
            <div className="space-y-2">
              <div className="h-3 w-20 bg-white/10 rounded" />
              <div className="h-6 w-16 bg-white/15 rounded" />
            </div>
            <div className="w-12 h-12 rounded-xl bg-white/10" />
          </div>
        ))}
      </div>

      {/* Main Grid Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          <div className="h-5 w-40 bg-white/10 rounded" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-44 rounded-2xl bg-white/[0.03] border border-white/5 p-5" />
            ))}
          </div>
        </div>
        <div className="space-y-4">
          <div className="h-5 w-32 bg-white/10 rounded" />
          <div className="h-64 rounded-2xl bg-white/[0.03] border border-white/5 p-5" />
        </div>
      </div>
    </div>
  );
}
