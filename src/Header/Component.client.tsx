'use client';
import { useHeaderTheme } from '@/providers/HeaderTheme';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

import type { Header } from '@/payload-types';

import { Logo } from '@/components/Logo/Logo';
import { HeaderNav } from './Nav';

interface HeaderClientProps {
  data: Header;
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  /* Storing the value in a useState to avoid hydration errors */
  const [theme, setTheme] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const { headerTheme, setHeaderTheme } = useHeaderTheme();
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const headerScale = useTransform(scrollY, [0, 50], [1, 0.98]);
  const headerY = useTransform(scrollY, [0, 50], [0, 4]);

  useEffect(() => {
    setHeaderTheme(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerTheme]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 px-4 pt-4"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      {...(theme ? { 'data-theme': theme } : {})}
    >
      <motion.div
        className={`
          container rounded-xl
          transition-all duration-300 ease-in-out
          ${scrolled ? 'backdrop-blur-md bg-white/80 dark:bg-black/80 shadow-lg border border-border/1' : 'bg-transparent'}
        `}
        style={{
          scale: headerScale,
          y: headerY,
        }}
      >
        <div className="py-5 md:py-6 px-2 sm:px-0 flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Link href="/" className="flex-shrink-0">
              <Logo loading="eager" priority="high" className="invert dark:invert-0" />
            </Link>
          </motion.div>
          <HeaderNav data={data} />
        </div>
      </motion.div>
    </motion.header>
  );
};
