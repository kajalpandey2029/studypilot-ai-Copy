'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Sparkles, ArrowRight, Lock, Mail, CheckCircle2, AlertCircle } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('student@studypilot.ai');
  const [password, setPassword] = useState('••••••••');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Simulate instant secure auth session
    setTimeout(() => {
      setLoading(false);
      router.push('/dashboard');
    }, 600);
  };

  const handleDemoLogin = () => {
    setEmail('student@studypilot.ai');
    setPassword('DemoPilot2026!');
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push('/dashboard');
    }, 400);
  };

  return (
    <div className="min-h-screen bg-[#03060f] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Spatial Background Orbs */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-violet-600/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-cyan-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="w-full max-w-md">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2.5 mb-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-violet-600 via-indigo-600 to-cyan-400 p-[1.5px] shadow-glow-violet group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-[#050711] rounded-[10px] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-cyan-400" />
              </div>
            </div>
            <span className="font-bold text-xl tracking-tight text-white">
              StudyPilot<span className="text-violet-400"> AI</span>
            </span>
          </Link>
          <h1 className="text-2xl font-bold text-white tracking-tight">Welcome back</h1>
          <p className="text-xs text-slate-400 mt-1">Access your personalized learning cockpit</p>
        </div>

        {/* Spatial Glass Login Form */}
        <GlassCard variant="glow" className="border-white/10 shadow-2xl">
          {error && (
            <div className="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-xs text-rose-300 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Academic or Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="alex@university.edu"
                  className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-10 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-violet-500 transition-colors"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-medium text-slate-300">Password</label>
                <Link
                  href="/forgot-password"
                  className="text-[11px] text-violet-400 hover:text-violet-300 transition-colors"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-10 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-violet-500 transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-semibold text-xs shadow-lg shadow-violet-600/30 transition-all flex items-center justify-center gap-2 mt-2"
            >
              {loading ? (
                <span>Authenticating...</span>
              ) : (
                <>
                  <span>Sign In to Pilot</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Access Button */}
          <div className="mt-5 pt-4 border-t border-white/10 text-center">
            <button
              type="button"
              onClick={handleDemoLogin}
              className="w-full py-2.5 rounded-xl bg-cyan-950/40 border border-cyan-500/30 hover:bg-cyan-900/40 text-cyan-300 text-xs font-semibold flex items-center justify-center gap-2 transition-all shadow-glow-cyan"
            >
              <Sparkles className="w-4 h-4" />
              <span>Instant One-Click Demo Access</span>
            </button>
            <p className="text-[10px] text-slate-500 mt-2">
              Explore with preloaded CS courses, RAG documents, and flashcard decks
            </p>
          </div>
        </GlassCard>

        {/* Footer links */}
        <p className="text-center text-xs text-slate-400 mt-6">
          Don&apos;t have an account yet?{' '}
          <Link href="/signup" className="text-cyan-400 hover:underline font-medium">
            Sign up for free
          </Link>
        </p>
      </div>
    </div>
  );
}
