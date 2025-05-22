import React from 'react';
import Header from '../components/header';
import Footer from '../components/footer';
import DevTools from '../components/devtools';
import { getHeaderRes, getFooterRes, getAllEntries } from '../helper';
import { HeaderProps, FooterProps } from "../typescript/layout";
import { Page } from '@/typescript/pages';
import { unstable_cache } from 'next/cache';
import { initializeLivePreview } from '@/helper/live-preview';

const getCachedNavigation = unstable_cache(
  async (entries: Page[], header: HeaderProps, footer: FooterProps) => {
    return dynamicHeadersAndFooter(entries, header, footer);
  },
  ['navigation-data'],
);
// dynamically update header and footer page links
const dynamicHeadersAndFooter = (entries: Page[], header: HeaderProps, footer: FooterProps): [HeaderProps, FooterProps] => {
  const newHeader = { ...header };
  const newFooter = { ...footer };

  if (entries.length > 0 && newHeader.navigation_menu) {
    entries.forEach((entry) => {
      // Only process entries with valid title and URL
      if (!entry.title || !entry.url) return;

      const hFound = newHeader.navigation_menu.find(
        (navLink) => navLink.label === entry.title
      );

      if (!hFound) {
        newHeader.navigation_menu.push({
          label: entry.title,
          page_reference: [
            //@ts-ignore
            { title: entry.title, url: entry.url, $: entry.$ },
          ],
          $: {},
        });
      }

      const fFound = newFooter.navigation.link.find(
        (nlink) => nlink.title === entry.title
      );

      if (!fFound) {
        newFooter.navigation.link.push({
          title: entry.title,
          href: entry.url,
          //@ts-ignore
          $: entry.$,
        });
      }
    });
  }

  return [newHeader, newFooter];
}

export default async function AppLayout({
  children,
  hasLivePreview = false,
}: {
  children: React.ReactNode;
  hasLivePreview?: boolean;
}) {
  try {
    // Initialize LivePreview if the middleware detected LivePreview parameters
    if (hasLivePreview) {
      await initializeLivePreview();
    }
    
    const [headerData, footerData, entriesData] = await Promise.all([
      getHeaderRes(),
      getFooterRes(),
      getAllEntries()
    ]);

    const [dynamicHeader, dynamicFooter] = await getCachedNavigation(entriesData, headerData, footerData);

    const JSON_DATA = {
      header: dynamicHeader,
      footer: dynamicFooter
    };

    return (
      <>
        {dynamicHeader && <Header header={dynamicHeader} entries={entriesData} />}
        <main className="mainClass">
          {children}
          <DevTools response={JSON_DATA} />
        </main>
        {dynamicFooter && <Footer footer={dynamicFooter} entries={entriesData} />}
      </>
    );
  } catch (error) {
    console.error('Error in AppLayout:', error);
    return (
      <>
        <main className="mainClass">
          {children}
        </main>
      </>
    );
  }
}