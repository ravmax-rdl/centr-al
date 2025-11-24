'use client';
import { cn } from '@/utilities/ui';
import React from 'react';
import { motion } from 'framer-motion';

import { Card, CardPostData } from '@/components/Card';

export type Props = {
  posts: CardPostData[];
};

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export const CollectionArchive: React.FC<Props> = (props) => {
  const { posts } = props;

  return (
    <div className={cn('container')}>
      <div>
        <motion.div
          className="grid grid-cols-4 sm:grid-cols-8 lg:grid-cols-12 gap-y-4 gap-x-4 lg:gap-y-8 lg:gap-x-8 xl:gap-x-8"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {posts?.map((result, index) => {
            if (typeof result === 'object' && result !== null) {
              return (
                <motion.div className="col-span-4" key={index} variants={item}>
                  <Card className="h-full" doc={result} relationTo="posts" showCategories />
                </motion.div>
              );
            }

            return null;
          })}
        </motion.div>
      </div>
    </div>
  );
};
