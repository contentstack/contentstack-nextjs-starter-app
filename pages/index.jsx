import React, { useState, useEffect } from 'react';
import getConfig from 'next/config';
import { onEntryChange } from '../sdk-plugin/index';
import Layout from '../components/layout';
import RenderComponents from '../components/render-components';
import { getHeaderRes, getFooterRes, getHomeRes } from '../helper/index';

export default function Home(props) {
  const {
    header, footer, result, entryUrl,
  } = props;
  const { CONTENTSTACK_LIVE_PREVIEW } = getConfig().publicRuntimeConfig;
  const [getHeader, setHeader] = useState(header);
  const [getFooter, setFooter] = useState(footer);
  const [getEntry, setEntry] = useState(result);

  async function fetchData() {
    try {
      console.info('fetching live preview data...');
      const entryRes = await getHomeRes(entryUrl);
      const headerRes = await getHeaderRes();
      const footerRes = await getFooterRes();
      setHeader(headerRes);
      setFooter(footerRes);
      setEntry(entryRes);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    onEntryChange(() => {
      if (CONTENTSTACK_LIVE_PREVIEW === 'true') fetchData();
    });
  }, []);

  return (
    <Layout header={getHeader} footer={getFooter} page={result}>
      {getEntry?.page_components && (
        <RenderComponents
          pageComponents={getEntry.page_components}
          contentTypeUid="page"
          entryUid={getEntry.uid}
          locale={getEntry.locale}
        />
      )}
    </Layout>
  );
}

export async function getServerSideProps(context) {
  try {
    const entryRes = await getHomeRes(context.resolvedUrl);
    const headerRes = await getHeaderRes();
    const footerRes = await getFooterRes();

    return {
      props: {
        entryUrl: context.resolvedUrl,
        result: entryRes,
        header: headerRes,
        footer: footerRes,
      },
    };
  } catch (error) {
    return { notFound: true };
  }
}
