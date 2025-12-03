import type { MetadataRoute } from 'next';
import { getServerSideURL } from '@/utilities/getURL';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'centrAL - Collaborative Learning Platform',
    short_name: 'centrAL',
    description:
      'A collaborative learning platform designed for Sri Lankan G.C.E A/L students.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#000000',
    orientation: 'portrait-primary',
    icons: [
      {
        src: '/favicon.ico',
        sizes: '48x48',
        type: 'image/x-icon',
      },
      {
        src: '/favicon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
    ],
    categories: ['education', 'productivity'],
    lang: 'en-US',
  };
}
