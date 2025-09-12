'use client';

import React, { ReactElement, useState } from 'react';
import { useRouter } from 'next/navigation';
import { create, Response } from '../actions/create';
import Link from 'next/link';
import { FormContainer } from '@/components/UserForm/FormContainer';
import { set } from 'react-hook-form';
import { Input } from '@/components/UserForm/Input';
import SubmitButton from '@/components/UserForm/SubmitButton';

export default function CreateForm(): ReactElement {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData(event.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const confirmPassword = formData.get('confirmPassword') as string;
    const name = formData.get('name') as string;

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    const result: Response = await create({
      email,
      password,
      name,
    });
    setIsLoading(false);

    if (result.success) {
      router.push(
        `/login?message=${encodeURIComponent('Check your email to verify your account.')}`
      );
    } else {
      setError(result.error || 'An unexpected error occurred');
    }
  }

  return (
    <FormContainer heading="Create User Account">
      <form className={'flex flex-col gap-4'} onSubmit={handleSubmit}>
        <Input
          label="Full Name"
          name="name"
          type="text"
          placeholder="Enter your full name"
          required
        />
        <Input label="Email" name="email" type="email" placeholder="Enter your email" required />
        <Input
          label="Password"
          name="password"
          type="password"
          placeholder="Enter your password"
          required
        />
        <Input
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          placeholder="Confirm your password"
          required
        />
        {error && <div className="text-red-400">{error}</div>}
        <SubmitButton loading={isLoading} text="Create Account" />
      </form>
      <div className="mt-4">
        <p className="text-sm text-cyan-950/50">
          Already have an account?<Link href={'/login'}> Login here. </Link>
        </p>
      </div>
    </FormContainer>
  );
}
