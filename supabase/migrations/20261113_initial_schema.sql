-- ====================================================================
-- STUDYPILOT AI — COMPLETE SUPABASE DATABASE SCHEMA MIGRATION
-- Covers all 23 required tables, RLS policies, indexes, and pgvector
-- ====================================================================

-- 1. Enable Required Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "vector";

-- 2. PROFILES TABLE
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL,
    full_name TEXT,
    avatar_url TEXT,
    education_level TEXT DEFAULT 'university', -- high_school, university, competitive_exam, self_learner
    institution TEXT,
    degree TEXT,
    academic_year TEXT,
    preferred_learning_style TEXT DEFAULT 'visual_practical', -- visual_practical, conceptual_deep, exam_tactical, step_by_step
    daily_study_goal_minutes INTEGER DEFAULT 60,
    current_streak_days INTEGER DEFAULT 0,
    longest_streak_days INTEGER DEFAULT 0,
    total_study_minutes INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. USER PREFERENCES
CREATE TABLE IF NOT EXISTS public.user_preferences (
    user_id UUID PRIMARY KEY REFERENCES public.profiles(id) ON DELETE CASCADE,
    theme TEXT DEFAULT 'dark',
    spatial_effects_enabled BOOLEAN DEFAULT TRUE,
    sound_effects_enabled BOOLEAN DEFAULT FALSE,
    preferred_ai_model TEXT DEFAULT 'gemini-1.5-flash',
    default_tutor_persona TEXT DEFAULT 'friendly_teacher', -- friendly_teacher, strict_coach, research_mentor, programming_mentor, conceptual_explainer
    email_notifications BOOLEAN DEFAULT TRUE,
    study_reminders BOOLEAN DEFAULT TRUE,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. SUBSCRIPTIONS
CREATE TABLE IF NOT EXISTS public.subscriptions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    plan_tier TEXT DEFAULT 'free', -- free, pro, enterprise
    status TEXT DEFAULT 'active', -- active, past_due, canceled
    monthly_ai_tokens_used INTEGER DEFAULT 0,
    monthly_ai_tokens_limit INTEGER DEFAULT 100000,
    monthly_doc_uploads_used INTEGER DEFAULT 0,
    monthly_doc_uploads_limit INTEGER DEFAULT 5,
    current_period_start TIMESTAMPTZ DEFAULT NOW(),
    current_period_end TIMESTAMPTZ DEFAULT NOW() + INTERVAL '30 days',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. SUBJECTS
CREATE TABLE IF NOT EXISTS public.subjects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    code TEXT,
    description TEXT,
    color_hex TEXT DEFAULT '#8B5CF6',
    target_exam_date DATE,
    mastery_percentage NUMERIC(5, 2) DEFAULT 0.00,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. TOPICS
CREATE TABLE IF NOT EXISTS public.topics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    subject_id UUID NOT NULL REFERENCES public.subjects(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    difficulty TEXT DEFAULT 'medium', -- easy, medium, hard
    mastery_score NUMERIC(5, 2) DEFAULT 0.00, -- 0 to 100
    is_weak_topic BOOLEAN DEFAULT FALSE,
    needs_revision BOOLEAN DEFAULT FALSE,
    last_studied_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. STUDY SESSIONS
CREATE TABLE IF NOT EXISTS public.study_sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    subject_id UUID REFERENCES public.subjects(id) ON DELETE SET NULL,
    topic_id UUID REFERENCES public.topics(id) ON DELETE SET NULL,
    title TEXT NOT NULL,
    session_type TEXT DEFAULT 'study_workspace', -- study_workspace, tutor, document_rag, quiz, coding_lab, flashcards
    duration_minutes INTEGER DEFAULT 0,
    notes TEXT,
    started_at TIMESTAMPTZ DEFAULT NOW(),
    ended_at TIMESTAMPTZ
);

-- 8. CONVERSATIONS
CREATE TABLE IF NOT EXISTS public.conversations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    subject_id UUID REFERENCES public.subjects(id) ON DELETE SET NULL,
    title TEXT NOT NULL DEFAULT 'New Study Session',
    mode TEXT DEFAULT 'general', -- general, beginner, intermediate, advanced, exam_oriented, research_oriented, tutor
    tutor_persona TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. MESSAGES
CREATE TABLE IF NOT EXISTS public.messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    conversation_id UUID NOT NULL REFERENCES public.conversations(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    role TEXT NOT NULL, -- user, assistant, system
    content TEXT NOT NULL,
    citations JSONB DEFAULT '[]'::jsonb, -- document citations [{ doc_id, page, snippet }]
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 10. DOCUMENTS
CREATE TABLE IF NOT EXISTS public.documents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    subject_id UUID REFERENCES public.subjects(id) ON DELETE SET NULL,
    title TEXT NOT NULL,
    file_name TEXT NOT NULL,
    file_size_bytes BIGINT NOT NULL,
    file_type TEXT NOT NULL, -- pdf, docx, txt, pptx
    storage_path TEXT NOT NULL,
    page_count INTEGER DEFAULT 1,
    summary TEXT,
    status TEXT DEFAULT 'processed', -- uploaded, processing, processed, error
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 11. DOCUMENT CHUNKS (For RAG & Vector Search)
CREATE TABLE IF NOT EXISTS public.document_chunks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    document_id UUID NOT NULL REFERENCES public.documents(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    chunk_index INTEGER NOT NULL,
    page_number INTEGER DEFAULT 1,
    content TEXT NOT NULL,
    embedding VECTOR(768), -- Gemini text-embedding-004 dimensions (768)
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 12. QUIZZES
CREATE TABLE IF NOT EXISTS public.quizzes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    subject_id UUID REFERENCES public.subjects(id) ON DELETE SET NULL,
    topic_id UUID REFERENCES public.topics(id) ON DELETE SET NULL,
    title TEXT NOT NULL,
    description TEXT,
    difficulty TEXT DEFAULT 'medium', -- easy, medium, hard, university_level, competitive_level
    question_count INTEGER NOT NULL DEFAULT 5,
    time_limit_minutes INTEGER DEFAULT 15,
    source_document_id UUID REFERENCES public.documents(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 13. QUESTIONS
CREATE TABLE IF NOT EXISTS public.questions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    quiz_id UUID NOT NULL REFERENCES public.quizzes(id) ON DELETE CASCADE,
    question_type TEXT NOT NULL, -- mcq_single, mcq_multi, true_false, fill_blank, short_answer, code_output
    prompt TEXT NOT NULL,
    options JSONB, -- Array of string choices for MCQ
    correct_answer JSONB NOT NULL, -- Single string or array of strings
    explanation TEXT NOT NULL,
    code_snippet TEXT,
    marks INTEGER DEFAULT 1,
    order_index INTEGER NOT NULL DEFAULT 0
);

-- 14. QUIZ ATTEMPTS
CREATE TABLE IF NOT EXISTS public.quiz_attempts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    quiz_id UUID NOT NULL REFERENCES public.quizzes(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    score NUMERIC(5, 2) DEFAULT 0.00,
    total_marks INTEGER DEFAULT 0,
    percentage NUMERIC(5, 2) DEFAULT 0.00,
    time_spent_seconds INTEGER DEFAULT 0,
    completed BOOLEAN DEFAULT FALSE,
    submitted_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 15. QUIZ ANSWERS
CREATE TABLE IF NOT EXISTS public.quiz_answers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    attempt_id UUID NOT NULL REFERENCES public.quiz_attempts(id) ON DELETE CASCADE,
    question_id UUID NOT NULL REFERENCES public.questions(id) ON DELETE CASCADE,
    user_answer JSONB,
    is_correct BOOLEAN DEFAULT FALSE,
    feedback TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 16. FLASHCARD DECKS
CREATE TABLE IF NOT EXISTS public.flashcard_decks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    subject_id UUID REFERENCES public.subjects(id) ON DELETE SET NULL,
    title TEXT NOT NULL,
    description TEXT,
    card_count INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 17. FLASHCARDS
CREATE TABLE IF NOT EXISTS public.flashcards (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    deck_id UUID NOT NULL REFERENCES public.flashcard_decks(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    front TEXT NOT NULL,
    back TEXT NOT NULL,
    difficulty TEXT DEFAULT 'medium',
    is_favorite BOOLEAN DEFAULT FALSE,
    repetition_interval_days INTEGER DEFAULT 1,
    ease_factor NUMERIC(4, 2) DEFAULT 2.50, -- SM-2 algorithm standard
    repetitions_count INTEGER DEFAULT 0,
    next_review_at TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 18. FLASHCARD REVIEWS
CREATE TABLE IF NOT EXISTS public.flashcard_reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    flashcard_id UUID NOT NULL REFERENCES public.flashcards(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    rating INTEGER NOT NULL, -- 1: Again, 2: Hard, 3: Good, 4: Easy
    reviewed_at TIMESTAMPTZ DEFAULT NOW()
);

-- 19. STUDY PLANS
CREATE TABLE IF NOT EXISTS public.study_plans (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    target_exam_date DATE,
    daily_target_hours NUMERIC(4, 2) DEFAULT 2.00,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 20. STUDY TASKS
CREATE TABLE IF NOT EXISTS public.study_tasks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    plan_id UUID REFERENCES public.study_plans(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    subject_id UUID REFERENCES public.subjects(id) ON DELETE SET NULL,
    topic_id UUID REFERENCES public.topics(id) ON DELETE SET NULL,
    title TEXT NOT NULL,
    description TEXT,
    priority TEXT DEFAULT 'medium', -- low, medium, high, urgent
    due_date DATE NOT NULL,
    estimated_minutes INTEGER DEFAULT 45,
    is_completed BOOLEAN DEFAULT FALSE,
    completed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 21. LEARNING ACTIVITY (Event Stream for Analytics & Streaks)
CREATE TABLE IF NOT EXISTS public.learning_activity (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    activity_type TEXT NOT NULL, -- study_chat, doc_read, quiz_attempt, flashcard_review, code_run, task_completed
    metadata JSONB DEFAULT '{}'::jsonb,
    duration_minutes INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 22. TOPIC MASTERY (Evidence-based student competence)
CREATE TABLE IF NOT EXISTS public.topic_mastery (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    topic_id UUID NOT NULL REFERENCES public.topics(id) ON DELETE CASCADE,
    mastery_score NUMERIC(5, 2) DEFAULT 0.00, -- 0 to 100
    quizzes_taken INTEGER DEFAULT 0,
    quizzes_passed INTEGER DEFAULT 0,
    total_flashcards_reviewed INTEGER DEFAULT 0,
    accuracy_percentage NUMERIC(5, 2) DEFAULT 0.00,
    last_assessed_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, topic_id)
);

-- 23. KNOWLEDGE GRAPH NODES & EDGES
CREATE TABLE IF NOT EXISTS public.knowledge_graph_nodes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    subject_id UUID REFERENCES public.subjects(id) ON DELETE CASCADE,
    node_key TEXT NOT NULL,
    label TEXT NOT NULL,
    category TEXT DEFAULT 'concept', -- subject, chapter, topic, concept
    mastery_level NUMERIC(5, 2) DEFAULT 0.00,
    position_x NUMERIC(8, 2) DEFAULT 0.00,
    position_y NUMERIC(8, 2) DEFAULT 0.00,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.knowledge_graph_edges (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    source_node_id UUID NOT NULL REFERENCES public.knowledge_graph_nodes(id) ON DELETE CASCADE,
    target_node_id UUID NOT NULL REFERENCES public.knowledge_graph_nodes(id) ON DELETE CASCADE,
    relationship_type TEXT DEFAULT 'prerequisite_of', -- prerequisite_of, part_of, related_to
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ====================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- Strict Isolation: Each student can only read/write their own records
-- ====================================================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subjects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.topics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.study_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.document_chunks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quizzes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_answers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.flashcard_decks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.flashcards ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.flashcard_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.study_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.study_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.learning_activity ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.topic_mastery ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.knowledge_graph_nodes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.knowledge_graph_edges ENABLE ROW LEVEL SECURITY;

-- Helper macros for RLS
CREATE POLICY "Users view own profile" ON public.profiles FOR ALL USING (auth.uid() = id);
CREATE POLICY "Users manage own preferences" ON public.user_preferences FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users view own subscription" ON public.subscriptions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users manage own subjects" ON public.subjects FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users manage own topics" ON public.topics FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users manage own study_sessions" ON public.study_sessions FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users manage own conversations" ON public.conversations FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users manage own messages" ON public.messages FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users manage own documents" ON public.documents FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users manage own document_chunks" ON public.document_chunks FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users manage own quizzes" ON public.quizzes FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users manage own quiz_attempts" ON public.quiz_attempts FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users manage own flashcard_decks" ON public.flashcard_decks FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users manage own flashcards" ON public.flashcards FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users manage own flashcard_reviews" ON public.flashcard_reviews FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users manage own study_plans" ON public.study_plans FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users manage own study_tasks" ON public.study_tasks FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users manage own learning_activity" ON public.learning_activity FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users manage own topic_mastery" ON public.topic_mastery FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users manage own knowledge_graph_nodes" ON public.knowledge_graph_nodes FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users manage own knowledge_graph_edges" ON public.knowledge_graph_edges FOR ALL USING (auth.uid() = user_id);

-- Questions & Quiz Answers RLS via quiz ownership
CREATE POLICY "Questions access via quiz" ON public.questions FOR ALL USING (
    EXISTS (SELECT 1 FROM public.quizzes WHERE quizzes.id = questions.quiz_id AND quizzes.user_id = auth.uid())
);
CREATE POLICY "Quiz answers access via attempt" ON public.quiz_answers FOR ALL USING (
    EXISTS (SELECT 1 FROM public.quiz_attempts WHERE quiz_attempts.id = quiz_answers.attempt_id AND quiz_attempts.user_id = auth.uid())
);

-- ====================================================================
-- PERFORMANCE INDEXES
-- ====================================================================
CREATE INDEX IF NOT EXISTS idx_subjects_user ON public.subjects(user_id);
CREATE INDEX IF NOT EXISTS idx_topics_subject ON public.topics(subject_id);
CREATE INDEX IF NOT EXISTS idx_conversations_user ON public.conversations(user_id);
CREATE INDEX IF NOT EXISTS idx_messages_conversation ON public.messages(conversation_id);
CREATE INDEX IF NOT EXISTS idx_documents_user ON public.documents(user_id);
CREATE INDEX IF NOT EXISTS idx_doc_chunks_doc ON public.document_chunks(document_id);
CREATE INDEX IF NOT EXISTS idx_quizzes_user ON public.quizzes(user_id);
CREATE INDEX IF NOT EXISTS idx_questions_quiz ON public.questions(quiz_id);
CREATE INDEX IF NOT EXISTS idx_quiz_attempts_user ON public.quiz_attempts(user_id);
CREATE INDEX IF NOT EXISTS idx_flashcards_deck ON public.flashcards(deck_id);
CREATE INDEX IF NOT EXISTS idx_flashcards_next_review ON public.flashcards(user_id, next_review_at);
CREATE INDEX IF NOT EXISTS idx_study_tasks_due ON public.study_tasks(user_id, due_date);
CREATE INDEX IF NOT EXISTS idx_activity_user_created ON public.learning_activity(user_id, created_at);
