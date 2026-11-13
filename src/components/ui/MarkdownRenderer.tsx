'use client';

import React, { memo } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

function RawMarkdownRenderer({ content, className = '' }: MarkdownRendererProps) {
  return (
    <div className={`prose prose-invert max-w-none text-xs sm:text-sm leading-relaxed ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          code({ className, children, ...props }) {
            return (
              <code
                className={`${className || ''} bg-black/40 px-1.5 py-0.5 rounded text-cyan-300 font-mono text-[11px]`}
                {...props}
              >
                {children}
              </code>
            );
          },
          pre({ children }) {
            return (
              <pre className="p-3.5 rounded-2xl bg-black/60 border border-white/10 text-xs font-mono text-cyan-300 overflow-x-auto my-3">
                {children}
              </pre>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}

export const MarkdownRenderer = memo(RawMarkdownRenderer, (prev, next) => {
  return prev.content === next.content && prev.className === next.className;
});
