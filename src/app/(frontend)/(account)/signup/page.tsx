import React from 'react';
import CreateForm from './components/createForm';
import { getUser } from '../../(auth)/actions/getUser';
import { redirect } from 'next/navigation';
import { AccountLayout } from '../components/AccountLayout';

export default async function Page(): Promise<React.ReactElement> {
  const user = await getUser();
  if (user) {
    redirect('/admin');
  }

  return (
    <AccountLayout>
      <CreateForm />
    </AccountLayout>
  );
}
