import { Metadata } from 'next';
import { getPageRes } from '../helper';
import { initializeLivePreview } from '@/helper/live-preview';
import RenderComponents from '@/components/render-components';
import { DevToolsClient } from '@/components/devToolClient';

interface HomePageProps {
  searchParams: Promise<{
    [key: string]: string | string[] | undefined;
  }>;
}

export async function generateMetadata(): Promise<Metadata> {
  try {
    const page = await getPageRes('/');
    
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
        title: seoData.title || 'Contentstack-Nextjs-Starter-App',
        description: seoData.description,
        ...seoData
      };
    }
    
    return {};
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {};
  }
}

export default async function Home({ searchParams }: HomePageProps) {
  try {
    const resolvedSearchParams = await searchParams;
    const filteredSearchParams = Object.fromEntries(
      Object.entries(resolvedSearchParams).filter(([_, value]) => value !== undefined)
    ) as Record<string, string | string[]>;
    
    await initializeLivePreview(filteredSearchParams);
    const page = await getPageRes('/');

    if (!page) {
      throw new Error('Failed to fetch page data');
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
    console.error('Error in Home page:', error);
    return <div>Error loading page content</div>;
  }
}