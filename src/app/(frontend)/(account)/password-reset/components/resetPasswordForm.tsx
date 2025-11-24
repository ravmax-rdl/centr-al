'use client';

import React, { ReactElement, useState } from 'react';
import { useRouter } from 'next/navigation';
import SubmitButton from '@/components/UserForm/SubmitButton';
import { Input } from '@/components/UserForm/Input';
import { FormContainer } from '@/components/UserForm/FormContainer';
import { resetPassword } from '../actions/resetPassword';
import { Response } from '../../create-account/actions/create';

export default function ResetForm({ token }: { token: string }): ReactElement {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData(event.currentTarget);

    const password = formData.get('password') as string;
    const confirmPassword = formData.get('confirmPassword') as string;

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      setIsLoading(false);
      return;
    }

    const result: Response = await resetPassword({ token, password });

    setIsLoading(false);

    if (result.success) {
      router.push(`/login?${encodeURIComponent('Password reset successful. Please log in.')}`);
    } else {
      setError(result.error || 'An error occurred while resetting your password.');
    }
  }

  return (
    <FormContainer heading="Reset Your Password">
      <div className="w-full mx-auto sm:max-w-sm">
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <Input name="password" type="password" label="Password" />
          <Input name="confirmPassword" type="password" label="Confirm Password" />
          {error && <div className="text-red-400">{error}</div>}
          <SubmitButton loading={isLoading} text="Reset Password" />
        </form>
      </div>
    </FormContainer>
  );
}
