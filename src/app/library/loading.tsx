import React from 'react';

export default function LibraryLoading() {
  return (
    <div className="min-h-screen bg-[#03060f] p-4 sm:p-8 max-w-7xl mx-auto space-y-6 animate-pulse">
      <div className="h-6 w-64 bg-white/10 rounded-xl mb-4" />
      <div className="h-44 rounded-3xl bg-white/[0.04] border border-white/5" />
      <div className="h-10 w-96 bg-white/5 rounded-xl" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-56 rounded-3xl bg-white/[0.03] border border-white/5 p-6" />
        ))}
      </div>
    </div>
  );
}
