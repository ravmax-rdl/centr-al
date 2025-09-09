import type { Access, FieldAccess } from 'payload';
import { User } from '../payload-types';

export const isModerator: Access = ({ req: { user } }) => {
  // Return true or false based on if the user has an admin role
  return Boolean(user?.roles?.includes('moderator'));
};

export const isModeratorFieldLevel: FieldAccess = ({ req: { user } }) => {
  // Return true or false based on if the user has an moderator role
  return Boolean(user?.roles?.includes('moderator'));
};
