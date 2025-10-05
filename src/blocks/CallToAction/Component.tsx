'use client';

import React, { useEffect, useRef, ReactNode } from 'react';

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
  onItemsRef?: (items: HTMLElement[]) => void;
}

function VerticalMarquee({
  children,
  pauseOnHover = false,
  reverse = false,
  className,
  speed = 30,
  onItemsRef,
}: VerticalMarqueeProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (onItemsRef && containerRef.current) {
      const items = Array.from(
        containerRef.current.querySelectorAll('.marquee-item')
      ) as HTMLElement[];
      onItemsRef(items);
    }
  }, [onItemsRef]);

  return (
    <div
      ref={containerRef}
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
  const marqueeRef = useRef<HTMLDivElement>(null);

  // Default items if none provided from CMS
  const defaultMarqueeItems = ['Blog', 'Forum', 'Crowd sourced', 'Peers', 'Mentors'];

  // Use CMS items if available, otherwise use defaults
  const items =
    marqueeItems && marqueeItems.length > 0
      ? marqueeItems.map((item) => item.text)
      : defaultMarqueeItems;

  useEffect(() => {
    const marqueeContainer = marqueeRef.current;
    if (!marqueeContainer) return;

    const updateOpacity = () => {
      const items = marqueeContainer.querySelectorAll('.marquee-item');
      const containerRect = marqueeContainer.getBoundingClientRect();
      const centerY = containerRect.top + containerRect.height / 2;

      items.forEach((item) => {
        const itemRect = item.getBoundingClientRect();
        const itemCenterY = itemRect.top + itemRect.height / 2;
        const distance = Math.abs(centerY - itemCenterY);
        const maxDistance = containerRect.height / 2;
        const normalizedDistance = Math.min(distance / maxDistance, 1);
        const opacity = 1 - normalizedDistance * 0.75;
        (item as HTMLElement).style.opacity = opacity.toString();
      });
    };

    const animationFrame = () => {
      updateOpacity();
      requestAnimationFrame(animationFrame);
    };

    const frame = requestAnimationFrame(animationFrame);

    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center px-6 overflow-hidden">
      <div className="w-full max-w-7xl animate-fade-in-up">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          {/* Left Content */}
          <div className="space-y-8 max-w-xl">
            {richText && (
              <RichText
                className="mb-0 [&_h1]:text-5xl [&_h1]:md:text-6xl [&_h1]:lg:text-7xl [&_h1]:font-medium [&_h1]:leading-tight [&_h1]:tracking-tight [&_p]:text-lg [&_p]:md:text-xl [&_p]:text-muted-foreground [&_p]:leading-relaxed animate-fade-in-up [animation-delay:200ms]"
                data={richText}
                enableGutter={false}
              />
            )}
            <div className="flex flex-wrap gap-4 animate-fade-in-up [animation-delay:600ms]">
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
          </div>

          {/* Right Marquee */}
          <div
            ref={marqueeRef}
            className="relative h-[600px] lg:h-[700px] flex items-center justify-center animate-fade-in-up [animation-delay:400ms]"
          >
            <div className="relative w-full h-full">
              <VerticalMarquee speed={20} className="h-full">
                {items.map((item, idx) => (
                  <div
                    key={idx}
                    className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light tracking-tight py-8 marquee-item"
                  >
                    {item}
                  </div>
                ))}
              </VerticalMarquee>

              {/* Top vignette */}
              <div className="pointer-events-none absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-background via-background/50 to-transparent z-10" />

              {/* Bottom vignette */}
              <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-background via-background/50 to-transparent z-10" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
