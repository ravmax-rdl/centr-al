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
      className="mx-auto my-auto py-32 w-full"
    >
      <div
        className={cn(
          'relative flex h-[500px] sm:h-[600px] md:h-[700px] lg:h-[800px] w-full max-w-full sm:max-w-[800px] md:max-w-[1000px] lg:max-w-[1200px] flex-col items-center mx-auto px-4',
          className
        )}
      >
        {/* SVG Paths  */}
        <svg
          className="h-full w-full text-muted"
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
          <g stroke="currentColor" fill="none" strokeWidth="0.4">
            {/* First Button */}
            <g>
              <rect fill="#18181B" x="14" y="5" width="34" height="10" rx="5"></rect>
              <DatabaseIcon x="18" y="7.5"></DatabaseIcon>
              <text x="28" y="12" fill="white" stroke="none" fontSize="5" fontWeight="500">
                {badgeFirstText || 'GET'}
              </text>
            </g>
            {/* Second Button */}
            <g>
              <rect fill="#18181B" x="60" y="5" width="34" height="10" rx="5"></rect>
              <DatabaseIcon x="64" y="7.5"></DatabaseIcon>
              <text x="74" y="12" fill="white" stroke="none" fontSize="5" fontWeight="500">
                {badgeSecondText || 'POST'}
              </text>
            </g>
            {/* Third Button */}
            <g>
              <rect fill="#18181B" x="108" y="5" width="34" height="10" rx="5"></rect>
              <DatabaseIcon x="112" y="7.5"></DatabaseIcon>
              <text x="122" y="12" fill="white" stroke="none" fontSize="5" fontWeight="500">
                {badgeThirdText || 'PUT'}
              </text>
            </g>
            {/* Fourth Button */}
            <g>
              <rect fill="#18181B" x="150" y="5" width="40" height="10" rx="5"></rect>
              <DatabaseIcon x="154" y="7.5"></DatabaseIcon>
              <text x="165" y="12" fill="white" stroke="none" fontSize="5" fontWeight="500">
                {badgeFourthText || 'DELETE'}
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
              <stop offset="0%" stopColor={lightColor || '#00A6F5'} />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
          </defs>
        </svg>
        {/* Main Box */}
        <div className="absolute bottom-10 flex w-full max-w-[90%] sm:max-w-[85%] md:max-w-[80%] flex-col items-center">
          {/* bottom shadow */}
          <div className="absolute -bottom-4 h-[100px] w-[62%] rounded-lg bg-accent/30" />
          {/* box title */}
          <div className="absolute -top-3 z-20 flex items-center justify-center rounded-lg border bg-[#101112] px-2 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2">
            <SparklesIcon className="size-3 sm:size-4" />
            <span className="ml-2 text-[10px] sm:text-xs md:text-sm">
              {title || 'Data exchange using a customized REST API'}
            </span>
          </div>
          {/* box outter circle */}
          <div className="absolute -bottom-8 z-30 grid h-[60px] w-[60px] md:h-[70px] md:w-[70px] lg:h-[80px] lg:w-[80px] place-items-center rounded-full border-t bg-[#141516] font-semibold text-xs md:text-sm">
            {circleText || 'SVG'}
          </div>
          {/* box content */}
          <div className="relative z-10 flex h-[200px] sm:h-[220px] md:h-[260px] lg:h-[300px] w-full items-center justify-center overflow-hidden rounded-lg border bg-background shadow-md">
            {/* Badges */}
            <div className="absolute bottom-6 left-8 sm:bottom-8 sm:left-12 md:bottom-10 md:left-16 z-10 h-6 sm:h-7 md:h-8 rounded-full bg-[#101112] px-2 sm:px-3 md:px-4 text-[10px] sm:text-xs md:text-sm border flex items-center gap-1.5 sm:gap-2">
              <HeartHandshakeIcon className="size-3 sm:size-4 md:size-5" />
              <span>{buttonFirstText || 'LegionDev'}</span>
            </div>
            <div className="absolute right-12 sm:right-16 md:right-20 z-10 hidden sm:flex h-7 md:h-8 rounded-full bg-[#101112] px-3 md:px-4 text-xs md:text-sm border items-center gap-2">
              <Folder className="size-4 md:size-5" />
              <span>{buttonSecondText || 'v2_updates'}</span>
            </div>
            {/* Circles */}
            <motion.div
              className="absolute -bottom-14 h-[100px] w-[100px] md:h-[120px] md:w-[120px] lg:h-[140px] lg:w-[140px] rounded-full border-t border-accent/20"
              animate={{
                scale: [0.98, 1.02, 0.98, 1, 1, 1, 1, 1, 1],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <motion.div
              className="absolute -bottom-20 h-[145px] w-[145px] md:h-[175px] md:w-[175px] lg:h-[205px] lg:w-[205px] rounded-full border-2 border-accent/25 bg-accent/8"
              animate={{
                scale: [1, 1, 1, 0.98, 1.02, 0.98, 1, 1, 1],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <motion.div
              className="absolute -bottom-[100px] md:-bottom-[120px] lg:-bottom-[140px] h-[190px] w-[190px] md:h-[230px] md:w-[230px] lg:h-[270px] lg:w-[270px] rounded-full border-2 border-accent/20 bg-accent/6"
              animate={{
                scale: [1, 1, 1, 1, 1, 0.98, 1.02, 0.98, 1, 1],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <motion.div
              className="absolute -bottom-[120px] md:-bottom-[145px] lg:-bottom-[170px] h-[235px] w-[235px] md:h-[285px] md:w-[285px] lg:h-[335px] lg:w-[335px] rounded-full border-2 border-accent/15 bg-accent/5"
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

const DatabaseIcon = ({ x = '0', y = '0' }: { x: string; y: string }) => {
  return (
    <svg
      x={x}
      y={y}
      xmlns="http://www.w3.org/2000/svg"
      width="5"
      height="5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M3 5V19A9 3 0 0 0 21 19V5" />
      <path d="M3 12A9 3 0 0 0 21 12" />
    </svg>
  );
};
