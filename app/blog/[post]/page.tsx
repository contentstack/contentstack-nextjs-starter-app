import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import moment from 'moment';
import parse from 'html-react-parser';
import { getPageRes, getBlogPostRes } from '../../../helper';
import { initializeLivePreview } from '@/helper/live-preview';
import RenderComponents from '../../../components/render-components';
import ArchiveRelative from '../../../components/archive-relative';
import Skeleton from 'react-loading-skeleton';
import { DevToolsClient } from '@/components/devToolClient';

interface BlogPostProps {
  params: Promise<{
    post: string;
  }>;
  searchParams: Promise<{
    [key: string]: string | string[] | undefined;
  }>;
}

export async function generateMetadata({ params }: BlogPostProps): Promise<Metadata> {
  try {
    const resolvedParams = await params;
    const post = await getBlogPostRes(`/blog/${resolvedParams.post}`);
    
    if (post?.seo && post.seo.enable_search_indexing) {
      const seoData: Record<string, string> = {};
      
      for (const key in post.seo) {
        if (key !== 'enable_search_indexing') {
          const metaKey = key.includes('meta_') ? key.split('meta_')[1] : key;
          const value = (post.seo as Record<string, unknown>)[key];
          if (typeof value === 'string') {
            seoData[metaKey] = value;
          } else if (value !== null && value !== undefined) {
            seoData[metaKey] = String(value);
          }
        }
      }
      
      return {
        title: seoData.title || post.title || `${resolvedParams.post} - Blog`,
        description: seoData.description,
        ...seoData
      };
    }
    
    return {
      title: post?.title || `${resolvedParams.post} - Blog`,
      description: post?.body?.substring(0, 160).replace(/<[^>]*>?/gm, '') || ''
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'Blog Post - Contentstack-Nextjs-Starter-App'
    };
  }
}

export default async function BlogPostPage({ params, searchParams }: BlogPostProps) {
  try {
    const [resolvedParams, resolvedSearchParams] = await Promise.all([
      params,
      searchParams
    ]);
    
    const filteredSearchParams = Object.fromEntries(
      Object.entries(resolvedSearchParams).filter(([_, value]) => value !== undefined)
    ) as Record<string, string | string[]>;
    
    await initializeLivePreview(filteredSearchParams);
    
    const page = await getPageRes('/blog');
    const post = await getBlogPostRes(`/blog/${resolvedParams.post}`);
    
    if (!page || !post) {
      notFound();
    }
    const response = {page, blogPost:post}
    return (
      <DevToolsClient page={response} requiredField={['page','blogPost']}>
        {page ? (
          <RenderComponents
            pageComponents={page.page_components}
            blogPost
            contentTypeUid='blog_post'
            entryUid={page.uid}
            locale={page.locale}
          />
        ) : (
          <Skeleton height={400} />
        )}
        <div className='blog-container'>
          <article className='blog-detail'>
            {post && post.title ? (
              <h2 {...(typeof post.$?.title === 'object' ? post.$.title : {})}>{post.title}</h2>
            ) : (
              <h2>
                <Skeleton />
              </h2>
            )}
            {post && post.date ? (
              <p {...(typeof post.$?.date === 'object' ? post.$?.date : {})}>
                {moment(post.date).format('ddd, MMM D YYYY')},{' '}
                <strong {...(typeof post.author[0].$?.title === 'object' ? post.author[0].$?.title : {})}>
                  {post.author[0].title}
                </strong>
              </p>
            ) : (
              <p>
                <Skeleton width={300} />
              </p>
            )}
            {post && post.body ? (
              <div {...(typeof post.$?.body === 'object' ? post.$.body : {})}>{parse(post.body)}</div>
            ) : (
              <Skeleton height={800} width={600} />
            )}
          </article>
          <div className='blog-column-right'>
            <div className='related-post'>
              {page && page.page_components[2]?.widget ? (
                //@ts-ignore
                <h2 {...page.page_components[2].widget.$?.title_h2}>
                  {page.page_components[2].widget.title_h2}
                </h2>
              ) : (
                <h2>
                  <Skeleton />
                </h2>
              )}
              {post && post.related_post ? (
                <ArchiveRelative
                  {...post.$?.related_post}
                  blogs={post.related_post}
                />
              ) : (
                <Skeleton width={300} height={500} />
              )}
            </div>
          </div>
        </div>
      </DevToolsClient>
    );
  } catch (error) {
    console.error('Error in Blog Post Page:', error);
    notFound();
  }
}