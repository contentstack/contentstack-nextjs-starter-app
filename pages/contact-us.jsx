import React from "react";
import Stack from "../sdk-plugin/index";
import Layout from "../components/layout";

import RenderComponents from "../components/render-components";

export default function Contact(props) {
  const { header, footer, result } = props;
  return (
    <Layout header={header} footer={footer} seo={result.seo}>
      {result.page_components && (
        <RenderComponents
          pageComponents={result.page_components}
          contentTypeUid="page"
          entryUid={result.uid}
          locale={result.locale}
        />
      )}
    </Layout>
  );
}
export async function getServerSideProps(context) {
  try {
    const result = await Stack.getEntryByUrl("page", context.resolvedUrl, [
      "page_components.from_blog.featured_blogs",
    ]);
    const header = await Stack.getEntry(
      "header",
      "navigation_menu.page_reference",
    );
    const footer = await Stack.getEntry("footer");
    return {
      props: {
        header: header[0][0],
        footer: footer[0][0],
        result: result[0],
      },
    };
  } catch (error) {
    return { notFound: true };
  }
}
