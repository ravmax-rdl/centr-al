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
    <section className="bg-background overflow-hidden py-8 md:py-16">
      <div className="group relative m-auto max-w-7xl">
        <div className="flex flex-col items-center md:flex-row gap-8 md:gap-0">
          {title && (
            <div className="w-full md:max-w-44 md:border-r md:pr-6">
              <p className="text-center md:text-end text-sm font-medium text-muted-foreground">
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
                      className="flex items-center"
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
                        className="h-8 w-auto"
                        imgClassName="h-8 w-auto object-contain"
                        alt={sponsor.name}
                      />
                    )
                  )}
                </div>
              ))}
            </InfiniteSlider>

            <div className="bg-linear-to-r from-background absolute inset-y-0 left-0 w-20"></div>
            <div className="bg-linear-to-l from-background absolute inset-y-0 right-0 w-20"></div>
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
