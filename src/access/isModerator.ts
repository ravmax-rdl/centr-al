import type { Access, FieldAccess } from 'payload';
import { User } from '../payload-types';

export const isModerator: Access = ({ req: { user } }) => {
  // Return true or false based on if the user has a moderator role
  return Boolean((user as User)?.roles?.includes('moderator'));
};

export const isModeratorFieldLevel: FieldAccess = ({ req: { user } }) => {
  // Return true or false based on if the user has a moderator role
  return Boolean((user as User)?.roles?.includes('moderator'));
};
