import type { Block } from 'payload';

export const Features: Block = {
  slug: 'features',
  interfaceName: 'FeaturesBlock',
  fields: [
    {
      name: 'featureOne',
      type: 'group',
      label: 'Feature Card 1 (100% Customizable)',
      fields: [
        {
          name: 'percentage',
          type: 'text',
          label: 'Percentage Text',
          defaultValue: '100%',
          required: true,
        },
        {
          name: 'title',
          type: 'text',
          label: 'Title',
          defaultValue: 'Customizable',
          required: true,
        },
      ],
    },
    {
      name: 'featureTwo',
      type: 'group',
      label: 'Feature Card 2 (Secure by default)',
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Title',
          defaultValue: 'Secure by default',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Description',
          defaultValue:
            'Provident fugit and vero voluptate. magnam magni doloribus dolores voluptates a sapiente nisi.',
          required: true,
        },
      ],
    },
    {
      name: 'featureThree',
      type: 'group',
      label: 'Feature Card 3',
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Title',
          defaultValue: 'Faster than light',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Description',
          defaultValue:
            'Provident fugit vero voluptate. magnam magni doloribus dolores voluptates inventore nisi.',
          required: true,
        },
      ],
    },
    {
      name: 'featureFour',
      type: 'group',
      label: 'Feature Card 4',
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Title',
          defaultValue: 'Keep your loved ones safe',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Description',
          defaultValue:
            'Voluptate. magnam magni doloribus dolores voluptates a sapiente inventore nisi.',
          required: true,
        },
      ],
    },
  ],
};
