'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { LandingHero } from '@/components/landing/LandingHero';
import {
  BrainCircuit,
  GraduationCap,
  FileText,
  FileQuestion,
  Layers,
  CalendarCheck,
  BarChart3,
  Code2,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  ChevronDown,
  Quote,
  Target,
  Zap,
} from 'lucide-react';

export default function LandingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const features = [
    {
      icon: BrainCircuit,
      title: 'Adaptive Study Workspace',
      description: 'Switch seamlessly between Beginner, Intermediate, Advanced, and Exam-Oriented explanations. Never get stuck on dense academic jargon.',
      color: 'from-violet-500 to-indigo-600',
    },
    {
      icon: FileText,
      title: 'Document Intelligence & RAG',
      description: 'Upload lecture slides, textbooks, and research papers (PDF/DOCX/TXT). Query complex chapters with grounded citations and page numbers.',
      color: 'from-cyan-500 to-blue-600',
    },
    {
      icon: FileQuestion,
      title: 'Smart Examination Engine',
      description: 'Generate timed adaptive mock tests with single/multi MCQ, true/false, fill-in-blanks, and code debugging questions with detailed rationales.',
      color: 'from-amber-500 to-rose-600',
    },
    {
      icon: Layers,
      title: 'SuperMemo-2 Spaced Repetition',
      description: 'Scientific memory optimization that automatically schedules reviews right before you forget, backed by cognitive decay curves.',
      color: 'from-emerald-500 to-teal-600',
    },
    {
      icon: CalendarCheck,
      title: 'Intelligent Study Planner',
      description: 'Dynamic schedule generation that factors in your upcoming exam deadlines, daily available hours, and identified weak concepts.',
      color: 'from-pink-500 to-purple-600',
    },
    {
      icon: BarChart3,
      title: 'Evidence-Based Analytics',
      description: 'Track topic mastery, accuracy trends, study streaks, and cognitive recall with interactive visualizations.',
      color: 'from-blue-500 to-indigo-600',
    },
    {
      icon: Code2,
      title: 'Programming Practice Lab',
      description: 'Solve algorithm problems in C, C++, Python, Java, and JavaScript with step-by-step AI debugging and Big-O complexity analysis.',
      color: 'from-violet-500 to-cyan-500',
    },
    {
      icon: GraduationCap,
      title: '5 Persona AI Tutors',
      description: 'Choose your mentor style: Friendly Teacher, Strict Exam Coach, Research Mentor, Programming Mentor, or Conceptual Explainer.',
      color: 'from-indigo-500 to-pink-500',
    },
  ];

  const faqs = [
    {
      q: 'How is StudyPilot AI different from general chatbots?',
      a: 'General chatbots simply answer questions in a generic tone. StudyPilot AI is a comprehensive learning OS: it diagnoses what you understand, tracks your weak topics, schedules reviews using spaced repetition (SM-2), and generates grounded mock examinations with page-level citations from your course materials.',
    },
    {
      q: 'Does StudyPilot AI hallucinate citations from my uploaded documents?',
      a: 'No. Our Document Intelligence engine implements rigorous Retrieval-Augmented Generation (RAG). Every answer cites the exact document title, section, and page number, distinguishing document facts from general concepts.',
    },
    {
      q: 'Can I use my own Google Gemini API key?',
      a: 'Yes! StudyPilot AI provides a built-in settings interface where you can input your own Google Gemini API key for high-speed generative synthesis, or rely on our configured platform defaults.',
    },
    {
      q: 'How does the adaptive exam scoring work?',
      a: 'The assessment engine evaluates your objective and coding answers, identifies conceptual patterns where errors occurred, calculates accuracy percentages, and automatically updates your weak topics and study plan.',
    },
    {
      q: 'Is there a free tier for university and school students?',
      a: 'Yes, our Free Tier provides access to the AI study workspace, flashcards, document uploads, and basic mock quizzes with zero credit card required.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#03060f] text-slate-100 flex flex-col selection:bg-violet-600 selection:text-white">
      <Navbar />

      <main className="flex-1">
        {/* 1. Hero Section */}
        <LandingHero />

        {/* 2. Feature Grid Showcase */}
        <section id="features" className="py-24 px-4 sm:px-8 max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/30">
              Complete Educational Architecture
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mt-4 mb-4">
              Designed for Unstoppable Academic Mastery
            </h2>
            <p className="text-slate-400 text-sm sm:text-base">
              Every tool a student needs—from first-encounter understanding to exam-day confidence—orchestrated in one unified spatial environment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feat, idx) => {
              const Icon = feat.icon;
              return (
                <div
                  key={idx}
                  className="glass-panel-interactive rounded-3xl p-6 border border-white/10 flex flex-col justify-between group"
                >
                  <div>
                    <div
                      className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${feat.color} p-[1px] shadow-lg mb-5 group-hover:scale-105 transition-transform`}
                    >
                      <div className="w-full h-full bg-[#080d1e] rounded-[15px] flex items-center justify-center">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <h3 className="text-base font-semibold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                      {feat.title}
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {feat.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/5 flex items-center gap-1 text-xs font-medium text-violet-400 group-hover:text-cyan-300 transition-colors">
                    <span>Explore module</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 3. Deep Dive: Document Intelligence */}
        <section id="workspace" className="py-20 px-4 sm:px-8 bg-gradient-to-b from-transparent via-violet-950/10 to-transparent">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-xs font-mono uppercase text-violet-400 font-semibold px-3 py-1 rounded-full bg-violet-950/40 border border-violet-500/30">
                Ground-Truth Document Intelligence
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mt-4 mb-6">
                Turn Dense 500-Page Textbooks into Interactive Knowledge
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
                Upload your syllabus, research papers, and lecture slides. StudyPilot analyzes the content, generates structured summaries, and answers questions with precise citations and page references.
              </p>

              <div className="space-y-3.5 mb-8">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                  <p className="text-xs sm:text-sm text-slate-300">
                    <strong className="text-white">Strict Grounding:</strong> Verifiable facts mapped to specific textbook pages and chapters.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                  <p className="text-xs sm:text-sm text-slate-300">
                    <strong className="text-white">One-Click Exam Notes:</strong> Extract key definitions, recurring formulas, and sample questions in seconds.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                  <p className="text-xs sm:text-sm text-slate-300">
                    <strong className="text-white">Auto Flashcard Extraction:</strong> Convert complex passages into high-yield active-recall cards automatically.
                  </p>
                </div>
              </div>

              <Link
                href="/library"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold shadow-lg shadow-violet-600/30 transition-all"
              >
                <span>Try Document Intelligence</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Document Spatial Preview Card */}
            <div className="glass-card-glow rounded-3xl p-6 border border-white/10 shadow-2xl">
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-violet-500/20 text-violet-300 border border-violet-500/30">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-white">Lecture_08_Trees_Graphs.pdf</h4>
                    <p className="text-[10px] text-slate-400">24 Pages • Processed & Indexed with Citations</p>
                  </div>
                </div>
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Ready
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 mb-4 text-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-cyan-300">Query Result</span>
                  <span className="font-mono text-[10px] text-slate-400">Page 14, Section 3.2</span>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  "When an insertion causes a node's balance factor to become +2 and its child -1, a single rotation fails because the inner grandchild remains unlifted. An LR double rotation performs a left rotation on the child, followed by a right rotation on the parent."
                </p>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-violet-950/30 border border-violet-500/20 text-xs">
                <span className="text-slate-300">Generate 5 Mock Exam Questions from this excerpt?</span>
                <Link
                  href="/quiz/create"
                  className="px-3 py-1.5 rounded-lg bg-violet-600 hover:bg-violet-500 text-white font-medium text-[11px] transition-colors"
                >
                  Generate Now →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* 4. Adaptive Exam Engine Spotlight */}
        <section id="exam-engine" className="py-20 px-4 sm:px-8 max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono uppercase tracking-wider text-rose-400 font-semibold px-3 py-1 rounded-full bg-rose-950/40 border border-rose-500/30">
              Exam Simulation Engine
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mt-4 mb-4">
              Real Exam Pressure. Zero Surprises.
            </h2>
            <p className="text-slate-400 text-sm sm:text-base">
              Practice with dynamic timers, mark-for-review navigation, realistic scoring, and instant diagnostic breakdowns that flag your exact conceptual traps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass-panel rounded-3xl p-6 border border-white/10">
              <div className="text-2xl font-bold text-violet-400 mb-2">01</div>
              <h3 className="text-base font-semibold text-white mb-2">Configurable Difficulty</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Choose between Easy, Medium, Hard, University Exam level, or Competitive Exam benchmarks to match your exact test syllabus.
              </p>
            </div>
            <div className="glass-panel rounded-3xl p-6 border border-white/10">
              <div className="text-2xl font-bold text-cyan-400 mb-2">02</div>
              <h3 className="text-base font-semibold text-white mb-2">All Assessment Formats</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Supports single-choice MCQ, multi-select, True/False, fill-in-the-blanks, output-based code analysis, and short answers.
              </p>
            </div>
            <div className="glass-panel rounded-3xl p-6 border border-white/10">
              <div className="text-2xl font-bold text-emerald-400 mb-2">03</div>
              <h3 className="text-base font-semibold text-white mb-2">Adaptive Weak Topic Feedback</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Every incorrect attempt feeds directly into your personal knowledge profile, scheduling targeted revisions automatically.
              </p>
            </div>
          </div>
        </section>

        {/* 5. Pricing Tiers */}
        <section id="pricing" className="py-20 px-4 sm:px-8 max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/30">
              Transparent Pricing
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mt-4 mb-3">
              Invest in Your Academic Excellence
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm">
              Free forever for individual self-study. Upgrade anytime for higher quotas and multi-document RAG synthesis.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Free Plan */}
            <div className="glass-panel rounded-3xl p-8 border border-white/10 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold text-white mb-1">Scholar Free</h3>
                <p className="text-xs text-slate-400 mb-6">Essential AI study tools for every student.</p>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl font-extrabold text-white">$0</span>
                  <span className="text-xs text-slate-400">/ forever</span>
                </div>

                <div className="space-y-3 text-xs text-slate-300">
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>50 AI study queries per day</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>5 Document uploads (up to 25MB each)</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Adaptive mock quizzes & timer</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>SuperMemo-2 spaced repetition decks</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Daily study planner & streak tracker</span>
                  </div>
                </div>
              </div>

              <Link
                href="/dashboard"
                className="mt-8 block text-center py-3 rounded-xl border border-white/20 text-white font-medium text-xs hover:bg-white/5 transition-colors"
              >
                Get Started Free
              </Link>
            </div>

            {/* Pro Plan */}
            <div className="glass-card-glow rounded-3xl p-8 border border-violet-500/40 relative flex flex-col justify-between shadow-glow-violet">
              <div className="absolute top-4 right-4 text-[10px] font-mono uppercase px-2.5 py-0.5 rounded-full bg-violet-600 text-white font-bold">
                Most Popular
              </div>

              <div>
                <h3 className="text-lg font-bold text-white mb-1">StudyPilot Pro</h3>
                <p className="text-xs text-slate-400 mb-6">Uncapped intelligence for competitive exams & top grades.</p>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl font-extrabold text-white">$12</span>
                  <span className="text-xs text-slate-400">/ month</span>
                </div>

                <div className="space-y-3 text-xs text-slate-300">
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                    <span>Unlimited AI study queries with Gemini Pro</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                    <span>Unlimited document uploads & full cross-book RAG</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                    <span>5 Dedicated AI Tutor Personas with voice simulation</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                    <span>Programming Lab sandbox in 5 languages</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                    <span>Personal Knowledge Graph & Weakness Radar</span>
                  </div>
                </div>
              </div>

              <Link
                href="/pricing"
                className="mt-8 block text-center py-3 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-semibold text-xs shadow-lg shadow-violet-600/30 transition-all"
              >
                Upgrade to Pro
              </Link>
            </div>
          </div>
        </section>

        {/* 6. FAQ Section */}
        <section className="py-20 px-4 sm:px-8 max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">Frequently Asked Questions</h2>
            <p className="text-xs sm:text-sm text-slate-400">Everything you need to know about StudyPilot AI.</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="glass-panel rounded-2xl border border-white/10 overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full text-left p-5 flex items-center justify-between text-sm font-medium text-white hover:text-cyan-300"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 transition-transform ${
                      openFaq === idx ? 'rotate-180 text-cyan-400' : ''
                    }`}
                  />
                </button>
                {openFaq === idx && (
                  <div className="px-5 pb-5 text-xs text-slate-300 leading-relaxed border-t border-white/5 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="glass-panel border-t border-white/10 py-12 px-4 sm:px-8 mt-20 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-violet-600 to-cyan-400 flex items-center justify-center text-white">
              <Sparkles className="w-4 h-4" />
            </div>
            <span className="font-semibold text-white">StudyPilot AI</span>
            <span>— Learn Smarter. Remember Longer. Achieve More.</span>
          </div>

          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link>
            <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">GitHub</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
