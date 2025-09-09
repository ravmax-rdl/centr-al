import type { Access, FieldAccess } from 'payload';
import { User } from '../payload-types';

export const isAdminOrModeratorOrEditor: Access = ({ req: { user } }) => {
  // Return true or false based on if the user has an admin role
  return Boolean(user?.roles?.includes('admin') || user?.roles?.includes('moderator') || user?.roles?.includes('editor'));
};

export const isAdminOrModeratorOrEditorFieldLevel: FieldAccess = ({ req: { user } }) => {
  // Return true or false based on if the user has an admin role
  return Boolean(user?.roles?.includes('admin') || user?.roles?.includes('moderator') || user?.roles?.includes('editor'));
};
