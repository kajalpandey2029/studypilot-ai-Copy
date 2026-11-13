'use client';

import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import Link from 'next/link';
import { AppLayout } from '@/components/layout/AppLayout';
import { GlassCard } from '@/components/ui/GlassCard';
import { MarkdownRenderer } from '@/components/ui/MarkdownRenderer';
import { dataStore } from '@/lib/storage';
import { StudyMode, ChatMessage, Conversation } from '@/types';
import {
  BrainCircuit,
  Sparkles,
  Send,
  Copy,
  Check,
  RotateCw,
  Plus,
  BookOpen,
} from 'lucide-react';

const MODES: { id: StudyMode; label: string; desc: string }[] = [
  { id: 'beginner', label: 'Beginner', desc: 'Analogies & intuitive concepts' },
  { id: 'intermediate', label: 'Intermediate', desc: 'Balanced theory & examples' },
  { id: 'advanced', label: 'Advanced', desc: 'Architectural & edge-case proofs' },
  { id: 'exam_oriented', label: 'Exam High-Yield', desc: 'Midterm formulas & common traps' },
  { id: 'step_by_step', label: 'Step-by-Step', desc: 'Sequential numbered walkthrough' },
  { id: 'research_oriented', label: 'Research Frontier', desc: 'State-of-the-art literature' },
];

export default function StudyWorkspacePage() {
  const subjects = useMemo(() => dataStore.getSubjects(), []);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConvId, setActiveConvId] = useState<string>('conv_1');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputPrompt, setInputPrompt] = useState('');
  const [selectedMode, setSelectedMode] = useState<StudyMode>('intermediate');
  const [selectedSubject, setSelectedSubject] = useState(subjects[0]?.name || 'Computer Science');
  const [loading, setLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const convs = dataStore.getConversations();
    setConversations(convs);
    if (convs.length > 0) {
      setActiveConvId(convs[0].id);
      setMessages(dataStore.getMessages(convs[0].id));
    }
  }, []);

  useEffect(() => {
    if (activeConvId) {
      setMessages(dataStore.getMessages(activeConvId));
    }
  }, [activeConvId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleSendMessage = useCallback(async (e?: React.FormEvent, overrideText?: string) => {
    if (e) e.preventDefault();
    const textToSend = overrideText || inputPrompt;
    if (!textToSend.trim() || loading) return;

    dataStore.addMessage(activeConvId, 'user', textToSend);
    setMessages([...dataStore.getMessages(activeConvId)]);
    setInputPrompt('');
    setLoading(true);

    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: textToSend,
          mode: selectedMode,
          subject: selectedSubject,
          history: messages.slice(-4).map((m) => ({ role: m.role, content: m.content })),
          stream: true,
        }),
      });

      if (res.body) {
        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let accumulated = '';
        const assistantMsg = dataStore.addMessage(activeConvId, 'assistant', '');
        setLoading(false);

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          accumulated += decoder.decode(value, { stream: true });
          assistantMsg.content = accumulated;
          setMessages([...dataStore.getMessages(activeConvId)]);
        }
      } else {
        const data = await res.json();
        if (data.content) {
          dataStore.addMessage(activeConvId, 'assistant', data.content);
          setMessages([...dataStore.getMessages(activeConvId)]);
        }
      }
    } catch (err) {
      console.error(err);
      dataStore.addMessage(
        activeConvId,
        'assistant',
        'Could not generate study response. Please verify network connectivity or API key.'
      );
      setMessages([...dataStore.getMessages(activeConvId)]);
    } finally {
      setLoading(false);
    }
  }, [activeConvId, inputPrompt, loading, messages, selectedMode, selectedSubject]);

  const handleNewSession = useCallback(() => {
    const newConv = dataStore.createConversation(`Study Session • ${selectedSubject}`, selectedMode);
    setConversations([...dataStore.getConversations()]);
    setActiveConvId(newConv.id);
  }, [selectedMode, selectedSubject]);

  const handleCopy = useCallback((text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  }, []);

  return (
    <AppLayout
      title="AI Study Workspace"
      subtitle="Interactive academic reasoning with configurable depth levels"
      action={
        <button
          onClick={handleNewSession}
          className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold shadow-md shadow-violet-600/30 transition-all"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>New Session</span>
        </button>
      }
    >
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-140px)] min-h-[600px]">
        {/* Left Column: Session History & Mode Selector */}
        <div className="hidden lg:flex flex-col gap-4">
          {/* Mode Selector Panel */}
          <GlassCard variant="default" className="p-4 space-y-2.5">
            <h3 className="text-xs font-bold uppercase tracking-wider font-mono text-cyan-400 mb-2">
              Explanation Depth
            </h3>
            <div className="space-y-1.5">
              {MODES.map((m) => (
                <button
                  key={m.id}
                  onClick={() => setSelectedMode(m.id)}
                  className={`w-full text-left p-2 rounded-xl text-xs transition-all ${
                    selectedMode === m.id
                      ? 'bg-violet-600 text-white font-semibold shadow-glow-violet'
                      : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
                  }`}
                >
                  <p className="font-medium">{m.label}</p>
                  <p className="text-[10px] text-slate-400 opacity-80">{m.desc}</p>
                </button>
              ))}
            </div>
          </GlassCard>

          {/* Past Sessions List */}
          <GlassCard variant="default" className="p-4 flex-1 flex flex-col overflow-hidden">
            <h3 className="text-xs font-bold uppercase tracking-wider font-mono text-slate-400 mb-3">
              Study History
            </h3>
            <div className="space-y-2 overflow-y-auto flex-1 pr-1">
              {conversations.map((conv) => (
                <div
                  key={conv.id}
                  onClick={() => setActiveConvId(conv.id)}
                  className={`p-2.5 rounded-xl text-xs cursor-pointer transition-all ${
                    activeConvId === conv.id
                      ? 'bg-white/[0.08] text-white border border-white/10'
                      : 'text-slate-400 hover:text-white hover:bg-white/[0.03]'
                  }`}
                >
                  <p className="font-medium truncate">{conv.title}</p>
                  <p className="text-[10px] text-slate-500 font-mono mt-0.5">
                    {new Date(conv.created_at).toLocaleDateString()} • {conv.mode}
                  </p>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>

        {/* Right 3 Cols: Active Chat Workspace */}
        <div className="lg:col-span-3 flex flex-col glass-card-glow rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
          {/* Header Controls */}
          <div className="p-4 border-b border-white/10 bg-white/[0.02] flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
              <span className="text-xs font-medium text-slate-400 flex items-center gap-1 shrink-0">
                <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
                <span>Subject:</span>
              </span>
              {subjects.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setSelectedSubject(s.name)}
                  className={`text-xs px-2.5 py-1 rounded-lg shrink-0 transition-all ${
                    selectedSubject === s.name
                      ? 'bg-violet-600/30 text-white border border-violet-500/50 shadow-sm'
                      : 'bg-white/5 text-slate-400 hover:text-white'
                  }`}
                >
                  {s.name}
                </button>
              ))}
            </div>

            <div className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-violet-950/40 border border-violet-500/30 text-violet-300">
              Active Mode: {selectedMode.toUpperCase()}
            </div>
          </div>

          {/* Messages Stream */}
          <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-6">
            {messages.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-400">
                <div className="w-14 h-14 rounded-2xl bg-violet-600/10 border border-violet-500/20 flex items-center justify-center text-violet-400 mb-4 shadow-glow-violet">
                  <BrainCircuit className="w-7 h-7" />
                </div>
                <h3 className="text-base font-semibold text-white mb-2">What shall we master today?</h3>
                <p className="text-xs max-w-md text-slate-400 mb-6 leading-relaxed">
                  Ask any academic question, paste complicated code, or request a step-by-step problem breakdown.
                </p>

                <div className="flex flex-wrap justify-center gap-2 max-w-lg">
                  {[
                    'Explain AVL tree rotations with a visual diagram',
                    'Walk me through Dijkstra shortest path step by step',
                    'How does Transformer scaled dot-product attention work?',
                    'Explain ACID transaction isolation levels with examples',
                  ].map((preset, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSendMessage(undefined, preset)}
                      className="text-xs px-3 py-1.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 border border-white/10 transition-colors"
                    >
                      {preset}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-3.5 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.role === 'assistant' && (
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-violet-600 to-indigo-600 flex items-center justify-center text-white shrink-0 shadow-glow-violet">
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
                    {msg.role === 'user' ? (
                      <p className="whitespace-pre-wrap">{msg.content}</p>
                    ) : (
                      <div className="space-y-3">
                        <MarkdownRenderer content={msg.content} />

                        {/* Action buttons on assistant message */}
                        <div className="flex items-center gap-3 pt-3 border-t border-white/10 text-[11px] text-slate-400">
                          <button
                            onClick={() => handleCopy(msg.content, msg.id)}
                            className="flex items-center gap-1 hover:text-cyan-300 transition-colors"
                          >
                            {copiedId === msg.id ? (
                              <>
                                <Check className="w-3.5 h-3.5 text-emerald-400" />
                                <span className="text-emerald-400">Copied</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3.5 h-3.5" />
                                <span>Copy Notes</span>
                              </>
                            )}
                          </button>

                          <Link
                            href={`/quiz/create?topic=${encodeURIComponent(msg.content.slice(0, 40))}`}
                            className="hover:text-cyan-300 transition-colors flex items-center gap-1"
                          >
                            <span>Generate Quiz</span>
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}

            {loading && (
              <div className="flex gap-3 items-center text-slate-400 text-xs">
                <div className="w-8 h-8 rounded-xl bg-violet-600/30 border border-violet-500/40 flex items-center justify-center text-white animate-spin">
                  <RotateCw className="w-4 h-4 text-cyan-400" />
                </div>
                <span className="font-mono animate-pulse">Connecting to streaming AI engine...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Bottom Chat Input Form */}
          <div className="p-4 border-t border-white/10 bg-[#070b18]/80 backdrop-blur-xl">
            <form onSubmit={(e) => handleSendMessage(e)} className="flex items-center gap-3">
              <input
                type="text"
                value={inputPrompt}
                onChange={(e) => setInputPrompt(e.target.value)}
                placeholder="Ask an academic question or paste concept name..."
                className="flex-1 bg-white/[0.04] border border-white/10 rounded-2xl px-5 py-3 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-violet-500 transition-colors"
              />
              <button
                type="submit"
                disabled={loading || !inputPrompt.trim()}
                className="px-5 py-3 rounded-2xl bg-gradient-to-r from-violet-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 text-white font-semibold text-xs shadow-lg shadow-violet-600/30 disabled:opacity-40 transition-all flex items-center gap-2"
              >
                <span>Synthesize</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
