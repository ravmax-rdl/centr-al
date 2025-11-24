import React from 'react';
import ForgotForm from './components/ForgotPasswordForm';
import { AccountLayout } from '../components/AccountLayout';

export default function Page() {
  return (
    <AccountLayout minHeight="100vh">
      <ForgotForm />
    </AccountLayout>
  );
}
