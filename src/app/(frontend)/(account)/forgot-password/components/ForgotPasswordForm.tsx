'use client';

import React, { ReactElement, useState } from 'react';
import { useRouter } from 'next/navigation';
import SubmitButton from '@/components/UserForm/SubmitButton';
import { Input } from '@/components/UserForm/Input';
import { FormContainer } from '@/components/UserForm/FormContainer';
import { ForgotPassword } from '../actions/forgotPassword';
import { Response } from '../../create-account/actions/create';
import { set } from 'react-hook-form';

export default function ForgotForm(): ReactElement {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData(event.currentTarget);

    const email = formData.get('email') as string;

    setIsLoading(false);

    const result: Response = await ForgotPassword({ email });

    if (result.success) {
      router.push(
        `/login?message=${encodeURIComponent('A password reset link has been sent to your email address.')}`
      );
    } else {
      setError(result.error || 'An unexpected error occurred. Please try again later.');
    }
  }

  return (
    <FormContainer heading="Forgot Password?">
      <div className="w-full mx-auto sm:max-w-sm">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input name="email" type="email" label="Email" required />
          {error && <div className="text-red-400">{error}</div>}
          <SubmitButton loading={isLoading} text="Reset Password" />
        </form>
      </div>
    </FormContainer>
  );
}
