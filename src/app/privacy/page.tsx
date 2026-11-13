import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { GlassCard } from '@/components/ui/GlassCard';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#03060f] text-slate-100 flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-8 pt-32 pb-24 w-full">
        <GlassCard variant="default" className="border-white/10 p-8 sm:p-12">
          <h1 className="text-3xl font-bold text-white mb-6">Privacy Policy</h1>
          <p className="text-xs text-slate-400 mb-8 font-mono">Last Updated: November 2026</p>

          <div className="space-y-6 text-xs text-slate-300 leading-relaxed">
            <section>
              <h2 className="text-base font-semibold text-white mb-2">1. Student Data Protection</h2>
              <p>
                StudyPilot AI is engineered with rigorous data isolation principles. Your study notes, uploaded PDFs, exam scores, and chat conversations are bound strictly to your authenticated account using Row Level Security (RLS). We never sell your personal data or academic history to third-party advertisers.
              </p>
            </section>

            <section>
              <h2 className="text-base font-semibold text-white mb-2">2. Processing of Uploaded Documents</h2>
              <p>
                When you upload textbooks, syllabus PDFs, or lecture notes, they are processed solely to create local semantic search chunks and generate your requested study notes, flashcards, or examination questions. Your files remain your property.
              </p>
            </section>

            <section>
              <h2 className="text-base font-semibold text-white mb-2">3. Artificial Intelligence Safety & Grounding</h2>
              <p>
                Interactions with AI models use secure server-to-server endpoints. Document contents are treated as untrusted inputs to protect against prompt injection and ensure grounded responses.
              </p>
            </section>
          </div>
        </GlassCard>
      </main>
    </div>
  );
}
