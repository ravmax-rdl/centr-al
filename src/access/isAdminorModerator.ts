import type { Access, FieldAccess } from 'payload';
import { User } from '../payload-types';

export const isAdminOrModerator: Access = ({ req: { user } }) => {
  // Return true or false based on if the user has an admin role
  return Boolean(user?.roles?.includes('admin') || user?.roles?.includes('moderator'));
};

export const isAdminOrModeratorFieldLevel: FieldAccess = ({ req: { user } }) => {
  // Return true or false based on if the user has an admin role
  return Boolean(user?.roles?.includes('admin') || user?.roles?.includes('moderator'));
};
