import { Metadata } from 'next';
import { getPageRes } from '../helper';
import { initializeLivePreview } from '@/helper/live-preview';
import RenderComponents from '@/components/render-components';

// Generate dynamic metadata for the page
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

export default async function Home({ searchParams }: {
  searchParams: { [key: string]: string }
}) {
  try {
    // Initialize LivePreview if applicable (handled by middleware + utility function)
    await initializeLivePreview();
    
    // Fetch page data (LivePreview settings are automatically applied to the Stack instance)
    const page = await getPageRes('/');
    
    if (!page) {
      throw new Error('Failed to fetch page data');
    }

    return (
      <RenderComponents
        pageComponents={page.page_components}
        contentTypeUid="page"
        entryUid={page.uid}
        locale={page.locale}
      />
    );
  } catch (error) {
    console.error('Error in Home page:', error);
    return <div>Error loading page content</div>;
  }
}