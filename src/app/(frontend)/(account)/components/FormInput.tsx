import React from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import { cn } from '@/utilities/ui';

interface FormInputProps {
  label: string;
  id: string;
  type: 'text' | 'email' | 'password';
  placeholder?: string;
  error?: string;
  register: UseFormRegisterReturn;
  required?: boolean;
}

export function FormInput({
  label,
  id,
  type,
  placeholder,
  error,
  register,
  required = false,
}: FormInputProps) {
  return (
    <div className="mb-5">
      <label htmlFor={id} className="block text-sm font-medium mb-2">
        {label}
        {required && (
          <span className="text-red-500 ml-1" aria-label="required">
            *
          </span>
        )}
      </label>
      <input
        {...register}
        id={id}
        type={type}
        className={cn(
          'w-full px-3 py-2 text-sm rounded-md border transition-colors',
          'bg-background border-border',
          'placeholder:text-muted-foreground',
          'focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary',
          'disabled:cursor-not-allowed disabled:opacity-50',
          error && 'border-red-500 focus:ring-red-500/20 focus:border-red-500'
        )}
        placeholder={placeholder || `Enter your ${label.toLowerCase()}`}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={error ? `${id}-error` : undefined}
      />
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-sm text-red-500" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
