'use server';

import { getPayload } from 'payload';
import config from '@payload-config';
import { Response } from '../../create-account/actions/create';

export interface ResetPasswordParams {
  token: string;
  password: string;
}

export async function resetPassword({ token, password }: ResetPasswordParams): Promise<Response> {
  const payload = getPayload({ config });

  try {
    (await payload).resetPassword({
      collection: 'authors',
      data: { token, password },
      overrideAccess: true,
    });
  } catch (error) {
    console.log('Error resetting password:', error);
    return {
      success: false,
      error: 'Failed to reset password. Please try again.',
    };
  }
  return {
    success: true,
  };
}
