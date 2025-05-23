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
  
  if (searchParams) {
    Object.entries(searchParams).forEach(([key, value]) => {
      if (typeof value === 'string') {
        livePreviewParams[key] = value;
      } else if (Array.isArray(value) && value.length > 0) {
        livePreviewParams[key] = value[0];
      }
    });
    
    hasLivePreview = Object.keys(livePreviewParams).some(key => 
      ['live_preview', 'preview_token', 'content_type_uid', 'entry_uid'].includes(key)
    );
  } 
  else {
    try {
      const { headers } = await import('next/headers');
      const headersList = headers();
      
      hasLivePreview = (await headersList).get('x-contentstack-live-preview') === 'true';
      
      if (hasLivePreview) {
        (await headersList).forEach((value, key) => {
          if (key.startsWith('x-contentstack-param-')) {
            const paramName = key.replace('x-contentstack-param-', '');
            livePreviewParams[paramName] = value;
          }
        });
      }
    } catch (error) {
      console.error('Headers API not available (non-App Router context)');
    }
  }

  if (hasLivePreview && Object.keys(livePreviewParams).length > 0) {
    try {
      
      if (Stack && typeof Stack.livePreviewQuery === 'function') {
        Stack.livePreviewQuery(livePreviewParams as unknown as LivePreviewQuery);
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