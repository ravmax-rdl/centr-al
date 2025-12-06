'use client';

import React, { ReactElement, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import SubmitButton from '@/components/UserForm/SubmitButton';
import { FormContainer } from '@/components/UserForm/FormContainer';
import { ForgotPassword } from '../actions/forgotPassword';
import { FormInput } from '../../components/FormInput';
import { forgotPasswordSchema, type ForgotPasswordFormData } from '../../validation/schemas';

export default function ForgotForm(): ReactElement {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    startTransition(async () => {
      const result = await ForgotPassword({ email: data.email });

      if (result.success) {
        router.push(
          `/login?message=${encodeURIComponent('A password reset link has been sent to your email address.')}`
        );
      } else {
        setError('root', {
          message: result.error || 'An unexpected error occurred. Please try again later.',
        });
      }
    });
  };

  return (
    <FormContainer heading="Forgot Password?">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
        <FormInput
          label="Email"
          id="email"
          type="email"
          placeholder="Enter your email"
          error={errors.email?.message}
          register={register('email')}
          required
        />
        {errors.root && <div className="mb-5 text-sm text-red-500">{errors.root.message}</div>}
        <SubmitButton loading={isPending} text="Reset Password" />
      </form>
    </FormContainer>
  );
}
