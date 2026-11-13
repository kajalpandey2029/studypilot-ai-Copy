'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { AppLayout } from '@/components/layout/AppLayout';
import { GlassCard } from '@/components/ui/GlassCard';
import { dataStore } from '@/lib/storage';
import {
  Flame,
  Clock,
  Target,
  BookOpen,
  Calendar,
  AlertTriangle,
  ArrowRight,
  Plus,
  Sparkles,
  CheckCircle2,
  BrainCircuit,
  FileQuestion,
  Layers,
  FileText,
  TrendingUp,
  Activity,
} from 'lucide-react';

const WEEKLY_ACTIVITY = [
  { day: 'Mon', hours: 2.2 },
  { day: 'Tue', hours: 1.8 },
  { day: 'Wed', hours: 3.1 },
  { day: 'Thu', hours: 2.5 },
  { day: 'Fri', hours: 1.5 },
  { day: 'Sat', hours: 3.8 },
  { day: 'Sun', hours: 2.6 },
];

export default function DashboardPage() {
  const profile = React.useMemo(() => dataStore.getProfile(), []);
  const subjects = React.useMemo(() => dataStore.getSubjects(), []);
  const weakTopics = React.useMemo(() => dataStore.getWeakTopics(), []);
  const decks = React.useMemo(() => dataStore.getDecks(), []);
  const [taskList, setTaskList] = useState(() => dataStore.getTasks());

  const toggleTask = React.useCallback((id: string) => {
    dataStore.toggleTask(id);
    setTaskList([...dataStore.getTasks()]);
  }, []);

  const totalDueCards = React.useMemo(
    () => decks.reduce((acc, d) => acc + (d.cards_due_count || 0), 0),
    [decks]
  );

  return (
    <AppLayout
      title={`Welcome back, ${profile.full_name.split(' ')[0]}`}
      subtitle="Here is your dynamic learning trajectory and today's priority actions."
      action={
        <Link
          href="/study"
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold shadow-lg shadow-violet-600/30 transition-all"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>New AI Study Session</span>
        </Link>
      }
    >
      <div className="space-y-8">
        {/* Top Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Study Streak */}
          <GlassCard variant="glow" className="p-5 flex items-center justify-between border-amber-500/20">
            <div>
              <p className="text-[10px] uppercase font-mono tracking-wider text-amber-400 font-semibold">
                Active Streak
              </p>
              <h3 className="text-2xl font-extrabold text-white mt-1">
                {profile.current_streak_days} <span className="text-xs font-normal text-slate-400">Days</span>
              </h3>
              <p className="text-[10px] text-slate-400 mt-1">Longest: {profile.longest_streak_days} days</p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <Flame className="w-6 h-6 animate-pulse" />
            </div>
          </GlassCard>

          {/* Daily Goal Progress */}
          <GlassCard variant="glow" className="p-5 flex items-center justify-between border-violet-500/20">
            <div>
              <p className="text-[10px] uppercase font-mono tracking-wider text-violet-400 font-semibold">
                Daily Goal
              </p>
              <h3 className="text-2xl font-extrabold text-white mt-1">
                65 <span className="text-xs font-normal text-slate-400">/ {profile.daily_study_goal_minutes}m</span>
              </h3>
              <div className="w-28 bg-white/10 h-1.5 rounded-full mt-2 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-violet-500 to-cyan-400 h-full rounded-full"
                  style={{ width: `${Math.min(100, Math.round((65 / profile.daily_study_goal_minutes) * 100))}%` }}
                />
              </div>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-400">
              <Target className="w-6 h-6" />
            </div>
          </GlassCard>

          {/* Total Study Hours */}
          <GlassCard variant="glow" className="p-5 flex items-center justify-between border-cyan-500/20">
            <div>
              <p className="text-[10px] uppercase font-mono tracking-wider text-cyan-400 font-semibold">
                Total Study Time
              </p>
              <h3 className="text-2xl font-extrabold text-white mt-1">
                {(profile.total_study_minutes / 60).toFixed(1)} <span className="text-xs font-normal text-slate-400">Hours</span>
              </h3>
              <p className="text-[10px] text-slate-400 mt-1">+4.2 hrs this week</p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
              <Clock className="w-6 h-6" />
            </div>
          </GlassCard>

          {/* Due For Review (Spaced Repetition) */}
          <GlassCard variant="glow" className="p-5 flex items-center justify-between border-rose-500/20">
            <div>
              <p className="text-[10px] uppercase font-mono tracking-wider text-rose-400 font-semibold">
                Recall Due
              </p>
              <h3 className="text-2xl font-extrabold text-white mt-1">
                {totalDueCards} <span className="text-xs font-normal text-slate-400">Cards</span>
              </h3>
              <Link href="/flashcards" className="text-[10px] text-cyan-400 hover:underline mt-1 inline-block">
                Start SM-2 Review →
              </Link>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400">
              <Layers className="w-6 h-6" />
            </div>
          </GlassCard>
        </div>

        {/* AI-Powered Daily Recommendations */}
        <div className="glass-card-glow rounded-3xl p-6 border border-violet-500/30 bg-gradient-to-r from-violet-950/30 via-indigo-950/20 to-[#070b18]">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-violet-600/20 border border-violet-500/30 flex items-center justify-center text-violet-400 shadow-glow-violet">
                <Sparkles className="w-5 h-5 text-cyan-300" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <span>Adaptive Study Recommendation</span>
                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                    High Priority
                  </span>
                </h3>
                <p className="text-xs text-slate-400">
                  Based on recent assessment accuracy, your mastery of <span className="text-white font-medium">AVL Tree Rotations</span> dropped to 58%.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <Link
                href="/study"
                className="px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold shadow-md shadow-violet-600/30 transition-all"
              >
                Review Topic with AI →
              </Link>
              <Link
                href="/quiz/create"
                className="px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-medium border border-white/10 transition-all"
              >
                Take Diagnostic Quiz
              </Link>
            </div>
          </div>
        </div>

        {/* Main Grid: Enrolled Subjects & Weak Topics */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Subjects Progress Column (2 Cols on lg) */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-white">Current Subjects & Mastery</h2>
                <p className="text-xs text-slate-400">Calculated from quiz scores, review frequency, and task completion</p>
              </div>
              <Link href="/analytics" className="text-xs text-cyan-400 hover:underline">
                View Full Analytics →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {subjects.map((subj) => (
                <div
                  key={subj.id}
                  className="glass-panel-interactive rounded-2xl p-5 border border-white/10 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-white/5 text-slate-300 border border-white/10">
                        {subj.code || 'Course'}
                      </span>
                      <span className="text-xs font-bold text-white font-mono">
                        {subj.mastery_percentage}%
                      </span>
                    </div>
                    <h4 className="text-sm font-semibold text-white mb-1.5">{subj.name}</h4>
                    <p className="text-xs text-slate-400 line-clamp-2 mb-4">{subj.description}</p>
                  </div>

                  <div>
                    {/* Mastery progress bar */}
                    <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden mb-3">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${subj.mastery_percentage}%`,
                          backgroundColor: subj.color_hex,
                        }}
                      />
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-slate-400">
                      <span>Exam: {subj.target_exam_date || 'Upcoming'}</span>
                      <Link href={`/study?subject=${encodeURIComponent(subj.name)}`} className="text-cyan-400 hover:underline">
                        Study Now →
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Weekly Activity Bar Chart */}
            <div className="glass-panel rounded-2xl p-6 border border-white/10">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-sm font-bold text-white">Weekly Study Rhythm</h3>
                  <p className="text-xs text-slate-400">Active learning hours logged each day</p>
                </div>
                <span className="text-xs font-mono text-cyan-300 font-bold">17.5 Total Hours</span>
              </div>

              <div className="flex items-end justify-between gap-3 h-32 pt-4 px-2">
                {WEEKLY_ACTIVITY.map((item, idx) => (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                    <div
                      className="w-full max-w-[36px] rounded-t-lg bg-gradient-to-t from-violet-600 to-cyan-400 hover:brightness-125 transition-all shadow-sm"
                      style={{ height: `${(item.hours / 4) * 100}%` }}
                    />
                    <span className="text-[10px] font-mono text-slate-400">{item.day}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Weak Topics & Tasks */}
          <div className="space-y-6">
            {/* Weak Topics Card */}
            <GlassCard variant="default" className="border-rose-500/20 p-5">
              <div className="flex items-center gap-2 mb-3 text-rose-400">
                <AlertTriangle className="w-4 h-4" />
                <h3 className="text-xs font-bold uppercase tracking-wider font-mono">
                  Identified Weak Areas
                </h3>
              </div>
              <p className="text-[11px] text-slate-400 mb-4">
                Topics with low recall score during recent tests. Recommended for revision:
              </p>

              <div className="space-y-2.5">
                {weakTopics.map((top) => (
                  <div
                    key={top.id}
                    className="p-3 rounded-xl bg-white/[0.03] border border-white/5 hover:border-rose-500/30 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <h5 className="text-xs font-semibold text-white truncate max-w-[180px]">
                        {top.title}
                      </h5>
                      <span className="text-[10px] font-mono text-rose-400 font-bold">
                        {top.mastery_score}%
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-[10px] text-slate-400 mt-2">
                      <span>Needs Practice</span>
                      <Link
                        href={`/study?topic=${encodeURIComponent(top.title)}`}
                        className="text-violet-400 hover:text-cyan-300"
                      >
                        Launch AI Drill →
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>

            {/* Pending Study Tasks */}
            <GlassCard variant="default" className="p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-violet-400" />
                  <h3 className="text-xs font-bold uppercase tracking-wider font-mono text-slate-300">
                    Daily Study Tasks
                  </h3>
                </div>
                <Link href="/planner" className="text-[11px] text-cyan-400 hover:underline">
                  Planner →
                </Link>
              </div>

              <div className="space-y-2.5">
                {taskList.slice(0, 4).map((task) => (
                  <div
                    key={task.id}
                    onClick={() => toggleTask(task.id)}
                    className="p-3 rounded-xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.06] cursor-pointer flex items-start gap-3 transition-colors"
                  >
                    <div
                      className={`w-4 h-4 rounded-md mt-0.5 flex items-center justify-center border transition-colors ${
                        task.is_completed
                          ? 'bg-violet-600 border-violet-500 text-white'
                          : 'border-white/20 bg-white/5'
                      }`}
                    >
                      {task.is_completed && <CheckCircle2 className="w-3.5 h-3.5" />}
                    </div>
                    <div className="flex-1">
                      <p
                        className={`text-xs font-medium transition-colors ${
                          task.is_completed ? 'line-through text-slate-500' : 'text-slate-200'
                        }`}
                      >
                        {task.title}
                      </p>
                      <div className="flex items-center gap-2 text-[10px] text-slate-400 mt-1">
                        <span className="font-mono text-cyan-400">{task.estimated_minutes}m</span>
                        <span>•</span>
                        <span>{task.subject_name || 'General'}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
