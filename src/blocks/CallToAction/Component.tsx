'use client';

import React, { ReactNode } from 'react';
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
    <div className="min-h-screen bg-zinc-50 dark:bg-background text-zinc-900 dark:text-zinc-50 flex items-center justify-center px-6 overflow-hidden py-16 md:py-24">
      <div className="w-full max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="space-y-8 max-w-xl"
          >
            {richText && (
              <RichText
                className="mb-0 [&_h1]:text-4xl [&_h1]:md:text-5xl [&_h1]:lg:text-6xl [&_h1]:font-semibold [&_h1]:leading-tight [&_h1]:tracking-tight [&_h1]:text-zinc-900 [&_h1]:dark:text-zinc-50 [&_p]:text-base [&_p]:md:text-lg [&_p]:text-zinc-600 [&_p]:dark:text-zinc-400 [&_p]:leading-relaxed"
                data={richText}
                enableGutter={false}
              />
            )}
            <div className="flex flex-wrap gap-3">
              {(links || []).map(({ link }, i) => {
                return (
                  <CMSLink
                    key={i}
                    size="lg"
                    {...link}
                    className={cn(
                      'rounded-lg px-6 py-3 text-sm font-medium transition-all duration-200',
                      i === 0
                        ? 'bg-zinc-900 dark:bg-zinc-100 text-zinc-50 dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-200'
                        : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 border border-zinc-200 dark:border-zinc-700 hover:border-zinc-300 dark:hover:border-zinc-600'
                    )}
                  />
                );
              })}
            </div>
          </motion.div>

          {/* Right Marquee */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
            className="relative h-[400px] md:h-[500px] lg:h-[600px] flex items-center justify-center"
          >
            <div
              className="relative w-full h-full"
              style={{
                maskImage:
                  'linear-gradient(to bottom, transparent, black 12%, black 88%, transparent)',
                WebkitMaskImage:
                  'linear-gradient(to bottom, transparent, black 12%, black 88%, transparent)',
              }}
            >
              <VerticalMarquee speed={20} className="h-full">
                {items.map((item, idx) => (
                  <div
                    key={idx}
                    className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-medium tracking-tight py-5 text-center text-zinc-600 dark:text-zinc-400 opacity-50 hover:opacity-100 hover:text-zinc-900 dark:hover:text-zinc-100 transition-all duration-300 cursor-default"
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
