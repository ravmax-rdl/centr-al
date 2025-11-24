import type { Block } from 'payload';

export const Sponsors: Block = {
  slug: 'sponsors',
  interfaceName: 'SponsorsBlock',
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Title',
    },
    {
      name: 'sponsors',
      type: 'array',
      label: 'Sponsors',
      minRows: 3,
      maxRows: 15,
      fields: [
        {
          name: 'logo',
          type: 'upload',
          relationTo: 'media',
          label: 'Logo',
          required: true,
        },
        {
          name: 'name',
          type: 'text',
          label: 'Name',
          required: true,
        },
        {
          name: 'url',
          type: 'text',
          label: 'URL',
        },
      ],
    },
    {
      name: 'speed',
      type: 'number',
      label: 'Animation Speed',
      defaultValue: 40,
      admin: {
        description: 'Speed of the scrolling animation (pixels per second)',
      },
    },
    {
      name: 'speedOnHover',
      type: 'number',
      label: 'Speed on Hover',
      defaultValue: 20,
      admin: {
        description: 'Speed when hovering over the slider',
      },
    },
  ],
};
