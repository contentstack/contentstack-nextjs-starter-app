/* eslint-disable no-restricted-syntax */
import React from "react";
import Head from "next/head";
import Header from "./header";
import Footer from "./footer";

class Layout extends React.Component {
  render() {
    function metaData(seo) {
      const metaArr = [];
      for (const key in seo) {
        if (key !== "enable_search_indexing") {
          metaArr.push(
            <meta
              name={key.includes("meta_") ? key.split("meta_")[1] : key}
              content={seo[key]}
              key={key}
            />,
          );
        }
      }
      return metaArr;
    }
    return (
      <>
        <Head>
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css?family=Inter&amp;display=swap"
            rel="stylesheet"
          />
          <meta
            name="application-name"
            content="Contentstack-Nextjs-Starter-App"
          />
          <meta charset="utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta
            name="viewport"
            content="width=device-width,initial-scale=1,minimum-scale=1"
          />
          <link rel="manifest" href="/manifest.json" />
          <link href="/favicon.ico" rel="icon" type="image/ico" sizes="16x16" />
          <link rel="apple-touch-icon" href="/path/to/apple-touch-icon.png" />
          <meta name="theme-color" content="#317EFB" />
          <title>Contentstack-Nextjs-Starter-App</title>
          {this.props.seo && this.props.seo.enable_search_indexing
            ? metaData(this.props.seo)
            : null}
        </Head>
        {this.props.header ? <Header header={this.props.header} /> : ""}
        <main className="mainClass">{this.props.children}</main>
        {this.props.footer ? <Footer footer={this.props.footer} /> : ""}
      </>
    );
  }
}
export default Layout;
