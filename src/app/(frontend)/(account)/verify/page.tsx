import { getPayload } from 'payload';
import config from '@payload-config';
import { redirect } from 'next/navigation';
import { AccountLayout } from '../components/AccountLayout';
import Link from 'next/link';
import { cn } from '@/utilities/ui';

interface SearchParams {
  [key: string]: string;
}

export default async function Page({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const { token } = await searchParams;

  if (!token) {
    redirect(`/login?message=${encodeURIComponent('Verification token is required')}`);
  }

  const payload = await getPayload({ config });

  try {
    const result = await payload.verifyEmail({
      collection: 'users',
      token,
    });

    if (result) {
      redirect(`/login?message=${encodeURIComponent('Email verified successfully')}`);
    }
  } catch (error) {
    console.error('Email verification error:', error);
  }

  // If we reach here, verification failed
  return (
    <AccountLayout minHeight="100vh">
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="space-y-4 mb-8">
          <h1 className="text-2xl font-semibold tracking-tight">
            There was a problem verifying your email
          </h1>
          <p className="text-muted-foreground max-w-md">
            The verification link may have expired or is invalid. Please try creating a new account
            or contact support for assistance.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href="/login"
            className={cn(
              'inline-flex items-center justify-center px-4 py-2.5 rounded-md text-sm font-medium',
              'bg-primary text-primary-foreground hover:bg-primary/90',
              'focus:outline-none focus:ring-2 focus:ring-primary/20 focus:ring-offset-2',
              'transition-colors'
            )}
          >
            Go to Login
          </Link>
          <Link
            href="/signup"
            className={cn(
              'inline-flex items-center justify-center px-4 py-2.5 rounded-md text-sm font-medium',
              'border border-border bg-background hover:bg-accent',
              'focus:outline-none focus:ring-2 focus:ring-primary/20 focus:ring-offset-2',
              'transition-colors'
            )}
          >
            Create New Account
          </Link>
        </div>
      </div>
    </AccountLayout>
  );
}
