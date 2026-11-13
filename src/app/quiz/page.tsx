'use client';

import React from 'react';
import Link from 'next/link';
import { AppLayout } from '@/components/layout/AppLayout';
import { GlassCard } from '@/components/ui/GlassCard';
import { dataStore } from '@/lib/storage';
import {
  FileQuestion,
  Sparkles,
  Plus,
  Clock,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  Award,
} from 'lucide-react';

export default function QuizCenterPage() {
  const attempts = dataStore.getQuizAttempts();
  const subjects = dataStore.getSubjects();

  // If no attempts exist yet, provide a sample past attempt for illustration
  const displayAttempts = attempts.length > 0 ? attempts : [
    {
      id: 'att_demo_1',
      quiz_id: 'q_demo',
      quiz_title: 'Data Structures: Tree Balancing & Rotations',
      user_id: 'usr_default_pilot',
      score: 4,
      total_marks: 5,
      percentage: 80,
      time_spent_seconds: 420,
      completed: true,
      submitted_at: new Date(Date.now() - 2 * 86400000).toISOString(),
      created_at: new Date().toISOString(),
      answers: [],
      weak_topics: ['AVL LR Double Rotations'],
    },
    {
      id: 'att_demo_2',
      quiz_id: 'q_demo_2',
      quiz_title: 'Operating Systems: Deadlock & Synchronization',
      user_id: 'usr_default_pilot',
      score: 3,
      total_marks: 5,
      percentage: 60,
      time_spent_seconds: 510,
      completed: true,
      submitted_at: new Date(Date.now() - 5 * 86400000).toISOString(),
      created_at: new Date().toISOString(),
      answers: [],
      weak_topics: ['Banker Algorithm Safety Check'],
    },
  ];

  return (
    <AppLayout
      title="Adaptive Quiz Center"
      subtitle="AI-generated mock assessments, timed test simulators, and diagnostic accuracy tracking"
      action={
        <Link
          href="/quiz/create"
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold shadow-lg shadow-violet-600/30 transition-all"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Generate New Exam</span>
        </Link>
      }
    >
      <div className="space-y-8">
        {/* Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <GlassCard variant="glow" className="p-5 flex items-center justify-between border-violet-500/20">
            <div>
              <p className="text-[10px] uppercase font-mono tracking-wider text-violet-400 font-semibold">
                Average Score
              </p>
              <h3 className="text-2xl font-extrabold text-white mt-1">74.5%</h3>
              <p className="text-[10px] text-slate-400 mt-1">Across all completed assessments</p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-400">
              <TrendingUp className="w-6 h-6" />
            </div>
          </GlassCard>

          <GlassCard variant="glow" className="p-5 flex items-center justify-between border-cyan-500/20">
            <div>
              <p className="text-[10px] uppercase font-mono tracking-wider text-cyan-400 font-semibold">
                Exams Completed
              </p>
              <h3 className="text-2xl font-extrabold text-white mt-1">{displayAttempts.length}</h3>
              <p className="text-[10px] text-slate-400 mt-1">Timed simulation mode</p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
              <Award className="w-6 h-6" />
            </div>
          </GlassCard>

          <GlassCard variant="glow" className="p-5 flex items-center justify-between border-rose-500/20">
            <div>
              <p className="text-[10px] uppercase font-mono tracking-wider text-rose-400 font-semibold">
                Needs Revision
              </p>
              <h3 className="text-2xl font-extrabold text-white mt-1">2 Topics</h3>
              <p className="text-[10px] text-slate-400 mt-1">Flagged for targeted drills</p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400">
              <AlertTriangle className="w-6 h-6" />
            </div>
          </GlassCard>
        </div>

        {/* Quick Launch Card */}
        <div className="glass-card-glow rounded-3xl p-6 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6 bg-gradient-to-r from-violet-950/30 to-[#070b18]">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-violet-600 to-cyan-400 flex items-center justify-center text-white shadow-glow-violet shrink-0">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Generate an Adaptive Mock Examination</h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Configure question formats, target difficulty levels, and time limits from your syllabus or uploaded PDFs.
              </p>
            </div>
          </div>

          <Link
            href="/quiz/create"
            className="px-6 py-3 rounded-2xl bg-gradient-to-r from-violet-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 text-white font-semibold text-xs shadow-lg shadow-violet-600/30 shrink-0 transition-all"
          >
            Create New Quiz →
          </Link>
        </div>

        {/* Recent Attempts List */}
        <div>
          <h2 className="text-base font-bold text-white mb-4">Past Examination Attempts</h2>
          <div className="space-y-3">
            {displayAttempts.map((att) => (
              <div
                key={att.id}
                className="glass-panel-interactive rounded-2xl p-5 border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-white/5 text-slate-300 border border-white/10">
                      Completed Exam
                    </span>
                    <span className="text-xs text-slate-400 font-mono">
                      {new Date(att.submitted_at).toLocaleDateString()}
                    </span>
                  </div>
                  <h4 className="text-sm font-semibold text-white">{att.quiz_title}</h4>
                  <p className="text-xs text-slate-400 mt-1">
                    Score: <span className="font-bold text-cyan-300">{att.score}/{att.total_marks}</span> ({att.percentage}%) • Time spent: {Math.round(att.time_spent_seconds / 60)} mins
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  {att.weak_topics && att.weak_topics.length > 0 && (
                    <span className="text-[11px] px-2.5 py-1 rounded-lg bg-rose-500/10 text-rose-300 border border-rose-500/20 font-mono">
                      Weak: {att.weak_topics[0]}
                    </span>
                  )}
                  <Link
                    href={`/quiz/${att.quiz_id}/results`}
                    className="text-xs font-semibold px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white border border-white/10 transition-colors"
                  >
                    View Analysis →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
