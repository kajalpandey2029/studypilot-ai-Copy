'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Sparkles, Menu, X, ArrowRight, BookOpen, Compass, ShieldCheck } from 'lucide-react';

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const isAuthPage = pathname.startsWith('/login') || pathname.startsWith('/signup');

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-8 py-4">
      <div className="max-w-7xl mx-auto glass-panel rounded-2xl px-6 py-3 flex items-center justify-between border border-white/10 shadow-2xl backdrop-blur-2xl">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-violet-600 via-indigo-600 to-cyan-400 p-[1.5px] shadow-glow-violet transition-transform group-hover:scale-105">
            <div className="w-full h-full bg-[#050711] rounded-[10px] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-cyan-400 group-hover:rotate-12 transition-transform" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-lg tracking-tight text-white group-hover:text-cyan-300 transition-colors">
                StudyPilot<span className="text-violet-400"> AI</span>
              </span>
              <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-violet-500/20 text-violet-300 border border-violet-500/30">
                Spatial
              </span>
            </div>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
          <Link href="/#features" className="hover:text-cyan-300 transition-colors">
            Capabilities
          </Link>
          <Link href="/#workspace" className="hover:text-cyan-300 transition-colors">
            AI Workspace
          </Link>
          <Link href="/#exam-engine" className="hover:text-cyan-300 transition-colors">
            Adaptive Exam
          </Link>
          <Link href="/pricing" className="hover:text-cyan-300 transition-colors">
            Pricing
          </Link>
        </nav>

        {/* Action Controls */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/login"
            className="text-sm font-medium text-slate-300 hover:text-white px-4 py-2 rounded-xl transition-colors"
          >
            Sign In
          </Link>
          <Link
            href="/dashboard"
            className="flex items-center gap-2 text-sm font-medium bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white px-5 py-2.5 rounded-xl shadow-lg shadow-violet-600/30 transition-all hover:scale-[1.02] border border-violet-400/30"
          >
            <span>Launch Pilot</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-slate-400 hover:text-white"
          aria-label="Toggle Navigation"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-2 glass-panel rounded-2xl p-6 border border-white/10 shadow-2xl flex flex-col gap-4">
          <Link
            href="/#features"
            onClick={() => setMobileMenuOpen(false)}
            className="text-slate-300 hover:text-cyan-300 py-1"
          >
            Capabilities
          </Link>
          <Link
            href="/#workspace"
            onClick={() => setMobileMenuOpen(false)}
            className="text-slate-300 hover:text-cyan-300 py-1"
          >
            AI Workspace
          </Link>
          <Link
            href="/#exam-engine"
            onClick={() => setMobileMenuOpen(false)}
            className="text-slate-300 hover:text-cyan-300 py-1"
          >
            Adaptive Exam
          </Link>
          <Link
            href="/pricing"
            onClick={() => setMobileMenuOpen(false)}
            className="text-slate-300 hover:text-cyan-300 py-1"
          >
            Pricing
          </Link>
          <div className="pt-4 border-t border-white/10 flex flex-col gap-2">
            <Link
              href="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="text-center py-2.5 rounded-xl border border-white/10 text-slate-200"
            >
              Sign In
            </Link>
            <Link
              href="/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="text-center py-2.5 rounded-xl bg-violet-600 text-white font-medium shadow-md shadow-violet-600/40"
            >
              Launch Pilot
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
