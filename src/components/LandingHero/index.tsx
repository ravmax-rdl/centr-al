'use client';
import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { animate } from 'motion';

// Utility function to format user count for display
function formatUserCount(count: number): string {
  if (count >= 1000000) {
    return `${(count / 1000000).toFixed(1)}M`;
  } else if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}K`;
  } else {
    return count.toString();
  }
}

type AvatarProps = {
  imageSrc: string;
  delay: number;
};

const Avatar: React.FC<AvatarProps> = ({ imageSrc, delay }) => {
  const avatarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (avatarRef.current) {
      animate(avatarRef.current, { opacity: [0, 1] as any, scale: [0.8, 1] }, {
        duration: 0.5,
        delay: delay / 1000,
        easing: [0.16, 1, 0.3, 1],
      } as any);
    }
  }, [delay]);

  return (
    <div
      ref={avatarRef}
      className="relative h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 rounded-full overflow-hidden border-2 border-gray-700 shadow-lg"
      style={{ opacity: 0 }}
    >
      <Image
        src={imageSrc}
        alt="User avatar"
        width={40}
        height={40}
        className="h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
    </div>
  );
};

const TrustElements: React.FC<{ userCount?: number }> = ({ userCount }) => {
  const avatars = ['/profile1.jpg', '/profile1.jpg', '/profile1.jpg', '/profile1.jpg'];
  const textRef = useRef<HTMLParagraphElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const displayCount = userCount !== undefined ? formatUserCount(userCount) : '2.4K';

  useEffect(() => {
    if (containerRef.current) {
      animate(containerRef.current, { opacity: [0, 1] as any, y: [20, 0] }, {
        duration: 0.6,
        easing: [0.16, 1, 0.3, 1],
      } as any);
    }
    if (textRef.current) {
      animate(textRef.current, { opacity: [0, 1] as any, x: [-10, 0] }, {
        duration: 0.5,
        delay: 0.8,
        easing: [0.16, 1, 0.3, 1],
      } as any);
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className="inline-flex items-center space-x-3 max-w-2xl rounded-xl py-2 px-3 sm:py-2 sm:px-4 text-xs sm:text-sm backdrop-blur-md bg-white/80 dark:bg-neutral-900/80 shadow-lg border border-border/1"
      style={{ opacity: 0 }}
    >
      <div className="flex -space-x-2 sm:-space-x-3">
        {avatars.map((avatar, index) => (
          <Avatar key={index} imageSrc={avatar} delay={index * 200} />
        ))}
      </div>
      <p ref={textRef} className="text-white whitespace-nowrap font-space" style={{ opacity: 0 }}>
        <span className="text-white font-semibold">{displayCount}</span> learning with centrAL
      </p>
    </div>
  );
};

export { TrustElements };

const GradientBars: React.FC = () => {
  const [numBars] = useState(15);
  const barsRef = useRef<(HTMLDivElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const calculateHeight = (index: number, total: number) => {
    const position = index / (total - 1);
    const maxHeight = 100;
    const minHeight = 30;

    const center = 0.5;
    const distanceFromCenter = Math.abs(position - center);
    const heightPercentage = Math.pow(distanceFromCenter * 2, 1.2);

    return minHeight + (maxHeight - minHeight) * heightPercentage;
  };

  useEffect(() => {
    // Start idle breathing animations for each bar
    const breathingAnimations = barsRef.current.map((bar, index) => {
      if (!bar) return null;

      const baseHeight = calculateHeight(index, numBars);
      const breatheAmount = 5 + (index % 3) * 2; // Vary breathing intensity
      const duration = 2 + (index % 4) * 0.3; // Vary duration for organic feel

      return animate(
        bar,
        {
          scaleY: [baseHeight / 100, (baseHeight + breatheAmount) / 100, baseHeight / 100],
        },
        {
          duration,
          delay: index * 0.1,
          easing: [0.45, 0, 0.55, 1],
          repeat: Infinity,
        } as any
      );
    });

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const containerWidth = rect.width;
      const normalizedX = mouseX / containerWidth;

      barsRef.current.forEach((bar, index) => {
        if (!bar) return;

        const barPosition = index / (numBars - 1);
        const distance = Math.abs(normalizedX - barPosition);
        const influence = Math.max(0, 1 - distance * 3);

        const baseHeight = calculateHeight(index, numBars);
        const targetHeight = baseHeight + influence * 40;

        animate(bar, { scaleY: targetHeight / 100 }, {
          duration: 0.4,
          easing: [0.16, 1, 0.3, 1],
        } as any);
      });
    };

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = 500;
      const scrollProgress = Math.min(scrollY / maxScroll, 1);

      barsRef.current.forEach((bar, index) => {
        if (!bar) return;

        const baseHeight = calculateHeight(index, numBars);
        const scrollInfluence = Math.sin(scrollProgress * Math.PI * 2 + index * 0.5) * 20;
        const targetHeight = baseHeight + scrollInfluence;

        animate(bar, { scaleY: targetHeight / 100 }, {
          duration: 0.6,
          easing: [0.42, 0, 0.58, 1],
        } as any);
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      // Stop breathing animations on cleanup
      breathingAnimations.forEach((animation) => animation?.stop());
    };
  }, [numBars]);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden" ref={containerRef}>
      <div
        className="flex h-full"
        style={{
          width: '100%',
          transform: 'translateZ(0)',
          backfaceVisibility: 'hidden',
          WebkitFontSmoothing: 'antialiased',
        }}
      >
        {Array.from({ length: numBars }).map((_, index) => {
          const height = calculateHeight(index, numBars);
          return (
            <div
              key={index}
              ref={(el) => {
                barsRef.current[index] = el;
              }}
              style={{
                flex: '1 0 calc(100% / 15)',
                maxWidth: 'calc(100% / 15)',
                height: '100%',
                background: 'linear-gradient(to top, #00C7F9, transparent)',
                transform: `scaleY(${height / 100})`,
                transformOrigin: 'bottom',
                outline: '1px solid rgba(0, 0, 0, 0)',
                boxSizing: 'border-box',
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export const LandingHeroBars: React.FC<{ userCount?: number }> = ({ userCount }) => {
  return (
    <section className="relative min-h-screen flex flex-col items-center overflow-hidden">
      <div className="absolute inset-0 bg-gray-950"></div>
      <GradientBars />
    </section>
  );
};
