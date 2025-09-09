import type { Access, FieldAccess } from 'payload';
import { User } from '../payload-types';

export const isAdminOrEditor: Access = ({ req: { user } }) => {
  // Return true or false based on if the user has an admin role
  return Boolean(user?.roles?.includes('admin') || user?.roles?.includes('editor'));
};

export const isAdminOrEditorFieldLevel: FieldAccess = ({ req: { user } }) => {
  // Return true or false based on if the user has an admin role
  return Boolean(user?.roles?.includes('admin') || user?.roles?.includes('editor'));
};
