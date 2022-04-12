import React, { useState, useEffect } from 'react';
import Header from './header';
import Footer from './footer';
import DevTools from './devtools';

export default function Layout({
  header,
  footer,
  page,
  blogPost,
  blogList,
  entries,
  children,
}) {
  const [getLayout, setLayout] = useState({ header, footer });
  const jsonObj = { header, footer };
  page && (jsonObj.page = page);
  blogPost && (jsonObj.blog_post = blogPost);
  blogList && (jsonObj.blog_post = blogList);

  function buildNavigation(ent, hd, ft) {
    let newHeader = { ...hd };
    let newFooter = { ...ft };
    if (ent.length !== newHeader.navigation_menu.length) {
      ent.forEach((entry) => {
        const hFound = newHeader?.navigation_menu.find(
          (navLink) => navLink.label === entry.title
        );
        if (!hFound) {
          newHeader.navigation_menu?.push({
            label: entry.title,
            page_reference: [
              { title: entry.title, url: entry.url, $: entry.$ },
            ],
            $: {},
          });
        }
        const fFound = newFooter?.navigation.link.find(
          (nlink) => nlink.title === entry.title
        );
        if (!fFound) {
          newFooter.navigation.link?.push({
            title: entry.title,
            href: entry.url,
            $: entry.$,
          });
        }
      });
    }
    return [newHeader, newFooter];
  }

  useEffect(() => {
    if (footer && header && entries) {
      const [newHeader, newFooter] = buildNavigation(entries, header, footer);
      setLayout({ header: newHeader, footer: newFooter });
    }
  }, [header, footer]);

  return (
    <>
      {header ? <Header header={getLayout.header} entries={entries} /> : ''}
      <main className='mainClass'>
        {children}
        {Object.keys(jsonObj).length && <DevTools response={jsonObj} />}
      </main>
      {footer ? <Footer footer={getLayout.footer} entries={entries} /> : ''}
    </>
  );
}
