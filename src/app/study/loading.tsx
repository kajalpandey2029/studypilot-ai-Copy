import React from 'react';

export default function StudyLoading() {
  return (
    <div className="min-h-screen bg-[#03060f] p-4 sm:p-8 max-w-7xl mx-auto animate-pulse">
      <div className="h-6 w-56 bg-white/10 rounded-xl mb-6" />
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-160px)]">
        <div className="hidden lg:block space-y-4">
          <div className="h-64 rounded-3xl bg-white/[0.04] border border-white/5" />
          <div className="h-64 rounded-3xl bg-white/[0.04] border border-white/5" />
        </div>
        <div className="lg:col-span-3 rounded-3xl bg-white/[0.03] border border-white/5 flex flex-col justify-between p-6">
          <div className="space-y-4">
            <div className="h-10 w-full bg-white/5 rounded-xl" />
            <div className="h-32 w-3/4 bg-white/5 rounded-2xl" />
          </div>
          <div className="h-14 w-full bg-white/5 rounded-2xl" />
        </div>
      </div>
    </div>
  );
}
