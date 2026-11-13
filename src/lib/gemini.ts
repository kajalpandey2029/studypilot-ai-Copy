import { GoogleGenerativeAI } from '@google/generative-ai';
import { Question, TutorPersona, StudyMode, DifficultyLevel } from '@/types';
import { aiResponseCache } from './cache';

const apiKey = process.env.GEMINI_API_KEY || '';
export const isGeminiConfigured = Boolean(apiKey && apiKey !== 'your_gemini_api_key_here');

const genAI = isGeminiConfigured ? new GoogleGenerativeAI(apiKey) : null;
const defaultModelName = process.env.NEXT_PUBLIC_GEMINI_MODEL || 'gemini-1.5-flash';

const modeDirectives: Record<StudyMode, string> = {
  general: 'Comprehensive, structured overview with foundational points and practical examples.',
  beginner: 'Intuitive, accessible presentation using relatable everyday analogies.',
  intermediate: 'Balanced technical depth, detailing mechanisms, properties, and standard workflows.',
  advanced: 'Rigorous architectural deep-dive, trade-offs, performance implications, and edge scenarios.',
  exam_oriented: 'Concise high-yield study sheet format: key points, primary definitions, and common questions.',
  research_oriented: 'State-of-the-art methodology, theoretical boundaries, and open technical challenges.',
  step_by_step: 'Logical step-by-step breakdown explaining each phase sequentially.',
};

const personaDirectives: Record<TutorPersona, string> = {
  friendly_teacher: 'Supportive, encouraging guide who uses relatable metaphors.',
  strict_coach: 'Disciplined and goal-focused instructor who emphasizes precision.',
  research_mentor: 'Academic explorer who prompts critical thinking and questioning of assumptions.',
  programming_mentor: 'Practical software engineer who emphasizes clarity and clean structure.',
  conceptual_explainer: 'Visual thinker who explains mechanisms from first principles.',
};

export async function generateStudyResponse({
  prompt,
  mode = 'general',
  subject = 'Engineering and Sciences',
  history = [],
}: {
  prompt: string;
  mode?: StudyMode;
  subject?: string;
  history?: { role: 'user' | 'assistant'; content: string }[];
}): Promise<string> {
  const cacheKey = `study_${subject}_${mode}_${prompt.trim().toLowerCase()}`;
  if (history.length === 0) {
    const cached = aiResponseCache.get(cacheKey);
    if (cached) return cached;
  }

  const systemInstruction = `You are StudyPilot AI, an intelligent personal learning assistant.
Field: ${subject}
Mode: ${modeDirectives[mode] || modeDirectives.general}
Format: Markdown with clean structure (headers, bullet points, syntax-highlighted code blocks where helpful).`;

  if (genAI) {
    try {
      const model = genAI.getGenerativeModel({
        model: defaultModelName,
        systemInstruction,
        generationConfig: {
          maxOutputTokens: 1024,
          temperature: 0.4,
        },
      });

      const chat = model.startChat({
        history: history.slice(-4).map((h) => ({
          role: h.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: h.content }],
        })),
      });

      const result = await chat.sendMessage(prompt);
      const text = result.response.text();
      if (history.length === 0 && text) {
        aiResponseCache.set(cacheKey, text);
      }
      return text;
    } catch (err) {
      console.warn('Gemini chat error, using local fallback:', err);
    }
  }

  const fallback = buildSimulatedStudyNote(prompt, mode, subject);
  if (history.length === 0) {
    aiResponseCache.set(cacheKey, fallback);
  }
  return fallback;
}

export async function generateTutorResponse({
  prompt,
  persona = 'friendly_teacher',
  subject = 'General Studies',
  history = [],
}: {
  prompt: string;
  persona?: TutorPersona;
  subject?: string;
  history?: { role: 'user' | 'assistant'; content: string }[];
}): Promise<string> {
  const cacheKey = `tutor_${subject}_${persona}_${prompt.trim().toLowerCase()}`;
  if (history.length <= 1) {
    const cached = aiResponseCache.get(cacheKey);
    if (cached) return cached;
  }

  const systemPrompt = `You are a personalized AI tutor on StudyPilot AI.
Persona: ${personaDirectives[persona]}
Discipline: ${subject}
Instruction: Apply active recall and guided Socratic inquiry. Prompt the student to reason through steps rather than giving away entire answers immediately.`;

  if (genAI) {
    try {
      const model = genAI.getGenerativeModel({
        model: defaultModelName,
        systemInstruction: systemPrompt,
        generationConfig: {
          maxOutputTokens: 800,
          temperature: 0.6,
        },
      });

      const chat = model.startChat({
        history: history.slice(-4).map((h) => ({
          role: h.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: h.content }],
        })),
      });

      const result = await chat.sendMessage(prompt);
      const text = result.response.text();
      if (history.length <= 1 && text) {
        aiResponseCache.set(cacheKey, text);
      }
      return text;
    } catch (err) {
      console.warn('Gemini tutor error, using local fallback:', err);
    }
  }

  const fallback = buildSimulatedTutorDialogue(prompt, persona, subject);
  if (history.length <= 1) {
    aiResponseCache.set(cacheKey, fallback);
  }
  return fallback;
}

// ----------------------------------------------------------------------------
// STREAMING RESPONSE GENERATION (Web Streams API)
// ----------------------------------------------------------------------------
export async function streamStudyResponse({
  prompt,
  mode = 'general',
  subject = 'Engineering and Sciences',
  history = [],
}: {
  prompt: string;
  mode?: StudyMode;
  subject?: string;
  history?: { role: 'user' | 'assistant'; content: string }[];
}): Promise<ReadableStream<Uint8Array>> {
  const encoder = new TextEncoder();

  if (genAI) {
    try {
      const systemInstruction = `You are StudyPilot AI, an intelligent personal learning assistant.
Field: ${subject}
Mode: ${modeDirectives[mode] || modeDirectives.general}
Format: Markdown with clean structure.`;

      const model = genAI.getGenerativeModel({
        model: defaultModelName,
        systemInstruction,
        generationConfig: { maxOutputTokens: 1024, temperature: 0.4 },
      });

      const chat = model.startChat({
        history: history.slice(-4).map((h) => ({
          role: h.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: h.content }],
        })),
      });

      const resultStream = await chat.sendMessageStream(prompt);

      return new ReadableStream({
        async start(controller) {
          try {
            for await (const chunk of resultStream.stream) {
              const chunkText = chunk.text();
              controller.enqueue(encoder.encode(chunkText));
            }
          } catch (e) {
            console.warn('Streaming error, closing stream:', e);
          } finally {
            controller.close();
          }
        },
      });
    } catch (err) {
      console.warn('Gemini stream failed, falling back to simulated stream:', err);
    }
  }

  // Simulated chunked stream fallback
  const fullText = buildSimulatedStudyNote(prompt, mode, subject);
  const words = fullText.split(' ');

  return new ReadableStream({
    async start(controller) {
      for (let i = 0; i < words.length; i += 4) {
        const slice = words.slice(i, i + 4).join(' ') + (i + 4 < words.length ? ' ' : '');
        controller.enqueue(encoder.encode(slice));
        await new Promise((r) => setTimeout(r, 25));
      }
      controller.close();
    },
  });
}

export async function generateAdaptiveQuiz({
  subject,
  topic,
  count = 5,
  difficulty = 'medium',
}: {
  subject: string;
  topic: string;
  count?: number;
  difficulty?: DifficultyLevel;
}): Promise<Partial<Question>[]> {
  const cacheKey = `quiz_${subject}_${topic}_${difficulty}_${count}`;
  const cached = aiResponseCache.get(cacheKey);
  if (cached) {
    try {
      return JSON.parse(cached);
    } catch {
      // ignore
    }
  }

  const prompt = `Create ${count} practice assessment questions.
Field: ${subject}
Topic: ${topic}
Level: ${difficulty}

Output JSON format only:
[
  {
    "order_index": 0,
    "question_type": "mcq_single",
    "prompt": "Question text",
    "options": ["A", "B", "C", "D"],
    "correct_answer": "A",
    "explanation": "Why this choice is correct",
    "marks": 1
  }
]`;

  if (genAI) {
    try {
      const model = genAI.getGenerativeModel({
        model: defaultModelName,
        generationConfig: {
          responseMimeType: 'application/json',
          maxOutputTokens: 1500,
          temperature: 0.3,
        },
      });
      const response = await model.generateContent(prompt);
      const text = response.response.text();
      const parsed = JSON.parse(text);
      if (Array.isArray(parsed) && parsed.length > 0) {
        aiResponseCache.set(cacheKey, JSON.stringify(parsed));
        return parsed;
      }
    } catch (err) {
      console.warn('Gemini quiz error, using fallback:', err);
    }
  }

  const fallback = buildAlgorithmicPracticeQuestions(subject, topic, count, difficulty);
  aiResponseCache.set(cacheKey, JSON.stringify(fallback));
  return fallback;
}

function buildSimulatedStudyNote(prompt: string, mode: StudyMode, subject: string): string {
  return `### Study Notes: ${prompt}

**Field:** ${subject} | **Study Mode:** ${mode.replace('_', ' ').toUpperCase()}

---

#### 1. Core Principles
Understanding **${prompt}** requires looking at its primary objectives, inputs, and output behaviors:
- **Baseline Objective:** Provides a dependable, systematic methodology to solve target problems in ${subject}.
- **Underlying Mechanism:** Operates by dividing high-level requirements into modular, verifiable sub-components.
- **Key Invariant:** System state remains consistent before and after each operational transition.

#### 2. Practical Walkthrough
When implementing or analyzing ${prompt}:
1. Initialize core variables with validated default parameters.
2. Verify preconditions to safeguard against invalid states.
3. Process nominal transformations in sequence.
4. Record metrics and verify postconditions.

#### 3. Key Concepts to Remember
- Verify edge constraints and boundary thresholds.
- Isolate side effects to simplify troubleshooting and testing.
- Review how scaling input volume impacts resource consumption.

*(Note: Add your Google Gemini API key in Settings or .env.local to activate real-time AI generation.)*`;
}

function buildSimulatedTutorDialogue(prompt: string, persona: TutorPersona, subject: string): string {
  return `Welcome to this review session on **${subject}**.

Let's look at your topic: **"${prompt}"**.

Before reviewing the complete implementation, let's test your mental model:
*What is the primary constraint or requirement you are trying to satisfy when working with this concept?*

Take a moment to write down your line of reasoning or your initial intuition, and let me know how you would like to proceed!`;
}

function buildAlgorithmicPracticeQuestions(
  subject: string,
  topic: string,
  count: number,
  difficulty: DifficultyLevel
): Partial<Question>[] {
  const generated: Partial<Question>[] = [];

  for (let i = 0; i < count; i++) {
    generated.push({
      order_index: i,
      question_type: i % 2 === 0 ? 'mcq_single' : 'true_false',
      prompt: `Practice Item ${i + 1} (${difficulty.toUpperCase()} level) on ${topic}: In the context of ${subject}, how is the primary objective of this topic achieved?`,
      options: i % 2 === 0
        ? [
            `By establishing predictable constraints and structured processing pipelines`,
            `By executing unbounded random iterations without validation`,
            `By discarding intermediate states indiscriminately`,
            `By bypassing foundational validation rules entirely`
          ]
        : ['True', 'False'],
      correct_answer: i % 2 === 0
        ? `By establishing predictable constraints and structured processing pipelines`
        : 'True',
      explanation: `Systematic design in ${subject} prioritizes modular verification and predictable operational constraints.`,
      marks: 1,
    });
  }

  return generated;
}
