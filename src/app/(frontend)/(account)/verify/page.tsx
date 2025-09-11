import { getPayload } from 'payload';
import config from '@payload-config';
import { redirect } from 'next/navigation';

interface SearchParams {
  [key: string]: string;
}

export default async function Page({ searchParams }: { searchParams: SearchParams }) {
  const { token } = await searchParams;
  const payload = await getPayload({ config });

  if (!token) {
    redirect(`/login?message=${encodeURIComponent('Verification token is required')}`);
  } else {
    const result = await payload.verifyEmail({
      collection: 'authors',
      token,
    });
    if (result) {
      redirect(`/login?message=${encodeURIComponent('Email verified successfully')}`);
    } else {
      return (
        <div className="flex flex-col items-center justify-center min-h-full h-[100vh] w-full mx-auto sm:max-w-sm">
            <h1>There was a problem verifying your email</h1>
           <p>Please contact an administrator.</p>
         </div>
        );
    }
  }
}
