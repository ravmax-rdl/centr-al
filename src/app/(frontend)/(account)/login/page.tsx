import React from 'react';
import LoginForm from './components/loginForm';
import { getUser } from '../../(auth)/actions/getUser';
import { redirect } from 'next/navigation';
import { MessageBanner } from '../components/MessageBanner';
import { AccountLayout } from '../components/AccountLayout';

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

  const { message } = await searchParams;
  return (
    <AccountLayout>
      {message && <MessageBanner message={message} />}
      <LoginForm />
    </AccountLayout>
  );
}
