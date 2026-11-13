-- ====================================================================
-- STUDYPILOT AI — PERFORMANCE OPTIMIZATION INDEXES & CONSTRAINTS
-- Minimizes query execution times, eliminates sequential scans
-- ====================================================================

-- 1. Fast Assessment Report Lookup (Composite)
CREATE INDEX IF NOT EXISTS idx_quiz_answers_perf 
ON public.quiz_answers(attempt_id, is_correct);

-- 2. Fast Weak Topics Detection (Partial Index)
CREATE INDEX IF NOT EXISTS idx_topics_weak_partial 
ON public.topics(user_id, mastery_score) 
WHERE is_weak_topic = TRUE OR mastery_score < 60;

-- 3. SuperMemo-2 Spaced Repetition Due Queue (Composite)
CREATE INDEX IF NOT EXISTS idx_flashcards_due_perf 
ON public.flashcards(deck_id, next_review_at);

-- 4. Active Incomplete Study Tasks (Partial Index)
CREATE INDEX IF NOT EXISTS idx_study_tasks_active_perf 
ON public.study_tasks(user_id, due_date) 
WHERE is_completed = FALSE;

-- 5. Chronological Conversation Streaming Index
CREATE INDEX IF NOT EXISTS idx_messages_conv_stream 
ON public.messages(conversation_id, created_at ASC);

-- 6. Document Status Filter
CREATE INDEX IF NOT EXISTS idx_documents_status 
ON public.documents(user_id, status);
