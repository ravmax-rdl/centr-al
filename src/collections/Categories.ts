import type { CollectionConfig } from 'payload'

import { isAdminOrEditor } from '@/access/isAdminorEditor'
import { isAdminOrModeratorOrEditor } from '@/access/isAdminorModeratororEditor'
import { slugField } from '@/fields/slug'
import { authenticated } from '../access/authenticated'

export const Categories: CollectionConfig = {
  slug: 'categories',
  access: {
    create: isAdminOrEditor,
    delete: isAdminOrModeratorOrEditor,
    read: authenticated,
    update: isAdminOrModeratorOrEditor,
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
}
