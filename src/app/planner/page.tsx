'use client';

import React, { useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { GlassCard } from '@/components/ui/GlassCard';
import { dataStore } from '@/lib/storage';
import { StudyTask } from '@/types';
import {
  CalendarCheck,
  Plus,
  Clock,
  CheckCircle2,
  Calendar,
  AlertCircle,
  Sparkles,
  Flame,
  ArrowRight,
  Filter,
} from 'lucide-react';

export default function StudyPlannerPage() {
  const [tasks, setTasks] = useState<StudyTask[]>(dataStore.getTasks());
  const subjects = dataStore.getSubjects();
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskSubject, setNewTaskSubject] = useState(subjects[0]?.name || 'Data Structures');
  const [newTaskMinutes, setNewTaskMinutes] = useState(45);
  const [newTaskPriority, setNewTaskPriority] = useState<'low' | 'medium' | 'high' | 'urgent'>('medium');
  const [showAddModal, setShowAddModal] = useState(false);
  const [viewMode, setViewMode] = useState<'daily' | 'weekly'>('daily');

  const toggleTask = (id: string) => {
    dataStore.toggleTask(id);
    setTasks([...dataStore.getTasks()]);
  };

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    dataStore.addTask({
      user_id: 'usr_default_pilot',
      title: newTaskTitle,
      subject_name: newTaskSubject,
      estimated_minutes: newTaskMinutes,
      priority: newTaskPriority,
      due_date: new Date().toISOString().split('T')[0],
      is_completed: false,
    });

    setTasks([...dataStore.getTasks()]);
    setNewTaskTitle('');
    setShowAddModal(false);
  };

  // Week schedule buckets
  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  return (
    <AppLayout
      title="Intelligent Study Planner"
      subtitle="Adaptive schedules weighted by upcoming exam dates and identified weak concepts"
      action={
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold shadow-md"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Custom Task</span>
        </button>
      }
    >
      <div className="space-y-8">
        {/* Exam Countdown Banners */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {subjects.map((s) => (
            <GlassCard key={s.id} variant="default" className="p-4 border-white/10 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono text-cyan-400 font-semibold uppercase">{s.code || 'Course'}</span>
                <h4 className="text-xs font-bold text-white truncate max-w-[140px]">{s.name}</h4>
                <p className="text-[10px] text-slate-400 mt-0.5">
                  Target: {s.target_exam_date || 'In 3 Weeks'}
                </p>
              </div>
              <div className="text-right">
                <span className="text-xs font-bold font-mono text-violet-400">{s.mastery_percentage}%</span>
                <p className="text-[9px] text-slate-500">Mastery</p>
              </div>
            </GlassCard>
          ))}
        </div>

        {/* View Toggle */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 p-1 rounded-xl bg-white/[0.04] border border-white/10 text-xs">
            <button
              onClick={() => setViewMode('daily')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                viewMode === 'daily' ? 'bg-violet-600 text-white shadow-sm' : 'text-slate-400'
              }`}
            >
              Today&apos;s Focus
            </button>
            <button
              onClick={() => setViewMode('weekly')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                viewMode === 'weekly' ? 'bg-violet-600 text-white shadow-sm' : 'text-slate-400'
              }`}
            >
              Weekly Overview
            </button>
          </div>

          <span className="text-xs font-mono text-slate-400">
            {tasks.filter((t) => !t.is_completed).length} Tasks Remaining Today
          </span>
        </div>

        {/* Task List */}
        {viewMode === 'daily' ? (
          <div className="space-y-3">
            {tasks.map((task) => (
              <div
                key={task.id}
                onClick={() => toggleTask(task.id)}
                className={`glass-panel-interactive rounded-2xl p-4 sm:p-5 border flex items-center justify-between gap-4 transition-all ${
                  task.is_completed ? 'opacity-50 border-white/5' : 'border-white/10'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`w-5 h-5 rounded-lg mt-0.5 flex items-center justify-center border transition-colors ${
                      task.is_completed
                        ? 'bg-violet-600 border-violet-500 text-white'
                        : 'border-white/20 bg-white/5'
                    }`}
                  >
                    {task.is_completed && <CheckCircle2 className="w-4 h-4" />}
                  </div>

                  <div>
                    <h4
                      className={`text-xs sm:text-sm font-semibold transition-colors ${
                        task.is_completed ? 'line-through text-slate-500' : 'text-white'
                      }`}
                    >
                      {task.title}
                    </h4>
                    {task.description && (
                      <p className="text-xs text-slate-400 mt-0.5">{task.description}</p>
                    )}
                    <div className="flex items-center gap-2 text-[10px] text-slate-400 mt-2">
                      <span className="font-mono text-cyan-400 font-semibold">
                        {task.estimated_minutes} Mins
                      </span>
                      <span>•</span>
                      <span>{task.subject_name || 'General Study'}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`text-[9px] uppercase font-mono px-2 py-0.5 rounded-full border ${
                      task.priority === 'urgent'
                        ? 'bg-rose-500/20 text-rose-300 border-rose-500/30'
                        : task.priority === 'high'
                        ? 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                        : 'bg-white/10 text-slate-300 border-white/10'
                    }`}
                  >
                    {task.priority}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-7 gap-3">
            {daysOfWeek.map((day, idx) => (
              <GlassCard key={idx} variant="default" className="p-4 border-white/10 min-h-[160px] flex flex-col justify-between">
                <div>
                  <h4 className="text-xs font-mono font-bold text-cyan-300 mb-2">{day}</h4>
                  <div className="text-[11px] text-slate-400 space-y-1">
                    <p>• Review tree rot.</p>
                    <p>• 15m Quiz drill</p>
                  </div>
                </div>
                <span className="text-[10px] font-mono text-slate-500">2.5 hrs est.</span>
              </GlassCard>
            ))}
          </div>
        )}
      </div>

      {/* Add Task Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="glass-card-glow max-w-md w-full p-6 rounded-3xl border border-white/20 space-y-4">
            <h3 className="text-base font-bold text-white">Add New Study Task</h3>
            <form onSubmit={handleAddTask} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Task Title</label>
                <input
                  type="text"
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  required
                  placeholder="e.g. Master AVL double rotations"
                  className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-violet-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Subject</label>
                  <select
                    value={newTaskSubject}
                    onChange={(e) => setNewTaskSubject(e.target.value)}
                    className="w-full bg-[#070b18] border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                  >
                    {subjects.map((s) => (
                      <option key={s.id} value={s.name}>
                        {s.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Minutes</label>
                  <input
                    type="number"
                    value={newTaskMinutes}
                    onChange={(e) => setNewTaskMinutes(Number(e.target.value))}
                    className="w-full bg-[#070b18] border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 py-2.5 rounded-xl border border-white/10 text-xs font-semibold text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold shadow-md"
                >
                  Add Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AppLayout>
  );
}
