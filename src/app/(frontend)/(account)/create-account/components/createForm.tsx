'use client';

import React, { ReactElement, useState } from 'react';
import { useRouter } from 'next/navigation';
import { create, Response } from '../actions/create';
import Link from 'next/link';
import { FormContainer } from '@/components/AuthorForm/FormContainer';
import { set } from 'react-hook-form';
import { Input } from '@/components/AuthorForm/Input';
import SubmitButton from '@/components/AuthorForm/SubmitButton';

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
    const firstName = formData.get('firstName') as string;
    const lastName = formData.get('lastName') as string;

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    const result: Response = await create({
      email,
      password,
      firstName,
      lastName,
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
    <FormContainer heading="Create an account">
      <form className={'flex flex-col gap-4'} onSubmit={handleSubmit}>
        <div className="flex flex-row flex-1/2 gap-2">
          <Input
            label="First Name"
            name="firstName"
            type="text"
            placeholder="Enter your first name"
            required
          />
          <Input
            label="Last Name"
            name="lastName"
            type="text"
            placeholder="Enter your last name"
            required
          />
        </div>
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
        <p className="text-sm text-emerald-950/50">
          Already have an account?<Link href={'/login'}> Login here. </Link>
        </p>
      </div>
    </FormContainer>
  );
}
