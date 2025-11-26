import React from 'react';
import type { TestimonialsBlock as TestimonialsBlockProps } from '@/payload-types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getMediaUrl } from '@/utilities/getMediaUrl';

export const TestimonialsBlock: React.FC<TestimonialsBlockProps> = (props) => {
  const { testimonials } = props;

  if (!testimonials || testimonials.length === 0) {
    return null;
  }

  return (
    <section className="mx-auto w-full px-12 md:px-24 lg:px-48 py-24 md:py-32 bg-neutral-50 dark:bg-background">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 place-items-center">
          {testimonials.map((testimonial, index) => {
            const avatarUrl =
              typeof testimonial.avatar === 'object' && testimonial.avatar?.url
                ? getMediaUrl(testimonial.avatar.url)
                : null;
            const initials = testimonial.author
              .split(' ')
              .map((n: string) => n[0])
              .join('')
              .toUpperCase()
              .slice(0, 2);

            return (
              <div key={index} className="text-center">
                <blockquote className="h-full flex flex-col">
                  <p className="text-lg font-medium text-neutral-900 dark:text-neutral-100 leading-relaxed flex-grow">
                    &quot;{testimonial.quote}&quot;
                  </p>

                  <div className="mt-8 flex items-center justify-center gap-4">
                    <Avatar className="size-12 ring-2 ring-neutral-200 dark:ring-neutral-800">
                      {avatarUrl && (
                        <AvatarImage
                          src={avatarUrl}
                          alt={testimonial.author}
                          height="400"
                          width="400"
                          loading="lazy"
                        />
                      )}
                      <AvatarFallback className="bg-neutral-200 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100">
                        {initials}
                      </AvatarFallback>
                    </Avatar>

                    <div className="space-y-1 border-l border-neutral-200 dark:border-neutral-800 pl-4 text-left">
                      <cite className="font-semibold not-italic text-neutral-900 dark:text-neutral-100 text-sm">
                        {testimonial.author}
                      </cite>
                      <span className="text-neutral-600 dark:text-neutral-400 block text-xs">
                        {testimonial.role}
                        {testimonial.company && ` · ${testimonial.company}`}
                      </span>
                    </div>
                  </div>
                </blockquote>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
