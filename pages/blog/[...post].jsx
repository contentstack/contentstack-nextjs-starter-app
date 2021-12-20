import React from "react";
import moment from "moment";
import parse from "html-react-parser";
import Stack from "../../sdk-plugin/index";
import Layout from "../../components/layout";

import RenderComponents from "../../components/render-components";
import ArchiveRelative from "../../components/archive-relative";

export default function BlogPost(props) {
  const { header, banner, footer, result } = props;
  return (
    <Layout header={header} footer={footer} page={banner} blogpost={result}>
      {banner.page_components && (
        <RenderComponents
          pageComponents={banner.page_components}
          blogsPage
          contentTypeUid="blog_post"
          entryUid={result.uid}
          locale={result.locale}
        />
      )}
      <div className="blog-container">
        <div className="blog-detail">
          <h2>{result.title ? result.title : ""}</h2>
          <p>
            {moment(result.date).format("ddd, MMM D YYYY")},{" "}
            <strong>{result.author[0].title}</strong>
          </p>
          {typeof result.body === "string" && parse(result.body)}
        </div>
        <div className="blog-column-right">
          <div className="related-post">
            {banner.page_components[2].widget && (
              <h2>{banner.page_components[2].widget.title_h2}</h2>
            )}
            {result.related_post && (
              <ArchiveRelative blogs={result.related_post} />
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
export async function getServerSideProps({ params }) {
  try {
    const banner = await Stack.getEntryByUrl({
      contentTypeUid: "page",
      entryUrl: "/blog",
    });
    const blog = await Stack.getEntryByUrl({
      contentTypeUid: "blog_post",
      entryUrl: `/blog/${params.post}`,
      referenceFieldPath: ["author", "related_post"],
      jsonRtePath: ["body", "related_post.body"],
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
    return {
      props: {
        header: header[0][0],
        footer: footer[0][0],
        result: blog[0],
        banner: banner[0],
      },
    };
  } catch (error) {
    return { notFound: true };
  }
}
