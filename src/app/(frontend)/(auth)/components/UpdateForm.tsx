'use client';

import React, { ReactElement, useState } from 'react';
import { useRouter } from 'next/navigation';
import SubmitButton from '@/components/AuthorForm/SubmitButton';
import { Input } from '@/components/AuthorForm/Input';
import { FormContainer } from '@/components/AuthorForm/FormContainer';
import { update } from '../actions/update';
import { Response } from '../../(account)/create-account/actions/create';
import type { Author } from '@/payload-types';

export default function UpdateForm({ user }: { user: Author }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData(event.currentTarget);

    const email = formData.get('email') as string;
    const firstName = formData.get('firstName') as string;
    const lastName = formData.get('lastName') as string;

    const result: Response = await update({ email, firstName, lastName });

    setIsLoading(false);

    if (result.success) {
      router.push('/dashboard');
    } else {
      setError(result.error || 'An unexpected error occurred.');
    }
  }

  return (
    <FormContainer heading="Your Profile">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-row flex-1/2 gap-2">
          <Input
            label="First Name"
            name="firstName"
            type="text"
            defaultValue={user.firstName || ''}
          />
          <Input label="Last Name" name="lastName" type="text" defaultValue={user.lastName || ''} />
        </div>
        <Input label="Email" name="email" type="email" defaultValue={user.email || ''} />

        {error && <div className="text-red-400">{error}</div>}
        <SubmitButton loading={isLoading} text="Update Profile" />
      </form>
    </FormContainer>
  );
}
