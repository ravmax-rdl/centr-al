import type { Access, FieldAccess } from 'payload';
import { User } from '../payload-types';

export const isAdminOrAuthor: Access = ({ req: { user } }) => {
  // Return true or false based on if the user has an admin or author role
  return Boolean(
    (user as User)?.roles?.includes('admin') || (user as User)?.roles?.includes('author')
  );
};

export const isAdminOrAuthorFieldLevel: FieldAccess = ({ req: { user } }) => {
  // Return true or false based on if the user has an admin or author role
  return Boolean(
    (user as User)?.roles?.includes('admin') || (user as User)?.roles?.includes('author')
  );
};
