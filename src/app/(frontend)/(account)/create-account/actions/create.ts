'use server';

import { getPayload } from 'payload';
import config from '@payload-config';

interface CreateParams {
  email: string;
  password: string;
  firstName: string;
  lastName?: string;
}

export interface Response {
  success: boolean;
  error?: string;
}

export async function create({
  email,
  password,
  firstName,
  lastName,
}: CreateParams): Promise<Response> {
  const payload = await getPayload({ config });
  try {
    const find = await payload.find({
      collection: 'authors',
      where: {
        email: {
          equals: email,
        },
      },
    });

    if (find.totalDocs === 0) {
      try {
        await payload.create({
          collection: 'authors',
          data: {
            email,
            password,
            firstName,
            lastName,
          },
        });

        return { success: true };
      } catch (error) {
        console.log(error);
        return { success: false, error: 'There was a problem creating the account.' };
      }
    } else {
      return { success: false, error: 'An account with that email already exists.' };
    }
  } catch (error) {
    console.log('Signup error:', error);
    return { success: false, error: 'An error occurred.' };
  }
}
