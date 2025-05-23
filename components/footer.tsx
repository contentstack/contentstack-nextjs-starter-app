'use client'
import React from 'react';
import Link from 'next/link';
import parse from 'html-react-parser';
import Skeleton from 'react-loading-skeleton';
import { FooterProps } from "../typescript/layout";

export default function Footer({ footer }: {footer: FooterProps}) {
  
  return (
    <footer>
      <div className='max-width footer-div'>
        <div className='col-quarter'>
          {footer?.logo ? (
            <Link href='/' className='logo-tag'>
              <img
                src={footer.logo.url}
                alt={footer.title}
                title={footer.title}
                {...footer.logo.$?.url as {}}
                className='logo footer-logo'
              />
            </Link>
          ) : (
            <Skeleton width={150} />
          )}
        </div>
        <div className='col-half'>
          <nav>
            <ul className='nav-ul'>
              {footer?.navigation?.link ? (
                footer.navigation.link.map((menu) => (
                  <li
                    className='footer-nav-li'
                    key={menu.title || `menu-item-${menu.href}`}
                    {...menu.$?.title}
                  >
                    <Link href={menu.href || '#'}>{menu.title}</Link>
                  </li>
                ))
              ) : (
                <Skeleton width={300} />
              )}
            </ul>
          </nav>
        </div>
        <div className='col-quarter social-link'>
          <div className='social-nav'>
            {footer?.social?.social_share ? (
              footer.social.social_share.map((social, index) => (
                <a
                  href={social.link.href}
                  title={social.link.title}
                  key={social.link.title || `social-${index}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {social.icon && (
                    <img
                      src={social.icon.url}
                      alt={social.link.title}
                      {...social.icon.$?.url as {}}
                    />
                  )}
                </a>
              ))
            ) : (
              <Skeleton width={200} />
            )}
          </div>
        </div>
      </div>
      {footer && typeof footer.copyright === 'string' ? (
        <div className='copyright' {...footer.$?.copyright as {}}>
          {parse(footer.copyright)}
        </div>
      ) : (
        <div className='copyright'>
          <Skeleton width={500} />
        </div>
      )}
    </footer>
  );
}