import type { Metadata } from 'next';
import { getServerSideURL } from './getURL';

const defaultOpenGraph: Metadata['openGraph'] = {
  type: 'website',
  description:
    'centrAL is a collaborative learning platform designed specifically for Sri Lankan G.C.E A/L students. Access comprehensive study resources, connect with peers, and excel in your Advanced Level examinations.',
  images: [
    {
      url: `${getServerSideURL()}/banner.webp`,
      width: 1200,
      height: 630,
      alt: 'centrAL - Collaborative Learning Platform for Sri Lankan A/L Students',
    },
  ],
  siteName: 'centrAL',
  title: 'centrAL',
  locale: 'en_US',
  url: getServerSideURL(),
};

export const mergeOpenGraph = (og?: Metadata['openGraph']): Metadata['openGraph'] => {
  return {
    ...defaultOpenGraph,
    ...og,
    images: og?.images ? og.images : defaultOpenGraph.images,
    // Ensure siteName is always present
    siteName: og?.siteName ?? defaultOpenGraph.siteName,
  };
};
