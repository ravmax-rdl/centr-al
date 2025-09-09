import type { FieldHook } from 'payload';
import type { User } from '@/payload-types';

export const protectRoles: FieldHook<{ id: string } & User> = ({ req, data }) => {
  const isAdmin = req.user?.roles?.includes('admin');

  if (!isAdmin) {
    return ['user']; // non-admins are forced to 'user' role
  }

  const userRoles = new Set(data?.roles || []);
  userRoles.add('user'); // ensure 'user' is always included

  return [...userRoles.values()];
};
