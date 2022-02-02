import React, { useEffect, useState } from 'react';
import getConfig from 'next/config';
import moment from 'moment';
import parse from 'html-react-parser';
import Layout from '../../components/layout';
import {
  getHeaderRes,
  getFooterRes,
  getBlogPostRes,
  getBlogBannerRes,
} from '../../helper/index';
import { onEntryChange } from '../../sdk-plugin/index';

import RenderComponents from '../../components/render-components';
import ArchiveRelative from '../../components/archive-relative';

export default function BlogPost(props) {
  const {
    header, banner, footer, result, entryUrl,
  } = props;
  const { CONTENTSTACK_LIVE_PREVIEW } = getConfig().publicRuntimeConfig;
  const [getHeader, setHeader] = useState(header);
  const [getFooter, setFooter] = useState(footer);
  const [getEntry, setEntry] = useState(result);
  const [getBanner, setBanner] = useState(banner);

  async function fetchData() {
    try {
      console.info('fetching live preview data...');
      const entryRes = await getBlogPostRes(entryUrl);
      const headerRes = await getHeaderRes();
      const footerRes = await getFooterRes();
      const bannerRes = await getBlogBannerRes('/blog');
      setHeader(headerRes);
      setFooter(footerRes);
      setEntry(entryRes);
      setBanner(bannerRes);
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
    <Layout
      header={getHeader}
      footer={getFooter}
      page={getBanner}
      blogpost={getEntry}
    >
      {banner.page_components && (
        <RenderComponents
          pageComponents={getBanner?.page_components}
          blogsPage
          contentTypeUid="blog_post"
          entryUid={getEntry.uid}
          locale={getEntry.locale}
        />
      )}
      <div className="blog-container">
        <div className="blog-detail">
          <h2>{getEntry.title ? getEntry.title : ''}</h2>
          <p>
            {moment(getEntry.date).format('ddd, MMM D YYYY')}
            ,
            {' '}
            <strong>{getEntry.author[0].title}</strong>
          </p>
          {typeof getEntry.body === 'string' && parse(getEntry.body)}
        </div>
        <div className="blog-column-right">
          <div className="related-post">
            {getBanner?.page_components[2].widget && (
              <h2>{getBanner.page_components[2].widget.title_h2}</h2>
            )}
            {getEntry?.related_post && (
              <ArchiveRelative blogs={getEntry?.related_post} />
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
export async function getServerSideProps({ params }) {
  try {
    const banner = await getBlogBannerRes('/blog');
    const blog = await getBlogPostRes(`/blog/${params.post}`);
    const header = await getHeaderRes();
    const footer = await getFooterRes();
    return {
      props: {
        entryUrl: `/blog/${params.post}`,
        header,
        footer,
        result: blog,
        banner,
      },
    };
  } catch (error) {
    return { notFound: true };
  }
}
