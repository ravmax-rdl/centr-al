'use server';

import { getPayload } from 'payload';
import config from '@payload-config';
import { Response } from '../../signup/actions/create';
import { serverResetPasswordSchema } from '../../validation/schemas';

export interface ResetPasswordParams {
  token: string;
  password: string;
}

export async function resetPassword({ token, password }: ResetPasswordParams): Promise<Response> {
  // Validate input with Zod
  const validationResult = serverResetPasswordSchema.safeParse({ token, password });
  if (!validationResult.success) {
    return {
      success: false,
      error: validationResult.error.issues[0]?.message || 'Invalid input',
    };
  }

  try {
    const payload = await getPayload({ config });
    await payload.resetPassword({
      collection: 'users',
      data: { token, password },
      overrideAccess: true,
    });
    return {
      success: true,
    };
  } catch (error) {
    console.log('Error resetting password:', error);
    return {
      success: false,
      error: 'Failed to reset password. Please try again.',
    };
  }
}
