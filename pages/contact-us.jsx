/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable react/no-danger */
/* eslint-disable react/prop-types */
/* eslint-disable react/prefer-stateless-function */
import React from "react";
import Stack from "../sdk-plugin/index";
import Layout from "../components/layout";

class Contact extends React.Component {
  render() {
    console.log(this.props);
    return (
      <Layout
        header={this.props.header}
        footer={this.props.footer}
        seo={this.props.result.seo}
      >
        <div className="contact-us">
          <div className="max-width flex padding-both tall">
            <div className="col-half">
              <h2>{this.props.result.title}</h2>
              {this.props.result.page_components.map((component) => {
                if (component.rich_text) {
                  return (
                    <p
                      dangerouslySetInnerHTML={{
                        __html: `${component.rich_text.rte}`,
                      }}
                    />
                  );
                }
                if (component.contact_details) {
                  return (
                    <div className="address-block padding-bottom">
                      <h3>Address</h3>
                      <p>{component.contact_details.address}</p>
                      <p className="phone">
                        <a href="tel:Phone">
                          {component.contact_details.phone}
                        </a>
                      </p>
                      <p className="email">
                        <a href="mailto:Email">
                          {component.contact_details.email}
                        </a>
                      </p>
                    </div>
                  );
                }
              })}
            </div>
            <div className="col-half">
              <div className="contact-form" />
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}
export default Contact;
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
