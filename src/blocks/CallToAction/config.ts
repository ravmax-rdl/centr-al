import type { Block } from 'payload';

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical';

import { linkGroup } from '../../fields/linkGroup';

export const CallToAction: Block = {
  slug: 'cta',
  interfaceName: 'CallToActionBlock',
  fields: [
    {
      name: 'richText',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ];
        },
      }),
      label: false,
    },
    linkGroup({
      appearances: ['default', 'outline'],
      overrides: {
        maxRows: 2,
      },
    }),
    {
      name: 'marqueeItems',
      type: 'array',
      label: 'Marquee Items',
      minRows: 3,
      maxRows: 10,
      fields: [
        {
          name: 'text',
          type: 'text',
          required: true,
          label: 'Text',
        },
      ],
      defaultValue: [
        { text: 'Content Agencies' },
        { text: 'Founders & Execs' },
        { text: 'Social Media Managers' },
        { text: 'Content Marketers' },
        { text: 'Growth Teams' },
      ],
    },
  ],
  labels: {
    plural: 'Calls to Action',
    singular: 'Call to Action',
  },
};
