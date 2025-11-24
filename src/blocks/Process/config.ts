import type { Block } from 'payload';

export const Process: Block = {
  slug: 'process',
  fields: [
    {
      name: 'circleText',
      type: 'text',
      label: 'Circle Text',
      defaultValue: 'SVG',
    },
    {
      name: 'badgeFirstText',
      type: 'text',
      label: 'First Badge Text',
      defaultValue: 'GET',
    },
    {
      name: 'badgeSecondText',
      type: 'text',
      label: 'Second Badge Text',
      defaultValue: 'POST',
    },
    {
      name: 'badgeThirdText',
      type: 'text',
      label: 'Third Badge Text',
      defaultValue: 'PUT',
    },
    {
      name: 'badgeFourthText',
      type: 'text',
      label: 'Fourth Badge Text',
      defaultValue: 'DELETE',
    },
    {
      name: 'buttonFirstText',
      type: 'text',
      label: 'First Button Text',
      defaultValue: 'LegionDev',
    },
    {
      name: 'buttonSecondText',
      type: 'text',
      label: 'Second Button Text',
      defaultValue: 'v2_updates',
    },
    {
      name: 'title',
      type: 'text',
      label: 'Title',
      defaultValue: 'Data exchange using a customized REST API',
    },
    {
      name: 'lightColor',
      type: 'text',
      label: 'Light Color (Hex)',
      defaultValue: '#00A6F5',
      admin: {
        description: 'Hex color code for the gradient light effect',
      },
    },
  ],
  interfaceName: 'ProcessBlock',
};
