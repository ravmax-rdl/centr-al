import React from 'react';
import { getUser } from '../../(auth)/actions/getUser';
import { redirect } from 'next/navigation';
import ResetForm from './components/resetPasswordForm';
import NotFound from '../../not-found';

interface SearchParams {
  [key: string]: string | undefined;
}

export default async function Page({
  searchParams,
}: {
  searchParams: SearchParams;
}): Promise<React.ReactElement> {
  const user = await getUser();
  if (user) {
    redirect('/dashboard');
  }
  const { message, token } = await searchParams;

  if (token) {
    return (
      <div className="h-[100vh] w-full mx-auto sm:max-w-sm">
        <div className="flex justify-center mt-8">
          {message && (
            <p className="w-auto inline-block mx-auto p-4 bg-cyan-100 text-cyan-950 border-e-cyan-950 rounded-md border">
              {message}
            </p>
          )}
        </div>
        <ResetForm token={token} />
      </div>
    );
  } else {
    redirect(`/login?message=${encodeURIComponent('No reset token found')}`);
  }
}
