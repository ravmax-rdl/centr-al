import type { CollectionConfig } from 'payload';

import { anyone } from '@/access/anyone';
import { isAdminOrAuthor } from '@/access/isAdminorAuthor';
import { isAdminOrModeratorOrAuthor } from '@/access/isAdminorModeratororAuthor';
import { slugField } from '@/fields/slug';

export const Categories: CollectionConfig = {
  slug: 'categories',
  access: {
    create: isAdminOrAuthor,
    delete: isAdminOrModeratorOrAuthor,
    read: anyone,
    update: isAdminOrModeratorOrAuthor,
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
