import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: 'default' | 'interactive' | 'glow' | 'accent';
  className?: string;
}

export function GlassCard({
  children,
  variant = 'default',
  className,
  ...props
}: GlassCardProps) {
  const variantStyles = {
    default: 'glass-panel rounded-2xl p-6 text-slate-100',
    interactive: 'glass-panel-interactive rounded-2xl p-6 text-slate-100 cursor-pointer',
    glow: 'glass-card-glow rounded-2xl p-6 text-slate-100',
    accent: 'glass-panel rounded-2xl p-6 text-slate-100 border-violet-500/20 bg-violet-950/20 shadow-glow-violet',
  };

  return (
    <div
      className={twMerge(clsx(variantStyles[variant], className))}
      {...props}
    >
      {children}
    </div>
  );
}
