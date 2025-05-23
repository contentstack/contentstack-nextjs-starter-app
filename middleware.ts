import { NextResponse, NextRequest } from 'next/server';
import { Stack } from '@/contentstack-sdk';

export function middleware(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const hasLivePreviewParams = searchParams.has('live_preview') || 
    searchParams.has('preview_token') ||
    searchParams.has('content_type_uid') ||
    searchParams.has('entry_uid');

  if (hasLivePreviewParams) {
    
    
    const requestHeaders = new Headers(request.headers);
    
    requestHeaders.set('x-contentstack-live-preview', 'true');
    
    for (const [key, value] of Array.from(searchParams.entries())) {
      requestHeaders.set(`x-contentstack-param-${key}`, value);
    }
    
    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|images|public|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};