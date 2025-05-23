'use client'

import React, { useEffect } from 'react';
import { LivePreviewProvider } from '@/provider/live-preview';

interface LivePreviewConfig {
  apiKey?: string;
  deliveryToken?: string;
  environment?: string;
  appHost?: string;
  livePreview?: string;
  [key: string]: any;
}

/**
 * LivePreviewInit component that serves as an entry point for Contentstack Live Preview
 * This component uses the LivePreviewProvider internally
 */
export const LivePreviewInit = ({ config, children }: { config: LivePreviewConfig; children: React.ReactNode }) => {
 
  return (
    <LivePreviewProvider config={config}>
      {children}
    </LivePreviewProvider>
  );
};