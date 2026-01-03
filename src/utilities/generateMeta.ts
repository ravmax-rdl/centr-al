import type { Metadata } from 'next';

import type { Media, Page, Post, Config } from '../payload-types';

import { mergeOpenGraph } from './mergeOpenGraph';
import { getServerSideURL } from './getURL';

const getImageURL = (image?: Media | Config['db']['defaultIDType'] | null) => {
  const serverUrl = getServerSideURL();

  let url = serverUrl + '/banner.webp';

  if (image && typeof image === 'object' && 'url' in image) {
    const ogUrl = image.sizes?.og?.url;

    url = ogUrl ? serverUrl + ogUrl : serverUrl + image.url;
  }

  return url;
};

const isPost = (doc: Partial<Page> | Partial<Post> | null): doc is Partial<Post> => {
  return doc != null && 'publishedAt' in doc;
};

export const generateMeta = async (args: {
  doc: Partial<Page> | Partial<Post> | null;
}): Promise<Metadata> => {
  const { doc } = args;

  const ogImage = getImageURL(doc?.meta?.image);
  const serverUrl = getServerSideURL();

  const title = doc?.meta?.title ? doc?.meta?.title + ' | centrAL' : 'centrAL';

  // Generate proper URL from slug
  const slug = Array.isArray(doc?.slug) ? doc?.slug.join('/') : doc?.slug || '';
  const url = slug ? `${serverUrl}/${slug}` : serverUrl;

  // Check if this is a post for article-specific metadata
  const isPostDoc = isPost(doc);

  return {
    title,
    description: doc?.meta?.description,
    // Canonical URL to prevent duplicate content issues
    alternates: {
      canonical: url,
    },
    openGraph: mergeOpenGraph({
      type: isPostDoc ? 'article' : 'website',
      title,
      description:
        doc?.meta?.description ||
        'A collaborative learning platform for Sri Lankan G.C.E A/L students',
      url,
      images: ogImage
        ? [
            {
              url: ogImage,
              width: 1200,
              height: 630,
              alt: doc?.meta?.title || 'centrAL',
            },
          ]
        : undefined,
      // Add article metadata for posts
      ...(isPostDoc && doc.publishedAt
        ? {
            publishedTime: new Date(doc.publishedAt).toISOString(),
            modifiedTime: doc.updatedAt ? new Date(doc.updatedAt).toISOString() : undefined,
            authors: doc.authors
              ?.map((author) => (typeof author === 'object' && 'name' in author ? author.name : ''))
              .filter(Boolean) as string[],
          }
        : {}),
    }),
    // Enhanced Twitter card metadata
    twitter: {
      card: 'summary_large_image',
      title,
      description:
        doc?.meta?.description ||
        'A collaborative learning platform for Sri Lankan G.C.E A/L students',
      images: ogImage ? [ogImage] : undefined,
      creator: '@studyatcentral',
    },
  };
};
