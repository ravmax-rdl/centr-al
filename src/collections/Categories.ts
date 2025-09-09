import type { CollectionConfig } from 'payload'

import { anyone } from '@/access/anyone'
import { isAdminOrEditor } from '@/access/isAdminorEditor'
import { isAdminOrModeratorOrEditor } from '@/access/isAdminorModeratororEditor'
import { slugField } from '@/fields/slug'

export const Categories: CollectionConfig = {
  slug: 'categories',
  access: {
    create: isAdminOrEditor,
    delete: isAdminOrModeratorOrEditor,
    read: anyone,
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
