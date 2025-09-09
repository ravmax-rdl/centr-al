import type { Access, FieldAccess } from 'payload';
import { User } from '../payload-types';

export const isEditor: Access = ({ req: { user } }) => {
  // Return true or false based on if the user has an editor role
  return Boolean(user?.roles?.includes('editor'));
};

export const isEditorFieldLevel: FieldAccess = ({ req: { user } }) => {
  // Return true or false based on if the user has an editor role
  return Boolean(user?.roles?.includes('editor'));
};
