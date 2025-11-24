import React from 'react';
import { cn } from '@/utilities/ui';

interface AccountLayoutProps {
  children: React.ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg';
  minHeight?: string;
}

export function AccountLayout({
  children,
  maxWidth = 'sm',
  minHeight = '80vh',
}: AccountLayoutProps) {
  const maxWidthClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
  };

  return (
    <div className={cn('w-full mx-auto px-4', maxWidthClasses[maxWidth])} style={{ minHeight }}>
      {children}
    </div>
  );
}
