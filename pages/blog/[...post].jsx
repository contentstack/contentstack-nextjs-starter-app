import React from "react";
import moment from "moment";
import ReactHtmlParser from "react-html-parser";
import Stack from "../../sdk-plugin/index";
import Layout from "../../components/layout";

import RenderComponents from "../../components/render-components";
import ArchiveRelative from "../../components/archive-relative";

export default function BlogPost(props) {
  const {
    header, banner, footer, result,
  } = props;
  return (
    <Layout header={header} footer={footer} seo={result.seo}>
      {banner.page_components && (
        <RenderComponents pageComponents={banner.page_components} blogsPage />
      )}
      <div className="blog-container">
        <div className="blog-detail">
          <h2>{result.title ? result.title : ""}</h2>
          <p>
            {moment(result.date).format("ddd, MMM D YYYY")}
            ,
            {" "}
            <strong>{result.author[0].title}</strong>
          </p>
          {ReactHtmlParser(result.body)}
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
    const banner = await Stack.getEntryByUrl("page", "/blog");
    const header = await Stack.getEntry(
      "header",
      "navigation_menu.page_reference",
    );
    const footer = await Stack.getEntry("footer");
    const blog = await Stack.getEntryByUrl("blog_post", `/blog/${params.post}`, [
      "author",
      "related_post",
    ]);
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
