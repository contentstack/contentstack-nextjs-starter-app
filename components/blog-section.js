import React from 'react';
import Link from 'next/link';
import parse from 'html-react-parser';

export default function BlogSection({ fromBlog }) {
  return (
    <div className='community-section'>
      <div className='community-head'>
        {fromBlog.title_h2 && (
          <h2 {...fromBlog.$?.title_h2}>{fromBlog.title_h2}</h2>
        )}
        {fromBlog.view_articles && (
          <Link href={fromBlog.view_articles.href}>
            <a
              className='btn secondary-btn article-btn'
              {...fromBlog.view_articles.$?.title}
            >
              {fromBlog.view_articles.title}
            </a>
          </Link>
        )}
      </div>
      <div className='home-featured-blogs'>
        {fromBlog.featured_blogs.map((blog, index) => (
          <div className='featured-blog' key={index}>
            {blog.featured_image && (
              <img
                {...blog.featured_image.$?.url}
                src={blog.featured_image.url}
                alt={blog.featured_image.filename}
                className='blog-post-img'
              />
            )}
            <div className='featured-content'>
              {blog.title && <h3 {...blog.$?.title}>{blog.title}</h3>}
              {typeof blog.body === 'string' && (
                <div>{parse(blog.body.slice(0, 300))}</div>
              )}
              {blog.url && (
                <Link href={blog.url} passHref>
                  <a className='blogpost-readmore'>{'Read More -->'}</a>
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
