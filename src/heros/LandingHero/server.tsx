import React from 'react';
import type { Page } from '@/payload-types';
import { getUserCount } from '@/utilities/getUserCount';
import { LandingHeroClient } from './index';

export const LandingHero: React.FC<Page['hero']> = async ({ links, media, richText }) => {
  let userCount: number | undefined;

  try {
    userCount = await getUserCount();
  } catch (error) {
    console.error('Failed to fetch user count:', error);
    userCount = undefined; // Will fall back to default value
  }

  return (
    <LandingHeroClient links={links} media={media} richText={richText} userCount={userCount} />
  );
};
