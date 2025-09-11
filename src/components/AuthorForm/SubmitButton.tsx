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
      type={'submit'}
      className={cn(
        'inline-flex items-center justify-center whitespace-nowrap rounded text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
        'h-10 px-4 py-2 w-full',
        'bg-primary text-primary-foreground hover:bg-primary/90',
        'gap-2'
      )}
      disabled={loading}
    >
      {text}
      <Loader className={cn('w-4 h-4 animate-spin', loading ? 'inline-block' : 'hidden')} />
    </button>
  );
}
