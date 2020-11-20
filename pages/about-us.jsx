/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable max-len */
/* eslint-disable react/prop-types */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable no-console */
import React from "react";
import Stack from "../sdk-plugin/index";
import Layout from "../components/layout";
import Banner from "../components/banner";
import Section from "../components/section";

class About extends React.Component {
  render() {
    console.log(this.props);
    return (
      <Layout
        header={this.props.header}
        footer={this.props.footer}
        seo={this.props.result.seo}
      >
        {this.props.result.page_components.map((component) => {
          if (component.hero_banner) {
            return (
              <Banner
                hero_banner={component.hero_banner}
                title={this.props.result.title}
                short
              />
            );
          } if (component.section) {
            return (
              <Section
                section={component.section}
                relatedPages={this.props.result.related_pages}
              />
            );
          }
        })}


      </Layout>
    );
  }
}
export default About;

export async function getServerSideProps(context) {
  try {
    const result = await Stack.getSpecificEntry(
      "page",
      context.resolvedUrl,
      "related_pages",
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
    return { notFound: true };
  }
}
