import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import moment from 'moment';
import parse from 'html-react-parser';
import { getPageRes, getBlogPostRes } from '../../../helper';
import { initializeLivePreview } from '@/helper/live-preview';
import RenderComponents from '../../../components/render-components';
import ArchiveRelative from '../../../components/archive-relative';
import Skeleton from 'react-loading-skeleton';

interface BlogPostParams {
  params: {
    post: string;
  };
}

export async function generateMetadata({ params }: BlogPostParams): Promise<Metadata> {
  try {
    const post = await getBlogPostRes(`/blog/${params.post}`);
    
    if (post?.seo && post.seo.enable_search_indexing) {
      const seoData: Record<string, string> = {};
      
      for (const key in post.seo) {
        if (key !== 'enable_search_indexing') {
          const metaKey = key.includes('meta_') ? key.split('meta_')[1] : key;
          seoData[metaKey] = post.seo[key].toString();
        }
      }
      
      return {
        title: seoData.title || post.title || `${params.post} - Blog`,
        description: seoData.description,
        ...seoData
      };
    }
    
    return {
      title: post?.title || `${params.post} - Blog`,
      description: post?.body?.substring(0, 160).replace(/<[^>]*>?/gm, '') || ''
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: `${params.post} - Blog`
    };
  }
}

export default async function BlogPostPage({ params }: BlogPostParams) {
  try {
    // Initialize LivePreview if applicable
    await initializeLivePreview();
    
    // Fetch page data with LivePreview applied if necessary
    const page = await getPageRes('/blog');
    const post = await getBlogPostRes(`/blog/${params.post}`);
    
    if (!page || !post) {
      notFound();
    }
    
    return (
      <>
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
              <p {...post.$?.date}>
                {moment(post.date).format('ddd, MMM D YYYY')},{' '}
                <strong {...post.author[0].$?.title}>
                  {post.author[0].title}
                </strong>
              </p>
            ) : (
              <p>
                <Skeleton width={300} />
              </p>
            )}
            {post && post.body ? (
              <div {...post.$?.body}>{parse(post.body)}</div>
            ) : (
              <Skeleton height={800} width={600} />
            )}
          </article>
          <div className='blog-column-right'>
            <div className='related-post'>
              {page && page.page_components[2]?.widget ? (
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
      </>
    );
  } catch (error) {
    console.error('Error in Blog Post Page:', error);
    notFound();
  }
}