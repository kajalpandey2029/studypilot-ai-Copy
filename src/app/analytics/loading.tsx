import React from 'react';

export default function AnalyticsLoading() {
  return (
    <div className="min-h-screen bg-[#03060f] p-4 sm:p-8 max-w-7xl mx-auto space-y-6 animate-pulse">
      <div className="h-6 w-56 bg-white/10 rounded-xl mb-4" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-28 rounded-2xl bg-white/[0.04] border border-white/5 p-4" />
        ))}
      </div>
      <div className="h-96 rounded-3xl bg-white/[0.03] border border-white/5 p-6" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="h-64 rounded-3xl bg-white/[0.03] border border-white/5" />
        <div className="h-64 rounded-3xl bg-white/[0.03] border border-white/5" />
      </div>
    </div>
  );
}
