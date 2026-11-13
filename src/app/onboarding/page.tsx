'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Sparkles, ArrowRight, ArrowLeft, CheckCircle2, GraduationCap, Clock, BookOpen, Target } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { dataStore } from '@/lib/storage';
import { EducationLevel, LearningStyle } from '@/types';

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const profile = dataStore.getProfile();

  // Form State
  const [educationLevel, setEducationLevel] = useState<EducationLevel>(profile.education_level || 'university');
  const [institution, setInstitution] = useState(profile.institution || '');
  const [degree, setDegree] = useState(profile.degree || '');
  const [academicYear, setAcademicYear] = useState(profile.academic_year || '3rd Year');
  const [learningStyle, setLearningStyle] = useState<LearningStyle>(profile.preferred_learning_style || 'visual_practical');
  const [dailyGoalMinutes, setDailyGoalMinutes] = useState(profile.daily_study_goal_minutes || 60);

  const handleFinish = () => {
    dataStore.updateProfile({
      education_level: educationLevel,
      institution: institution || 'Autonomous Institute',
      degree: degree || 'Computer Science & AI',
      academic_year: academicYear,
      preferred_learning_style: learningStyle,
      daily_study_goal_minutes: dailyGoalMinutes,
    });
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#03060f] flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-violet-600/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="w-full max-w-xl">
        {/* Step Indicator */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/20 text-violet-300 border border-violet-500/30 text-xs font-mono mb-3">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Step {step} of 3 • Personalized AI Calibration</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            {step === 1 && 'Academic Foundation'}
            {step === 2 && 'How Do You Learn Best?'}
            {step === 3 && 'Daily Study Goals & Schedule'}
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            StudyPilot configures its explanations, exam generators, and tutors around your profile.
          </p>
        </div>

        <GlassCard variant="glow" className="border-white/10 shadow-2xl p-6 sm:p-8">
          {/* STEP 1: Academic details */}
          {step === 1 && (
            <div className="space-y-5">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-2">Education Stage</label>
                <div className="grid grid-cols-2 gap-2.5">
                  {[
                    { id: 'university', label: 'University / College' },
                    { id: 'competitive_exam', label: 'Competitive Exams' },
                    { id: 'high_school', label: 'High School / Senior' },
                    { id: 'self_learner', label: 'Self-Learner / Pro' },
                  ].map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setEducationLevel(item.id as EducationLevel)}
                      className={`p-3 rounded-xl text-left border text-xs font-medium transition-all ${
                        educationLevel === item.id
                          ? 'bg-violet-600/30 border-violet-500 text-white shadow-glow-violet'
                          : 'bg-white/[0.03] border-white/10 text-slate-400 hover:text-white'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  University or Institution Name (Optional)
                </label>
                <input
                  type="text"
                  value={institution}
                  onChange={(e) => setInstitution(e.target.value)}
                  placeholder="e.g. Stanford University, MIT, IIT"
                  className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-violet-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">Degree or Major</label>
                  <input
                    type="text"
                    value={degree}
                    onChange={(e) => setDegree(e.target.value)}
                    placeholder="e.g. Computer Science"
                    className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-violet-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">Year / Semester</label>
                  <input
                    type="text"
                    value={academicYear}
                    onChange={(e) => setAcademicYear(e.target.value)}
                    placeholder="e.g. 3rd Year"
                    className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-violet-500"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Learning Style */}
          {step === 2 && (
            <div className="space-y-4">
              <label className="block text-xs font-medium text-slate-300">
                Select your preferred instructional delivery:
              </label>
              {[
                {
                  id: 'visual_practical',
                  title: 'Visual & Practical',
                  desc: 'Focus on flowcharts, intuitive diagrams, analogies, and real-world implementation.',
                },
                {
                  id: 'conceptual_deep',
                  title: 'Conceptual Deep-Dive',
                  desc: 'First-principles breakdown, underlying axioms, mathematical proofs, and theories.',
                },
                {
                  id: 'exam_tactical',
                  title: 'Exam-Tactical',
                  desc: 'High-yield points, common midterm traps, scoring rules, and structured revision sheets.',
                },
                {
                  id: 'step_by_step',
                  title: 'Step-by-Step Guided Walkthrough',
                  desc: 'Strict sequential reasoning, line-by-line code explanation, and diagnostic questions.',
                },
              ].map((style) => (
                <div
                  key={style.id}
                  onClick={() => setLearningStyle(style.id as LearningStyle)}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                    learningStyle === style.id
                      ? 'bg-gradient-to-r from-violet-600/30 to-cyan-600/20 border-violet-500 text-white shadow-glow-violet'
                      : 'bg-white/[0.03] border-white/10 text-slate-300 hover:bg-white/[0.06]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold">{style.title}</span>
                    {learningStyle === style.id && <CheckCircle2 className="w-4 h-4 text-cyan-400" />}
                  </div>
                  <p className="text-[11px] text-slate-400">{style.desc}</p>
                </div>
              ))}
            </div>
          )}

          {/* STEP 3: Study goals */}
          {step === 3 && (
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-medium text-slate-300">Daily Study Target</label>
                  <span className="text-sm font-bold text-cyan-400 font-mono">{dailyGoalMinutes} Minutes / day</span>
                </div>
                <input
                  type="range"
                  min="30"
                  max="240"
                  step="15"
                  value={dailyGoalMinutes}
                  onChange={(e) => setDailyGoalMinutes(Number(e.target.value))}
                  className="w-full accent-violet-500 h-2 bg-white/10 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                  <span>30 mins (Casual)</span>
                  <span>90 mins (Standard)</span>
                  <span>240 mins (Intensive Exam Prep)</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 space-y-2 text-xs">
                <div className="flex items-center gap-2 text-violet-300 font-semibold">
                  <Target className="w-4 h-4" />
                  <span>Your StudyPilot Plan Includes:</span>
                </div>
                <p className="text-slate-400 leading-relaxed text-[11px]">
                  • Automated SuperMemo-2 flashcard scheduling right before cognitive decay.<br />
                  • Document intelligence with grounded citations.<br />
                  • Adaptive practice quizzes with weak concept diagnostics.
                </p>
              </div>
            </div>
          )}

          {/* Navigation Controls */}
          <div className="flex items-center justify-between mt-8 pt-5 border-t border-white/10">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="px-4 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-white flex items-center gap-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>
            ) : (
              <div />
            )}

            {step < 3 ? (
              <button
                type="button"
                onClick={() => setStep(step + 1)}
                className="px-6 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold shadow-md shadow-violet-600/30 flex items-center gap-1.5 transition-all"
              >
                <span>Continue</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleFinish}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 text-white text-xs font-semibold shadow-lg shadow-violet-600/30 flex items-center gap-1.5 hover:scale-[1.02] transition-all"
              >
                <span>Launch My Pilot Workspace</span>
                <Sparkles className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
