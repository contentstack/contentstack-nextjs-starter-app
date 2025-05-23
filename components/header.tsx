'use client'
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import parse from 'html-react-parser';
import Tooltip from './tool-tip';
import Skeleton from 'react-loading-skeleton';
import { HeaderProps } from "../typescript/layout";

export default function Header({ header }: { header: HeaderProps}) {
  const pathname = usePathname();
  
  return (
    <header className='header'>
      <div className='note-div'>
        {header?.notification_bar?.show_announcement ? (
          typeof header.notification_bar.announcement_text === 'string' && (
            <div {...header.notification_bar.$?.announcement_text as {}}>
              {parse(header.notification_bar.announcement_text)}
            </div>
          )
        ) : (
          <div style={{ backgroundColor: '#f5f3fe', padding: '10px 0', textAlign: 'center', fontSize: '14px' }}>
            <Skeleton width={300} height={14} />
          </div>
        )}
      </div>
      <div className='max-width header-div'>
        <div className='wrapper-logo'>
          {header?.logo ? (
            <Link href='/' className='logo-tag' title='Contentstack'>
              <img
                className='logo'
                src={header.logo.url}
                alt={header.title}
                title={header.title}
                {...header.logo.$?.url as {}}
              />
            </Link>
          ) : (
            <Skeleton width={150} />
          )}
        </div>
        <input className='menu-btn' type='checkbox' id='menu-btn' />
        <label className='menu-icon' htmlFor='menu-btn'>
          <span className='navicon' />
        </label>
        <nav className='menu'>
          <ul className='nav-ul header-ul'>
            {header?.navigation_menu ? (
              header.navigation_menu.map((list) => {
                if (!list?.page_reference?.[0]?.url) return null;

                const className = pathname === list.page_reference[0].url ? 'active' : '';
                return (
                  <li
                    key={list.label || `nav-item-${list.page_reference[0].url}`}
                    className='nav-li'
                    {...list.page_reference[0].$?.url as {}}
                  >
                    <Link href={list.page_reference[0].url} className={className}>
                      {list.label}
                    </Link>
                  </li>
                );
              })
            ) : (
              <div style={{
                display: 'flex', justifyContent: 'space-between',
                alignItems: 'center', padding: '15px 40px', backgroundColor: '#fff',
                borderBottom: '1px solid #eee'
              }}>
                <Skeleton width={100} height={30} />
                <div style={{ display: 'flex', gap: '30px' }}>
                  {[...Array(4)].map((_, i) => (
                    <Skeleton key={i} width={60} height={20} />
                  ))}
                </div>
                <Skeleton circle width={24} height={24} />
              </div>
            )}
          </ul>
        </nav>

        <div className='json-preview'>
          <Tooltip content='JSON Preview' direction='top' dynamic={false} delay={200} status={0}>
            <span data-bs-toggle='modal' data-bs-target='#staticBackdrop'>
              <img src='/json.svg' alt='JSON Preview icon' />
            </span>
          </Tooltip>
        </div>
      </div>
    </header>
  );
}