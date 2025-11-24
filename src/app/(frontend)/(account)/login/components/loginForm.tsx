'use client';

import React, { ReactElement, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import SubmitButton from '@/components/UserForm/SubmitButton';
import { login } from '../actions/login';
import Link from 'next/link';
import { FormContainer } from '@/components/UserForm/FormContainer';
import { FormInput } from '../../components/FormInput';

interface LoginFormData {
  email: string;
  password: string;
}

export default function LoginForm(): ReactElement {
  const [isPending, startTransition] = useTransition();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginFormData>();

  const onSubmit = async (data: LoginFormData) => {
    startTransition(async () => {
      const result = await login(data);

      if (result.success) {
        // Force full page reload to ensure server-side auth state is updated
        window.location.href = '/admin';
      } else {
        setError('root', {
          message: result.error || 'An unexpected error occurred. Please try again.',
        });
      }
    });
  };

  return (
    <FormContainer heading="Login">
      <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
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
        {errors.root && <div className="mb-5 text-sm text-red-500">{errors.root.message}</div>}
        <SubmitButton loading={isPending} text="Login" />
      </form>
      <div className="mt-6 text-center text-sm">
        <p className="text-muted-foreground">
          Don&#39;t have an account?{' '}
          <Link href="/signup" className="font-medium text-primary hover:underline">
            Create one here
          </Link>
        </p>
      </div>
      <div className="mt-3 text-center">
        <Link
          href="/forgot-password"
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          Forgot password?
        </Link>
      </div>
    </FormContainer>
  );
}
