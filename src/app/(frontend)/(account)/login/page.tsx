import React from 'react';
import LoginForm from './components/loginForm';
import { getUser } from '../../(auth)/actions/getUser';
import { redirect } from 'next/navigation';

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

  const { message } = await searchParams;
  return (
    <div className="h-[80vh] w-full mx-auto sm:max-w-sm">
      {message && (
        <div className="flex justify-center mt-8">
          <p className="w-auto inline-block mx-auto p-4 bg-cyan-100 text-cyan-950 border-e-cyan-950 rounded-md border">
            {message}
          </p>
        </div>
      )}
      <LoginForm />
    </div>
  );
}
