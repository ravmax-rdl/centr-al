'use client';

import { logout } from '@/app/(frontend)/(auth)/actions/logout';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export const LogoutButton = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  async function handleLogout() {
    setLoading(true);
    setError(null);

    try {
      const result = await logout();

      if (result.success) {
        router.push('/login?message=You have been logged out successfully');
      } else {
        setError(result.error || 'Failed to logout');
        setLoading(false);
      }
    } catch (err) {
      setError('An unexpected error occurred');
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-2">
      {error && (
        <p className="text-sm text-red-400 bg-red-950/20 px-3 py-2 rounded-md border border-red-800/30">
          {error}
        </p>
      )}
      <button
        onClick={handleLogout}
        disabled={loading}
        className="px-4 py-2 cursor-pointer flex items-center text-cyan-50 fill-cyan-50 rounded-md border border-cyan-50 hover:bg-cyan-50 hover:text-gray-900 hover:fill-gray-900 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-cyan-50 disabled:hover:fill-cyan-50 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-gray-900"
        aria-label={loading ? 'Logging out' : 'Logout'}
      >
        {loading ? (
          <div className="flex items-center gap-3 justify-center">
            <span>Logging out...</span>
          </div>
        ) : (
          <div className="flex items-center gap-3 justify-center">
            <span>Logout</span>
          </div>
        )}
      </button>
    </div>
  );
};
