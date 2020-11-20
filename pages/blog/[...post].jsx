/* eslint-disable react/no-danger */
/* eslint-disable no-unreachable */
/* eslint-disable react/prop-types */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import Stack from "../../sdk-plugin/index";
import Layout from "../../components/layout";
import RelatedLinks from "../../components/relatedLinks";

function dateSetter(params) {
  const date = new Date(params);
  const yy = new Intl.DateTimeFormat("en", { year: "numeric" }).format(date);
  const mm = new Intl.DateTimeFormat("en", { month: "short" }).format(date);
  const dd = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(date);
  return `${mm}-${dd}-${yy}`;
}

class BlogPost extends React.Component {
  render() {
    console.log(this.props);
    return (
      <Layout
        header={this.props.header}
        footer={this.props.footer}
        seo={this.props.result.seo}
      >
        <div className="blog-post">
          <div className="max-width flex padding-both tall">
            <div className="col-quarter">
              <div className="page-thumb padding-bottom">
                <img
                  src="https://via.placeholder.com/200x140"
                  alt="Blog Title"
                />
              </div>
            </div>
            <div className="col-half">
              <h2>{this.props.result.title}</h2>
              <p className="blog-meta">
                <span className="date">
                  {dateSetter(this.props.result.date)}
                </span>
                <span className="author">
                  {this.props.result.author[0].title}
                </span>
              </p>
              <div
                className="blog-content"
                dangerouslySetInnerHTML={{
                  __html: `${this.props.result.body}`,
                }}
              />
            </div>
            <div className="col-quarter">
              <div className="padding-left">
                {this.props.result.related_post ? (
                  <RelatedLinks relatedPages={this.props.result.related_post} />
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}
export default BlogPost;
export async function getServerSideProps(context) {
  console.log(context, context.resolvedUrl.split("/blog")[1]);
  try {
    const blog = await Stack.getSpecificEntry(
      "blog_post",
      context.resolvedUrl.split("/blog")[1],
      ["author", "related_post"],
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
        result: blog[0],
      },
    };
  } catch (error) {
    return { notFound: true };
  }
}
