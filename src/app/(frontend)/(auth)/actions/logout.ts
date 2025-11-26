'use server';

import { cookies } from 'next/headers';
import { Response } from '../../(account)/signup/actions/create';

export async function logout(): Promise<Response> {
  try {
    const cookieStore = await cookies();
    cookieStore.delete('payload-token');

    return { success: true };
  } catch (error) {
    console.log('Logout error:', error);
    return { success: false, error: 'Failed to logout' };
  }
}
