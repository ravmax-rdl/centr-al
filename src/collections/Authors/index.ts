import { isAdminOrModerator } from '@/access/isAdminorModerator';
import type { CollectionConfig } from 'payload';

export const Authors: CollectionConfig = {
  slug: 'authors',
  access: {
    create: () => true,
    admin: () => false,
    // delete: isAdminOrModerator,
    // read: isAdminOrModerator,
    // update: self,
  },
  admin: {
    defaultColumns: ['name', 'email'],
    useAsTitle: 'firstName',
  },
  auth: {
    tokenExpiration: 12 * 60 * 60,
    verify: true, // Only verify email if SMTP is configured
    cookies: {
      secure: true,
      sameSite: 'None',
      domain: process.env.COOKIE_DOMAIN,
    },
    maxLoginAttempts: 5,
    lockTime: 600 * 1000,
  },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'firstName',
          type: 'text',
        },
        {
          name: 'lastName',
          type: 'text',
        },
      ],
    },
    {
        name: 'email',
        type: 'email',
        required: true,
        unique: true,
    }
  ],
  timestamps: true,
};
