import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPageRes } from '../../helper';
import { initializeLivePreview } from '@/helper/live-preview';
import RenderComponents from '../../components/render-components';

// Generate dynamic metadata for the page
export async function generateMetadata(): Promise<Metadata> {
  try {
    const page = await getPageRes('/blog');
    
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
        title: seoData.title || 'Blog - Contentstack-Nextjs-Starter-App',
        description: seoData.description,
        ...seoData
      };
    }
    
    return {
      title: 'Blog - Contentstack-Nextjs-Starter-App'
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'Blog - Contentstack-Nextjs-Starter-App'
    };
  }
}

export default async function Blog() {
  try {
    // Initialize LivePreview if applicable
    await initializeLivePreview();
    
    // Fetch page data with LivePreview applied if necessary
    const page = await getPageRes('/blog');
    
    if (!page) {
      notFound();
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
    console.error('Error in Blog page:', error);
    notFound();
  }
}