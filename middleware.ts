import { NextResponse, NextRequest } from 'next/server';
import { Stack } from '@/contentstack-sdk';

export function middleware(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const hasLivePreviewParams = searchParams.has('live_preview') || 
    searchParams.has('preview_token') ||
    searchParams.has('content_type_uid') ||
    searchParams.has('entry_uid');

  // Add LivePreview context to the request
  if (hasLivePreviewParams) {
    
    
    // Clone the request headers
    const requestHeaders = new Headers(request.headers);
    
    // Add indicator that this request includes live preview
    requestHeaders.set('x-contentstack-live-preview', 'true');
    
    // Add all search params as headers for easy access in the route handlers
    for (const [key, value] of Array.from(searchParams.entries())) {
      requestHeaders.set(`x-contentstack-param-${key}`, value);
    }
    
    // Return the modified request
    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  }
  
  return NextResponse.next();
}

export const config = {
  // Match all pages except for static assets, API routes, etc.
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|images|public|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};