import { getServerSideURL } from '@/utilities/getURL';
import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const url: string = getServerSideURL();

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/admin',
    },
    sitemap: `${url}/sitemap.xml`,
  };
}
