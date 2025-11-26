import React from 'react';
import type { SponsorsBlock as SponsorsBlockProps } from '@/payload-types';
import { InfiniteSlider } from '@/components/ui/infinite-slider';
import { ProgressiveBlur } from '@/components/ui/progressive-blur';
import { Media } from '@/components/Media';

export const SponsorsBlock: React.FC<SponsorsBlockProps> = (props) => {
  const { title, sponsors, speed = 40, speedOnHover = 20 } = props;

  if (!sponsors || sponsors.length === 0) {
    return null;
  }

  // Handle null values for speed props
  const scrollSpeed = speed ?? 40;
  const hoverSpeed = speedOnHover ?? 20;

  return (
    <section className="bg-neutral-50 dark:bg-background overflow-hidden py-8 md:py-16">
      <div className="group relative mx-auto w-full px-12 md:px-24 lg:px-48">
        <div className="flex flex-col items-center md:flex-row gap-8 md:gap-0">
          {title && (
            <div className="w-full md:max-w-44 md:border-r border-neutral-200 dark:border-neutral-800 md:pr-6">
              <p className="text-center md:text-end text-sm font-medium text-neutral-600 dark:text-neutral-400">
                {title}
              </p>
            </div>
          )}
          <div className="relative w-full md:w-[calc(100%-11rem)]">
            <InfiniteSlider speedOnHover={hoverSpeed} speed={scrollSpeed} gap={40}>
              {sponsors.map((sponsor, index) => (
                <div key={index} className="flex items-center h-12 mx-4 md:mx-8">
                  {sponsor.url ? (
                    <a
                      href={sponsor.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center opacity-60 hover:opacity-100 transition-opacity duration-300"
                      aria-label={sponsor.name}
                    >
                      {typeof sponsor.logo === 'object' && (
                        <Media
                          resource={sponsor.logo}
                          className="h-8 w-auto"
                          imgClassName="h-8 w-auto object-contain"
                          alt={sponsor.name}
                        />
                      )}
                    </a>
                  ) : (
                    typeof sponsor.logo === 'object' && (
                      <Media
                        resource={sponsor.logo}
                        className="h-8 w-auto opacity-60"
                        imgClassName="h-8 w-auto object-contain"
                        alt={sponsor.name}
                      />
                    )
                  )}
                </div>
              ))}
            </InfiniteSlider>

            <div className="bg-gradient-to-r from-neutral-50 dark:from-neutral-950 absolute inset-y-0 left-0 w-20"></div>
            <div className="bg-gradient-to-l from-neutral-50 dark:from-neutral-950 absolute inset-y-0 right-0 w-20"></div>
            <ProgressiveBlur
              className="pointer-events-none absolute left-0 top-0 h-full w-20"
              direction="left"
              blurIntensity={1}
            />
            <ProgressiveBlur
              className="pointer-events-none absolute right-0 top-0 h-full w-20"
              direction="right"
              blurIntensity={1}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
