'use client';
import { useHeaderTheme } from '@/providers/HeaderTheme';
import React, { useEffect, useRef } from 'react';
import { animate } from 'motion';

import type { Page } from '@/payload-types';

import { CMSLink } from '@/components/Link';
import RichText from '@/components/RichText';
import { LandingHeroBars, TrustElements } from '@/components/LandingHero';

interface LandingHeroClientProps {
  links?: Page['hero']['links'];
  media?: Page['hero']['media'];
  richText?: Page['hero']['richText'];
  userCount?: number;
}

export const LandingHeroClient: React.FC<LandingHeroClientProps> = ({
  links,
  richText,
  userCount,
}) => {
  const { setHeaderTheme } = useHeaderTheme();
  const contentRef = useRef<HTMLDivElement>(null);
  const richTextRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    setHeaderTheme('dark');

    // Animate main content container
    if (contentRef.current) {
      animate(contentRef.current as any, { opacity: [0, 1] }, {
        duration: 0.8,
        delay: 0.2,
        easing: [0.16, 1, 0.3, 1],
      } as any);
    }

    // Animate rich text with slide up
    if (richTextRef.current) {
      animate(richTextRef.current as any, { opacity: [0, 1], y: [30, 0] }, {
        duration: 0.8,
        delay: 1.2,
        easing: [0.16, 1, 0.3, 1],
      } as any);
    }

    // Animate links with stagger
    if (linksRef.current) {
      const linkItems = linksRef.current.querySelectorAll('li');
      linkItems.forEach((item, index) => {
        animate(item as any, { opacity: [0, 1], y: [20, 0] }, {
          duration: 0.5,
          delay: 1.6 + index * 0.1,
          easing: [0.16, 1, 0.3, 1],
        } as any);
      });
    }
  }, [setHeaderTheme]);

  return (
    <div
      className="relative -mt-[10.4rem] min-h-screen flex items-center justify-center"
      data-theme="dark"
    >
      {/* Background LandingHeroBars */}
      <div className="absolute inset-0 w-full h-full">
        <LandingHeroBars userCount={userCount} />
      </div>

      {/* Foreground content */}
      <div
        ref={contentRef}
        className="container z-20 relative flex items-center justify-center"
        style={{ opacity: 0 }}
      >
        <div className="md:text-center flex flex-col items-center">
          <TrustElements userCount={userCount} />
          {richText && (
            <div ref={richTextRef} style={{ opacity: 0 }}>
              <RichText
                className="mb-16 mt-16 [&_h1]:text-5xl md:[&_h1]:text-7xl lg:[&_h1]:text-8xl"
                data={richText}
                enableGutter={false}
              />
            </div>
          )}
          {Array.isArray(links) && links.length > 0 && (
            <ul ref={linksRef} className="flex md:justify-center gap-4 mb-8">
              {links.map(({ link }, i) => {
                return (
                  <li key={i} style={{ opacity: 0 }}>
                    <CMSLink {...link} />
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};
