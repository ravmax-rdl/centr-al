import type { CollectionConfig } from 'payload';

import { anyone } from '@/access/anyone';
import { isAdminOrModerator } from '@/access/isAdminorModerator';
import { slugField } from '@/fields/slug';
import { isAdmin } from '@/access/isAdmin';

export const Categories: CollectionConfig = {
  slug: 'categories',
  access: {
    create: isAdmin,
    delete: isAdminOrModerator,
    read: anyone,
    update: isAdminOrModerator,
  },
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    ...slugField(),
  ],
};
