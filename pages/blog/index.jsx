/* eslint-disable react/no-array-index-key */
/* eslint-disable one-var */
/* eslint-disable prefer-const */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";

import moment from "moment";
import Link from "next/link";

import parse from "html-react-parser";
import Stack from "../../sdk-plugin/index";
import Layout from "../../components/layout";

import RenderComponents from "../../components/render-components";
import ArchiveRelative from "../../components/archive-relative";

export default function Blog(props) {
  const {
    archived, blog, blogList, header, footer,
  } = props;
  const list = blogList.concat(archived);
  return (
    <Layout header={header} footer={footer} page={blog} blogpost={list}>
      {blog.page_components && (
        <RenderComponents
          pageComponents={blog.page_components}
          blogsPage
          contentTypeUid="page"
          entryUid={blog.uid}
          locale={blog.locale}
        />
      )}

      <div className="blog-container">
        <div className="blog-column-left">
          {blogList?.map((bloglist, index) => (
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
          {blog.page_components[1].widget && (
            <h2>
              {blog.page_components[1].widget.title_h2}
              {' '}
            </h2>
          )}
          <ArchiveRelative blogs={archived} />
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  try {
    const blog = await Stack.getEntryByUrl({
      contentTypeUid: "page",
      entryUrl: context.resolvedUrl,
    });
    const result = await Stack.getEntry({
      contentTypeUid: "blog_post",
      referenceFieldPath: ["author", "related_post"],
      jsonRtePath: ["body"],
    });
    const header = await Stack.getEntry({
      contentTypeUid: "header",
      referenceFieldPath: ["navigation_menu.page_reference"],
      jsonRtePath: ["notification_bar.announcement_text"],
    });
    const footer = await Stack.getEntry({
      contentTypeUid: "footer",
      jsonRtePath: ["copyright"],
    });
    let archived = [],
      blogList = [];
    result[0].forEach((blogs) => {
      if (blogs.is_archived) {
        archived.push(blogs);
      } else {
        blogList.push(blogs);
      }
    });
    return {
      props: {
        header: header[0][0],
        footer: footer[0][0],
        blog: blog[0],
        blogList,
        archived,
      },
    };
  } catch (error) {
    console.error(error);
    return { notFound: true };
  }
}
