'use client';

import React, { useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { GlassCard } from '@/components/ui/GlassCard';
import { dataStore } from '@/lib/storage';
import {
  User,
  GraduationCap,
  Award,
  Flame,
  Clock,
  BookOpen,
  CheckCircle2,
  Edit2,
  Save,
} from 'lucide-react';
import { LearningStyle } from '@/types';

export default function ProfilePage() {
  const profile = dataStore.getProfile();
  const [fullName, setFullName] = useState(profile.full_name);
  const [institution, setInstitution] = useState(profile.institution || '');
  const [degree, setDegree] = useState(profile.degree || '');
  const [academicYear, setAcademicYear] = useState(profile.academic_year || '');
  const [learningStyle, setLearningStyle] = useState<LearningStyle>(profile.preferred_learning_style);
  const [dailyGoal, setDailyGoal] = useState(profile.daily_study_goal_minutes);
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    dataStore.updateProfile({
      full_name: fullName,
      institution,
      degree,
      academic_year: academicYear,
      preferred_learning_style: learningStyle,
      daily_study_goal_minutes: dailyGoal,
    });
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const badges = [
    { title: '7-Day Streak Scholar', desc: 'Maintained uninterrupted daily study rhythm', icon: '🔥', earned: true },
    { title: 'Tree Balancing Master', desc: 'Scored 100% on AVL rotation assessments', icon: '🌲', earned: true },
    { title: 'SuperMemo Recall Pro', desc: 'Completed 50 spaced flashcard reviews', icon: '🧠', earned: true },
    { title: 'Research Citation Pioneer', desc: 'Grounded 10 document queries with page citations', icon: '📜', earned: true },
  ];

  return (
    <AppLayout
      title="Student Learning Profile"
      subtitle="Academic configuration, cognitive learning style, and milestone achievements"
    >
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Profile Header Card */}
        <div className="glass-card-glow rounded-3xl p-6 sm:p-8 border border-white/10 flex flex-col sm:flex-row items-center gap-6 bg-gradient-to-r from-violet-950/30 to-[#070b18]">
          <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-violet-600 via-indigo-600 to-cyan-400 p-[2px] shadow-glow-violet shrink-0">
            <div className="w-full h-full bg-[#070b18] rounded-[22px] flex items-center justify-center text-3xl font-extrabold text-white">
              {fullName.charAt(0)}
            </div>
          </div>

          <div className="text-center sm:text-left flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white">{fullName}</h2>
                <p className="text-xs text-cyan-300 font-mono mt-0.5">
                  {degree} • {institution}
                </p>
              </div>

              <span className="text-[10px] font-mono uppercase px-3 py-1 rounded-full bg-violet-500/20 text-violet-300 border border-violet-500/30 self-center sm:self-auto">
                Scholar Tier
              </span>
            </div>

            <div className="grid grid-cols-3 gap-3 mt-4 pt-4 border-t border-white/10 text-center">
              <div>
                <p className="text-base font-extrabold text-white">{profile.current_streak_days}d</p>
                <p className="text-[10px] text-slate-400 font-mono">Streak</p>
              </div>
              <div>
                <p className="text-base font-extrabold text-white">{(profile.total_study_minutes / 60).toFixed(1)}h</p>
                <p className="text-[10px] text-slate-400 font-mono">Total Study</p>
              </div>
              <div>
                <p className="text-base font-extrabold text-white">{profile.daily_study_goal_minutes}m</p>
                <p className="text-[10px] text-slate-400 font-mono">Daily Target</p>
              </div>
            </div>
          </div>
        </div>

        {/* Form: Editable Academic Parameters */}
        <GlassCard variant="default" className="p-6 sm:p-8 border-white/10">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
            <div className="flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-violet-400" />
              <h3 className="text-sm font-bold text-white">Academic Details & Instructional Delivery</h3>
            </div>
            {isSaved && (
              <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1 font-mono">
                <CheckCircle2 className="w-4 h-4" />
                <span>Profile Updated</span>
              </span>
            )}
          </div>

          <form onSubmit={handleSave} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">Full Name</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-violet-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">Institution / University</label>
                <input
                  type="text"
                  value={institution}
                  onChange={(e) => setInstitution(e.target.value)}
                  className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-violet-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">Degree / Major</label>
                <input
                  type="text"
                  value={degree}
                  onChange={(e) => setDegree(e.target.value)}
                  className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-violet-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">Semester or Year</label>
                <input
                  type="text"
                  value={academicYear}
                  onChange={(e) => setAcademicYear(e.target.value)}
                  className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-violet-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Instructional Delivery Style
              </label>
              <select
                value={learningStyle}
                onChange={(e) => setLearningStyle(e.target.value as LearningStyle)}
                className="w-full bg-[#070b18] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-violet-500"
              >
                <option value="visual_practical">Visual & Practical (Flowcharts, diagrams, code examples)</option>
                <option value="conceptual_deep">Conceptual Deep-Dive (First principles & proofs)</option>
                <option value="exam_tactical">Exam-Tactical (High-yield notes & common traps)</option>
                <option value="step_by_step">Step-by-Step Guided Walkthrough</option>
              </select>
            </div>

            <div className="flex justify-end pt-3">
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-semibold text-xs shadow-md shadow-violet-600/30 flex items-center gap-1.5"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save Learning Preferences</span>
              </button>
            </div>
          </form>
        </GlassCard>

        {/* Milestone Badges */}
        <div>
          <h3 className="text-base font-bold text-white mb-4">Milestone Achievements</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {badges.map((b, idx) => (
              <div
                key={idx}
                className="glass-panel rounded-2xl p-4 border border-white/10 flex items-start gap-4"
              >
                <span className="text-2xl p-2 rounded-xl bg-white/5 border border-white/10">{b.icon}</span>
                <div>
                  <h4 className="text-xs font-bold text-white">{b.title}</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">{b.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
