// ============================================================================
// STUDYPILOT AI — CORE TYPES & INTERFACES
// ============================================================================

export type EducationLevel = 'high_school' | 'university' | 'competitive_exam' | 'self_learner';
export type LearningStyle = 'visual_practical' | 'conceptual_deep' | 'exam_tactical' | 'step_by_step';
export type TutorPersona = 'friendly_teacher' | 'strict_coach' | 'research_mentor' | 'programming_mentor' | 'conceptual_explainer';
export type StudyMode = 'general' | 'beginner' | 'intermediate' | 'advanced' | 'exam_oriented' | 'research_oriented' | 'step_by_step';
export type QuestionType = 'mcq_single' | 'mcq_multi' | 'true_false' | 'fill_blank' | 'short_answer' | 'code_output';
export type DifficultyLevel = 'easy' | 'medium' | 'hard' | 'university_level' | 'competitive_level';
export type ProgrammingLanguage = 'c' | 'cpp' | 'python' | 'java' | 'javascript';

export interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  avatar_url?: string;
  education_level: EducationLevel;
  institution?: string;
  degree?: string;
  academic_year?: string;
  preferred_learning_style: LearningStyle;
  daily_study_goal_minutes: number;
  current_streak_days: number;
  longest_streak_days: number;
  total_study_minutes: number;
  created_at: string;
}

export interface UserPreferences {
  user_id: string;
  theme: 'dark' | 'light' | 'system';
  spatial_effects_enabled: boolean;
  sound_effects_enabled: boolean;
  preferred_ai_model: string;
  default_tutor_persona: TutorPersona;
  email_notifications: boolean;
  study_reminders: boolean;
}

export interface Subject {
  id: string;
  user_id: string;
  name: string;
  code?: string;
  description?: string;
  color_hex: string;
  target_exam_date?: string;
  mastery_percentage: number;
  topics_count?: number;
  created_at: string;
}

export interface Topic {
  id: string;
  subject_id: string;
  user_id: string;
  title: string;
  description?: string;
  difficulty: 'easy' | 'medium' | 'hard';
  mastery_score: number; // 0 - 100
  is_weak_topic: boolean;
  needs_revision: boolean;
  last_studied_at?: string;
  created_at: string;
}

export interface StudySession {
  id: string;
  user_id: string;
  subject_id?: string;
  subject_name?: string;
  topic_id?: string;
  title: string;
  session_type: 'study_workspace' | 'tutor' | 'document_rag' | 'quiz' | 'coding_lab' | 'flashcards';
  duration_minutes: number;
  notes?: string;
  started_at: string;
  ended_at?: string;
}

export interface Citation {
  document_id: string;
  document_name: string;
  page_number?: number;
  section?: string;
  snippet: string;
}

export interface ChatMessage {
  id: string;
  conversation_id: string;
  user_id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  citations?: Citation[];
  metadata?: Record<string, unknown>;
  created_at: string;
}

export interface Conversation {
  id: string;
  user_id: string;
  subject_id?: string;
  title: string;
  mode: StudyMode;
  tutor_persona?: TutorPersona;
  created_at: string;
  updated_at: string;
  last_message?: string;
}

export interface DocumentItem {
  id: string;
  user_id: string;
  subject_id?: string;
  title: string;
  file_name: string;
  file_size_bytes: number;
  file_type: 'pdf' | 'docx' | 'txt' | 'pptx';
  page_count: number;
  summary?: string;
  key_concepts?: string[];
  status: 'uploaded' | 'processing' | 'processed' | 'error';
  content_text?: string;
  created_at: string;
}

export interface Question {
  id: string;
  quiz_id: string;
  question_type: QuestionType;
  prompt: string;
  options?: string[];
  correct_answer: string | string[];
  explanation: string;
  code_snippet?: string;
  marks: number;
  order_index: number;
}

export interface Quiz {
  id: string;
  user_id: string;
  subject_id?: string;
  topic_id?: string;
  title: string;
  description?: string;
  difficulty: DifficultyLevel;
  question_count: number;
  time_limit_minutes: number;
  source_document_id?: string;
  questions?: Question[];
  created_at: string;
}

export interface QuizAnswer {
  question_id: string;
  user_answer: string | string[];
  is_correct: boolean;
  feedback?: string;
}

export interface QuizAttempt {
  id: string;
  quiz_id: string;
  quiz_title?: string;
  user_id: string;
  score: number;
  total_marks: number;
  percentage: number;
  time_spent_seconds: number;
  completed: boolean;
  submitted_at: string;
  created_at: string;
  answers: QuizAnswer[];
  weak_topics?: string[];
}

export interface Flashcard {
  id: string;
  deck_id: string;
  user_id: string;
  front: string;
  back: string;
  difficulty: 'easy' | 'medium' | 'hard';
  is_favorite: boolean;
  repetition_interval_days: number;
  ease_factor: number;
  repetitions_count: number;
  next_review_at: string;
  last_reviewed_at?: string;
  created_at: string;
}

export interface FlashcardDeck {
  id: string;
  user_id: string;
  subject_id?: string;
  subject_name?: string;
  title: string;
  description?: string;
  cards_count: number;
  cards_due_count?: number;
  created_at: string;
}

export interface StudyTask {
  id: string;
  plan_id?: string;
  user_id: string;
  subject_id?: string;
  subject_name?: string;
  title: string;
  description?: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  due_date: string;
  estimated_minutes: number;
  is_completed: boolean;
  completed_at?: string;
  created_at: string;
}

export interface KnowledgeGraphNode {
  id: string;
  label: string;
  category: 'subject' | 'chapter' | 'topic' | 'concept';
  mastery_level: number; // 0 - 100
  subject_name?: string;
  prerequisites?: string[];
  x?: number;
  y?: number;
}

export interface KnowledgeGraphEdge {
  id: string;
  source: string;
  target: string;
  relationship: 'prerequisite_of' | 'part_of' | 'related_to';
}

export interface CodingProblem {
  id: string;
  title: string;
  difficulty: 'easy' | 'medium' | 'hard';
  language: ProgrammingLanguage;
  category: string;
  description: string;
  starter_code: Record<ProgrammingLanguage, string>;
  test_cases: {
    input: string;
    expected_output: string;
    explanation?: string;
  }[];
  constraints: string[];
  hints: string[];
}
