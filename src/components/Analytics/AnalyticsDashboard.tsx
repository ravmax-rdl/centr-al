'use client';

import React, { useState } from 'react';

const UMAMI_SHARE_URL = `http://145.241.230.201:3000/share/FSA46lFvsiQIqvHG`;

export const AnalyticsDashboard: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleIframeError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  return (
    <div className="analytics-dashboard">
      <style>
        {`
          .analytics-dashboard {
            width: 100%;
            height: calc(100vh - 5px);
            min-height: 600px;
            display: flex;
            flex-direction: column;
            padding: 24px;
            box-sizing: border-box;
          }
          
          .analytics-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
            flex-wrap: wrap;
            gap: 12px;
          }
          
          .analytics-header-left {
            display: flex;
            align-items: center;
            gap: 12px;
          }
          
          .analytics-header h1 {
            margin: 0;
            font-size: 1.5rem;
            font-weight: 600;
            color: var(--theme-text);
          }
          
          .analytics-badge {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            padding: 4px 10px;
            background: var(--theme-success-100);
            color: var(--theme-success-500);
            border-radius: 20px;
            font-size: 0.75rem;
            font-weight: 500;
          }
          
          .analytics-badge-dot {
            width: 6px;
            height: 6px;
            background: var(--theme-success-500);
            border-radius: 50%;
            animation: pulse 2s ease-in-out infinite;
          }
          
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.4; }
          }
          
          .analytics-actions {
            display: flex;
            align-items: center;
            gap: 12px;
          }
          
          .analytics-link {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            padding: 8px 16px;
            background: var(--theme-elevation-100);
            color: var(--theme-text);
            text-decoration: none;
            font-size: 0.875rem;
            font-weight: 500;
            border-radius: 6px;
            transition: all 0.15s ease;
            border: 1px solid var(--theme-elevation-150);
          }
          
          .analytics-link:hover {
            background: var(--theme-elevation-150);
            border-color: var(--theme-elevation-200);
          }
          
          .analytics-link svg {
            width: 16px;
            height: 16px;
          }
          
          .analytics-refresh {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            padding: 8px;
            background: var(--theme-elevation-100);
            color: var(--theme-text);
            border: 1px solid var(--theme-elevation-150);
            border-radius: 6px;
            cursor: pointer;
            transition: all 0.15s ease;
          }
          
          .analytics-refresh:hover {
            background: var(--theme-elevation-150);
            border-color: var(--theme-elevation-200);
          }
          
          .analytics-refresh svg {
            width: 16px;
            height: 16px;
          }
          
          .analytics-iframe-container {
            flex: 1;
            position: relative;
            background: var(--theme-elevation-50);
            border-radius: 8px;
            overflow: hidden;
            border: 1px solid var(--theme-elevation-100);
          }
          
          .analytics-dashboard iframe {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            border: none;
          }
          
          .analytics-dashboard iframe.loaded {
            opacity: 1;
          }
          
          .analytics-dashboard iframe.loading {
            opacity: 0;
          }
          
          .analytics-loading {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 16px;
            background: var(--theme-elevation-50);
          }
          
          .analytics-loading.hidden {
            opacity: 0;
            pointer-events: none;
          }
          
          .analytics-error {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 16px;
            background: var(--theme-elevation-50);
            padding: 24px;
            text-align: center;
          }
          
          .analytics-error-icon {
            width: 48px;
            height: 48px;
            color: var(--theme-elevation-400);
          }
          
          .analytics-error-title {
            font-size: 1.125rem;
            font-weight: 600;
            color: var(--theme-text);
            margin: 0;
          }
          
          .analytics-error-text {
            color: var(--theme-elevation-500);
            font-size: 0.875rem;
            max-width: 400px;
          }
          
          .analytics-spinner {
            width: 40px;
            height: 40px;
            border: 3px solid var(--theme-elevation-200);
            border-top-color: var(--theme-elevation-500);
            border-radius: 50%;
            animation: spin 1s linear infinite;
          }
          
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
          
          .analytics-loading-text {
            color: var(--theme-elevation-500);
            font-size: 0.875rem;
          }
          
          .analytics-footer {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 16px;
            padding-top: 16px;
            border-top: 1px solid var(--theme-elevation-100);
            font-size: 0.75rem;
            color: var(--theme-elevation-500);
          }
          
          .analytics-footer a {
            color: var(--theme-elevation-600);
            text-decoration: none;
          }
          
          .analytics-footer a:hover {
            text-decoration: underline;
          }
        `}
      </style>

      <div className="analytics-header">
        <div className="analytics-header-left">
          <h1>Site Analytics</h1>
          <span className="analytics-badge">
            <span className="analytics-badge-dot" />
            Live
          </span>
        </div>
        <div className="analytics-actions">
          <button
            className="analytics-refresh"
            onClick={() => {
              setIsLoading(true);
              setHasError(false);
              const iframe = document.querySelector(
                '.analytics-dashboard iframe'
              ) as HTMLIFrameElement;
              if (iframe) {
                iframe.src = iframe.src;
              }
            }}
            title="Refresh analytics"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
              <path d="M3 3v5h5" />
              <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
              <path d="M16 16h5v5" />
            </svg>
          </button>
          <a
            href={UMAMI_SHARE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="analytics-link"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
            Open in Umami
          </a>
        </div>
      </div>

      <div className="analytics-iframe-container">
        {isLoading && !hasError && (
          <div className="analytics-loading">
            <div className="analytics-spinner" />
            <span className="analytics-loading-text">Loading analytics...</span>
          </div>
        )}
        {hasError && (
          <div className="analytics-error">
            <svg
              className="analytics-error-icon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <h3 className="analytics-error-title">Unable to load analytics</h3>
            <p className="analytics-error-text">
              The analytics dashboard cannot be embedded here due to security restrictions. Please
              click the button below to view analytics in a new tab.
            </p>
            <a
              href={UMAMI_SHARE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="analytics-link"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
              Open Umami Dashboard
            </a>
          </div>
        )}
        <iframe
          src={UMAMI_SHARE_URL}
          title="Site Analytics"
          loading="lazy"
          allow="fullscreen"
          className={isLoading ? 'loading' : 'loaded'}
          onLoad={() => setIsLoading(false)}
          onError={handleIframeError}
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>

      <div className="analytics-footer">
        <span>
          Powered by{' '}
          <a href="https://umami.is" target="_blank" rel="noopener noreferrer">
            Umami Analytics
          </a>
        </span>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
