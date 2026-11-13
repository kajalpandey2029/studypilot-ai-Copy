'use client';

import React, { useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { GlassCard } from '@/components/ui/GlassCard';
import { dataStore } from '@/lib/storage';
import { isGeminiConfigured } from '@/lib/gemini';
import { isSupabaseConfigured } from '@/lib/supabase';
import {
  Settings,
  Key,
  Database,
  Sliders,
  Bell,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Save,
  Download,
  Trash2,
} from 'lucide-react';
import { TutorPersona } from '@/types';

export default function SettingsPage() {
  const prefs = dataStore.getPreferences();
  const [apiKey, setApiKey] = useState('');
  const [spatialEffects, setSpatialEffects] = useState(prefs.spatial_effects_enabled);
  const [defaultPersona, setDefaultPersona] = useState<TutorPersona>(prefs.default_tutor_persona);
  const [notifications, setNotifications] = useState(prefs.email_notifications);
  const [studyReminders, setStudyReminders] = useState(prefs.study_reminders);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    dataStore.updatePreferences({
      spatial_effects_enabled: spatialEffects,
      default_tutor_persona: defaultPersona,
      email_notifications: notifications,
      study_reminders: studyReminders,
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  const handleExportData = () => {
    const exportBundle = {
      profile: dataStore.getProfile(),
      subjects: dataStore.getSubjects(),
      tasks: dataStore.getTasks(),
      decks: dataStore.getDecks(),
      flashcards: dataStore.getFlashcards(),
      quizzes: dataStore.getQuizzes(),
      exportedAt: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(exportBundle, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `studypilot_backup_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
  };

  return (
    <AppLayout
      title="Platform Settings & Configuration"
      subtitle="Manage AI model keys, visual spatial rendering, notifications, and storage credentials"
    >
      <div className="max-w-4xl mx-auto space-y-8">
        {/* API & Cloud Integration Status Banner */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <GlassCard variant="glow" className="p-5 border-white/10">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Key className="w-4 h-4 text-cyan-400" />
                <h4 className="text-xs font-bold text-white uppercase font-mono">Google Gemini API</h4>
              </div>
              <span
                className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded border ${
                  isGeminiConfigured
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                    : 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                }`}
              >
                {isGeminiConfigured ? 'Active (Live API)' : 'Academic Simulation'}
              </span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              {isGeminiConfigured
                ? 'Connected to Google Gemini models for live streaming study generation.'
                : 'Using built-in deterministic simulation engine. Enter your API key below or in .env.local to activate live models.'}
            </p>
          </GlassCard>

          <GlassCard variant="glow" className="p-5 border-white/10">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Database className="w-4 h-4 text-violet-400" />
                <h4 className="text-xs font-bold text-white uppercase font-mono">Supabase PostgreSQL</h4>
              </div>
              <span
                className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded border ${
                  isSupabaseConfigured
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                    : 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30'
                }`}
              >
                {isSupabaseConfigured ? 'Connected (RLS)' : 'Local Data Layer'}
              </span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              {isSupabaseConfigured
                ? 'Synchronized with Supabase cloud database with strict Row Level Security.'
                : 'Operating in self-contained resilient local storage mode. Migrations available in /supabase/migrations.'}
            </p>
          </GlassCard>
        </div>

        {/* Configuration Form */}
        <GlassCard variant="default" className="p-6 sm:p-8 border-white/10">
          <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
            <div className="flex items-center gap-2">
              <Sliders className="w-5 h-5 text-violet-400" />
              <h3 className="text-sm font-bold text-white">System & Behavioral Preferences</h3>
            </div>
            {savedSuccess && (
              <span className="text-xs text-emerald-400 font-mono font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" />
                <span>Saved Successfully</span>
              </span>
            )}
          </div>

          <form onSubmit={handleSaveSettings} className="space-y-6">
            {/* Custom Gemini Key Input */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Google Gemini API Key Override (Optional)
              </label>
              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="AIzaSy..."
                className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-violet-500 font-mono"
              />
              <p className="text-[10px] text-slate-500 mt-1">
                Keys remain securely on your client session and are never transmitted to third-party logs.
              </p>
            </div>

            {/* Default Tutor Persona */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Default AI Tutor Persona
              </label>
              <select
                value={defaultPersona}
                onChange={(e) => setDefaultPersona(e.target.value as TutorPersona)}
                className="w-full bg-[#070b18] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-violet-500"
              >
                <option value="friendly_teacher">Friendly Teacher (Encouraging & Analogies)</option>
                <option value="strict_coach">Strict Exam Coach (Rigorous & Test-focused)</option>
                <option value="research_mentor">Research Mentor (First-principles & Inquisitive)</option>
                <option value="programming_mentor">Programming Mentor (Architectural & Debugging)</option>
                <option value="conceptual_explainer">Conceptual Explainer (Mental Models)</option>
              </select>
            </div>

            {/* Toggles */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between p-3.5 rounded-2xl bg-white/[0.02] border border-white/5">
                <div>
                  <h5 className="text-xs font-semibold text-white">Apple Vision Pro Spatial Depth</h5>
                  <p className="text-[11px] text-slate-400">Glassmorphism blur, ambient glow, and spatial depth layers</p>
                </div>
                <input
                  type="checkbox"
                  checked={spatialEffects}
                  onChange={(e) => setSpatialEffects(e.target.checked)}
                  className="w-4 h-4 accent-violet-600 rounded cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between p-3.5 rounded-2xl bg-white/[0.02] border border-white/5">
                <div>
                  <h5 className="text-xs font-semibold text-white">Spaced Repetition Review Reminders</h5>
                  <p className="text-[11px] text-slate-400">Alerts when flashcards reach optimal SM-2 recall window</p>
                </div>
                <input
                  type="checkbox"
                  checked={studyReminders}
                  onChange={(e) => setStudyReminders(e.target.checked)}
                  className="w-4 h-4 accent-violet-600 rounded cursor-pointer"
                />
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t border-white/10">
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-semibold text-xs shadow-md shadow-violet-600/30 flex items-center gap-1.5"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save Preferences</span>
              </button>
            </div>
          </form>
        </GlassCard>

        {/* Data Portability */}
        <GlassCard variant="default" className="p-6 border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h4 className="text-xs font-bold text-white uppercase font-mono">Academic Data Portability</h4>
            <p className="text-xs text-slate-400 mt-0.5">
              Export your study sessions, decks, quiz attempts, and learning trajectory as JSON.
            </p>
          </div>

          <button
            onClick={handleExportData}
            className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 text-xs font-semibold border border-white/10 flex items-center gap-2"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export JSON Archive</span>
          </button>
        </GlassCard>
      </div>
    </AppLayout>
  );
}
