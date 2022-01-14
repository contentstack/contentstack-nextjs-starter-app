import React, { useState, useEffect } from "react";
import moment from "moment";
import Link from "next/link";
import parse from "html-react-parser";
import { onEntryChange } from "../../sdk-plugin/index";
import Layout from "../../components/layout";
import RenderComponents from "../../components/render-components";
import {
  getHeaderRes, getFooterRes, getBlogBannerRes, getBlogListRes,
} from '../../helper/index';

import ArchiveRelative from "../../components/archive-relative";

export default function Blog(props) {
  const {
    archived, blog, blogList, header, footer, entryUrl,
  } = props;
  const list = blogList.concat(archived);

  const [getHeader, setHeader] = useState(header);
  const [getFooter, setFooter] = useState(footer);
  const [getArchived, setArchived] = useState(archived);
  const [getList, setList] = useState(blogList);
  const [getBanner, setBanner] = useState(blog);

  async function fetchData() {
    try {
      console.info("fetching live preview data...");
      const bannerRes = await getBlogBannerRes(entryUrl);
      const headerRes = await getHeaderRes();
      const footerRes = await getFooterRes();
      setHeader(headerRes);
      setFooter(footerRes);
      setBanner(bannerRes);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    onEntryChange(() => {
      if (process.env.NEXT_PUBLIC_CONTENTSTACK_LIVE_PREVIEW === "true") {
        return fetchData();
      }
    });
  }, []);

  return (
    <Layout header={getHeader} footer={getFooter} page={getBanner} blogpost={list}>
      {getBanner.page_components && (
        <RenderComponents
          pageComponents={getBanner.page_components}
          blogsPage
          contentTypeUid="page"
          entryUid={getBanner.uid}
          locale={getBanner.locale}
        />
      )}

      <div className="blog-container">
        <div className="blog-column-left">
          {getList?.map((bloglist, index) => (
            <div className="blog-list" key={index}>
              {bloglist.featured_image && (
                <Link href={bloglist.url}>
                  <a>
                    <img
                      alt="blog img"
                      className="blog-list-img"
                      src={bloglist.featured_image.url}
                    />
                  </a>
                </Link>
              )}
              <div className="blog-content">
                {bloglist.title && (
                  <Link href={bloglist.url}>
                    <h3>{bloglist.title}</h3>
                  </Link>
                )}
                <p>
                  {moment(bloglist.date).format("ddd, MMM D YYYY")}
                  ,
                  {" "}
                  <strong>{bloglist.author[0].title}</strong>
                </p>
                {typeof bloglist.body === "string"
                  && parse(bloglist.body.slice(0, 300))}
                {bloglist.url ? (
                  <Link href={bloglist.url}>
                    <a>
                      <span>{"Read more -->"}</span>
                    </a>
                  </Link>
                ) : (
                  ""
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="blog-column-right">
          {getBanner.page_components[1].widget && (
            <h2>
              {getBanner.page_components[1].widget.title_h2}
              {' '}
            </h2>
          )}
          <ArchiveRelative blogs={getArchived} />
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  try {
    const blog = await getBlogBannerRes(context.resolvedUrl);
    const result = await getBlogListRes();
    const header = await getHeaderRes();
    const footer = await getFooterRes();
    const archived = [];
    const blogList = [];
    result.forEach((blogs) => {
      if (blogs.is_archived) {
        archived.push(blogs);
      } else {
        blogList.push(blogs);
      }
    });
    return {
      props: {
        entryUrl: context.resolvedUrl,
        header,
        footer,
        blog,
        blogList,
        archived,
      },
    };
  } catch (error) {
    console.error(error);
    return { notFound: true };
  }
}
