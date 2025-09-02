import type { CollectionConfig } from 'payload';

import { anyone } from '@/access/anyone';
import { isAdmin, isAdminFieldLevel } from '@/access/isAdmin';
import { isAdminOrSelf } from '@/access/isAdminOrSelf';

export const Users: CollectionConfig = {
  slug: 'users',
  access: {
    create: anyone,
    delete: isAdminOrSelf,
    read: isAdminOrSelf,
    update: isAdminOrSelf,
  },
  admin: {
    defaultColumns: ['name', 'email'],
    useAsTitle: 'name',
  },
  auth: true,
  fields: [
    {
      name: 'name',
      type: 'text',
    },
    {
      name: 'role',
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
    },
  ],
  timestamps: true,
};
