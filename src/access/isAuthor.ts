import type { Access, FieldAccess } from 'payload';
import { User } from '../payload-types';

export const isAuthor: Access = ({ req: { user } }) => {
  // Return true or false based on if the user has an author role
  return Boolean((user as User)?.roles?.includes('author'));
};

export const isAuthorFieldLevel: FieldAccess = ({ req: { user } }) => {
  // Return true or false based on if the user has an author role
  return Boolean((user as User)?.roles?.includes('author'));
};
