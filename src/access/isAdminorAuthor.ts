import type { Access, FieldAccess } from 'payload';
import { User } from '../payload-types';

export const isAdminOrAuthor: Access = async ({ req: { user, payload } }) => {
  // Check if user has admin role
  if ((user as User)?.roles?.includes('admin')) {
    return true;
  }

  // Check if user is associated with an author in the authors collection
  if (user?.id) {
    try {
      const author = await payload.find({
        collection: 'authors',
        where: {
          user: {
            equals: user.id,
          },
        },
        limit: 1,
      });

      return author.docs.length > 0;
    } catch (error) {
      console.error('Error checking author status:', error);
      return false;
    }
  }

  return false;
};

export const isAdminOrAuthorFieldLevel: FieldAccess = async ({ req: { user, payload } }) => {
  // Check if user has admin role
  if ((user as User)?.roles?.includes('admin')) {
    return true;
  }

  // Check if user is associated with an author in the authors collection
  if (user?.id) {
    try {
      const author = await payload.find({
        collection: 'authors',
        where: {
          user: {
            equals: user.id,
          },
        },
        limit: 1,
      });

      return author.docs.length > 0;
    } catch (error) {
      console.error('Error checking author status:', error);
      return false;
    }
  }

  return false;
};
