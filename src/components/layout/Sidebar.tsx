'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  BrainCircuit,
  GraduationCap,
  FileText,
  FileQuestion,
  Layers,
  CalendarCheck,
  BarChart3,
  Code2,
  User,
  Settings,
  Sparkles,
  Flame,
  Clock,
  LogOut,
} from 'lucide-react';
import { dataStore } from '@/lib/storage';

export function Sidebar() {
  const pathname = usePathname();
  const profile = dataStore.getProfile();

  const navigationItems = [
    { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { label: 'AI Workspace', href: '/study', icon: BrainCircuit, badge: 'Smart' },
    { label: 'Personal Tutor', href: '/tutor', icon: GraduationCap },
    { label: 'Doc Intelligence', href: '/library', icon: FileText },
    { label: 'Adaptive Exam', href: '/quiz', icon: FileQuestion },
    { label: 'Flashcards', href: '/flashcards', icon: Layers, badge: 'SM-2' },
    { label: 'Study Planner', href: '/planner', icon: CalendarCheck },
    { label: 'Analytics', href: '/analytics', icon: BarChart3 },
    { label: 'Coding Lab', href: '/coding-lab', icon: Code2 },
    { label: 'Profile', href: '/profile', icon: User },
    { label: 'Settings', href: '/settings', icon: Settings },
  ];

  return (
    <aside className="w-64 min-h-screen fixed top-0 left-0 z-40 p-4 hidden lg:flex flex-col">
      <div className="w-full h-full glass-panel rounded-3xl p-5 flex flex-col justify-between border border-white/10 shadow-2xl backdrop-blur-2xl bg-[#070b18]/80">
        <div>
          {/* Brand header */}
          <Link href="/dashboard" className="flex items-center gap-3 mb-6 px-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-violet-600 via-indigo-600 to-cyan-400 p-[1.5px] shadow-glow-violet">
              <div className="w-full h-full bg-[#050711] rounded-[10px] flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-cyan-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-semibold text-base tracking-tight text-white">
                  StudyPilot<span className="text-violet-400"> AI</span>
                </span>
              </div>
              <p className="text-[11px] text-slate-400">Spatial Learning OS</p>
            </div>
          </Link>

          {/* Student Status Summary Card */}
          <div className="mb-5 p-3 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
                <Flame className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[10px] text-slate-400 uppercase font-mono">Streak</p>
                <p className="text-xs font-semibold text-white">{profile.current_streak_days} Days</p>
              </div>
            </div>
            <div className="h-6 w-px bg-white/10" />
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[10px] text-slate-400 uppercase font-mono">Study Time</p>
                <p className="text-xs font-semibold text-white">{Math.round(profile.total_study_minutes / 60)} hrs</p>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1 overflow-y-auto max-h-[calc(100vh-340px)] pr-1">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href));

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-violet-600/30 to-indigo-600/20 text-white border border-violet-500/40 shadow-sm shadow-violet-500/10'
                      : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-violet-400' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="text-[9px] uppercase px-1.5 py-0.5 rounded-md bg-cyan-500/20 text-cyan-300 font-mono border border-cyan-500/30">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer User Pill */}
        <div className="pt-4 border-t border-white/10">
          <Link
            href="/profile"
            className="flex items-center justify-between p-2 rounded-xl hover:bg-white/[0.04] transition-colors group"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-violet-500 to-cyan-400 flex items-center justify-center text-xs font-bold text-white shadow-md">
                {profile.full_name.charAt(0)}
              </div>
              <div className="text-left">
                <p className="text-xs font-medium text-white group-hover:text-cyan-300 transition-colors">
                  {profile.full_name}
                </p>
                <p className="text-[10px] text-slate-400 truncate max-w-[120px]">{profile.degree || 'Student'}</p>
              </div>
            </div>
            <LogOut className="w-4 h-4 text-slate-500 group-hover:text-rose-400 transition-colors" />
          </Link>
        </div>
      </div>
    </aside>
  );
}
