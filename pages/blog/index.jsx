/* eslint-disable react/no-danger */
/* eslint-disable react/prop-types */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable no-unused-vars */
/* eslint-disable import/prefer-default-export */
import React from "react";
// import Img from "next/image";
import Stack from "../../sdk-plugin/index";
import Layout from "../../components/layout";
import Banner from "../../components/banner";

function dateSetter(params) {
  const date = new Date(params);
  const yy = new Intl.DateTimeFormat("en", { year: "numeric" }).format(date);
  const mm = new Intl.DateTimeFormat("en", { month: "short" }).format(date);
  const dd = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(date);
  return `${mm}-${dd}-${yy}`;
}

class Blog extends React.Component {
  render() {
    console.log(this.props);
    return (
      <Layout
        header={this.props.header}
        footer={this.props.footer}
        seo={this.props.blog.seo}
      >
        <Banner
          title={this.props.blog.title}
          hero_banner={this.props.blog.page_components[0].hero_banner}
          short
        />
        <div className="max-width blog-roll padding-top">
          {this.props.blogList.map(post => (
            <a
              className="blog-entry padding-bottom"
              href={`/blog${post.url}`}
              key={post.title}
            >
              <div className="thumb">
                <img
                  src="https://via.placeholder.com/200x140"
                  alt="Blog Title"
                />
                {/* <Img src="https://via.placeholder.com/200x140" alt="Blog Title" /> */}
              </div>
              <div className="content">
                <div className="inner">
                  <h3>{post.title}</h3>
                  <cite>
                    <span className="date">{dateSetter(post.date)}</span>
                    <span className="author">{post.author[0].title}</span>
                  </cite>
                  <div
                    className="description"
                    dangerouslySetInnerHTML={{
                      __html: `${post.body.slice(0, 180)}....`,
                    }}
                  />
                  <p className="cta">Read More</p>
                </div>
              </div>
            </a>
          ))}
        </div>
      </Layout>
    );
  }
}

export default Blog;
export async function getServerSideProps(context) {
  console.log(context);
  try {
    const blog = await Stack.getSpecificEntry(
      "page",
      context.resolvedUrl,
      "related_pages",
      "en-us",
    );
    const blogList = await Stack.getEntryWithRef(
      "blog_post",
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
        blog: blog[0],
        blogList: blogList[0],
      },
    };
  } catch (error) {
    return { notFound: true };
  }
}
