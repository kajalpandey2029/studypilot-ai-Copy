'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AppLayout } from '@/components/layout/AppLayout';
import { GlassCard } from '@/components/ui/GlassCard';
import { dataStore } from '@/lib/storage';
import { DifficultyLevel, Quiz, Question } from '@/types';
import {
  FileQuestion,
  Sparkles,
  Clock,
  BookOpen,
  ArrowRight,
  RotateCw,
  CheckCircle2,
  FileText,
} from 'lucide-react';

export default function CreateQuizPage() {
  const router = useRouter();
  const subjects = dataStore.getSubjects();
  const documents = dataStore.getDocuments();

  const [selectedSubject, setSelectedSubject] = useState(subjects[0]?.name || 'Data Structures & Algorithms');
  const [topic, setTopic] = useState('Tree Balancing & AVL Rotations');
  const [questionCount, setQuestionCount] = useState(5);
  const [difficulty, setDifficulty] = useState<DifficultyLevel>('medium');
  const [timeLimit, setTimeLimit] = useState(15);
  const [selectedDocId, setSelectedDocId] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim() || loading) return;

    setLoading(true);

    try {
      const res = await fetch('/api/ai/quiz-generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subject: selectedSubject,
          topic,
          count: questionCount,
          difficulty,
        }),
      });

      const data = await res.json();
      const rawQuestions: Partial<Question>[] = data.questions || [];

      const fullQuestions: Question[] = rawQuestions.map((q, idx) => ({
        id: `q_${Date.now()}_${idx}`,
        quiz_id: '',
        question_type: q.question_type || 'mcq_single',
        prompt: q.prompt || `Question ${idx + 1} on ${topic}`,
        options: q.options || ['Option A', 'Option B', 'Option C', 'Option D'],
        correct_answer: q.correct_answer || (q.options ? q.options[0] : 'Option A'),
        explanation: q.explanation || 'Detailed rationale for correct choice.',
        code_snippet: q.code_snippet,
        marks: q.marks || 1,
        order_index: idx,
      }));

      const newQuiz: Quiz = {
        id: `quiz_${Date.now()}`,
        user_id: 'usr_default_pilot',
        title: `${selectedSubject}: ${topic}`,
        description: `${difficulty.toUpperCase()} difficulty adaptive assessment with ${questionCount} items.`,
        difficulty,
        question_count: fullQuestions.length,
        time_limit_minutes: timeLimit,
        source_document_id: selectedDocId || undefined,
        questions: fullQuestions,
        created_at: new Date().toISOString(),
      };

      // Set back references
      newQuiz.questions?.forEach((q) => {
        q.quiz_id = newQuiz.id;
      });

      dataStore.saveQuiz(newQuiz);
      router.push(`/quiz/${newQuiz.id}`);
    } catch (err) {
      console.error(err);
      alert('Failed to generate quiz. Please retry.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppLayout
      title="Create Adaptive Examination"
      subtitle="Configure subject domains, benchmark difficulty, and time limits"
    >
      <div className="max-w-2xl mx-auto py-4">
        <GlassCard variant="glow" className="border-white/10 p-6 sm:p-8">
          <form onSubmit={handleGenerate} className="space-y-6">
            {/* Subject Selection */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-2">Academic Subject</label>
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="w-full bg-[#070b18] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-violet-500"
              >
                {subjects.map((s) => (
                  <option key={s.id} value={s.name}>
                    {s.name} ({s.code || 'Course'})
                  </option>
                ))}
              </select>
            </div>

            {/* Target Topic */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Target Topic or Conceptual Focus
              </label>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                required
                placeholder="e.g. Dynamic Programming, AVL Rotations, Banker Algorithm"
                className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-violet-500"
              />
            </div>

            {/* Difficulty Benchmark */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-2">Target Difficulty Level</label>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {[
                  { id: 'easy', label: 'Easy' },
                  { id: 'medium', label: 'Medium' },
                  { id: 'hard', label: 'Hard' },
                  { id: 'university_level', label: 'University' },
                  { id: 'competitive_level', label: 'Competitive' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setDifficulty(item.id as DifficultyLevel)}
                    className={`py-2 px-3 rounded-xl text-xs font-medium border text-center transition-all ${
                      difficulty === item.id
                        ? 'bg-violet-600 border-violet-500 text-white shadow-glow-violet'
                        : 'bg-white/[0.03] border-white/10 text-slate-400 hover:text-white'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Count & Time limit */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">Number of Questions</label>
                <select
                  value={questionCount}
                  onChange={(e) => setQuestionCount(Number(e.target.value))}
                  className="w-full bg-[#070b18] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-violet-500"
                >
                  <option value={3}>3 Questions (Quick Drill)</option>
                  <option value={5}>5 Questions (Standard)</option>
                  <option value={10}>10 Questions (Midterm Practice)</option>
                  <option value={15}>15 Questions (Full Simulation)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">Time Limit</label>
                <select
                  value={timeLimit}
                  onChange={(e) => setTimeLimit(Number(e.target.value))}
                  className="w-full bg-[#070b18] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-violet-500"
                >
                  <option value={5}>5 Minutes (Sprint)</option>
                  <option value={10}>10 Minutes</option>
                  <option value={15}>15 Minutes</option>
                  <option value={30}>30 Minutes</option>
                </select>
              </div>
            </div>

            {/* Optional Source Document */}
            {documents.length > 0 && (
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Ground in Uploaded Document (Optional)
                </label>
                <select
                  value={selectedDocId}
                  onChange={(e) => setSelectedDocId(e.target.value)}
                  className="w-full bg-[#070b18] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-violet-500"
                >
                  <option value="">General Academic Syllabus</option>
                  {documents.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.title} ({d.file_name})
                    </option>
                  ))}
                </select>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 text-white font-semibold text-xs shadow-lg shadow-violet-600/30 transition-all flex items-center justify-center gap-2 mt-4"
            >
              {loading ? (
                <>
                  <RotateCw className="w-4 h-4 animate-spin text-white" />
                  <span>Synthesizing Exam Questions & Answer Keys...</span>
                </>
              ) : (
                <>
                  <span>Launch Timed Examination</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </GlassCard>
      </div>
    </AppLayout>
  );
}
