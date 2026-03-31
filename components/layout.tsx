import React, { useMemo } from 'react';
import Header from './header';
import Footer from './footer';
import DevTools from './devtools';
import { HeaderProps, FooterProps, PageProps, Posts, ChilderenProps, Entry, NavLinks, Links } from "../typescript/layout";

function buildNavigation(ent: Entry, hd: HeaderProps, ft: FooterProps) {
  let newHeader = { ...hd };
  let newFooter = { ...ft };
  if (ent.length !== newHeader.navigation_menu.length) {
    ent.forEach((entry) => {
      const hFound = newHeader?.navigation_menu.find(
        (navLink: NavLinks) => navLink.label === entry.title
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
        (nlink: Links) => nlink.title === entry.title
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

export default function Layout({
  header,
  footer,
  page,
  blogPost,
  blogList,
  entries,
  children,
}: { header: HeaderProps, footer: FooterProps, page: PageProps, blogPost: Posts, blogList: Posts, entries: Entry, children: ChilderenProps }) {

  const getLayout = useMemo(() => {
    if (footer && header && entries) {
      const [newHeader, newFooter] = buildNavigation(entries, header, footer);
      return { header: newHeader, footer: newFooter };
    }
    return { header, footer };
  }, [header, footer, entries]);

  const jsonObj: any = { header, footer };
  page && (jsonObj.page = page);
  blogPost && (jsonObj.blog_post = blogPost);
  blogList && (jsonObj.blog_post = blogList);

  return (
    <>
      {header ? <Header header={getLayout.header} entries={entries} /> : ''}
      <main className='mainClass'>
        <>
        {children}
        {Object.keys(jsonObj).length && <DevTools response={jsonObj} />}
        </>
      </main>
      {footer ? <Footer footer={getLayout.footer} entries={entries} /> : ''}
    </>
  );
}
