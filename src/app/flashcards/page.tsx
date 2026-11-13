'use client';

import React, { useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { GlassCard } from '@/components/ui/GlassCard';
import { dataStore } from '@/lib/storage';
import { calculateSM2 } from '@/lib/spaced-repetition';
import { Flashcard, FlashcardDeck } from '@/types';
import {
  Layers,
  Sparkles,
  Plus,
  RotateCw,
  CheckCircle2,
  Bookmark,
  Calendar,
  Award,
  ChevronLeft,
  ChevronRight,
  Flame,
} from 'lucide-react';

export default function FlashcardsPage() {
  const [decks, setDecks] = useState<FlashcardDeck[]>(dataStore.getDecks());
  const [activeDeckId, setActiveDeckId] = useState<string>(decks[0]?.id || 'deck_1');
  const [cards, setCards] = useState<Flashcard[]>(dataStore.getFlashcards(decks[0]?.id || 'deck_1'));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [newTopicPrompt, setNewTopicPrompt] = useState('');
  const [showGenerateModal, setShowGenerateModal] = useState(false);

  const currentCard = cards[currentIndex];

  const handleSelectDeck = (deckId: string) => {
    setActiveDeckId(deckId);
    setCards(dataStore.getFlashcards(deckId));
    setCurrentIndex(0);
    setIsFlipped(false);
  };

  const handleSM2Rating = (rating: 1 | 2 | 3 | 4) => {
    if (!currentCard) return;

    const sm2Result = calculateSM2({
      repetitions: currentCard.repetitions_count,
      intervalDays: currentCard.repetition_interval_days,
      easeFactor: currentCard.ease_factor,
      rating,
    });

    dataStore.updateFlashcard(currentCard.id, {
      repetitions_count: sm2Result.repetitions,
      repetition_interval_days: sm2Result.intervalDays,
      ease_factor: sm2Result.easeFactor,
      next_review_at: sm2Result.nextReviewDate.toISOString(),
      last_reviewed_at: new Date().toISOString(),
    });

    // Advance to next card
    setIsFlipped(false);
    if (currentIndex < cards.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  const handleGenerateCards = async () => {
    if (!newTopicPrompt.trim() || isGenerating) return;
    setIsGenerating(true);

    try {
      const res = await fetch('/api/ai/flashcards-generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: newTopicPrompt,
          subject: 'Computer Science & AI',
          count: 5,
        }),
      });

      const data = await res.json();
      if (data.cards && Array.isArray(data.cards)) {
        data.cards.forEach((c: any) => {
          dataStore.createFlashcard({
            deck_id: activeDeckId,
            user_id: 'usr_default_pilot',
            front: c.front,
            back: c.back,
            difficulty: 'medium',
            is_favorite: false,
            repetition_interval_days: 1,
            ease_factor: 2.5,
            repetitions_count: 0,
            next_review_at: new Date().toISOString(),
          });
        });

        setCards(dataStore.getFlashcards(activeDeckId));
        setDecks([...dataStore.getDecks()]);
        setShowGenerateModal(false);
        setNewTopicPrompt('');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <AppLayout
      title="Spaced Repetition Flashcards"
      subtitle="SuperMemo-2 algorithmic review timed directly before cognitive memory decay"
      action={
        <button
          onClick={() => setShowGenerateModal(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold shadow-md"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>AI Deck Generator</span>
        </button>
      }
    >
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Column: Deck Management */}
        <div className="space-y-4">
          <GlassCard variant="default" className="p-4">
            <h3 className="text-xs font-bold uppercase tracking-wider font-mono text-cyan-400 mb-3">
              Your Study Decks
            </h3>
            <div className="space-y-2">
              {decks.map((deck) => (
                <div
                  key={deck.id}
                  onClick={() => handleSelectDeck(deck.id)}
                  className={`p-3 rounded-2xl border cursor-pointer transition-all ${
                    activeDeckId === deck.id
                      ? 'bg-violet-600/30 border-violet-500 text-white shadow-glow-violet'
                      : 'bg-white/[0.02] border-white/5 text-slate-400 hover:text-white'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <h5 className="text-xs font-bold truncate max-w-[150px]">{deck.title}</h5>
                    <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-white/10 text-cyan-300">
                      {deck.cards_count}
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-400 truncate">{deck.subject_name || 'General'}</p>
                </div>
              ))}
            </div>
          </GlassCard>

          {/* SM-2 Cognitive Science Note */}
          <GlassCard variant="default" className="p-4 text-xs space-y-2 text-slate-300">
            <div className="flex items-center gap-2 text-violet-300 font-semibold">
              <Award className="w-4 h-4" />
              <span>SM-2 Memory Protocol</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Rating cards as &quot;Easy&quot; expands intervals exponentially, while &quot;Again&quot; resets the repetition counter to reinforce active synaptic recall.
            </p>
          </GlassCard>
        </div>

        {/* Right 3 Cols: 3D Flip Card Viewer */}
        <div className="lg:col-span-3 flex flex-col items-center justify-between min-h-[500px]">
          {currentCard ? (
            <div className="w-full max-w-2xl flex flex-col items-center">
              {/* Card Meta Indicator */}
              <div className="flex items-center justify-between w-full mb-4 px-2 text-xs font-mono text-slate-400">
                <span>Card {currentIndex + 1} of {cards.length}</span>
                <span className="text-cyan-400">Ease Factor: {currentCard.ease_factor}</span>
                <span>Interval: {currentCard.repetition_interval_days} Days</span>
              </div>

              {/* 3D Flip Card Container */}
              <div
                onClick={() => setIsFlipped(!isFlipped)}
                className="w-full h-80 rounded-3xl glass-card-glow border border-white/15 p-8 flex flex-col items-center justify-center text-center cursor-pointer shadow-2xl relative transition-all hover:scale-[1.01]"
              >
                <div className="absolute top-5 left-5 text-[10px] font-mono uppercase px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-slate-400">
                  {isFlipped ? 'Answer & Explanation' : 'Conceptual Prompt (Click to Flip)'}
                </div>

                <div className="p-4 overflow-y-auto max-h-60">
                  {isFlipped ? (
                    <div className="text-sm sm:text-base text-slate-100 font-medium whitespace-pre-wrap leading-relaxed">
                      {currentCard.back}
                    </div>
                  ) : (
                    <div className="text-base sm:text-xl font-bold text-white leading-relaxed">
                      {currentCard.front}
                    </div>
                  )}
                </div>

                <div className="absolute bottom-5 text-[11px] text-slate-500 font-mono">
                  {isFlipped ? 'Evaluate your recall below' : 'Click card or spacebar to reveal'}
                </div>
              </div>

              {/* SuperMemo-2 Rating Buttons (Visible when flipped) */}
              {isFlipped ? (
                <div className="w-full grid grid-cols-4 gap-3 mt-6">
                  <button
                    onClick={() => handleSM2Rating(1)}
                    className="py-3 px-2 rounded-2xl bg-rose-500/20 border border-rose-500/30 hover:bg-rose-500/30 text-rose-300 text-xs font-semibold flex flex-col items-center gap-1 transition-all"
                  >
                    <span className="font-bold">Again (1)</span>
                    <span className="text-[10px] text-slate-400">Review &lt; 1d</span>
                  </button>
                  <button
                    onClick={() => handleSM2Rating(2)}
                    className="py-3 px-2 rounded-2xl bg-amber-500/20 border border-amber-500/30 hover:bg-amber-500/30 text-amber-300 text-xs font-semibold flex flex-col items-center gap-1 transition-all"
                  >
                    <span className="font-bold">Hard (2)</span>
                    <span className="text-[10px] text-slate-400">Short interval</span>
                  </button>
                  <button
                    onClick={() => handleSM2Rating(3)}
                    className="py-3 px-2 rounded-2xl bg-blue-500/20 border border-blue-500/30 hover:bg-blue-500/30 text-blue-300 text-xs font-semibold flex flex-col items-center gap-1 transition-all"
                  >
                    <span className="font-bold">Good (3)</span>
                    <span className="text-[10px] text-slate-400">Normal interval</span>
                  </button>
                  <button
                    onClick={() => handleSM2Rating(4)}
                    className="py-3 px-2 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 hover:bg-emerald-500/30 text-emerald-300 text-xs font-semibold flex flex-col items-center gap-1 transition-all"
                  >
                    <span className="font-bold">Easy (4)</span>
                    <span className="text-[10px] text-slate-400">Optimal boost</span>
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-4 mt-6">
                  <button
                    onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
                    disabled={currentIndex === 0}
                    className="p-3 rounded-xl glass-panel border-white/10 text-slate-300 hover:text-white disabled:opacity-30"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setIsFlipped(true)}
                    className="px-8 py-3 rounded-2xl bg-violet-600 hover:bg-violet-500 text-white font-semibold text-xs shadow-md shadow-violet-600/30"
                  >
                    Reveal Answer
                  </button>
                  <button
                    onClick={() => setCurrentIndex((prev) => Math.min(cards.length - 1, prev + 1))}
                    disabled={currentIndex === cards.length - 1}
                    className="p-3 rounded-xl glass-panel border-white/10 text-slate-300 hover:text-white disabled:opacity-30"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-20 text-slate-400">
              <Layers className="w-12 h-12 mx-auto mb-3 text-slate-500" />
              <p>No flashcards in this deck yet.</p>
            </div>
          )}
        </div>
      </div>

      {/* AI Deck Generator Modal */}
      {showGenerateModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="glass-card-glow max-w-md w-full p-6 rounded-3xl border border-white/20 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-cyan-300" />
              <span>AI Flashcard Deck Generator</span>
            </h3>
            <p className="text-xs text-slate-300">
              Enter any concept or textbook chapter to generate high-yield active-recall cards.
            </p>

            <input
              type="text"
              value={newTopicPrompt}
              onChange={(e) => setNewTopicPrompt(e.target.value)}
              placeholder="e.g. Graph Traversal Protocols (BFS vs DFS)"
              className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-violet-500"
            />

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setShowGenerateModal(false)}
                className="flex-1 py-2.5 rounded-xl border border-white/10 text-xs font-semibold text-slate-300"
              >
                Cancel
              </button>
              <button
                onClick={handleGenerateCards}
                disabled={isGenerating || !newTopicPrompt.trim()}
                className="flex-1 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold shadow-md flex items-center justify-center gap-2"
              >
                {isGenerating ? 'Generating...' : 'Generate 5 Cards'}
              </button>
            </div>
          </div>
        </div>
      )}
    </AppLayout>
  );
}
