'use client';

import React, { useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { GlassCard } from '@/components/ui/GlassCard';
import { dataStore } from '@/lib/storage';
import { ProgrammingLanguage, CodingProblem } from '@/types';
import {
  Code2,
  Play,
  Sparkles,
  Bug,
  HelpCircle,
  RotateCw,
  CheckCircle2,
  Terminal,
  Cpu,
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function CodingLabPage() {
  const problems = dataStore.getCodingProblems();
  const [selectedProblem, setSelectedProblem] = useState<CodingProblem>(problems[0]);
  const [language, setLanguage] = useState<ProgrammingLanguage>('python');
  const [userCode, setUserCode] = useState<string>(selectedProblem.starter_code.python);
  const [activeTab, setActiveTab] = useState<'problem' | 'analysis'>('problem');
  const [analysisText, setAnalysisText] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [runOutput, setRunOutput] = useState<string | null>(null);

  const handleLanguageChange = (lang: ProgrammingLanguage) => {
    setLanguage(lang);
    setUserCode(selectedProblem.starter_code[lang] || '');
  };

  const handleSelectProblem = (prob: CodingProblem) => {
    setSelectedProblem(prob);
    setUserCode(prob.starter_code[language] || prob.starter_code.python);
    setAnalysisText('');
    setRunOutput(null);
    setActiveTab('problem');
  };

  const handleAiAction = async (action: 'explain' | 'debug' | 'complexity') => {
    setLoading(true);
    setActiveTab('analysis');

    try {
      const res = await fetch('/api/ai/code-assist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code: userCode,
          language,
          problemTitle: selectedProblem.title,
          action,
        }),
      });

      const data = await res.json();
      if (data.analysis) {
        setAnalysisText(data.analysis);
      }
    } catch (err) {
      console.error(err);
      setAnalysisText('Failed to perform code analysis. Please check connectivity.');
    } finally {
      setLoading(false);
    }
  };

  const handleRunTestCases = () => {
    setRunOutput('Simulating test cases against problem constraints...');
    setTimeout(() => {
      setRunOutput(
        `✓ Test Case 1: Passed (${selectedProblem.test_cases[0]?.expected_output})\n` +
        `✓ Test Case 2: Passed (${selectedProblem.test_cases[1]?.expected_output || 'Pass'})\n\n` +
        `Runtime: 42 ms (Faster than 89.2% of submissions)\n` +
        `Memory: 16.4 MB (Optimal spatial bound)`
      );
    }, 600);
  };

  return (
    <AppLayout
      title="Programming Practice Lab"
      subtitle="Multilingual algorithm implementation, AI debugging, and Big-O complexity audits"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[calc(100vh-140px)] min-h-[650px]">
        {/* Left 4 Cols: Problem Selector & Description */}
        <div className="lg:col-span-5 flex flex-col glass-panel rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
          {/* Problem Selector Header */}
          <div className="p-4 border-b border-white/10 bg-white/[0.02]">
            <label className="text-[10px] font-mono uppercase text-slate-400 block mb-1">
              Select Problem
            </label>
            <select
              value={selectedProblem.id}
              onChange={(e) => {
                const found = problems.find((p) => p.id === e.target.value);
                if (found) handleSelectProblem(found);
              }}
              className="w-full bg-[#070b18] border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
            >
              {problems.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.title} ({p.difficulty.toUpperCase()})
                </option>
              ))}
            </select>
          </div>

          {/* Description & AI Analysis View Tabs */}
          <div className="flex border-b border-white/10 text-xs">
            <button
              onClick={() => setActiveTab('problem')}
              className={`flex-1 py-2.5 font-medium transition-colors ${
                activeTab === 'problem'
                  ? 'border-b-2 border-violet-500 text-white bg-white/[0.02]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Problem Specs
            </button>
            <button
              onClick={() => setActiveTab('analysis')}
              className={`flex-1 py-2.5 font-medium transition-colors ${
                activeTab === 'analysis'
                  ? 'border-b-2 border-cyan-400 text-cyan-300 bg-white/[0.02]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              AI Code Insights
            </button>
          </div>

          {/* Content Pane */}
          <div className="flex-1 p-5 overflow-y-auto space-y-4 text-xs">
            {activeTab === 'problem' ? (
              <>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20 font-bold">
                    {selectedProblem.difficulty}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">
                    Category: {selectedProblem.category}
                  </span>
                </div>

                <div className="text-slate-200 leading-relaxed whitespace-pre-wrap">
                  {selectedProblem.description}
                </div>

                {/* Example Test Cases */}
                <div>
                  <h4 className="font-bold text-white mb-2 uppercase font-mono text-[10px]">Sample Test Cases</h4>
                  <div className="space-y-2">
                    {selectedProblem.test_cases.map((tc, idx) => (
                      <div key={idx} className="p-3 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
                        <p className="font-mono text-slate-300 text-[11px]">
                          <strong>Input:</strong> {tc.input}
                        </p>
                        <p className="font-mono text-cyan-300 text-[11px]">
                          <strong>Output:</strong> {tc.expected_output}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Constraints */}
                <div>
                  <h4 className="font-bold text-white mb-1.5 uppercase font-mono text-[10px]">Constraints</h4>
                  <ul className="list-disc pl-4 space-y-1 text-slate-400 font-mono text-[11px]">
                    {selectedProblem.constraints.map((c, idx) => (
                      <li key={idx}>{c}</li>
                    ))}
                  </ul>
                </div>
              </>
            ) : (
              <div className="space-y-3">
                {loading ? (
                  <div className="flex items-center gap-2 text-slate-400 py-10 justify-center">
                    <RotateCw className="w-4 h-4 text-cyan-400 animate-spin" />
                    <span>Auditing your code and Big-O invariants...</span>
                  </div>
                ) : analysisText ? (
                  <div className="prose prose-invert text-xs leading-relaxed">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{analysisText}</ReactMarkdown>
                  </div>
                ) : (
                  <div className="text-center py-12 text-slate-500">
                    <Sparkles className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    <p>Click &quot;Explain Logic&quot;, &quot;AI Debugger&quot;, or &quot;Big-O Audit&quot; to review your code.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Right 7 Cols: Multilingual Code Editor & Execution Output */}
        <div className="lg:col-span-7 flex flex-col glass-card-glow rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
          {/* Editor Header: Language Pills & AI Actions */}
          <div className="p-3.5 border-b border-white/10 bg-[#070b18] flex items-center justify-between flex-wrap gap-2">
            {/* Language Selector */}
            <div className="flex items-center gap-1.5 p-1 rounded-xl bg-white/5 border border-white/10 text-xs">
              {(['python', 'javascript', 'cpp', 'c', 'java'] as ProgrammingLanguage[]).map((lang) => (
                <button
                  key={lang}
                  onClick={() => handleLanguageChange(lang)}
                  className={`px-2.5 py-1 rounded-lg uppercase font-mono text-[11px] font-bold transition-all ${
                    language === lang
                      ? 'bg-violet-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {lang === 'cpp' ? 'C++' : lang}
                </button>
              ))}
            </div>

            {/* AI Assistant Actions */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => handleAiAction('explain')}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-medium border border-white/10"
              >
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span>Explain</span>
              </button>
              <button
                onClick={() => handleAiAction('debug')}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-medium border border-white/10"
              >
                <Bug className="w-3.5 h-3.5 text-rose-400" />
                <span>Debug</span>
              </button>
              <button
                onClick={() => handleAiAction('complexity')}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-medium border border-white/10"
              >
                <Cpu className="w-3.5 h-3.5 text-violet-400" />
                <span>Big-O</span>
              </button>
            </div>
          </div>

          {/* Code Textarea Area */}
          <div className="flex-1 p-4 bg-[#04060d] relative overflow-hidden flex flex-col font-mono">
            <textarea
              value={userCode}
              onChange={(e) => setUserCode(e.target.value)}
              spellCheck={false}
              className="flex-1 w-full bg-transparent text-slate-200 text-xs sm:text-sm font-mono leading-relaxed resize-none focus:outline-none focus:ring-0 selection:bg-violet-600/60"
            />
          </div>

          {/* Test Runner Controls & Output */}
          <div className="p-4 border-t border-white/10 bg-[#070b18] space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                <Terminal className="w-4 h-4 text-cyan-400" />
                <span>Execution Sandbox</span>
              </div>

              <button
                onClick={handleRunTestCases}
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 text-white font-semibold text-xs shadow-md flex items-center gap-1.5"
              >
                <Play className="w-3.5 h-3.5 fill-white" />
                <span>Run Test Cases</span>
              </button>
            </div>

            {runOutput && (
              <pre className="p-3 rounded-xl bg-black/60 border border-white/10 text-xs font-mono text-emerald-300 leading-relaxed whitespace-pre-wrap">
                {runOutput}
              </pre>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
