'use server';

import { getPayload } from 'payload';
import config from '@payload-config';
import { Response } from '../../signup/actions/create';
import { serverForgotPasswordSchema } from '../../validation/schemas';

export async function ForgotPassword({ email }: { email: string }): Promise<Response> {
  // Validate input with Zod
  const validationResult = serverForgotPasswordSchema.safeParse({ email });
  if (!validationResult.success) {
    return {
      success: false,
      error: validationResult.error.issues[0]?.message || 'Invalid input',
    };
  }

  const payload = await getPayload({ config });

  try {
    await payload.forgotPassword({
      collection: 'users',
      data: { email },
    });
  } catch (error) {
    console.log('Error in forgot password:', error);
    return {
      success: false,
      error: 'An error occurred while processing your request. Please try again later.',
    };
  }
  return {
    success: true,
  };
}
