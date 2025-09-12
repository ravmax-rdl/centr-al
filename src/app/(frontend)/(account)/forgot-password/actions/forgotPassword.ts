'use server';

import { getPayload } from 'payload';
import config from '@payload-config';
import { Response } from '../../create-account/actions/create';

export async function ForgotPassword({ email }: { email: string }): Promise<Response> {
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
