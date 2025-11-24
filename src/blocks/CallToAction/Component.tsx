'use client';

import React, { useEffect, useRef, ReactNode } from 'react';
import { motion } from 'framer-motion';

import type { CallToActionBlock as CTABlockProps } from '@/payload-types';

import RichText from '@/components/RichText';
import { CMSLink } from '@/components/Link';
import { cn } from '@/utilities/ui';

interface VerticalMarqueeProps {
  children: ReactNode;
  pauseOnHover?: boolean;
  reverse?: boolean;
  className?: string;
  speed?: number;
}

function VerticalMarquee({
  children,
  pauseOnHover = false,
  reverse = false,
  className,
  speed = 30,
}: VerticalMarqueeProps) {
  return (
    <div
      className={cn('group flex flex-col overflow-hidden', className)}
      style={
        {
          '--duration': `${speed}s`,
        } as React.CSSProperties
      }
    >
      <div
        className={cn(
          'flex shrink-0 flex-col animate-marquee-vertical',
          reverse && '[animation-direction:reverse]',
          pauseOnHover && 'group-hover:[animation-play-state:paused]'
        )}
      >
        {children}
      </div>
      <div
        className={cn(
          'flex shrink-0 flex-col animate-marquee-vertical',
          reverse && '[animation-direction:reverse]',
          pauseOnHover && 'group-hover:[animation-play-state:paused]'
        )}
        aria-hidden="true"
      >
        {children}
      </div>
    </div>
  );
}

export const CallToActionBlock: React.FC<CTABlockProps> = ({ links, richText, marqueeItems }) => {
  // Default items if none provided from CMS
  const defaultMarqueeItems = ['Blog', 'Forum', 'Crowd sourced', 'Peers', 'Mentors'];

  // Use CMS items if available, otherwise use defaults
  const items =
    marqueeItems && marqueeItems.length > 0
      ? marqueeItems.map((item) => item.text)
      : defaultMarqueeItems;

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center px-6 overflow-hidden py-16 md:py-0">
      <div className="w-full max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-8 max-w-xl"
          >
            {richText && (
              <RichText
                className="mb-0 [&_h1]:text-5xl [&_h1]:md:text-6xl [&_h1]:lg:text-7xl [&_h1]:font-medium [&_h1]:leading-tight [&_h1]:tracking-tight [&_p]:text-lg [&_p]:md:text-xl [&_p]:text-muted-foreground [&_p]:leading-relaxed"
                data={richText}
                enableGutter={false}
              />
            )}
            <div className="flex flex-wrap gap-4">
              {(links || []).map(({ link }, i) => {
                return (
                  <CMSLink
                    key={i}
                    size="lg"
                    {...link}
                    className={cn(
                      i === 0
                        ? 'bg-foreground text-background'
                        : 'bg-secondary text-secondary-foreground border border-border'
                    )}
                  />
                );
              })}
            </div>
          </motion.div>

          {/* Right Marquee */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative h-[400px] md:h-[600px] lg:h-[700px] flex items-center justify-center"
          >
            <div
              className="relative w-full h-full"
              style={{
                maskImage:
                  'linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)',
                WebkitMaskImage:
                  'linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)',
              }}
            >
              <VerticalMarquee speed={20} className="h-full">
                {items.map((item, idx) => (
                  <div
                    key={idx}
                    className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light tracking-tight py-8 text-center opacity-50 hover:opacity-100 transition-opacity duration-300"
                  >
                    {item}
                  </div>
                ))}
              </VerticalMarquee>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
