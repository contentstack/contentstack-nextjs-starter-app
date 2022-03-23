import React from 'react';
import moment from 'moment';
import parse from 'html-react-parser';
import Link from 'next/link';

function BlogList({ bloglist }) {
  let body = typeof bloglist.body === 'string' && bloglist.body.substr(0, 300);
  const stringLength = body.lastIndexOf(' ');
  body = `${body.substr(0, Math.min(body.length, stringLength))}...`;
  return (
    <div className='blog-list'>
      {bloglist.featured_image && (
        <Link href={bloglist.url}>
          <a>
            <img
              className='blog-list-img'
              src={bloglist.featured_image.url}
              alt='blog img'
              {...bloglist.featured_image.$?.url}
            />
          </a>
        </Link>
      )}
      <div className='blog-content'>
        {bloglist.title && (
          <Link href={bloglist.url}>
            <a>
              <h3 {...bloglist.$?.title}>{bloglist.title}</h3>
            </a>
          </Link>
        )}
        <p>
          <strong {...bloglist.$?.date}>
            {moment(bloglist.date).format('ddd, MMM D YYYY')}
          </strong>
          ,{" "}
          <strong {...bloglist.author[0].$?.title}>
            {bloglist.author[0].title}
          </strong>
        </p>
        <div {...bloglist.$?.body}>{parse(body)}</div>
        {bloglist.url ? (
          <Link href={bloglist.url}>
            <a>
              <span>{'Read more -->'}</span>
            </a>
          </Link>
        ) : (
          ''
        )}
      </div>
    </div>
  );
}

export default BlogList;