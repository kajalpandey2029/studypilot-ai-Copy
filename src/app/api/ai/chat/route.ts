import { NextRequest, NextResponse } from 'next/server';
import { generateStudyResponse, generateTutorResponse, streamStudyResponse } from '@/lib/gemini';
import { StudyMode, TutorPersona } from '@/types';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { prompt, mode, persona, subject, isTutor, history, stream = false } = body;

    if (!prompt || typeof prompt !== 'string') {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
    }

    // Support streaming response for instant Time-To-First-Token (TTFT)
    if (stream && !isTutor) {
      const textStream = await streamStudyResponse({
        prompt,
        mode: (mode as StudyMode) || 'general',
        subject: subject || 'General Studies',
        history: history || [],
      });

      return new Response(textStream, {
        headers: {
          'Content-Type': 'text/plain; charset=utf-8',
          'Cache-Control': 'no-cache, no-transform',
        },
      });
    }

    let responseText = '';

    if (isTutor) {
      responseText = await generateTutorResponse({
        prompt,
        persona: (persona as TutorPersona) || 'friendly_teacher',
        subject: subject || 'General Studies',
        history: history || [],
      });
    } else {
      responseText = await generateStudyResponse({
        prompt,
        mode: (mode as StudyMode) || 'general',
        subject: subject || 'General Studies',
        history: history || [],
      });
    }

    return NextResponse.json({
      content: responseText,
      success: true,
      timestamp: new Date().toISOString(),
    });
  } catch (err: any) {
    console.error('AI Chat Route Error:', err);
    return NextResponse.json(
      { error: err.message || 'Failed to generate response' },
      { status: 500 }
    );
  }
}
