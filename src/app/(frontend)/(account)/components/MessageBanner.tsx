import React from 'react';
import { cn } from '@/utilities/ui';

interface MessageBannerProps {
  message: string;
  variant?: 'info' | 'success' | 'error';
}

export function MessageBanner({ message, variant = 'info' }: MessageBannerProps) {
  const variantStyles = {
    info: 'bg-blue-50 dark:bg-blue-950/20 text-blue-900 dark:text-blue-100 border-blue-200 dark:border-blue-900',
    success:
      'bg-green-50 dark:bg-green-950/20 text-green-900 dark:text-green-100 border-green-200 dark:border-green-900',
    error:
      'bg-red-50 dark:bg-red-950/20 text-red-900 dark:text-red-100 border-red-200 dark:border-red-900',
  };

  return (
    <div className="w-full mb-6">
      <div className={cn('rounded-lg border px-4 py-3 text-sm', variantStyles[variant])}>
        {message}
      </div>
    </div>
  );
}
