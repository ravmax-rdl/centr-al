'use server';

import { getPayload } from 'payload';
import config from '@payload-config';
import { cookies } from 'next/headers';
import type { User } from '@/payload-types';
import { Response } from '../../signup/actions/create';
import { serverLoginSchema, type LoginFormData } from '../../validation/schemas';

export type Result = {
  exp?: number;
  token?: string;
  user?: User;
};

export async function login({ email, password }: LoginFormData): Promise<Response> {
  // Validate input with Zod
  const validationResult = serverLoginSchema.safeParse({ email, password });
  if (!validationResult.success) {
    return {
      success: false,
      error: validationResult.error.issues[0]?.message || 'Invalid input',
    };
  }

  const payload = await getPayload({ config });
  try {
    const result: Result = await payload.login({
      collection: 'users',
      data: {
        email,
        password,
      },
    });

    if (result.token) {
      const cookieStore = await cookies();
      cookieStore.set('payload-token', result.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        maxAge: result.exp ? result.exp - Math.floor(Date.now() / 1000) : 60 * 60 * 24 * 7, // Use token expiration or default to 7 days
      });

      return {
        success: true,
      };
    } else {
      return { success: false, error: 'Invalid email or password' };
    }
  } catch (error) {
    console.log('Login error:', error);
    return {
      success: false,
      error: 'An error occurred during login. Please try again.',
    };
  }
}
