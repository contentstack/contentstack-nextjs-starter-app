import React from 'react';
import Link from 'next/link';

export default function HeroBanner({ banner }) {
  return (
    <div
      className='hero-banner'
      style={{
        background: banner?.bg_color ? banner.bg_color : '',
      }}
    >
      <div
        className='home-content'
        style={{
          color: banner?.text_color ? banner.text_color : '',
        }}
      >
        {banner.banner_title && (
          <h1 className='hero-title' {...banner.$?.banner_title}>
            {banner.banner_title}
          </h1>
        )}
        {banner.banner_description ? (
          <p
            className='hero-description '
            style={{
              color: banner?.text_color ? banner.text_color : '',
            }}
            {...banner.$?.banner_description}
          >
            {banner?.banner_description}
          </p>
        ) : (
          ''
        )}
        {banner.call_to_action.title && banner.call_to_action.href ? (
          <Link href={banner?.call_to_action.href}>
            <a className='btn tertiary-btn' {...banner.call_to_action.$?.title}>
              {banner?.call_to_action.title}
            </a>
          </Link>
        ) : (
          ''
        )}
      </div>
      {banner.banner_image ? (
        <img
          alt={banner.banner_image.filename}
          src={banner.banner_image.url}
          {...banner.banner_image.$?.url}
        />
      ) : (
        ''
      )}
    </div>
  );
}
