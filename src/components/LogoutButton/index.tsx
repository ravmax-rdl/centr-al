'use client';

import React from 'react';
import { useAuth, Button } from '@payloadcms/ui';

export const LogoutButton: React.FC = () => {
  const { logOut } = useAuth();

  const handleLogout = async () => {
    try {
      await logOut();
      // Redirect to login page after logout
      window.location.href = '/admin/login';
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <Button onClick={handleLogout} buttonStyle="subtle" size="medium">
      Logout
    </Button>
  );
};
