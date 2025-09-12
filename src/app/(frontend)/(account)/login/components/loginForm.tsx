'use client';

import React, { ReactElement, useState } from 'react';
import { useRouter } from 'next/navigation';
import SubmitButton from '@/components/UserForm/SubmitButton';
import { Input } from '@/components/UserForm/Input';
import { login } from '../actions/login';
import { Response } from '../../create-account/actions/create';
import Link from 'next/link';
import { FormContainer } from '@/components/UserForm/FormContainer';

export default function LoginForm(): ReactElement {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData(event.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    const result: Response = await login({ email, password });

    setIsLoading(false);

    if (result.success) {
      // Force full page reload to ensure server-side auth state is updated
      window.location.href = '/admin';
    } else {
      setError(result.error || 'An unexpected error occurred. Please try again.');
    }
  }

  return (
    <FormContainer heading="Login">
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <Input label="Email" name="email" type="email" required />
        <Input label="Password" name="password" type="password" required />
        {error && <div className="text-red-400">{error}</div>}
        <SubmitButton loading={isLoading} text="Login" />
      </form>
      <div className="mt-4 text-center">
        <p>
          Don&#39;t have an account?{' '}
          <Link href={'/create-account'} className="underline underline-offset-4">
            {' '}
            Create one here.
          </Link>
        </p>
      </div>
      <div className="mt-4 text-center">
        <Link
          href={'/forgot-password'}
          className="underline underline-offset-4 text-cyan-300/50 hover:text-cyan-300"
        >
          Forgot password?
        </Link>
      </div>
    </FormContainer>
  );
}
