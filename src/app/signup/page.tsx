'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Sparkles, ArrowRight, Lock, Mail, User, BookOpen } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { dataStore } from '@/lib/storage';

export default function SignupPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (fullName) {
      dataStore.updateProfile({ full_name: fullName, email: email || 'student@studypilot.ai' });
    }

    setTimeout(() => {
      setLoading(false);
      router.push('/onboarding');
    }, 500);
  };

  return (
    <div className="min-h-screen bg-[#03060f] flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-violet-600/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-cyan-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="w-full max-w-md">
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
          <h1 className="text-2xl font-bold text-white tracking-tight">Create your Scholar account</h1>
          <p className="text-xs text-slate-400 mt-1">Free lifetime access to intelligent study tools</p>
        </div>

        <GlassCard variant="glow" className="border-white/10 shadow-2xl">
          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Full Name
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  placeholder="e.g. Alex Morgan"
                  className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-10 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-violet-500 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Academic or Personal Email
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
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Secure Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Minimum 8 characters"
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
                <span>Setting up workspace...</span>
              ) : (
                <>
                  <span>Continue to Onboarding</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <p className="text-[10px] text-slate-500 text-center mt-4">
            By signing up, you agree to StudyPilot AI&apos;s Terms of Service and Privacy Policy.
          </p>
        </GlassCard>

        <p className="text-center text-xs text-slate-400 mt-6">
          Already registered?{' '}
          <Link href="/login" className="text-cyan-400 hover:underline font-medium">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
