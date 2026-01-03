import React, { Fragment } from 'react';
import dynamic from 'next/dynamic';

import type { Page } from '@/payload-types';

import { ArchiveBlock } from '@/blocks/ArchiveBlock/Component';
import { CallToActionBlock } from '@/blocks/CallToAction/Component';
import { ContentBlock } from '@/blocks/Content/Component';
import { FeaturesBlock } from '@/blocks/Features/Component';
import { MediaBlock } from '@/blocks/MediaBlock/Component';
import { SponsorsBlock } from '@/blocks/Sponsors/Component';
import { TestimonialsBlock } from '@/blocks/Testimonials/Component';

// Dynamically import heavy client-side components for better code splitting
const FormBlock = dynamic(() => import('@/blocks/Form/Component').then((mod) => mod.FormBlock), {
  ssr: true,
});

const ProcessBlock = dynamic(
  () => import('@/blocks/Process/Component').then((mod) => mod.ProcessBlock),
  { ssr: true }
);

const ScrollTextBlock = dynamic(
  () => import('@/blocks/ScrollText/Component').then((mod) => mod.ScrollTextBlock),
  { ssr: true }
);

const blockComponents = {
  archive: ArchiveBlock,
  content: ContentBlock,
  cta: CallToActionBlock,
  features: FeaturesBlock,
  formBlock: FormBlock,
  mediaBlock: MediaBlock,
  process: ProcessBlock,
  scrollText: ScrollTextBlock,
  sponsors: SponsorsBlock,
  testimonials: TestimonialsBlock,
};

export const RenderBlocks: React.FC<{
  blocks: Page['layout'][0][];
}> = (props) => {
  const { blocks } = props;

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0;

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockType } = block;

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType];

            if (Block) {
              return (
                <div className="my-16" key={index}>
                  {/* @ts-expect-error there may be some mismatch between the expected types here */}
                  <Block {...block} disableInnerContainer />
                </div>
              );
            }
          }
          return null;
        })}
      </Fragment>
    );
  }

  return null;
};
