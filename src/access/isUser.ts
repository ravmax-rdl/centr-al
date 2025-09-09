import type { Access, FieldAccess } from 'payload';
import { User } from '../payload-types';

export const isUser: Access = ({ req: { user } }) => {
  // Return true or false based on if the user has an admin role
  return Boolean(user?.roles?.includes('user'));
};

export const isUserFieldLevel: FieldAccess = ({ req: { user } }) => {
  // Return true or false based on if the user has an user role
  return Boolean(user?.roles?.includes('user'));
};
