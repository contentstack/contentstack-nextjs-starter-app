import React, { useState, useEffect } from 'react';
import { onEntryChange } from '../sdk-plugin/index';
import Layout from '../components/layout';
import RenderComponents from '../components/render-components';
import { getHeaderRes, getFooterRes, getContactRes } from '../helper/index';

export default function Contact(props) {
  const {
    header, footer, result, entryUrl,
  } = props;

  const [getHeader, setHeader] = useState(header);
  const [getFooter, setFooter] = useState(footer);
  const [getEntry, setEntry] = useState(result);

  async function fetchData() {
    try {
      console.info('fetching live preview data...');
      const entryRes = await getContactRes(entryUrl);
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
    onEntryChange(() => fetchData());
  }, []);

  return (
    <Layout header={getHeader} footer={getFooter} page={getEntry}>
      {getEntry.page_components && (
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
    const entryRes = await getContactRes(context.resolvedUrl);
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
