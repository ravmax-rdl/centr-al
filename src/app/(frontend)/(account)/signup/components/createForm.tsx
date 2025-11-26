'use client';

import React, { ReactElement, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { create } from '../actions/create';
import Link from 'next/link';
import { FormContainer } from '@/components/UserForm/FormContainer';
import SubmitButton from '@/components/UserForm/SubmitButton';
import { FormInput } from '../../components/FormInput';

interface CreateFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function CreateForm(): ReactElement {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<CreateFormData>();

  const onSubmit = async (data: CreateFormData) => {
    if (data.password !== data.confirmPassword) {
      setError('confirmPassword', { message: 'Passwords do not match' });
      return;
    }

    startTransition(async () => {
      const result = await create({
        email: data.email,
        password: data.password,
        name: data.name,
      });

      if (result.success) {
        router.push(
          `/login?message=${encodeURIComponent('Check your email to verify your account.')}`
        );
      } else {
        setError('root', {
          message: result.error || 'An unexpected error occurred',
        });
      }
    });
  };

  return (
    <FormContainer heading="Create User Account">
      <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          label="Full Name"
          id="name"
          type="text"
          placeholder="Enter your full name"
          error={errors.name?.message}
          register={register('name', { required: 'Full name is required' })}
          required
        />
        <FormInput
          label="Email"
          id="email"
          type="email"
          placeholder="Enter your email"
          error={errors.email?.message}
          register={register('email', { required: 'Email is required' })}
          required
        />
        <FormInput
          label="Password"
          id="password"
          type="password"
          placeholder="Enter your password"
          error={errors.password?.message}
          register={register('password', { required: 'Password is required' })}
          required
        />
        <FormInput
          label="Confirm Password"
          id="confirmPassword"
          type="password"
          placeholder="Confirm your password"
          error={errors.confirmPassword?.message}
          register={register('confirmPassword', { required: 'Please confirm your password' })}
          required
        />
        {errors.root && <div className="mb-5 text-sm text-red-500">{errors.root.message}</div>}
        <SubmitButton loading={isPending} text="Create Account" />
      </form>
      <div className="mt-6 text-center text-sm">
        <p className="text-muted-foreground">
          Already have an account?{' '}
          <Link href="/login" className="font-medium text-primary hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </FormContainer>
  );
}
