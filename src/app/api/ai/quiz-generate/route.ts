import { NextRequest, NextResponse } from 'next/server';
import { generateAdaptiveQuiz } from '@/lib/gemini';
import { DifficultyLevel } from '@/types';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { subject, topic, count = 5, difficulty = 'medium' } = body;

    if (!subject || !topic) {
      return NextResponse.json(
        { error: 'Subject and topic are required' },
        { status: 400 }
      );
    }

    const questions = await generateAdaptiveQuiz({
      subject,
      topic,
      count: Number(count) || 5,
      difficulty: difficulty as DifficultyLevel,
    });

    return NextResponse.json({
      success: true,
      questions,
      subject,
      topic,
      difficulty,
      generated_at: new Date().toISOString(),
    });
  } catch (err: any) {
    console.error('Quiz Generation Route Error:', err);
    return NextResponse.json(
      { error: err.message || 'Failed to generate quiz' },
      { status: 500 }
    );
  }
}
