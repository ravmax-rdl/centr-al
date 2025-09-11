'use client';

import { LogOut } from 'lucide-react';
import { logout } from '../actions/logout';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export const LogoutButton = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  async function handleLogout() {
    setLoading(true);
    setError(null);

    const result = await logout();

    setLoading(false);

    if (result.success) {
      router.push('/login?message=You have been logged out successfully');
    } else {
      setError(result.error || 'Failed to logout');
    }
  }

  return (
    <>
      {error && <p className="text-red-400">{error}</p>}
      <button
        onClick={handleLogout}
        disabled={loading}
        className="[px-2 py-1 cursor-pointer flex items-center text-cyan-50 fill-cyan-50 rounded-md border border-cyan-50]"
      >
        {loading ? (
          'Logging out...'
        ) : (
          <div className="flex items-center gap-4 justify-start">
            <LogOut size={24} />
            <p>Logout</p>
          </div>
        )}
      </button>
    </>
  );
};
