'use server';

import { getPayload } from 'payload';
import config from '@payload-config';
import { getUser } from '../actions/getUser';
import type { User } from '@/payload-types';
import { Response } from '../../(account)/create-account/actions/create';

interface UpdateParams {
  email: string;
  name: string;
}

export async function update({ email, name }: UpdateParams): Promise<Response> {
  const payload = await getPayload({ config });
  const user = (await getUser()) as User;

  try {
    await payload.update({
      collection: 'users',
      id: user.id,
      data: { email, name },
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
