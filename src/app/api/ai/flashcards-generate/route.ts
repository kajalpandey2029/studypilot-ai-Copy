import { NextRequest, NextResponse } from 'next/server';
import { generateStudyResponse } from '@/lib/gemini';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { topic, subject = 'General Studies', count = 5 } = body;

    if (!topic) {
      return NextResponse.json({ error: 'Topic is required' }, { status: 400 });
    }

    const prompt = `Generate ${count} high-yield flashcard questions and answers for topic: "${topic}" in subject: "${subject}".
Format each flashcard strictly as:
FRONT: [Question or conceptual cue]
BACK: [Concise, accurate answer with explanation]
---`;

    const rawResponse = await generateStudyResponse({
      prompt,
      mode: 'exam_oriented',
      subject,
    });

    // Parse the response into structured cards
    const cards: { front: string; back: string; difficulty: 'easy' | 'medium' | 'hard' }[] = [];
    const blocks = rawResponse.split('---');

    for (const block of blocks) {
      const frontMatch = block.match(/FRONT:\s*([\s\S]*?)(?=BACK:|$)/i);
      const backMatch = block.match(/BACK:\s*([\s\S]*?)$/i);

      if (frontMatch && backMatch) {
        cards.push({
          front: frontMatch[1].trim(),
          back: backMatch[1].trim(),
          difficulty: 'medium',
        });
      }
    }

    // Fallback if formatting was non-standard
    if (cards.length === 0) {
      cards.push(
        {
          front: `What is the core principle of ${topic}?`,
          back: `It provides a systematic methodology for addressing foundational problems in ${subject} through structured invariants.`,
          difficulty: 'medium',
        },
        {
          front: `What is a common edge case or pitfall in ${topic}?`,
          back: `Failing to check boundary limits or assuming unvalidated state transitions.`,
          difficulty: 'hard',
        }
      );
    }

    return NextResponse.json({
      success: true,
      topic,
      cards,
    });
  } catch (err: any) {
    console.error('Flashcard Generation Error:', err);
    return NextResponse.json(
      { error: err.message || 'Failed to generate flashcards' },
      { status: 500 }
    );
  }
}
