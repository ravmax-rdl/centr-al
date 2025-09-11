'use client';

import { Loader } from 'lucide-react';
import { logout } from '../actions/logout';
import React, { useState } from 'react';
import { ForgotPassword } from '../../(account)/forgot-password/actions/forgotPassword';
import { redirect } from 'next/navigation';

export const ResetPasswordButton = ({ email }: { email: string }) => {
  const [isClicked, setIsClicked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    setIsLoading(true);
    await ForgotPassword({ email });
    setIsLoading(false);

    setIsClicked(true);
    await logout();
    redirect(
      `/login?message=${encodeURIComponent('Please check your email for a link to reset your password.')}`
    );
  };

  return (
    <div>
      <button
        disabled={isClicked}
        className={`${!isClicked ? 'cursor-pointer' : 'cursor-not-allowed'} mt-8 mb-4 w-auto px-4 py-2 rounded-md bg-emerald-50 text-emerald-950 border border-emerald-950 shadow-sm flex items-center justify-center gap-4`}
        type="button"
        onClick={handleClick}
      >
        {!isClicked ? 'Reset Password' : 'Password reset requested!'}
        <Loader className={`animate-spin ${isLoading ? 'inline-block' : 'hidden'}`} />
      </button>
      {isClicked && <div className='text-emerald-950/50'>
        <p>
          Check your mail!
        </p>
        </div>}
    </div>
  );
};
