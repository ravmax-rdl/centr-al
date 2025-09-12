'use server';

import { headers as getHeaders, cookies } from 'next/headers';
import type { User } from '@/payload-types';
import { getPayload } from 'payload';
import configPromise from '@payload-config';
import type { Payload } from 'payload';

export async function getUser(): Promise<User | null> {
  const headers = await getHeaders();
  const cookieStore = await cookies();
  const token = cookieStore.get('payload-token')?.value;

  const payload: Payload = await getPayload({ config: await configPromise });

  if (token) {
    try {
      // Create headers with the token
      const authHeaders = new Headers(headers);
      authHeaders.set('Authorization', `JWT ${token}`);

      const { user } = await payload.auth({ headers: authHeaders });

      if (user?.collection === 'users') {
        return user || null;
      }
    } catch (error) {
      console.log('Auth error:', error);
      return null;
    }
  }

  return null;
}
