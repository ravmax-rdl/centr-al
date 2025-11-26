'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Folder, HeartHandshakeIcon, SparklesIcon } from 'lucide-react';
import { cn } from '@/utilities/ui';
import type { ProcessBlock as ProcessBlockProps } from 'src/payload-types';

type Props = {
  className?: string;
} & ProcessBlockProps;

export const ProcessBlock: React.FC<Props> = ({
  className,
  circleText,
  badgeFirstText,
  badgeSecondText,
  badgeThirdText,
  badgeFourthText,
  buttonFirstText,
  buttonSecondText,
  title,
  lightColor,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="mx-auto my-32 w-full bg-neutral-50 dark:bg-background"
    >
      <div
        className={cn(
          'relative flex h-[500px] sm:h-[600px] md:h-[700px] lg:h-[800px] mx-auto w-full px-12 md:px-24 lg:px-48 flex-col items-center',
          className
        )}
      >
        {/* SVG Paths  */}
        <svg
          className="h-full w-full text-neutral-300 dark:text-neutral-700"
          width="100%"
          height="100%"
          viewBox="0 0 200 100"
          preserveAspectRatio="xMidYMid meet"
        >
          <g
            stroke="currentColor"
            fill="none"
            strokeWidth="0.4"
            strokeDasharray="100 100"
            pathLength="100"
          >
            <path d="M 31 10 v 15 q 0 5 5 5 h 59 q 5 0 5 5 v 50" />
            <path d="M 77 10 v 10 q 0 5 5 5 h 13 q 5 0 5 5 v 50" />
            <path d="M 124 10 v 10 q 0 5 -5 5 h -14 q -5 0 -5 5 v 50" />
            <path d="M 170 10 v 15 q 0 5 -5 5 h -60 q -5 0 -5 5 v 50" />
            {/* Animation For Path Starting */}
            <animate
              attributeName="stroke-dashoffset"
              from="100"
              to="0"
              dur="1s"
              fill="freeze"
              calcMode="spline"
              keySplines="0.25,0.1,0.5,1"
              keyTimes="0; 1"
            />
          </g>
          {/* Blue Lights */}
          <g mask="url(#db-mask-1)">
            <circle
              className="database db-light-1"
              cx="0"
              cy="0"
              r="12"
              fill="url(#db-blue-grad)"
            />
          </g>
          <g mask="url(#db-mask-2)">
            <circle
              className="database db-light-2"
              cx="0"
              cy="0"
              r="12"
              fill="url(#db-blue-grad)"
            />
          </g>
          <g mask="url(#db-mask-3)">
            <circle
              className="database db-light-3"
              cx="0"
              cy="0"
              r="12"
              fill="url(#db-blue-grad)"
            />
          </g>
          <g mask="url(#db-mask-4)">
            <circle
              className="database db-light-4"
              cx="0"
              cy="0"
              r="12"
              fill="url(#db-blue-grad)"
            />
          </g>
          {/* Buttons */}
          <g stroke="currentColor" fill="none" strokeWidth="0.2">
            {/* First Button */}
            <g>
              <rect fill="#18181B" x="23" y="8" width="16" height="5" rx="1"></rect>
              <text
                x="31"
                y="11"
                fill="white"
                stroke="none"
                fontSize="2"
                textAnchor="middle"
              >
                {badgeFirstText}
              </text>
            </g>
            {/* Second Button */}
            <g>
              <rect fill="#18181B" x="69" y="8" width="16" height="5" rx="1"></rect>
              <text
                x="77"
                y="11"
                fill="white"
                stroke="none"
                fontSize="2"
                textAnchor="middle"
              >
                {badgeSecondText}
              </text>
            </g>
            {/* Third Button */}
            <g>
              <rect fill="#18181B" x="116" y="8" width="16" height="5" rx="1"></rect>
              <text
                x="124"
                y="11"
                fill="white"
                stroke="none"
                fontSize="2"
                textAnchor="middle"
              >
                {badgeThirdText}
              </text>
            </g>
            {/* Fourth Button */}
            <g>
              <rect fill="#18181B" x="162" y="8" width="16" height="5" rx="1"></rect>
              <text
                x="170"
                y="11"
                fill="white"
                stroke="none"
                fontSize="2"
                textAnchor="middle"
              >
                {badgeFourthText}
              </text>
            </g>
          </g>
          <defs>
            {/* 1 -  user list */}
            <mask id="db-mask-1">
              <path
                d="M 31 10 v 15 q 0 5 5 5 h 59 q 5 0 5 5 v 50"
                strokeWidth="0.5"
                stroke="white"
              />
            </mask>
            {/* 2 - task list */}
            <mask id="db-mask-2">
              <path
                d="M 77 10 v 10 q 0 5 5 5 h 13 q 5 0 5 5 v 50"
                strokeWidth="0.5"
                stroke="white"
              />
            </mask>
            {/* 3 - backlogs */}
            <mask id="db-mask-3">
              <path
                d="M 124 10 v 10 q 0 5 -5 5 h -14 q -5 0 -5 5 v 50"
                strokeWidth="0.5"
                stroke="white"
              />
            </mask>
            {/* 4 - misc */}
            <mask id="db-mask-4">
              <path
                d="M 170 10 v 15 q 0 5 -5 5 h -60 q -5 0 -5 5 v 50"
                strokeWidth="0.5"
                stroke="white"
              />
            </mask>
            {/* Blue Grad */}
            <radialGradient id="db-blue-grad" fx="1">
              <stop offset="0%" stopColor={lightColor || '#00C7F9'} />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
          </defs>
        </svg>
        {/* Main Box */}
        <div className="absolute bottom-10 flex w-full max-w-[80%] sm:max-w-[70%] md:max-w-[60%] flex-col items-center">
          {/* bottom shadow */}
          <div className="absolute -bottom-4 h-[100px] w-[62%] rounded-lg bg-accent/30" />
          {/* box title */}
          <div className="absolute -top-3 z-20 flex items-center justify-center rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-900 dark:bg-neutral-100 px-2 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2">
            <SparklesIcon className="size-3 sm:size-4 text-neutral-100 dark:text-neutral-900" />
            <span className="ml-2 text-[10px] sm:text-xs md:text-sm text-neutral-100 dark:text-neutral-900">
              {title || 'Data exchange using a customized REST API'}
            </span>
          </div>
          {/* box outer circle */}
          <div className="absolute -bottom-8 z-30 grid h-[60px] w-[60px] md:h-[70px] md:w-[70px] lg:h-[80px] lg:w-[80px] place-items-center rounded-full border-t border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900 font-semibold text-xs md:text-sm text-neutral-900 dark:text-neutral-100">
            {circleText || 'SVG'}
          </div>
          {/* box content */}
          <div className="relative z-10 flex h-[200px] sm:h-[220px] md:h-[260px] lg:h-[300px] w-full items-center justify-center overflow-hidden rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-md">
            {/* Badges */}
            <div className="absolute bottom-6 left-8 sm:bottom-8 sm:left-12 md:bottom-10 md:left-16 z-10 h-6 sm:h-7 md:h-8 rounded-full bg-neutral-900 dark:bg-neutral-100 px-2 sm:px-3 md:px-4 text-[10px] sm:text-xs md:text-sm border border-neutral-200 dark:border-neutral-800 flex items-center gap-1.5 sm:gap-2">
              <HeartHandshakeIcon className="size-3 sm:size-4 md:size-5 text-neutral-100 dark:text-neutral-900" />
              <span className="text-neutral-100 dark:text-neutral-900">
                {buttonFirstText || 'LegionDev'}
              </span>
            </div>
            <div className="absolute right-12 sm:right-16 md:right-20 z-10 hidden sm:flex h-7 md:h-8 rounded-full bg-neutral-900 dark:bg-neutral-100 px-3 md:px-4 text-xs md:text-sm border border-neutral-200 dark:border-neutral-800 items-center gap-2">
              <Folder className="size-4 md:size-5 text-neutral-100 dark:text-neutral-900" />
              <span className="text-neutral-100 dark:text-neutral-900">
                {buttonSecondText || 'v2_updates'}
              </span>
            </div>
            {/* Circles */}
            <motion.div
              className="absolute -bottom-14 h-[100px] w-[100px] md:h-[120px] md:w-[120px] lg:h-[140px] lg:w-[140px] rounded-full border-t border-[#00C7F9]/60 dark:border-[#00C7F9]/60"
              animate={{
                scale: [0.98, 1.02, 0.98, 1, 1, 1, 1, 1, 1],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <motion.div
              className="absolute -bottom-[100px] md:-bottom-[120px] lg:-bottom-[140px] h-[190px] w-[190px] md:h-[230px] md:w-[230px] lg:h-[270px] lg:w-[270px] rounded-full border-2 border-[#00C7F9]/40 dark:border-[#00C7F9]/40 bg-[#00C7F9]/20 dark:bg-[#00C7F9]/20"
              animate={{
                scale: [1, 1, 1, 1, 1, 0.98, 1.02, 0.98, 1, 1],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <motion.div
              className="absolute -bottom-[120px] md:-bottom-[145px] lg:-bottom-[170px] h-[235px] w-[235px] md:h-[285px] md:w-[285px] lg:h-[335px] lg:w-[335px] rounded-full border-2 border-[#00C7F9]/30 dark:border-[#00C7F9]/30 bg-[#00C7F9]/15 dark:bg-[#00C7F9]/15"
              animate={{
                scale: [1, 1, 1, 1, 1, 1, 0.98, 1.02, 0.98, 1],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};
