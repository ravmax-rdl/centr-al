import React from 'react';
import { getUser } from '../../(auth)/actions/getUser';
import { redirect } from 'next/navigation';
import ResetForm from './components/resetPasswordForm';
import { AccountLayout } from '../components/AccountLayout';
import { MessageBanner } from '../components/MessageBanner';

interface SearchParams {
  [key: string]: string | undefined;
}

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}): Promise<React.ReactElement> {
  const user = await getUser();
  if (user) {
    redirect('/admin');
  }
  const { message, token } = await searchParams;

  if (!token) {
    redirect(`/login?message=${encodeURIComponent('No reset token found')}`);
  }

  return (
    <AccountLayout minHeight="100vh">
      {message && <MessageBanner message={message} />}
      <ResetForm token={token} />
    </AccountLayout>
  );
}
}
