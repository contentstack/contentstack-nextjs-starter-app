import React from "react";
import Stack from "../sdk-plugin/index";
import Layout from "../components/layout";
import RenderComponents from "../components/render-components";

export default function About(props) {
  const { header, footer, result } = props;
  return (
    <Layout header={header} footer={footer} seo={result.seo}>
      {result.page_components && (
        <RenderComponents pageComponents={result.page_components} about />
      )}
    </Layout>
  );
}

export async function getServerSideProps(context) {
  try {
    const result = await Stack.getSpecificEntry(
      "page",
      context.resolvedUrl,
      "en-us",
    );
    const header = await Stack.getEntryWithRef(
      "header",
      "navigation_menu.page_reference",
      "en-us",
    );
    const footer = await Stack.getEntry("footer", "en-us");
    return {
      props: {
        header: header[0][0],
        footer: footer[0][0],
        result: result[0],
      },
    };
  } catch (error) {
    console.error(error);
    return { notFound: true };
  }
}
