import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPageRes } from '../../helper';
import { initializeLivePreview } from '@/helper/live-preview';
import RenderComponents from '@/components/render-components';

interface PageParams {
  params: {
    page: string;
  };
}

// Generate dynamic metadata for the page
export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
  try {
    // Await the params object before accessing its properties
    const pageParam = await params.page;
    const entryUrl = pageParam.includes('/') ? pageParam : `/${pageParam}`;
    const page = await getPageRes(entryUrl);
    
    if (page?.seo && page.seo.enable_search_indexing) {
      const seoData: Record<string, string> = {};
      
      for (const key in page.seo) {
        if (key !== 'enable_search_indexing') {
          const metaKey = key.includes('meta_') ? key.split('meta_')[1] : key;
          //@ts-ignore
          seoData[metaKey] = page.seo[key].toString();
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

export default async function DynamicPage({ params }: PageParams) {
  try {
    // Initialize LivePreview if applicable (handled by middleware + utility function)
    await initializeLivePreview();
    
    // Await the params object before accessing its properties
    const pageParam = await params.page;
    const entryUrl = pageParam.includes('/') ? pageParam : `/${pageParam}`;
    const page = await getPageRes(entryUrl);
    
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
    console.error('Error in dynamic page:', error);
    notFound();
  }
}