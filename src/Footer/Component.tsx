import { getCachedGlobal } from '@/utilities/getGlobals';
import Link from 'next/link';
import React from 'react';

import type { Footer } from '@/payload-types';

import { ThemeSelector } from '@/providers/Theme/ThemeSelector';
import { CMSLink } from '@/components/Link';
import { Logo } from '@/components/Logo/Logo';

export async function Footer() {
  const footerData: Footer = await getCachedGlobal('footer', 1)();

  const navItems = footerData?.navItems || [];
  const currentYear = new Date().getFullYear();

  return (
    <footer className="backdrop-blur-md bg-white/80 dark:bg-neutral-900/80 shadow-lg border border-border/1">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-4 space-y-4">
            <Link className="inline-block" href="/" aria-label="Home">
              <Logo className="transition-opacity hover:opacity-80" />
            </Link>
            <p className="text-sm text-gray-400 max-w-sm">
              A modern, flexible platform built with Payload CMS and Next.js
            </p>
          </div>

          {/* Navigation Section */}
          <div className="lg:col-span-5">
            <nav className="space-y-3">
              <ul className="grid grid-cols-2 gap-x-4 gap-y-3">
                {navItems.map(({ link }, i) => (
                  <li key={i}>
                    <CMSLink
                      className="text-sm text-gray-400 hover:text-white transition-colors duration-200 inline-block"
                      {...link}
                    />
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Theme Selector Section */}
          <div className="lg:col-span-3">
            <div className="space-y-3 flex flex-col items-start lg:items-end">
              <ThemeSelector />
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-400">© {currentYear} centrAL. All rights reserved.</p>
            <div className="flex gap-6">
              <Link
                href="/privacy"
                className="text-sm text-gray-400 hover:text-white transition-colors duration-200"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-sm text-gray-400 hover:text-white transition-colors duration-200"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
