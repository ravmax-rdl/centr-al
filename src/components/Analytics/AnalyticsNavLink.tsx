'use client';

import React from 'react';
import { NavGroup, Link } from '@payloadcms/ui';
import { usePathname } from 'next/navigation';

const AnalyticsIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ marginRight: '8px' }}
  >
    <path d="M3 3v18h18" />
    <path d="m19 9-5 5-4-4-3 3" />
  </svg>
);

export const AnalyticsNavLink = () => {
  const pathname = usePathname();
  const href = '/admin/analytics';
  const active = pathname.includes(href);

  return (
    <NavGroup label="Views">
      <Link
        href={href}
        className="nav__link"
        id="nav-analytics"
        style={{
          cursor: active ? 'default' : 'pointer',
          pointerEvents: active ? 'none' : 'auto',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {active && <div className="nav__link-indicator" />}
        <AnalyticsIcon />
        <span className="nav__link-label">Analytics</span>
      </Link>
    </NavGroup>
  );
};

export default AnalyticsNavLink;
