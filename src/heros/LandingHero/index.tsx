'use client';
import { useHeaderTheme } from '@/providers/HeaderTheme';
import React, { useEffect } from 'react';

import type { Page } from '@/payload-types';

import { CMSLink } from '@/components/Link';
import RichText from '@/components/RichText';
import { LandingHeroBars } from '@/components/LandingHero';

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

  useEffect(() => {
    setHeaderTheme('dark');
  });

  return (
    <div
      className="relative -mt-[10.4rem] min-h-screen flex items-center justify-center text-white"
      data-theme="dark"
    >
      {/* Background LandingHeroBars */}
      <div className="absolute inset-0 w-full h-full">
        <LandingHeroBars userCount={userCount} />
      </div>

      {/* Foreground content */}
      <div className="container mb-8 z-20 relative flex items-center justify-center">
        <div className="max-w-[36.5rem] md:text-center">
          {richText && <RichText className="mb-6" data={richText} enableGutter={false} />}
          {Array.isArray(links) && links.length > 0 && (
            <ul className="flex md:justify-center gap-4">
              {links.map(({ link }, i) => {
                return (
                  <li key={i}>
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
