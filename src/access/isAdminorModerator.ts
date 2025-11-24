import type { Access, FieldAccess } from 'payload';
import { User } from '../payload-types';

export const isAdminOrModerator: Access = ({ req: { user } }) => {
  // Return true or false based on if the user has an admin or moderator role
  return Boolean(
    (user as User)?.roles?.includes('admin') || (user as User)?.roles?.includes('moderator')
  );
};

export const isAdminOrModeratorFieldLevel: FieldAccess = ({ req: { user } }) => {
  // Return true or false based on if the user has an admin or moderator role
  return Boolean(
    (user as User)?.roles?.includes('admin') || (user as User)?.roles?.includes('moderator')
  );
};
