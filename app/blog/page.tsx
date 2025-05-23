import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getBlogListRes, getPageRes } from '../../helper';
import { initializeLivePreview } from '@/helper/live-preview';
import RenderComponents from '../../components/render-components';
import BlogList from '@/components/blog-list';
import Skeleton from 'react-loading-skeleton';
import ArchiveRelative from '@/components/archive-relative';
import { DevToolsClient } from '@/components/devToolClient';

interface BlogPageProps {
  searchParams: Promise<{
    [key: string]: string | string[] | undefined;
  }>;
}
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
          } else if (value !== null && value !== undefined) {
            seoData[metaKey] = String(value);
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

export default async function Blog({ searchParams }: BlogPageProps) {
  try {
    const resolvedSearchParams = await searchParams;
    const filteredSearchParams = Object.fromEntries(
      Object.entries(resolvedSearchParams).filter(([_, value]) => value !== undefined)
    ) as Record<string, string | string[]>;
  
    await initializeLivePreview(filteredSearchParams);
    const page = await getPageRes('/blog');
    const blogList = await getBlogListRes();
    const archivePost = [] as any;
    interface Blog {
      title: string;
      is_archived: boolean;
    }
    
    const posts: Blog[] = [];
    blogList.forEach((blogs) => {
      if (blogs.is_archived) {
        archivePost.push(blogs);
      } else {
        posts.push(blogs);
      }
    });
    if (!page) {
      notFound();
    }
    
    return (
    <DevToolsClient page={{page, blogList}} requiredField={['page','blogList']}>
      <RenderComponents
        pageComponents={page.page_components}
        contentTypeUid="page"
        blogPost={true}
        entryUid={page.uid}
        locale={page.locale}
      />
        <div className='blog-container'>
        <div className='blog-column-left'>
          {posts ? (
            posts.map((blogList, index) => (
              //@ts-ignore
              <BlogList bloglist={blogList} key={index} />
            ))
          ) :null}
        </div>
        <div className='blog-column-right'>
          {page && page.page_components[1].widget && (
            <h2>{page.page_components[1].widget.title_h2}</h2>
          )}
          {archivePost ? (
            <ArchiveRelative blogs={archivePost} />
          ) : (
            <Skeleton height={600} width={300} />
          )}
        </div>
      </div>
    </DevToolsClient>
    );
  } catch (error) {
    console.error('Error in Blog page:', error);
    notFound();
  }
}