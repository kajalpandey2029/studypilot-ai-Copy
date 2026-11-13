import { NextRequest, NextResponse } from 'next/server';
import { generateStudyResponse } from '@/lib/gemini';
import { ProgrammingLanguage } from '@/types';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { code, language, problemTitle, action = 'explain' } = body;

    if (!code) {
      return NextResponse.json({ error: 'Code is required' }, { status: 400 });
    }

    let prompt = '';
    if (action === 'explain') {
      prompt = `Explain the following ${language} implementation for "${problemTitle || 'Coding Problem'}":
\`\`\`${language}
${code}
\`\`\`
1. High-level intuition and core algorithm.
2. Step-by-step line breakdown.
3. Time and Space complexity in Big-O notation.`;
    } else if (action === 'debug') {
      prompt = `Audit and debug this ${language} code for "${problemTitle || 'Coding Problem'}":
\`\`\`${language}
${code}
\`\`\`
1. Identify any syntax bugs, off-by-one errors, or infinite recursion risks.
2. Highlight missing edge case validations (e.g., null pointers, empty arrays, integer overflows).
3. Provide the corrected code with notes.`;
    } else {
      prompt = `Analyze the time and space complexity of this ${language} snippet:
\`\`\`${language}
${code}
\`\`\`
Provide a formal mathematical recurrence or step count justification for both Best Case, Average Case, and Worst Case.`;
    }

    const response = await generateStudyResponse({
      prompt,
      mode: 'step_by_step',
      subject: `Computer Science: ${language.toUpperCase()}`,
    });

    return NextResponse.json({
      success: true,
      analysis: response,
      language,
      action,
    });
  } catch (err: any) {
    console.error('Code Assist Error:', err);
    return NextResponse.json(
      { error: err.message || 'Failed to analyze code' },
      { status: 500 }
    );
  }
}
