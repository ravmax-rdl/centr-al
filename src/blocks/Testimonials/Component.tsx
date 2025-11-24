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
    <section className="py-16 md:py-32">
      <div className="mx-auto max-w-5xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <blockquote>
            <p className="text-lg font-medium sm:text-xl md:text-3xl">{testimonial.quote}</p>

            <div className="mt-12 flex items-center justify-center gap-6">
              <Avatar className="size-12">
                {avatarUrl && (
                  <AvatarImage
                    src={avatarUrl}
                    alt={testimonial.author}
                    height="400"
                    width="400"
                    loading="lazy"
                  />
                )}
                <AvatarFallback>{initials}</AvatarFallback>
              </Avatar>

              <div className="space-y-1 border-l pl-6">
                <cite className="font-medium">{testimonial.author}</cite>
                <span className="text-muted-foreground block text-sm">
                  {testimonial.role}
                  {testimonial.company && `, ${testimonial.company}`}
                </span>
              </div>
            </div>
          </blockquote>
        </div>
      </div>
    </section>
  );
};
