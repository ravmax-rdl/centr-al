import type { Post, ArchiveBlock as ArchiveBlockProps } from '@/payload-types';

import configPromise from '@payload-config';
import { getPayload } from 'payload';
import React from 'react';
import { AnimatedIntro } from './AnimatedIntro';

import { CollectionArchive } from '@/components/CollectionArchive';

export const ArchiveBlock: React.FC<
  ArchiveBlockProps & {
    id?: string;
  }
> = async (props) => {
  const { id, categories, introContent, limit: limitFromProps, populateBy, selectedDocs } = props;

  const limit = limitFromProps || 3;

  let posts: Post[] = [];

  if (populateBy === 'collection') {
    const payload = await getPayload({ config: configPromise });

    const flattenedCategories = categories?.map((category) => {
      if (typeof category === 'object') return category.id;
      else return category;
    });

    const fetchedPosts = await payload.find({
      collection: 'posts',
      depth: 1,
      limit,
      ...(flattenedCategories && flattenedCategories.length > 0
        ? {
            where: {
              categories: {
                in: flattenedCategories,
              },
            },
          }
        : {}),
    });

    posts = fetchedPosts.docs;
  } else {
    if (selectedDocs?.length) {
      const filteredSelectedPosts = selectedDocs.map((post) => {
        if (typeof post.value === 'object') return post.value;
      }) as Post[];

      posts = filteredSelectedPosts;
    }
  }

  return (
    <div className="mx-auto w-full px-8 md:px-16 lg:px-36" id={`block-${id}`}>
      {introContent && (
        <div className="container">
          <AnimatedIntro introContent={introContent} />
        </div>
      )}
      <CollectionArchive posts={posts} />
    </div>
  );
};
