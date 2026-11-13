import React from 'react';

export default function FlashcardsLoading() {
  return (
    <div className="min-h-screen bg-[#03060f] p-4 sm:p-8 max-w-7xl mx-auto space-y-6 animate-pulse">
      <div className="h-6 w-56 bg-white/10 rounded-xl mb-4" />
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="h-72 rounded-3xl bg-white/[0.04] border border-white/5" />
        <div className="lg:col-span-3 flex flex-col items-center justify-center p-8">
          <div className="w-full max-w-2xl h-80 rounded-3xl bg-white/[0.03] border border-white/5" />
        </div>
      </div>
    </div>
  );
}
