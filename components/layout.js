/* eslint-disable max-len */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable react/prop-types */
/* eslint-disable react/prefer-stateless-function */
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
            <meta name={key.includes("meta_") ? key.split("meta_")[1] : key} content={seo[key]} key={key} />,
          );
        }
      }
      return metaArr;
    }
    return (
      <>
        <Head>
          <link
            rel="stylesheet"
            href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
            integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN"
            crossOrigin="anonymous"
          />
          <title>Contentstack-Starter-App</title>
          {this.props.seo && this.props.seo.enable_search_indexing ? metaData(this.props.seo) : null}
        </Head>
        {this.props.header ? <Header header={this.props.header} /> : ""}
        <main>{this.props.children}</main>
        {this.props.footer ? <Footer footer={this.props.footer} /> : ""}
      </>
    );
  }
}
export default Layout;
