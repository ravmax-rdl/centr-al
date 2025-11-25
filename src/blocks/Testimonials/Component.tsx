import React from 'react';
import type { TestimonialsBlock as TestimonialsBlockProps } from '@/payload-types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getMediaUrl } from '@/utilities/getMediaUrl';

export const TestimonialsBlock: React.FC<TestimonialsBlockProps> = (props) => {
  const { testimonials } = props;

  if (!testimonials || testimonials.length === 0) {
    return null;
  }

  // Display the first testimonial (you can extend this to show multiple or a carousel)
  const testimonial = testimonials[0];
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
    <section className="py-20 md:py-32 bg-zinc-50 dark:bg-background">
      <div className="mx-auto max-w-5xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <blockquote>
            <p className="text-xl font-medium sm:text-2xl md:text-3xl text-zinc-900 dark:text-zinc-100 leading-relaxed">
              &quot;{testimonial.quote}&quot;
            </p>

            <div className="mt-12 flex items-center justify-center gap-6">
              <Avatar className="size-14 ring-2 ring-zinc-200 dark:ring-zinc-800">
                {avatarUrl && (
                  <AvatarImage
                    src={avatarUrl}
                    alt={testimonial.author}
                    height="400"
                    width="400"
                    loading="lazy"
                  />
                )}
                <AvatarFallback className="bg-zinc-200 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100">
                  {initials}
                </AvatarFallback>
              </Avatar>

              <div className="space-y-1 border-l border-zinc-200 dark:border-zinc-800 pl-6 text-left">
                <cite className="font-semibold not-italic text-zinc-900 dark:text-zinc-100">
                  {testimonial.author}
                </cite>
                <span className="text-zinc-600 dark:text-zinc-400 block text-sm">
                  {testimonial.role}
                  {testimonial.company && ` · ${testimonial.company}`}
                </span>
              </div>
            </div>
          </blockquote>
        </div>
      </div>
    </section>
  );
};
