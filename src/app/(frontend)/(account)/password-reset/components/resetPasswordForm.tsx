'use client';

import React, { ReactElement, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import SubmitButton from '@/components/UserForm/SubmitButton';
import { FormContainer } from '@/components/UserForm/FormContainer';
import { resetPassword } from '../actions/resetPassword';
import { FormInput } from '../../components/FormInput';
import { resetPasswordSchema, type ResetPasswordFormData } from '../../validation/schemas';

export default function ResetForm({ token }: { token: string }): ReactElement {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = async (data: ResetPasswordFormData) => {
    startTransition(async () => {
      const result = await resetPassword({ token, password: data.password });

      if (result.success) {
        router.push(
          `/login?message=${encodeURIComponent('Password reset successful. Please log in.')}`
        );
      } else {
        setError('root', {
          message: result.error || 'An error occurred while resetting your password.',
        });
      }
    });
  };

  return (
    <FormContainer heading="Reset Your Password">
      <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          label="Password"
          id="password"
          type="password"
          placeholder="Enter your password"
          error={errors.password?.message}
          register={register('password')}
          required
        />
        <FormInput
          label="Confirm Password"
          id="confirmPassword"
          type="password"
          placeholder="Confirm your password"
          error={errors.confirmPassword?.message}
          register={register('confirmPassword')}
          required
        />
        {errors.root && <div className="mb-5 text-sm text-red-500">{errors.root.message}</div>}
        <SubmitButton loading={isPending} text="Reset Password" />
      </form>
    </FormContainer>
  );
}
