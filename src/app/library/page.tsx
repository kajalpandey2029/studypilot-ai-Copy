'use client';

import React, { useState, useMemo, useCallback } from 'react';
import Link from 'next/link';
import { AppLayout } from '@/components/layout/AppLayout';
import { GlassCard } from '@/components/ui/GlassCard';
import { dataStore } from '@/lib/storage';
import { DocumentItem } from '@/types';
import {
  FileText,
  UploadCloud,
  Sparkles,
  Search,
  CheckCircle2,
  Layers,
  FileQuestion,
  RotateCw,
} from 'lucide-react';

export default function LibraryPage() {
  const [documents, setDocuments] = useState<DocumentItem[]>(() => dataStore.getDocuments());
  const [searchQuery, setSearchQuery] = useState('');
  const [uploadStage, setUploadStage] = useState<string | null>(null);

  const handleSimulatedUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadStage('Extracting text & metadata (25%)...');
    setTimeout(() => {
      setUploadStage('Splitting into semantic vector chunks (60%)...');
      setTimeout(() => {
        setUploadStage('Generating embeddings & citations (90%)...');
        setTimeout(() => {
          dataStore.addDocument({
            user_id: 'usr_default_pilot',
            title: file.name.replace(/\.[^/.]+$/, '').replace(/_/g, ' '),
            file_name: file.name,
            file_size_bytes: file.size || 1540000,
            file_type: file.name.endsWith('.pdf') ? 'pdf' : 'txt',
            page_count: Math.floor(Math.random() * 20) + 5,
            summary: 'Uploaded reference document parsed into semantic vector chunks for RAG question answering and citation retrieval.',
            key_concepts: ['Core Methodology', 'Algorithmic Bounds', 'Practical Invariants'],
            status: 'processed',
            content_text: `Chapter 1: Foundational Framework. This material outlines systematic processing pipelines and invariant enforcement for scalable academic computing. Section 2: Complexity bounds and edge guarantees.`,
          });
          setDocuments([...dataStore.getDocuments()]);
          setUploadStage(null);
        }, 300);
      }, 350);
    }, 400);
  }, []);

  const filteredDocs = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return documents;
    return documents.filter((d) =>
      d.title.toLowerCase().includes(query) ||
      d.file_name.toLowerCase().includes(query)
    );
  }, [documents, searchQuery]);

  return (
    <AppLayout
      title="Document Intelligence & RAG"
      subtitle="Ground truth learning assistant backed by verifiable document citations"
    >
      <div className="space-y-8">
        {/* Upload Dropzone */}
        <GlassCard variant="glow" className="p-8 border-dashed border-2 border-white/20 text-center relative overflow-hidden">
          <input
            type="file"
            accept=".pdf,.docx,.txt"
            onChange={handleSimulatedUpload}
            className="absolute inset-0 opacity-0 cursor-pointer z-10"
            disabled={Boolean(uploadStage)}
          />
          <div className="flex flex-col items-center justify-center pointer-events-none">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-violet-600 to-cyan-500 flex items-center justify-center text-white mb-4 shadow-glow-violet">
              {uploadStage ? (
                <RotateCw className="w-7 h-7 animate-spin text-cyan-300" />
              ) : (
                <UploadCloud className="w-7 h-7" />
              )}
            </div>
            <h3 className="text-base font-bold text-white mb-1">
              {uploadStage || 'Upload Lecture Slides, Textbooks, or Papers'}
            </h3>
            <p className="text-xs text-slate-400 max-w-md mb-4">
              {uploadStage
                ? 'Processing document asynchronously in background pipeline...'
                : 'Supported formats: PDF, DOCX, TXT. Documents are chunked and embedded for accurate citations.'}
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] text-slate-400 font-mono">
              <span>Automatic Citation & RAG Enabled</span>
            </div>
          </div>
        </GlassCard>

        {/* Search Bar */}
        <div className="flex items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search uploaded documents and notes..."
              className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-10 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-violet-500"
            />
          </div>
          <span className="text-xs font-mono text-slate-400">{filteredDocs.length} Documents Indexed</span>
        </div>

        {/* Document Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredDocs.map((doc) => (
            <GlassCard key={doc.id} variant="default" className="p-6 border-white/10 flex flex-col justify-between">
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-violet-500/10 border border-violet-500/20 text-violet-400 flex items-center justify-center">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white line-clamp-1">{doc.title}</h4>
                      <p className="text-[11px] text-slate-400 font-mono">
                        {doc.file_name} • {(doc.file_size_bytes / (1024 * 1024)).toFixed(1)} MB
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                    {doc.status}
                  </span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed line-clamp-3 mb-4">
                  {doc.summary || 'Document ready for grounded question answering and semantic citation extraction.'}
                </p>

                {doc.key_concepts && (
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {doc.key_concepts.map((concept, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] px-2 py-0.5 rounded-md bg-white/5 border border-white/5 text-slate-400"
                      >
                        {concept}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-white/5 flex items-center justify-between gap-2">
                <Link
                  href={`/library/${doc.id}`}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold shadow-md shadow-violet-600/30 transition-all"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Open Q&A Viewer</span>
                </Link>

                <div className="flex items-center gap-2">
                  <Link
                    href={`/quiz/create?docId=${doc.id}`}
                    className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10"
                    title="Generate Mock Exam"
                  >
                    <FileQuestion className="w-4 h-4" />
                  </Link>
                  <Link
                    href={`/flashcards`}
                    className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10"
                    title="Generate Flashcards"
                  >
                    <Layers className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
