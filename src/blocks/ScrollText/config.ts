import type { Block } from 'payload';

export const ScrollText: Block = {
  slug: 'scrollText',
  interfaceName: 'ScrollTextBlock',
  fields: [
    {
      name: 'text',
      type: 'textarea',
      required: true,
      label: 'Text Content',
      admin: {
        description: 'The text that will animate on scroll',
      },
    },
    {
      name: 'animationType',
      type: 'select',
      defaultValue: 'letter',
      options: [
        { label: 'Letter by Letter', value: 'letter' },
        { label: 'Word by Word', value: 'word' },
      ],
      required: true,
      label: 'Animation Type',
    },
    {
      name: 'textOpacity',
      type: 'select',
      defaultValue: 'soft',
      options: [
        { label: 'None (Fully Hidden)', value: 'none' },
        { label: 'Soft (10% Opacity)', value: 'soft' },
        { label: 'Medium (30% Opacity)', value: 'medium' },
      ],
      required: true,
      label: 'Initial Text Opacity',
      admin: {
        description: 'The opacity of text before it animates in',
      },
    },
    {
      name: 'textAlign',
      type: 'select',
      defaultValue: 'left',
      options: [
        { label: 'Left', value: 'left' },
        { label: 'Center', value: 'center' },
        { label: 'Right', value: 'right' },
      ],
      label: 'Text Alignment',
    },
    {
      name: 'fontSize',
      type: 'select',
      defaultValue: 'base',
      options: [
        { label: 'Small', value: 'sm' },
        { label: 'Base', value: 'base' },
        { label: 'Large', value: 'lg' },
        { label: 'Extra Large', value: 'xl' },
        { label: '2XL', value: '2xl' },
        { label: '3XL', value: '3xl' },
        { label: '4XL', value: '4xl' },
        { label: '8XL', value: '8xl' },
      ],
      label: 'Font Size',
    },
  ],
};
