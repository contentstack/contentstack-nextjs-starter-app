import { Stack } from '@/contentstack-sdk';
import { LivePreviewQuery } from 'contentstack';

/**
 * Initialize Live Preview for the current request if applicable
 * This version is compatible with both App Router and Pages Router
 */
export async function initializeLivePreview(searchParams?: Record<string, string | string[]>) {
  // For App Router (server components), we can try to use headers
  let livePreviewParams: Record<string, string> = {};
  let hasLivePreview = false;
  
  // First, check if we were passed searchParams directly (for Pages Router)
  if (searchParams) {
    // Convert searchParams to a simple record for consistency
    Object.entries(searchParams).forEach(([key, value]) => {
      if (typeof value === 'string') {
        livePreviewParams[key] = value;
      } else if (Array.isArray(value) && value.length > 0) {
        livePreviewParams[key] = value[0];
      }
    });
    
    // Check if any Live Preview parameters exist
    hasLivePreview = Object.keys(livePreviewParams).some(key => 
      ['live_preview', 'preview_token', 'content_type_uid', 'entry_uid'].includes(key)
    );
  } 
  // For App Router, try to use headers (will fail in Pages Router)
  else {
    try {
      // Dynamically import headers to avoid static imports that would break in Pages Router
      const { headers } = await import('next/headers');
      const headersList = headers();
      
      // Check if Live Preview is enabled for this request (set by middleware)
      hasLivePreview = headersList.get('x-contentstack-live-preview') === 'true';
      
      if (hasLivePreview) {
        // Collect all LivePreview parameters from headers
        headersList.forEach((value, key) => {
          if (key.startsWith('x-contentstack-param-')) {
            const paramName = key.replace('x-contentstack-param-', '');
            livePreviewParams[paramName] = value;
          }
        });
      }
    } catch (error) {
      // We're probably in the Pages Router - headers import will fail, but that's expected
      console.log('Headers API not available (non-App Router context)');
    }
  }

  if (hasLivePreview && Object.keys(livePreviewParams).length > 0) {
    try {
      console.log('Initializing Live Preview with params:', livePreviewParams);
      
      // Apply Live Preview query parameters to the Stack SDK
      if (Stack && typeof Stack.livePreviewQuery === 'function') {
        await Stack.livePreviewQuery(livePreviewParams as LivePreviewQuery);
        console.log('Live Preview successfully initialized');
        return true;
      } else {
        console.warn('Stack SDK does not support livePreviewQuery');
      }
    } catch (error) {
      console.error('Failed to initialize Live Preview:', error);
    }
  }
  
  return false;
}