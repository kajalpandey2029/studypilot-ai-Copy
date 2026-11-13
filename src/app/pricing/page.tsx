'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { GlassCard } from '@/components/ui/GlassCard';
import { CheckCircle2, Sparkles, ArrowRight, HelpCircle } from 'lucide-react';

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');

  return (
    <div className="min-h-screen bg-[#03060f] text-slate-100 flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-8 pt-32 pb-24 w-full">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/30">
            StudyPilot Plans
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white mt-4 mb-4">
            Predictable Plans for Ambitious Learners
          </h1>
          <p className="text-slate-400 text-sm sm:text-base">
            Start for free and experience the next generation of AI-driven education.
          </p>

          {/* Toggle */}
          <div className="inline-flex items-center gap-2 p-1.5 rounded-2xl bg-white/[0.04] border border-white/10 mt-8">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-4 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                billingCycle === 'monthly' ? 'bg-violet-600 text-white shadow-sm' : 'text-slate-400'
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              className={`px-4 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                billingCycle === 'annual' ? 'bg-violet-600 text-white shadow-sm' : 'text-slate-400'
              }`}
            >
              <span>Annual Billing</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 font-mono">
                Save 25%
              </span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
          {/* Free Tier */}
          <GlassCard variant="default" className="border-white/10 p-8 flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-bold text-white mb-1">Scholar Free</h3>
              <p className="text-xs text-slate-400 mb-6">Complete suite for individual day-to-day study.</p>
              <div className="flex items-baseline gap-1 mb-8">
                <span className="text-5xl font-extrabold text-white">$0</span>
                <span className="text-xs text-slate-400">/ forever</span>
              </div>

              <div className="space-y-3.5 text-xs text-slate-300">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>50 AI study queries per day</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>5 Document uploads (PDF, DOCX, TXT)</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Adaptive exam generator with 5 questions per quiz</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>SuperMemo-2 Spaced repetition decks</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Study planner & streak tracking</span>
                </div>
              </div>
            </div>

            <Link
              href="/dashboard"
              className="mt-8 block text-center py-3 rounded-xl border border-white/20 text-white font-medium text-xs hover:bg-white/5 transition-colors"
            >
              Launch Free
            </Link>
          </GlassCard>

          {/* Pro Tier */}
          <GlassCard variant="glow" className="border-violet-500/40 p-8 flex flex-col justify-between shadow-glow-violet relative">
            <div className="absolute top-4 right-4 text-[10px] font-mono uppercase px-2.5 py-0.5 rounded-full bg-violet-600 text-white font-bold">
              Uncapped Learning
            </div>

            <div>
              <h3 className="text-xl font-bold text-white mb-1">StudyPilot Pro</h3>
              <p className="text-xs text-slate-400 mb-6">For university scholars, exam aspirants, and developers.</p>
              <div className="flex items-baseline gap-1 mb-8">
                <span className="text-5xl font-extrabold text-white">
                  {billingCycle === 'annual' ? '$9' : '$12'}
                </span>
                <span className="text-xs text-slate-400">/ month</span>
              </div>

              <div className="space-y-3.5 text-xs text-slate-300">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                  <span>Unlimited AI study queries (Google Gemini 1.5 Pro)</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                  <span>Unlimited document uploads & multi-file RAG</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                  <span>Full 50-question mock exams with detailed analysis</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                  <span>5 Dedicated AI Tutor Personas</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                  <span>Programming Lab with AI debugger in 5 languages</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                  <span>Personal Knowledge Graph & Weakness Radar</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => alert('Pro subscription requires a configured Stripe or payment provider. Currently operating in Sandbox mode with full features available.')}
              className="mt-8 block w-full text-center py-3 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 text-white font-semibold text-xs shadow-lg shadow-violet-600/30 transition-all"
            >
              Start 14-Day Free Trial
            </button>
          </GlassCard>
        </div>
      </main>
    </div>
  );
}
