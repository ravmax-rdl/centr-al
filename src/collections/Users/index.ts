import type { CollectionConfig } from 'payload';

import { anyone } from '@/access/anyone';
import { authenticated } from '@/access/authenticated';
import { isAdmin, isAdminFieldLevel } from '@/access/isAdmin';
import { isAdminOrModerator } from '@/access/isAdminorModerator';
import { protectRoles } from './hooks/protectRoles';

export const Users: CollectionConfig = {
  slug: 'users',
  access: {
    create: anyone,
    delete: isAdmin,
    read: authenticated,
    update: isAdminOrModerator,
  },
  admin: {
    defaultColumns: ['name', 'email'],
    useAsTitle: 'name',
  },
  auth: {
    verify: true, // Only verify email if SMTP is configured
    maxLoginAttempts: 5,
    lockTime: 600 * 1000,
    
  },
  fields: [
    {
      name: 'name',
      type: 'text',
    },
    {
      name: 'roles',
      saveToJWT: true,
      hasMany: true,
      type: 'select',
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'Editor', value: 'editor' },
        { label: 'Moderator', value: 'moderator' },
        { label: 'User', value: 'user' },
      ],
      defaultValue: ['user'],
      required: true,
      access: {
        update: isAdminFieldLevel,
      },
      hooks: {
        beforeChange: [protectRoles],
      },
    },
  ],
  timestamps: true,
};
