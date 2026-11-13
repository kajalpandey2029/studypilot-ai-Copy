'use client';

import React from 'react';
import Link from 'next/link';
import { useParams, useSearchParams } from 'next/navigation';
import { AppLayout } from '@/components/layout/AppLayout';
import { GlassCard } from '@/components/ui/GlassCard';
import { dataStore } from '@/lib/storage';
import {
  Award,
  Clock,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  ArrowRight,
  RotateCw,
  Sparkles,
  Layers,
  BrainCircuit,
} from 'lucide-react';

export default function QuizResultsPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const quizId = params.id as string;
  const attemptId = searchParams.get('attemptId');

  const attempts = dataStore.getQuizAttempts();
  const attempt = attempts.find((a) => a.id === attemptId) || attempts[0] || {
    id: 'att_fallback',
    quiz_id: quizId,
    quiz_title: 'Adaptive Assessment',
    score: 4,
    total_marks: 5,
    percentage: 80,
    time_spent_seconds: 380,
    answers: [],
    weak_topics: ['AVL Tree LR Zigzag Rotations'],
  };

  const quiz = dataStore.getQuiz(quizId);
  const questions = quiz?.questions || [];

  return (
    <AppLayout
      title="Examination Diagnostic Report"
      subtitle="Detailed scoring, accuracy analysis, and personalized revision recommendations"
      action={
        <Link
          href="/quiz/create"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold shadow-md"
        >
          <span>Retake or New Exam</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      }
    >
      <div className="space-y-8 max-w-5xl mx-auto">
        {/* Score Summary Banner */}
        <div className="glass-card-glow rounded-3xl p-6 sm:p-8 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6 bg-gradient-to-r from-violet-950/30 via-indigo-950/20 to-[#070b18]">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-violet-600 to-cyan-400 p-[2px] shadow-glow-violet">
              <div className="w-full h-full bg-[#070b18] rounded-[14px] flex flex-col items-center justify-center">
                <span className="text-2xl font-black text-white">{attempt.percentage}%</span>
                <span className="text-[9px] uppercase font-mono text-cyan-300">Accuracy</span>
              </div>
            </div>

            <div>
              <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-white/10 text-slate-300">
                Performance Evaluation
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
                {attempt.percentage >= 80 ? 'Mastery Achieved! 🎓' : 'Good Attempt — Targeted Revision Needed'}
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Score: <span className="text-white font-bold">{attempt.score}</span> / {attempt.total_marks} Marks • Time spent: {Math.round(attempt.time_spent_seconds / 60)}m {attempt.time_spent_seconds % 60}s
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Link
              href={`/study?topic=${encodeURIComponent(attempt.weak_topics?.[0] || 'Tree Rotations')}`}
              className="px-4 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold shadow-lg shadow-violet-600/30 flex items-center gap-1.5 transition-all"
            >
              <BrainCircuit className="w-3.5 h-3.5" />
              <span>Drill Weak Concepts</span>
            </Link>
            <Link
              href="/flashcards"
              className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 text-xs font-medium border border-white/10 flex items-center gap-1.5 transition-all"
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Spaced Revision</span>
            </Link>
          </div>
        </div>

        {/* Weak Topic Alert Card */}
        {attempt.weak_topics && attempt.weak_topics.length > 0 && (
          <GlassCard variant="default" className="border-rose-500/30 p-5 bg-rose-950/10">
            <div className="flex items-center gap-2.5 text-rose-400 mb-2">
              <AlertTriangle className="w-4 h-4" />
              <h4 className="text-xs font-bold uppercase tracking-wider font-mono">
                Identified Knowledge Gap
              </h4>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              You had difficulty with <strong className="text-white">{attempt.weak_topics.join(', ')}</strong>. StudyPilot has automatically scheduled an active-recall session in your Study Planner.
            </p>
          </GlassCard>
        )}

        {/* Detailed Question Review */}
        <div>
          <h3 className="text-base font-bold text-white mb-4">Question-by-Question Diagnostic Review</h3>
          <div className="space-y-4">
            {questions.map((q, idx) => {
              const ans = attempt.answers?.find((a) => a.question_id === q.id);
              const isCorrect = ans ? ans.is_correct : true;

              return (
                <div
                  key={q.id}
                  className={`glass-panel rounded-2xl p-6 border ${
                    isCorrect ? 'border-emerald-500/20' : 'border-rose-500/20'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-slate-400">
                        Item {idx + 1}
                      </span>
                      {isCorrect ? (
                        <span className="flex items-center gap-1 text-[11px] font-mono text-emerald-400 font-semibold px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Correct (+{q.marks})</span>
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-[11px] font-mono text-rose-400 font-semibold px-2 py-0.5 rounded bg-rose-500/10 border border-rose-500/20">
                          <XCircle className="w-3.5 h-3.5" />
                          <span>Incorrect (0/{q.marks})</span>
                        </span>
                      )}
                    </div>
                  </div>

                  <h4 className="text-xs sm:text-sm font-semibold text-white mb-3">
                    {q.prompt}
                  </h4>

                  {q.code_snippet && (
                    <pre className="p-3 rounded-xl bg-black/40 border border-white/10 text-xs text-cyan-300 font-mono mb-3 overflow-x-auto">
                      <code>{q.code_snippet}</code>
                    </pre>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs mb-4">
                    <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                      <span className="text-[10px] text-slate-500 font-mono uppercase block mb-1">
                        Your Answer
                      </span>
                      <span className={isCorrect ? 'text-emerald-300 font-medium' : 'text-rose-300 font-medium'}>
                        {ans ? String(ans.user_answer) : 'Unanswered'}
                      </span>
                    </div>

                    <div className="p-3 rounded-xl bg-emerald-950/20 border border-emerald-500/20">
                      <span className="text-[10px] text-emerald-400 font-mono uppercase block mb-1">
                        Verified Correct Answer
                      </span>
                      <span className="text-emerald-300 font-medium font-mono">
                        {String(q.correct_answer)}
                      </span>
                    </div>
                  </div>

                  {/* Rationale */}
                  <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 text-xs text-slate-300 leading-relaxed">
                    <strong className="text-cyan-300 font-mono block mb-1 text-[11px]">Explanation:</strong>
                    {q.explanation}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
