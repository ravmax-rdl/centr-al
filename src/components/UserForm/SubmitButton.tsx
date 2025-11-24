import React from 'react';
import { Loader } from 'lucide-react';
import { cn } from '@/utilities/ui';

export default function SubmitButton({
  loading,
  text,
}: {
  loading: boolean;
  text: string;
}): React.ReactElement {
  return (
    <button
      type="submit"
      className={cn(
        'w-full inline-flex items-center justify-center gap-2',
        'px-4 py-2.5 rounded-md',
        'text-sm font-medium',
        'bg-primary text-primary-foreground',
        'hover:bg-primary/90',
        'focus:outline-none focus:ring-2 focus:ring-primary/20 focus:ring-offset-2',
        'transition-colors',
        'disabled:opacity-50 disabled:cursor-not-allowed'
      )}
      disabled={loading}
    >
      {loading && <Loader className="w-4 h-4 animate-spin" />}
      {text}
    </button>
  );
}
