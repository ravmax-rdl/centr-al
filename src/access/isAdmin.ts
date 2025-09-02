import type { Access, FieldAccess } from 'payload';
import { User } from '../payload-types';

export const isAdmin: Access = ({ req: { user } }) => {
  // Return true or false based on if the user has an admin role
  return Boolean(user?.role?.includes('admin'));
};

export const isAdminFieldLevel: FieldAccess = ({ req: { user } }) => {
  // Return true or false based on if the user has an admin role
  return Boolean(user?.role?.includes('admin'));
};
