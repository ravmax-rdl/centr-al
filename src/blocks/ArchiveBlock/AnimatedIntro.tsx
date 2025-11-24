'use client';

import React from 'react';
import { motion } from 'framer-motion';
import RichText from '@/components/RichText';

export const AnimatedIntro: React.FC<{ introContent: any }> = ({ introContent }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <RichText className="ms-0 max-w-[48rem]" data={introContent as any} enableGutter={false} />
    </motion.div>
  );
};
