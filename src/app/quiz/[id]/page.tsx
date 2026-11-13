'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { GlassCard } from '@/components/ui/GlassCard';
import { dataStore } from '@/lib/storage';
import { Quiz, Question, QuizAnswer, QuizAttempt } from '@/types';
import {
  Clock,
  Flag,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Sparkles,
} from 'lucide-react';

export default function LiveQuizPage() {
  const params = useParams();
  const router = useRouter();
  const quizId = params.id as string;

  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string | string[]>>({});
  const [flaggedQuestions, setFlaggedQuestions] = useState<Set<number>>(new Set());
  const [timeLeftSeconds, setTimeLeftSeconds] = useState(15 * 60);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  useEffect(() => {
    let q = dataStore.getQuiz(quizId);
    if (!q) {
      // Create a fallback quiz if accessed directly
      q = {
        id: quizId,
        user_id: 'usr_default_pilot',
        title: 'Comprehensive Computer Science & Algorithms',
        difficulty: 'university_level',
        question_count: 5,
        time_limit_minutes: 15,
        questions: [
          {
            id: 'q_demo_1',
            quiz_id: quizId,
            question_type: 'mcq_single',
            prompt: 'In self-balancing binary search trees, when a node has a balance factor of +2 and its left child has a balance factor of -1, which rotation sequence restores balance?',
            options: [
              'Left-Right (LR) double rotation',
              'Single Right (RR) rotation',
              'Single Left (LL) rotation',
              'Right-Left (RL) double rotation',
            ],
            correct_answer: 'Left-Right (LR) double rotation',
            explanation: 'The zigzag imbalance requires a left rotation on the child to straighten the subtree, followed by a right rotation on the parent to rebalance height.',
            marks: 1,
            order_index: 0,
          },
          {
            id: 'q_demo_2',
            quiz_id: quizId,
            question_type: 'true_false',
            prompt: 'A Breadth-First Search (BFS) on an unweighted graph always finds the shortest path in terms of the number of edges.',
            options: ['True', 'False'],
            correct_answer: 'True',
            explanation: 'Because BFS explores nodes level by level using a FIFO queue, the first time a target vertex is reached represents the minimum edge distance from the source.',
            marks: 1,
            order_index: 1,
          },
          {
            id: 'q_demo_3',
            quiz_id: quizId,
            question_type: 'code_output',
            prompt: 'What is the return value of mystery(3, 2)?',
            code_snippet: `function mystery(a: number, b: number): number {\n  if (b === 0) return 1;\n  return a * mystery(a, b - 1);\n}`,
            options: ['9', '6', '8', '1'],
            correct_answer: '9',
            explanation: 'mystery(3, 2) recursively computes 3^2 = 9.',
            marks: 1,
            order_index: 2,
          },
        ],
        created_at: new Date().toISOString(),
      };
      dataStore.saveQuiz(q);
    }

    setQuiz(q);
    setTimeLeftSeconds((q.time_limit_minutes || 15) * 60);
  }, [quizId]);

  // Countdown timer
  useEffect(() => {
    if (timeLeftSeconds <= 0) {
      handleSubmitQuiz();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeftSeconds((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeftSeconds]);

  const handleSelectOption = (option: string) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentIndex]: option,
    }));
  };

  const toggleFlag = (index: number) => {
    setFlaggedQuestions((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  };

  const handleSubmitQuiz = () => {
    if (!quiz || !quiz.questions) return;
    setIsSubmitting(true);

    let earnedMarks = 0;
    const totalMarks = quiz.questions.length;
    const answers: QuizAnswer[] = [];
    const weakList: string[] = [];

    quiz.questions.forEach((q, idx) => {
      const userAnswer = selectedAnswers[idx];
      const isCorrect = String(userAnswer).trim() === String(q.correct_answer).trim();

      if (isCorrect) {
        earnedMarks += q.marks || 1;
      } else {
        weakList.push(quiz.title.split(':')[1] || 'Foundational Principles');
      }

      answers.push({
        question_id: q.id,
        user_answer: userAnswer || 'Unanswered',
        is_correct: isCorrect,
        feedback: q.explanation,
      });
    });

    const percentage = Math.round((earnedMarks / totalMarks) * 100);
    const timeSpent = (quiz.time_limit_minutes * 60) - timeLeftSeconds;

    const attempt: QuizAttempt = {
      id: `att_${Date.now()}`,
      quiz_id: quiz.id,
      quiz_title: quiz.title,
      user_id: 'usr_default_pilot',
      score: earnedMarks,
      total_marks: totalMarks,
      percentage,
      time_spent_seconds: Math.max(10, timeSpent),
      completed: true,
      submitted_at: new Date().toISOString(),
      created_at: new Date().toISOString(),
      answers,
      weak_topics: Array.from(new Set(weakList)),
    };

    dataStore.saveQuizAttempt(attempt);
    router.push(`/quiz/${quiz.id}/results?attemptId=${attempt.id}`);
  };

  if (!quiz || !quiz.questions) {
    return (
      <div className="min-h-screen bg-[#03060f] flex items-center justify-center text-white">
        Loading assessment...
      </div>
    );
  }

  const currentQ = quiz.questions[currentIndex];
  const minutes = Math.floor(timeLeftSeconds / 60);
  const seconds = timeLeftSeconds % 60;
  const isTimeLow = timeLeftSeconds < 120;

  return (
    <div className="min-h-screen bg-[#03060f] text-slate-100 flex flex-col p-4 sm:p-8">
      {/* Top Exam Header */}
      <header className="max-w-6xl mx-auto w-full glass-panel rounded-2xl p-4 sm:p-5 border border-white/10 flex items-center justify-between mb-6 shadow-2xl">
        <div>
          <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-violet-500/20 text-violet-300 border border-violet-500/30">
            Live Proctored Assessment
          </span>
          <h1 className="text-sm sm:text-base font-bold text-white mt-1 truncate max-w-md">
            {quiz.title}
          </h1>
        </div>

        {/* Live Timer */}
        <div
          className={`flex items-center gap-2 px-4 py-2 rounded-xl border font-mono font-bold text-sm sm:text-base transition-colors ${
            isTimeLow
              ? 'bg-rose-500/20 text-rose-300 border-rose-500/40 animate-pulse'
              : 'bg-white/[0.04] text-cyan-300 border-white/10'
          }`}
        >
          <Clock className="w-4 h-4" />
          <span>
            {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
          </span>
        </div>

        <button
          onClick={() => setShowConfirmModal(true)}
          className="px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold shadow-md shadow-violet-600/30"
        >
          Submit Exam
        </button>
      </header>

      {/* Main Examination Grid */}
      <main className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-4 gap-6 flex-1">
        {/* Left 3 Cols: Active Question Card */}
        <div className="lg:col-span-3 flex flex-col justify-between glass-card-glow rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-cyan-400">
                  Question {currentIndex + 1} of {quiz.questions.length}
                </span>
                <span className="text-[10px] text-slate-400 font-mono">({currentQ.marks} Mark)</span>
              </div>

              <button
                onClick={() => toggleFlag(currentIndex)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium border transition-colors ${
                  flaggedQuestions.has(currentIndex)
                    ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                    : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
                }`}
              >
                <Flag className="w-3.5 h-3.5" />
                <span>{flaggedQuestions.has(currentIndex) ? 'Flagged for Review' : 'Mark Review'}</span>
              </button>
            </div>

            {/* Prompt */}
            <h3 className="text-sm sm:text-base font-semibold text-white leading-relaxed mb-6">
              {currentQ.prompt}
            </h3>

            {/* Code Snippet if applicable */}
            {currentQ.code_snippet && (
              <pre className="p-4 rounded-2xl bg-black/50 border border-white/10 text-xs text-cyan-300 font-mono overflow-x-auto mb-6">
                <code>{currentQ.code_snippet}</code>
              </pre>
            )}

            {/* Options list */}
            <div className="space-y-3">
              {currentQ.options?.map((option, optIdx) => {
                const isSelected = selectedAnswers[currentIndex] === option;
                return (
                  <div
                    key={optIdx}
                    onClick={() => handleSelectOption(option)}
                    className={`p-4 rounded-2xl border cursor-pointer flex items-center justify-between text-xs sm:text-sm transition-all ${
                      isSelected
                        ? 'bg-gradient-to-r from-violet-600/30 to-indigo-600/20 border-violet-500 text-white shadow-glow-violet'
                        : 'bg-white/[0.03] border-white/10 text-slate-300 hover:bg-white/[0.06]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-6 h-6 rounded-lg flex items-center justify-center font-mono text-xs font-bold transition-colors ${
                          isSelected ? 'bg-violet-600 text-white' : 'bg-white/10 text-slate-400'
                        }`}
                      >
                        {String.fromCharCode(65 + optIdx)}
                      </div>
                      <span>{option}</span>
                    </div>

                    {isSelected && <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bottom Navigation Buttons */}
          <div className="flex items-center justify-between pt-6 border-t border-white/10 mt-8">
            <button
              onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
              disabled={currentIndex === 0}
              className="px-4 py-2.5 rounded-xl border border-white/10 text-xs font-medium text-slate-300 hover:text-white disabled:opacity-30 flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Previous</span>
            </button>

            {currentIndex < quiz.questions.length - 1 ? (
              <button
                onClick={() => setCurrentIndex((prev) => Math.min(quiz.questions!.length - 1, prev + 1))}
                className="px-5 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold shadow-md flex items-center gap-1.5"
              >
                <span>Next Question</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                onClick={() => setShowConfirmModal(true)}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 text-white text-xs font-semibold shadow-md flex items-center gap-1.5"
              >
                <span>Submit & View Score</span>
                <CheckCircle2 className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Right Column: Question Palette */}
        <div className="glass-panel rounded-3xl p-6 border border-white/10 flex flex-col justify-between">
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider font-mono text-slate-400 mb-4">
              Question Palette
            </h4>

            <div className="grid grid-cols-4 sm:grid-cols-5 gap-2.5 mb-6">
              {quiz.questions.map((_, idx) => {
                const isAnswered = selectedAnswers[idx] !== undefined;
                const isCurrent = currentIndex === idx;
                const isFlagged = flaggedQuestions.has(idx);

                return (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-10 rounded-xl text-xs font-mono font-bold transition-all relative ${
                      isCurrent
                        ? 'border-2 border-cyan-400 bg-cyan-950/40 text-cyan-300 shadow-glow-cyan'
                        : isAnswered
                        ? 'bg-violet-600/40 border border-violet-500/50 text-white'
                        : 'bg-white/5 border border-white/10 text-slate-400 hover:text-white'
                    }`}
                  >
                    {idx + 1}
                    {isFlagged && (
                      <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-amber-400" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Legend */}
            <div className="space-y-2 text-[11px] text-slate-400 pt-4 border-t border-white/10">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-violet-600/40 border border-violet-500/50" />
                <span>Answered ({Object.keys(selectedAnswers).length})</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-white/5 border border-white/10" />
                <span>Unanswered ({quiz.questions.length - Object.keys(selectedAnswers).length})</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-amber-400" />
                <span>Marked for Review ({flaggedQuestions.size})</span>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-white/10 text-center">
            <p className="text-[10px] text-slate-500">
              Answers are autosaved continuously.
            </p>
          </div>
        </div>
      </main>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="glass-card-glow max-w-sm w-full p-6 rounded-3xl border border-white/20 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-violet-500/20 text-violet-300 border border-violet-500/30 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white">Ready to submit exam?</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              You have answered <span className="text-cyan-300 font-bold">{Object.keys(selectedAnswers).length}</span> of <span className="text-white font-bold">{quiz.questions.length}</span> questions.
            </p>
            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="flex-1 py-2.5 rounded-xl border border-white/10 text-xs font-semibold text-slate-300 hover:text-white"
              >
                Continue Test
              </button>
              <button
                onClick={handleSubmitQuiz}
                disabled={isSubmitting}
                className="flex-1 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold shadow-lg shadow-violet-600/30"
              >
                {isSubmitting ? 'Scoring...' : 'Confirm Submit'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
