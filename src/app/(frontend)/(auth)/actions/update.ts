'use server';

import { getPayload } from 'payload';
import config from '@payload-config';
import { getUser } from '../actions/getUser';
import type { Author } from '@/payload-types';
import { Response } from '../../(account)/create-account/actions/create';

interface UpdateParams {
  email: string;
  firstName: string;
  lastName?: string;
}

export async function update({ email, firstName, lastName }: UpdateParams): Promise<Response> {
  const payload = await getPayload({ config });
  const user = (await getUser()) as Author;

  try {
    await payload.update({
      collection: 'authors',
      id: user.id,
      data: { email, firstName, lastName },
    });
  } catch (error) {
    console.log('Error updating user:', error);
    return {
      success: false,
      error: 'Failed to update user information.',
    };
  }
  return { success: true };
}
