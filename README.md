# StudyPilot AI — The Spatial AI Learning Ecosystem

> **Tagline:** *Learn Smarter. Remember Longer. Achieve More.*

StudyPilot AI is a production-grade, full-stack personal learning operating system engineered for university students, engineering majors, competitive exam aspirants, and self-directed scholars. Taking aesthetic and interaction inspiration from Apple Vision Pro's spatial depth, translucent frosted glass cards, and soft ambient lighting, StudyPilot AI orchestrates an entire academic journey into a unified, high-performance interface.

---

## 🌟 Core Product Capabilities

1. **Adaptive AI Study Workspace (`/study` & `/study/[id]`)**
   - Configurable explanation depth: Beginner (analogies), Intermediate, Advanced (architectural proofs), Exam-Oriented (high-yield rules & traps), Step-by-Step, and Research-Oriented.
   - Syntax-highlighted code blocks, Markdown rendering, conversation history, and dynamic follow-up suggestions.

2. **Ground-Truth Document Intelligence & RAG (`/library` & `/library/[id]`)**
   - Upload lecture slides, research papers, and textbooks (PDF, DOCX, TXT).
   - Grounded Q&A with verifiable page and section citations.
   - Executive summaries, key concept extraction, and one-click mock exam or flashcard generation.

3. **Smart Examination Generator (`/quiz`, `/quiz/create`, `/quiz/[id]`, `/quiz/[id]/results`)**
   - Timed examination engine with countdown timer, mark-for-review navigation, and question palette.
   - Supported question types: Single MCQ, Multi-select MCQ, True/False, Fill-in-the-blank, and Code Output analysis.
   - Automatic scoring, accuracy analytics, question-by-question rationales, and automatic weak topic diagnosis.

4. **SuperMemo-2 (SM-2) Spaced Repetition (`/flashcards`)**
   - 3D flip card viewer with cognitive difficulty ratings: Again (1), Hard (2), Good (3), Easy (4).
   - Scientific memory scheduling based on forgetting curves to ensure long-term retention.
   - Built-in AI Deck Generator from any syllabus topic.

5. **Intelligent Study Planner (`/planner`)**
   - Dynamic schedule generation weighted by upcoming exam dates, daily available hours, and diagnosed weak concepts.
   - Daily focus list with estimated minutes, priority flags, and weekly overview.

6. **Evidence-Based Analytics & Knowledge Graph (`/analytics`)**
   - Interactive SVG Knowledge Graph displaying concept dependencies, prerequisites, and student mastery levels.
   - 4-week diagnostic accuracy trends and course-by-course competence breakdowns.

7. **Programming Practice Lab (`/coding-lab`)**
   - Practice algorithm problems in C, C++, Python, Java, and JavaScript.
   - Built-in AI code explanation, edge-case debugger, and Big-O time/space complexity auditor.
   - Client-side execution sandbox for test case validation.

8. **Personal AI Tutor (`/tutor`)**
   - 5 Selectable Mentor Personas:
     1. Friendly Teacher (Supportive & Relatable)
     2. Strict Exam Coach (Disciplined & Rigorous)
     3. Research Mentor (Academic & Inquisitive)
     4. Programming Mentor (Systems & Code Architect)
     5. Conceptual Explainer (First Principles & Mental Models)
   - Guided Socratic dialogue that prompts diagnostic questions rather than giving away immediate answers.

---

## 🛠️ Technology Stack

- **Frontend:** Next.js (App Router), React, TypeScript, Tailwind CSS, Lucide React, React Markdown, Remark GFM.
- **AI Engine:** Google Gemini API (`@google/generative-ai`), structured JSON schema outputs, and built-in synthetic academic engine fallback for zero-downtime offline exploration.
- **Database & Storage:** Supabase PostgreSQL with `pgvector` support, Row Level Security (RLS) policies, and in-memory fallback adapter.
- **Spaced Repetition Algorithm:** SuperMemo-2 (SM-2) cognitive decay modeling.

---

## 🚀 Quick Start Guide

### 1. Prerequisites
- Node.js 18.x or 20.x+
- npm or pnpm

### 2. Installation
```bash
git clone https://github.com/your-username/studypilot-ai.git
cd studypilot-ai
npm install
```

### 3. Environment Setup
Copy the example environment file:
```bash
cp .env.example .env.local
```

Configure your API keys in `.env.local`:
```env
# Google Gemini API Key (Get free from https://aistudio.google.com/)
GEMINI_API_KEY=your_gemini_api_key_here

# Supabase Credentials (Optional for cloud sync, https://supabase.com/)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

*(Note: StudyPilot AI includes a resilient offline academic fallback engine. Even without entering API keys immediately, every single route and interactive module is fully operational for testing!)*

### 4. Running the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Production Build
```bash
npm run build
npm run start
```

---

## 🗄️ Database Schema & Supabase Migrations

The database migration file is located at:
`supabase/migrations/20261113_initial_schema.sql`

It covers all 23 required relational tables:
- `profiles` & `user_preferences`
- `subjects` & `topics`
- `study_sessions`, `conversations`, & `messages`
- `documents` & `document_chunks` (with pgvector embedding support)
- `quizzes`, `questions`, `quiz_attempts`, & `quiz_answers`
- `flashcard_decks`, `flashcards`, & `flashcard_reviews`
- `study_plans` & `study_tasks`
- `learning_activity` & `topic_mastery`
- `knowledge_graph_nodes` & `knowledge_graph_edges`
- `subscriptions`

All tables enforce strict Row Level Security (RLS) policies ensuring complete student data isolation.

---

## 🔒 Security & Privacy

- **Server-Side API Boundaries:** All Gemini API keys are held server-side and never exposed to the client.
- **Document Protection:** Uploaded document contents are processed in sandboxed server handlers to safeguard against prompt injection.
- **Zero Mock Paywalls:** Payments remain in transparent sandbox mode until official Stripe credentials are configured.

---

## 📄 License
MIT License. Built with passion for academic excellence.
