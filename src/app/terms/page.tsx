import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { GlassCard } from '@/components/ui/GlassCard';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#03060f] text-slate-100 flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-8 pt-32 pb-24 w-full">
        <GlassCard variant="default" className="border-white/10 p-8 sm:p-12">
          <h1 className="text-3xl font-bold text-white mb-6">Terms of Service</h1>
          <p className="text-xs text-slate-400 mb-8 font-mono">Last Updated: November 2026</p>

          <div className="space-y-6 text-xs text-slate-300 leading-relaxed">
            <section>
              <h2 className="text-base font-semibold text-white mb-2">1. Educational Assistance Purpose</h2>
              <p>
                StudyPilot AI is designed to support student comprehension, active recall, document analysis, and exam readiness. Generated practice questions, solutions, and explanations are supplementary learning aids and do not constitute official accredited university examinations.
              </p>
            </section>

            <section>
              <h2 className="text-base font-semibold text-white mb-2">2. Acceptable Use</h2>
              <p>
                Users agree not to upload malicious files, exploit computational endpoints, or use the service for academic dishonesty during live proctored examinations where outside assistance is prohibited by their institution.
              </p>
            </section>

            <section>
              <h2 className="text-base font-semibold text-white mb-2">3. Subscription & Billing</h2>
              <p>
                Subscribers can manage or cancel their paid subscriptions at any time through the Settings panel. Unused quotas do not roll over across billing cycles.
              </p>
            </section>
          </div>
        </GlassCard>
      </main>
    </div>
  );
}
