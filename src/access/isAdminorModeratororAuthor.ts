import type { Access, FieldAccess } from 'payload';
import { User } from '../payload-types';

export const isAdminOrModeratorOrAuthor: Access = ({ req: { user } }) => {
  // Return true or false based on if the user has an admin, moderator or author role
  return Boolean(
    (user as User)?.roles?.includes('admin') || (user as User)?.roles?.includes('moderator') || (user as User)?.roles?.includes('author')
  );
};

export const isAdminOrModeratorOrAuthorFieldLevel: FieldAccess = ({ req: { user } }) => {
  // Return true or false based on if the user has an admin, moderator or author role
  return Boolean(
    (user as User)?.roles?.includes('admin') || (user as User)?.roles?.includes('moderator') || (user as User)?.roles?.includes('author')
  );
};
