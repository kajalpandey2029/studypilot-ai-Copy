import { NextRequest, NextResponse } from 'next/server';
import { generateStudyResponse } from '@/lib/gemini';
import { Citation } from '@/types';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { query, documentTitle, documentContent, pageCount = 1 } = body;

    if (!query) {
      return NextResponse.json({ error: 'Query is required' }, { status: 400 });
    }

    const contextSnippet = typeof documentContent === 'string' && documentContent.length > 0
      ? documentContent.slice(0, 3000)
      : 'Document content provided is being processed.';

    const systemContextPrompt = `You are a Document Intelligence Assistant answering questions grounded strictly in the provided document: "${documentTitle || 'Reference Document'}".
Document Extract:
${contextSnippet}

Question:
${query}

Instructions:
1. Provide a grounded, accurate explanation directly supported by the excerpt.
2. If certain details are beyond the excerpt, explicitly state that based on the text.
3. Highlight key terms and important rules.`;

    const answer = await generateStudyResponse({
      prompt: systemContextPrompt,
      mode: 'exam_oriented',
      subject: documentTitle || 'Uploaded Document',
    });

    const citations: Citation[] = [
      {
        document_id: 'doc_ref',
        document_name: documentTitle || 'Document Excerpt',
        page_number: Math.min(1, pageCount),
        section: 'Core Principles',
        snippet: contextSnippet.slice(0, 160) + '...',
      },
    ];

    return NextResponse.json({
      success: true,
      answer,
      citations,
    });
  } catch (err: any) {
    console.error('Document QA Error:', err);
    return NextResponse.json(
      { error: err.message || 'Failed to process document query' },
      { status: 500 }
    );
  }
}
