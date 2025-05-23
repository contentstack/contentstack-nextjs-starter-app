import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPageRes } from '../../helper';
import { initializeLivePreview } from '@/helper/live-preview';
import RenderComponents from '@/components/render-components';
import { DevToolsClient } from '@/components/devToolClient';

interface PageProps {
  params: Promise<{
    page: string;
  }>;
  searchParams: Promise<{
    [key: string]: string | string[] | undefined;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  try {
    const resolvedParams = await params;
    const pageParam = resolvedParams.page;
    const entryUrl = pageParam.includes('/') ? pageParam : `/${pageParam}`;
    const page = await getPageRes(entryUrl);
    
    if (page?.seo && page.seo.enable_search_indexing) {
      const seoData: Record<string, string> = {};
      
      for (const key in page.seo) {
        if (key !== 'enable_search_indexing') {
          const metaKey = key.includes('meta_') ? key.split('meta_')[1] : key;
          const value = (page.seo as Record<string, unknown>)[key];
          if (typeof value === 'string') {
            seoData[metaKey] = value;
          } else if (value !== null && value !== undefined) {
            seoData[metaKey] = String(value);
          }
        }
      }
      
      return {
        title: seoData.title || `${pageParam} - Contentstack-Nextjs-Starter-App`,
        description: seoData.description,
        ...seoData
      };
    }
    
    return {
      title: `${pageParam} - Contentstack-Nextjs-Starter-App`
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'Contentstack-Nextjs-Starter-App'
    };
  }
}

export default async function DynamicPage({ params, searchParams }: PageProps) {
  try {
    const [resolvedParams, resolvedSearchParams] = await Promise.all([
      params,
      searchParams
    ]);
    
    const filteredSearchParams = Object.fromEntries(
      Object.entries(resolvedSearchParams).filter(([_, value]) => value !== undefined)
    ) as Record<string, string | string[]>;
    
    await initializeLivePreview(filteredSearchParams);
    const pageParam = resolvedParams.page;
    const entryUrl = pageParam.includes('/') ? pageParam : `/${pageParam}`;
    const page = await getPageRes(entryUrl);
    
    if (!page) {
      notFound();
    }
    
    return (
      <DevToolsClient page={{page:page}} requiredField={['page']}>
      <RenderComponents
        pageComponents={page.page_components}
        contentTypeUid="page"
        entryUid={page.uid}
        locale={page.locale}
      />
      </DevToolsClient>
    );
  } catch (error) {
    console.error('Error in dynamic page:', error);
    notFound();
  }
}