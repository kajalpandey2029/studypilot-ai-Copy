'use client';

import React, { useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { GlassCard } from '@/components/ui/GlassCard';
import { dataStore } from '@/lib/storage';
import { TutorPersona, ChatMessage } from '@/types';
import {
  GraduationCap,
  Sparkles,
  Send,
  Lightbulb,
  CheckCircle2,
  HelpCircle,
  ShieldAlert,
  Flame,
  RotateCw,
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function PersonalTutorPage() {
  const profile = dataStore.getProfile();
  const [persona, setPersona] = useState<TutorPersona>('friendly_teacher');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'tutor_init_1',
      conversation_id: 'tutor_session',
      user_id: 'usr_default_pilot',
      role: 'assistant',
      content: `Hello ${profile.full_name.split(' ')[0]}! I am your AI Academic Tutor.

What topic or problem would you like to review together? We will use the **Socratic method**: I'll guide you step by step, test your intuition with diagnostic questions, and help you lock in deep understanding.`,
      created_at: new Date().toISOString(),
    },
  ]);
  const [inputPrompt, setInputPrompt] = useState('');
  const [loading, setLoading] = useState(false);

  const personas: { id: TutorPersona; name: string; tag: string; description: string; color: string }[] = [
    {
      id: 'friendly_teacher',
      name: 'Friendly Teacher',
      tag: 'Supportive & Relatable',
      description: 'Patient, warm, and builds confidence with everyday analogies and praise.',
      color: 'from-emerald-500 to-teal-600',
    },
    {
      id: 'strict_coach',
      name: 'Strict Exam Coach',
      tag: 'Disciplined & Rigorous',
      description: 'Points out loose assumptions immediately and demands strict test accuracy.',
      color: 'from-rose-500 to-red-600',
    },
    {
      id: 'research_mentor',
      name: 'Research Mentor',
      tag: 'Academic & Inquisitive',
      description: 'Probes fundamental assumptions, theoretical boundaries, and research proofs.',
      color: 'from-purple-500 to-indigo-600',
    },
    {
      id: 'programming_mentor',
      name: 'Programming Mentor',
      tag: 'Systems & Code Architect',
      description: 'Emphasizes clean code, Big-O tradeoffs, memory footprints, and debugging.',
      color: 'from-cyan-500 to-blue-600',
    },
    {
      id: 'conceptual_explainer',
      name: 'Conceptual Explainer',
      tag: 'First Principles',
      description: 'Strips away jargon to reveal simple visual intuition before code or formulas.',
      color: 'from-amber-500 to-orange-600',
    },
  ];

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputPrompt.trim() || loading) return;

    const userText = inputPrompt;
    setInputPrompt('');

    const newMessages: ChatMessage[] = [
      ...messages,
      {
        id: `usr_${Date.now()}`,
        conversation_id: 'tutor_session',
        user_id: profile.id,
        role: 'user',
        content: userText,
        created_at: new Date().toISOString(),
      },
    ];
    setMessages(newMessages);
    setLoading(true);

    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: userText,
          isTutor: true,
          persona: persona,
          subject: profile.degree || 'Computer Science & Mathematics',
          history: newMessages.slice(-4).map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      const data = await res.json();
      if (data.content) {
        setMessages([
          ...newMessages,
          {
            id: `asst_${Date.now()}`,
            conversation_id: 'tutor_session',
            user_id: profile.id,
            role: 'assistant',
            content: data.content,
            created_at: new Date().toISOString(),
          },
        ]);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppLayout
      title="Personal AI Tutor"
      subtitle="Socratic 1-on-1 guided mastery tailored to your target learning persona"
    >
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-140px)] min-h-[600px]">
        {/* Left Column: Tutor Persona Selector */}
        <div className="space-y-4">
          <GlassCard variant="default" className="p-4">
            <h3 className="text-xs font-bold uppercase tracking-wider font-mono text-cyan-400 mb-3">
              Select Tutor Persona
            </h3>
            <div className="space-y-2">
              {personas.map((p) => (
                <div
                  key={p.id}
                  onClick={() => setPersona(p.id)}
                  className={`p-3 rounded-2xl border cursor-pointer transition-all ${
                    persona === p.id
                      ? 'bg-violet-600/25 border-violet-500 shadow-glow-violet text-white'
                      : 'bg-white/[0.02] border-white/5 text-slate-400 hover:text-white hover:bg-white/[0.04]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-white">{p.name}</span>
                    <span className="text-[9px] font-mono uppercase px-1.5 py-0.2 rounded bg-white/10 text-cyan-300">
                      {p.tag}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-snug">{p.description}</p>
                </div>
              ))}
            </div>
          </GlassCard>

          {/* Socratic Rule Tip */}
          <GlassCard variant="default" className="p-4 text-xs space-y-2 text-slate-300">
            <div className="flex items-center gap-2 text-amber-400 font-semibold">
              <Lightbulb className="w-4 h-4" />
              <span>Active Recall Rule</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Your tutor will ask guiding questions and provide hints rather than immediate answers, ensuring your neural pathways build durable retention.
            </p>
          </GlassCard>
        </div>

        {/* Right 3 Cols: Tutor Dialogue */}
        <div className="lg:col-span-3 flex flex-col glass-card-glow rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
          {/* Active Persona Banner */}
          <div className="p-4 border-b border-white/10 bg-white/[0.02] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-violet-600 to-cyan-400 flex items-center justify-center text-white shadow-glow-violet">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">
                  {personas.find((p) => p.id === persona)?.name}
                </h4>
                <p className="text-[10px] text-slate-400">
                  Adaptive Socratic Mode • Active Mentorship Session
                </p>
              </div>
            </div>

            <button
              onClick={() =>
                setMessages([
                  {
                    id: `reset_${Date.now()}`,
                    conversation_id: 'tutor_session',
                    user_id: profile.id,
                    role: 'assistant',
                    content: `Session restarted. What concept would you like to explore next?`,
                    created_at: new Date().toISOString(),
                  },
                ])
              }
              className="text-[11px] px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10"
            >
              Restart Dialogue
            </button>
          </div>

          {/* Dialogue Stream */}
          <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-5">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3.5 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.role === 'assistant' && (
                  <div className="w-8 h-8 rounded-xl bg-violet-600/30 border border-violet-500/30 flex items-center justify-center text-violet-300 shrink-0">
                    <Sparkles className="w-4 h-4 text-cyan-300" />
                  </div>
                )}

                <div
                  className={`max-w-[85%] rounded-2xl p-4 sm:p-5 text-xs sm:text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-violet-600 text-white font-medium rounded-tr-sm shadow-md'
                      : 'glass-panel border-white/10 text-slate-200 rounded-tl-sm shadow-lg'
                  }`}
                >
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {msg.content}
                  </ReactMarkdown>
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex gap-3 items-center text-slate-400 text-xs">
                <RotateCw className="w-4 h-4 text-cyan-400 animate-spin" />
                <span className="font-mono animate-pulse">Your tutor is formulating the next guided question...</span>
              </div>
            )}
          </div>

          {/* Input Form */}
          <div className="p-4 border-t border-white/10 bg-[#070b18]/80 backdrop-blur-xl">
            <form onSubmit={handleSend} className="flex items-center gap-3">
              <input
                type="text"
                value={inputPrompt}
                onChange={(e) => setInputPrompt(e.target.value)}
                placeholder="Reply to tutor or introduce a new problem..."
                className="flex-1 bg-white/[0.04] border border-white/10 rounded-2xl px-5 py-3 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-violet-500 transition-colors"
              />
              <button
                type="submit"
                disabled={loading || !inputPrompt.trim()}
                className="px-5 py-3 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 text-white font-semibold text-xs shadow-lg shadow-violet-600/30 disabled:opacity-40 transition-all flex items-center gap-2"
              >
                <span>Respond</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
