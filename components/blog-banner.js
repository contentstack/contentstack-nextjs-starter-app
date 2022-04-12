import React from 'react';

export default function BlogBanner({ blogBanner }) {
  return (
    <div
      className='blog-page-banner'
      style={{
        background: `${blogBanner.bg_color ? blogBanner.bg_color : ''}`,
      }}
    >
      <div className='blog-page-content'>
        {blogBanner.banner_title && (
          <h1 className='hero-title' {...blogBanner.$?.banner_title}>
            {blogBanner.banner_title}
          </h1>
        )}

        {blogBanner.banner_description && (
          <p className='hero-description' {...blogBanner.$?.banner_description}>
            {blogBanner.banner_description}
          </p>
        )}
      </div>
    </div>
  );
}
