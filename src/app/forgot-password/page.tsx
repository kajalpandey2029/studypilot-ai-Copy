'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Sparkles, ArrowRight, Mail, CheckCircle2, ArrowLeft } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#03060f] flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-violet-600/15 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2.5 mb-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-violet-600 to-cyan-400 p-[1.5px] shadow-glow-violet">
              <div className="w-full h-full bg-[#050711] rounded-[10px] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-cyan-400" />
              </div>
            </div>
            <span className="font-bold text-xl tracking-tight text-white">
              StudyPilot<span className="text-violet-400"> AI</span>
            </span>
          </Link>
          <h1 className="text-2xl font-bold text-white tracking-tight">Password Recovery</h1>
          <p className="text-xs text-slate-400 mt-1">We will send you a secure reset authorization link</p>
        </div>

        <GlassCard variant="glow" className="border-white/10 shadow-2xl">
          {submitted ? (
            <div className="text-center py-6">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-base font-semibold text-white mb-2">Check your email</h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-6">
                If an account exists for <span className="text-cyan-300 font-mono">{email}</span>, you will receive instructions to reset your password shortly.
              </p>
              <Link
                href="/login"
                className="inline-flex items-center gap-2 text-xs font-semibold text-violet-400 hover:text-violet-300"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Return to Sign In</span>
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Your Account Email
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="student@studypilot.ai"
                    className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-10 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-violet-500 transition-colors"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 text-white font-semibold text-xs shadow-lg shadow-violet-600/30 transition-all flex items-center justify-center gap-2"
              >
                <span>Send Reset Link</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}
        </GlassCard>

        <p className="text-center text-xs text-slate-400 mt-6">
          <Link href="/login" className="text-violet-400 hover:underline">
            Back to Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
