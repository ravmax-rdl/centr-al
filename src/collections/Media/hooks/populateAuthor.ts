import type { CollectionBeforeChangeHook } from 'payload';

// Automatically populate the authors field with the current user when creating a new post
export const populateAuthor: CollectionBeforeChangeHook = async ({ data, req, operation }) => {
  // Only run this hook when creating a new post (not updating)
  if (operation === 'create' && req.user) {
    // If authors field is not already set or is empty, populate it with the current user
    if (!data.authors || data.authors.length === 0) {
      data.authors = [req.user.id];
    }
  }

  return data;
};
