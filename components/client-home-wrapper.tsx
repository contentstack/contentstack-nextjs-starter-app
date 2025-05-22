'use client';

import React, { useEffect } from 'react';
import { useLivePreviewCtx } from '@/provider/live-preview';
import RenderComponents from './render-components';

interface ClientHomeWrapperProps {
  pageComponents: any;
  contentTypeUid: string;
  entryUid: string;
  locale: string;
  searchParams?: Record<string, string>;
}

export default function ClientHomeWrapper({
  pageComponents,
  contentTypeUid,
  entryUid,
  locale,
  searchParams
}: ClientHomeWrapperProps) {
  // Now we can safely use the context hook in a client component
  const livePreviewContext = useLivePreviewCtx();
  
  console.log("Live Preview Context:", livePreviewContext);
  useEffect(() => {
    if (searchParams?.live_preview) {
      console.log("Live Preview active with params:", searchParams);
      livePreviewContext.stack?.livePreviewQuery({
        live_preview: searchParams.live_preview,
        content_type_uid: contentTypeUid,
        preview_timestamp: searchParams.preview_timestamp,
        release_id: searchParams.release_id,
      })
    }
    console.log("Live Preview Context:", livePreviewContext);
  }, [searchParams, livePreviewContext]);

  return (
    <RenderComponents
      pageComponents={pageComponents}
      contentTypeUid={contentTypeUid}
      entryUid={entryUid}
      locale={locale}
    />
  );
}