'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { AppLayout } from '@/components/layout/AppLayout';
import { GlassCard } from '@/components/ui/GlassCard';
import { dataStore } from '@/lib/storage';
import {
  FileText,
  Sparkles,
  Send,
  ArrowLeft,
  Quote,
  Layers,
  FileQuestion,
  RotateCw,
  BookOpen,
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function DocumentViewerPage() {
  const params = useParams();
  const docId = params.id as string;
  const doc = dataStore.getDocument(docId) || dataStore.getDocuments()[0];

  const [query, setQuery] = useState('');
  const [qaHistory, setQaHistory] = useState<
    { q: string; a: string; citation?: { page: number; text: string } }[]
  >([
    {
      q: 'What is the primary condition that triggers an LR rotation?',
      a: 'An LR rotation is triggered when a parent node is left-heavy (Balance Factor = +2) and its left child is right-heavy (Balance Factor = -1). A single right rotation fails because the deep inner grandchild is merely transferred; an LR rotation first straightens the subtree and then lifts the grandchild to the local root.',
      citation: {
        page: 14,
        text: 'Chapter 1: Self-Balancing Binary Trees. When an insertion causes the balance factor to become 2 or -2, a single or double rotation restores the invariant in O(1) pointer updates.',
      },
    },
  ]);
  const [loading, setLoading] = useState(false);

  const handleAsk = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim() || loading) return;

    const currentQ = query;
    setQuery('');
    setLoading(true);

    try {
      const res = await fetch('/api/ai/document-qa', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: currentQ,
          documentTitle: doc.title,
          documentContent: doc.content_text,
          pageCount: doc.page_count,
        }),
      });

      const data = await res.json();
      if (data.answer) {
        setQaHistory((prev) => [
          ...prev,
          {
            q: currentQ,
            a: data.answer,
            citation: data.citations?.[0]
              ? { page: data.citations[0].page_number, text: data.citations[0].snippet }
              : undefined,
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
      title={doc.title}
      subtitle={`Document Research & Grounded Question Answering • ${doc.page_count} Pages`}
      action={
        <Link
          href="/library"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs border border-white/10"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>All Documents</span>
        </Link>
      }
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-140px)] min-h-[600px]">
        {/* Left Column: Document Overview & Text Excerpt */}
        <div className="glass-panel rounded-3xl p-6 border border-white/10 overflow-y-auto space-y-6 flex flex-col">
          <div className="flex items-center justify-between pb-4 border-b border-white/10">
            <div>
              <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-violet-500/20 text-violet-300 border border-violet-500/30">
                PDF Source Text
              </span>
              <h3 className="text-base font-bold text-white mt-1.5">{doc.file_name}</h3>
            </div>
            <div className="flex gap-2">
              <Link
                href={`/quiz/create?docId=${doc.id}`}
                className="px-3 py-1.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold shadow-md flex items-center gap-1"
              >
                <FileQuestion className="w-3.5 h-3.5" />
                <span>Exam</span>
              </Link>
              <Link
                href={`/flashcards`}
                className="px-3 py-1.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold shadow-md flex items-center gap-1"
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Cards</span>
              </Link>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase font-mono mb-2">Executive Summary</h4>
            <p className="text-xs text-slate-300 leading-relaxed bg-white/[0.03] p-4 rounded-2xl border border-white/5">
              {doc.summary}
            </p>
          </div>

          <div className="flex-1">
            <h4 className="text-xs font-bold text-slate-400 uppercase font-mono mb-2">Indexed Passage Extracted</h4>
            <div className="text-xs text-slate-300 leading-relaxed bg-white/[0.02] p-4 rounded-2xl border border-white/5 font-mono space-y-3 whitespace-pre-wrap">
              {doc.content_text || 'Document content indexed for grounded citations.'}
            </div>
          </div>
        </div>

        {/* Right Column: Grounded AI Q&A with Citations */}
        <div className="glass-card-glow rounded-3xl border border-white/10 flex flex-col overflow-hidden shadow-2xl">
          <div className="p-4 border-b border-white/10 bg-white/[0.02] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <h3 className="text-xs font-bold text-white uppercase font-mono">Grounded Document Q&A</h3>
            </div>
            <span className="text-[10px] text-slate-400 font-mono">RAG Mode Active</span>
          </div>

          {/* QA Thread */}
          <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-5">
            {qaHistory.map((item, idx) => (
              <div key={idx} className="space-y-3">
                {/* Question */}
                <div className="flex justify-end">
                  <div className="p-3.5 rounded-2xl bg-violet-600 text-white text-xs font-medium max-w-[85%] rounded-tr-sm">
                    {item.q}
                  </div>
                </div>

                {/* Answer with Citation */}
                <div className="flex justify-start">
                  <div className="p-4 rounded-2xl glass-panel border-white/10 text-xs text-slate-200 max-w-[90%] rounded-tl-sm space-y-3">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {item.a}
                    </ReactMarkdown>

                    {item.citation && (
                      <div className="mt-3 pt-3 border-t border-white/10 bg-white/[0.03] p-2.5 rounded-xl flex items-start gap-2">
                        <Quote className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-mono font-bold text-cyan-300">
                              Citation: Page {item.citation.page}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-400 italic mt-0.5 line-clamp-2">
                            &quot;{item.citation.text}&quot;
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <RotateCw className="w-4 h-4 text-cyan-400 animate-spin" />
                <span className="font-mono">Searching document chunks and formulating citation...</span>
              </div>
            )}
          </div>

          {/* Prompt Input */}
          <div className="p-4 border-t border-white/10 bg-[#070b18]/80">
            <form onSubmit={handleAsk} className="flex items-center gap-2">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ask anything about this document..."
                className="flex-1 bg-white/[0.04] border border-white/10 rounded-2xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-violet-500"
              />
              <button
                type="submit"
                disabled={loading || !query.trim()}
                className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-violet-600 to-cyan-500 text-white font-semibold text-xs shadow-md disabled:opacity-40 flex items-center gap-1.5"
              >
                <span>Ask</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
