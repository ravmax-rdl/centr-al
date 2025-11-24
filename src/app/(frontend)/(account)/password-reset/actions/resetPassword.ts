'use server';

import { getPayload } from 'payload';
import config from '@payload-config';
import { Response } from '../../signup/actions/create';

export interface ResetPasswordParams {
  token: string;
  password: string;
}

export async function resetPassword({ token, password }: ResetPasswordParams): Promise<Response> {
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
