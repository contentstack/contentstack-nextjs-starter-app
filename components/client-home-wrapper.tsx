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
  const livePreviewContext = useLivePreviewCtx();
  useEffect(() => {
    if (searchParams?.live_preview) {
      livePreviewContext.stack?.livePreviewQuery({
        live_preview: searchParams.live_preview,
        content_type_uid: contentTypeUid,
        preview_timestamp: searchParams.preview_timestamp,
        release_id: searchParams.release_id,
      })
    }
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