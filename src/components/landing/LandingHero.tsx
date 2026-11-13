'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  ArrowRight,
  BrainCircuit,
  GraduationCap,
  Layers,
  FileCheck2,
  CheckCircle2,
  Play,
  Flame,
  Zap,
} from 'lucide-react';

export function LandingHero() {
  const [activeTab, setActiveTab] = useState<'beginner' | 'intermediate' | 'exam'>('intermediate');

  const explanationExamples = {
    beginner: {
      title: 'Intuitive Analogy',
      badge: 'Beginner Mode',
      text: 'Imagine a tree where branches naturally balance themselves like a seesaw. If one side gets weighed down by too many leaves, the tree shifts its branch to keep the center of gravity stable, so searching for any single leaf is always blazing fast.',
    },
    intermediate: {
      title: 'Algorithmic Mechanics',
      badge: 'Intermediate Mode',
      text: 'An AVL tree maintains height balance such that the balance factor (|Height(L) - Height(R)|) ≤ 1. If an insertion creates an imbalance of ±2, single rotations (LL/RR) or double rotations (LR/RL) restore the invariant in O(1) time, ensuring worst-case O(log n) lookup.',
    },
    exam: {
      title: 'High-Yield Examination Formula',
      badge: 'Exam-Oriented',
      text: 'Midterm Rule: For a node with Balance Factor +2 and Left Child -1, execute LR double rotation: (1) Left rotate child, (2) Right rotate root. Minimum nodes for height h: N(h) = N(h-1) + N(h-2) + 1 with N(0)=1, N(1)=2.',
    },
  };

  return (
    <section className="relative pt-32 pb-20 px-4 sm:px-8 overflow-hidden">
      {/* Background Radial Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-violet-600/20 via-cyan-500/10 to-transparent blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto text-center">
        {/* Floating Spatial Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border border-violet-500/30 text-xs font-medium text-violet-300 mb-8 shadow-glow-violet animate-pulse-glow">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>The Spatial AI Learning Operating System</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-6 leading-[1.1]">
          Your Intelligence.{' '}
          <span className="text-gradient-spatial block mt-1">Your Learning. Your Future.</span>
        </h1>

        {/* Supporting Copy */}
        <p className="max-w-3xl mx-auto text-base sm:text-lg text-slate-300 mb-10 leading-relaxed font-normal">
          Meet your personal AI learning companion. Understand complex concepts, master your subjects,
          and prepare for every examination with intelligence that adapts to you.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Link
            href="/dashboard"
            className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 text-white font-semibold shadow-xl shadow-violet-600/30 border border-white/20 transition-all hover:scale-[1.03]"
          >
            <span>Start Learning</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <a
            href="#features"
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-2xl glass-panel hover:bg-white/[0.08] text-slate-200 font-medium border border-white/10 transition-all hover:scale-[1.02]"
          >
            <span>Explore Features</span>
          </a>
        </div>

        {/* Interactive Spatial Product Showcase */}
        <div className="relative mx-auto max-w-4xl rounded-3xl glass-card-glow p-4 sm:p-6 text-left border border-white/15 shadow-2xl">
          {/* Mock Window Header */}
          <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-rose-500/80" />
              <div className="w-3 h-3 rounded-full bg-amber-500/80" />
              <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
              <span className="text-xs text-slate-400 font-mono ml-2">StudyPilot AI Workspace • Active Session</span>
            </div>

            {/* Mode Selector Tabs */}
            <div className="flex items-center gap-1.5 p-1 rounded-xl bg-black/40 border border-white/5 text-xs">
              <button
                onClick={() => setActiveTab('beginner')}
                className={`px-3 py-1 rounded-lg transition-all ${
                  activeTab === 'beginner'
                    ? 'bg-violet-600 text-white shadow-sm font-semibold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Beginner
              </button>
              <button
                onClick={() => setActiveTab('intermediate')}
                className={`px-3 py-1 rounded-lg transition-all ${
                  activeTab === 'intermediate'
                    ? 'bg-violet-600 text-white shadow-sm font-semibold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Intermediate
              </button>
              <button
                onClick={() => setActiveTab('exam')}
                className={`px-3 py-1 rounded-lg transition-all ${
                  activeTab === 'exam'
                    ? 'bg-violet-600 text-white shadow-sm font-semibold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Exam-Oriented
              </button>
            </div>
          </div>

          {/* User Prompt Message */}
          <div className="flex items-start gap-3 mb-4">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-xs font-bold text-white shrink-0">
              U
            </div>
            <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/5 text-sm text-slate-200">
              Can you explain how AVL tree rotations prevent degenerate search time?
            </div>
          </div>

          {/* AI Structured Response */}
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-violet-600 to-indigo-600 flex items-center justify-center text-xs font-bold text-white shrink-0 shadow-glow-violet">
              <Sparkles className="w-4 h-4 text-cyan-300" />
            </div>
            <div className="flex-1 p-5 rounded-2xl bg-violet-950/20 border border-violet-500/20 shadow-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono font-semibold text-cyan-300">
                  {explanationExamples[activeTab].badge}
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Confidence: 99.4% • Citations: 2</span>
              </div>
              <h4 className="text-sm font-semibold text-white mb-2">
                {explanationExamples[activeTab].title}
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {explanationExamples[activeTab].text}
              </p>

              {/* Follow-up suggestion pills */}
              <div className="mt-4 pt-3 border-t border-white/10 flex flex-wrap gap-2">
                <span className="text-[11px] text-slate-400 flex items-center gap-1">Suggested Follow-ups:</span>
                <button
                  onClick={() => setActiveTab('exam')}
                  className="text-[11px] px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-cyan-300 border border-cyan-500/20 transition-colors"
                >
                  Generate 3 Practice Questions →
                </button>
                <button
                  onClick={() => setActiveTab('beginner')}
                  className="text-[11px] px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-violet-300 border border-violet-500/20 transition-colors"
                >
                  Create Spaced Flashcard Deck →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
