'use client';

import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import Link from 'next/link';
import { Menu, X, Sparkles, Bell, Search, Command } from 'lucide-react';
import { dataStore } from '@/lib/storage';

interface AppLayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  action?: React.ReactNode;
}

export function AppLayout({ children, title, subtitle, action }: AppLayoutProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const profile = dataStore.getProfile();

  return (
    <div className="min-h-screen bg-[#03060f] text-slate-100 flex relative overflow-hidden">
      {/* Ambient Spatial Lighting Orbs */}
      <div className="fixed top-[-10%] left-[-10%] w-[500px] h-[500px] bg-violet-600/10 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="fixed top-[30%] right-[-10%] w-[600px] h-[600px] bg-cyan-600/10 rounded-full blur-[160px] pointer-events-none -z-10" />
      <div className="fixed bottom-[-10%] left-[20%] w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      {/* Desktop Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 lg:ml-64 flex flex-col min-w-0">
        {/* Top Header Bar */}
        <header className="sticky top-0 z-30 px-4 sm:px-8 py-3 glass-panel border-b border-white/5 backdrop-blur-xl bg-[#03060f]/60">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden p-2 rounded-xl bg-white/5 text-slate-300 hover:text-white"
                aria-label="Toggle Navigation"
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>

              <div>
                {title && (
                  <h1 className="text-lg sm:text-xl font-bold tracking-tight text-white flex items-center gap-2">
                    {title}
                  </h1>
                )}
                {subtitle && <p className="text-xs text-slate-400">{subtitle}</p>}
              </div>
            </div>

            {/* Quick Actions / Search / Status */}
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-slate-400">
                <Search className="w-3.5 h-3.5 text-slate-400" />
                <span>Search topics, notes, formulas...</span>
                <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-[10px] text-slate-300 font-mono">
                  ⌘K
                </kbd>
              </div>

              {action && <div>{action}</div>}

              <Link
                href="/settings"
                className="p-2 rounded-xl bg-white/[0.03] border border-white/10 text-slate-400 hover:text-white hover:border-violet-500/30 transition-all"
                title="Settings"
              >
                <Bell className="w-4 h-4" />
              </Link>

              <Link
                href="/profile"
                className="w-8 h-8 rounded-full bg-gradient-to-tr from-violet-600 to-cyan-400 flex items-center justify-center text-xs font-bold text-white shadow-md hover:scale-105 transition-transform"
              >
                {profile.full_name.charAt(0)}
              </Link>
            </div>
          </div>
        </header>

        {/* Mobile Navigation Drawer */}
        {mobileOpen && (
          <div className="lg:hidden p-4 glass-panel border-b border-white/10">
            <nav className="grid grid-cols-2 gap-2 text-xs">
              <Link
                href="/dashboard"
                onClick={() => setMobileOpen(false)}
                className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200"
              >
                Dashboard
              </Link>
              <Link
                href="/study"
                onClick={() => setMobileOpen(false)}
                className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200"
              >
                AI Workspace
              </Link>
              <Link
                href="/tutor"
                onClick={() => setMobileOpen(false)}
                className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200"
              >
                Personal Tutor
              </Link>
              <Link
                href="/library"
                onClick={() => setMobileOpen(false)}
                className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200"
              >
                Doc Intelligence
              </Link>
              <Link
                href="/quiz"
                onClick={() => setMobileOpen(false)}
                className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200"
              >
                Adaptive Exam
              </Link>
              <Link
                href="/flashcards"
                onClick={() => setMobileOpen(false)}
                className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200"
              >
                Flashcards
              </Link>
              <Link
                href="/planner"
                onClick={() => setMobileOpen(false)}
                className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200"
              >
                Study Planner
              </Link>
              <Link
                href="/analytics"
                onClick={() => setMobileOpen(false)}
                className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200"
              >
                Analytics
              </Link>
              <Link
                href="/coding-lab"
                onClick={() => setMobileOpen(false)}
                className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200"
              >
                Coding Lab
              </Link>
              <Link
                href="/settings"
                onClick={() => setMobileOpen(false)}
                className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200"
              >
                Settings
              </Link>
            </nav>
          </div>
        )}

        {/* Page Content Body */}
        <main className="flex-1 p-4 sm:p-8 max-w-7xl w-full mx-auto">{children}</main>
      </div>
    </div>
  );
}
