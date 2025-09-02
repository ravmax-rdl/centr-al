import type { Access } from 'payload';

export const isAdminModeratorOrPublished: Access = ({ req: { user } }) => {
  // Need to be logged in
  if (user) {
    // If user has role of 'admin' or 'moderator'
    if (user.role.includes('admin') || user.role.includes('moderator')) return true;

    // Non-logged in users can only read published docs
    return {
      _status: {
        equals: 'published',
      },
    };
  }

  // Non-logged in users can only read published docs
  return {
    _status: {
      equals: 'published',
    },
  };
};
