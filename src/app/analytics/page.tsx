'use client';

import React, { useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { GlassCard } from '@/components/ui/GlassCard';
import { dataStore } from '@/lib/storage';
import {
  BarChart3,
  TrendingUp,
  BrainCircuit,
  Award,
  Clock,
  Flame,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Layers,
  Sparkles,
} from 'lucide-react';

export default function AnalyticsPage() {
  const profile = dataStore.getProfile();
  const subjects = dataStore.getSubjects();
  const weakTopics = dataStore.getWeakTopics();
  const { nodes, edges } = dataStore.getKnowledgeGraph();
  const [selectedNode, setSelectedNode] = useState<string | null>(null);

  // Subject accuracy trends data
  const accuracyTrends = [
    { name: 'Week 1', score: 62 },
    { name: 'Week 2', score: 68 },
    { name: 'Week 3', score: 71 },
    { name: 'Week 4', score: 80 },
  ];

  return (
    <AppLayout
      title="Learning Analytics & Knowledge Graph"
      subtitle="Cognitive retention metrics, mastery progression, and visual prerequisite networks"
    >
      <div className="space-y-8">
        {/* Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <GlassCard variant="glow" className="p-5 border-violet-500/20">
            <span className="text-[10px] font-mono uppercase text-violet-400 font-semibold">
              Overall Mastery
            </span>
            <h3 className="text-2xl font-extrabold text-white mt-1">74.2%</h3>
            <p className="text-[10px] text-slate-400 mt-1">+6.4% this month</p>
          </GlassCard>

          <GlassCard variant="glow" className="p-5 border-cyan-500/20">
            <span className="text-[10px] font-mono uppercase text-cyan-400 font-semibold">
              Cognitive Retention
            </span>
            <h3 className="text-2xl font-extrabold text-white mt-1">86.8%</h3>
            <p className="text-[10px] text-slate-400 mt-1">SuperMemo-2 SM-2 factor</p>
          </GlassCard>

          <GlassCard variant="glow" className="p-5 border-amber-500/20">
            <span className="text-[10px] font-mono uppercase text-amber-400 font-semibold">
              Study Consistency
            </span>
            <h3 className="text-2xl font-extrabold text-white mt-1">
              {profile.current_streak_days} <span className="text-xs font-normal text-slate-400">Day Streak</span>
            </h3>
            <p className="text-[10px] text-slate-400 mt-1">Top 5% active students</p>
          </GlassCard>

          <GlassCard variant="glow" className="p-5 border-emerald-500/20">
            <span className="text-[10px] font-mono uppercase text-emerald-400 font-semibold">
              Concepts Validated
            </span>
            <h3 className="text-2xl font-extrabold text-white mt-1">42 Topics</h3>
            <p className="text-[10px] text-slate-400 mt-1">Passed diagnostic benchmark</p>
          </GlassCard>
        </div>

        {/* Section: Interactive Knowledge Graph */}
        <div className="glass-card-glow rounded-3xl p-6 border border-white/10 shadow-2xl space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <div>
              <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-violet-500/20 text-violet-300 border border-violet-500/30">
                Spatial Prerequisite Network
              </span>
              <h3 className="text-base font-bold text-white mt-1">
                Personal Academic Knowledge Graph
              </h3>
              <p className="text-xs text-slate-400">
                Explore concept dependencies. Green denotes verified mastery, purple represents active study, and orange indicates prerequisite knowledge gaps.
              </p>
            </div>

            <div className="flex items-center gap-3 text-xs">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                <span className="text-slate-300 text-[11px]">&gt;75% Mastered</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                <span className="text-slate-300 text-[11px]">&lt;60% Weak Topic</span>
              </div>
            </div>
          </div>

          {/* Graph Visual Canvas */}
          <div className="h-80 w-full bg-[#050813] rounded-2xl border border-white/10 relative overflow-hidden flex items-center justify-center p-4">
            <svg className="w-full h-full">
              {/* Edges */}
              {edges.map((e) => {
                const src = nodes.find((n) => n.id === e.source);
                const tgt = nodes.find((n) => n.id === e.target);
                if (!src || !tgt) return null;
                return (
                  <line
                    key={e.id}
                    x1={src.x || 100}
                    y1={src.y || 100}
                    x2={tgt.x || 200}
                    y2={tgt.y || 200}
                    stroke="rgba(255, 255, 255, 0.15)"
                    strokeWidth="1.5"
                    strokeDasharray="4 2"
                  />
                );
              })}

              {/* Nodes */}
              {nodes.map((node) => {
                const isSelected = selectedNode === node.id;
                const isWeak = node.mastery_level < 60;
                return (
                  <g
                    key={node.id}
                    onClick={() => setSelectedNode(node.id)}
                    className="cursor-pointer group"
                    transform={`translate(${node.x || 100}, ${node.y || 100})`}
                  >
                    <circle
                      r={isSelected ? 22 : 18}
                      className={`transition-all ${
                        isWeak
                          ? 'fill-amber-500/20 stroke-amber-400'
                          : 'fill-emerald-500/20 stroke-emerald-400'
                      }`}
                      strokeWidth={isSelected ? '3' : '1.5'}
                    />
                    <text
                      textAnchor="middle"
                      dy=".3em"
                      className="text-[10px] font-mono font-bold fill-white pointer-events-none"
                    >
                      {node.mastery_level}%
                    </text>
                    <text
                      textAnchor="middle"
                      dy="2.4em"
                      className="text-[10px] font-sans font-medium fill-slate-300 pointer-events-none"
                    >
                      {node.label}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {selectedNode && (
            <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-between text-xs">
              <span className="text-slate-300">
                Selected: <strong className="text-cyan-300">{nodes.find((n) => n.id === selectedNode)?.label}</strong> (Mastery: {nodes.find((n) => n.id === selectedNode)?.mastery_level}%)
              </span>
              <a
                href={`/study?topic=${encodeURIComponent(nodes.find((n) => n.id === selectedNode)?.label || '')}`}
                className="text-violet-400 hover:text-violet-300 font-semibold"
              >
                Study Concept in Workspace →
              </a>
            </div>
          )}
        </div>

        {/* Accuracy Trends & Subject Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Historical Accuracy Progression */}
          <GlassCard variant="default" className="p-6 border-white/10">
            <h3 className="text-sm font-bold text-white mb-1">Diagnostic Accuracy Growth</h3>
            <p className="text-xs text-slate-400 mb-6">4-Week progression across all mock tests</p>

            <div className="flex items-end justify-between gap-4 h-44 px-2">
              {accuracyTrends.map((t, idx) => (
                <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                  <span className="text-xs font-mono font-bold text-cyan-300">{t.score}%</span>
                  <div
                    className="w-full max-w-[48px] rounded-t-xl bg-gradient-to-t from-violet-600 to-cyan-400 shadow-glow-violet"
                    style={{ height: `${(t.score / 100) * 100}%` }}
                  />
                  <span className="text-[11px] font-mono text-slate-400">{t.name}</span>
                </div>
              ))}
            </div>
          </GlassCard>

          {/* Subject Mastery Radar List */}
          <GlassCard variant="default" className="p-6 border-white/10 space-y-4">
            <h3 className="text-sm font-bold text-white">Subject Mastery Breakdown</h3>
            <p className="text-xs text-slate-400">Calculated from regular quizzes and flashcard recalls</p>

            <div className="space-y-3.5 pt-2">
              {subjects.map((s) => (
                <div key={s.id} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-white">{s.name}</span>
                    <span className="font-mono font-bold text-cyan-400">{s.mastery_percentage}%</span>
                  </div>
                  <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{
                        width: `${s.mastery_percentage}%`,
                        backgroundColor: s.color_hex,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>
    </AppLayout>
  );
}
