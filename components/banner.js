/* eslint-disable react/no-danger */
/* eslint-disable no-console */
/* eslint-disable no-prototype-builtins */
/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable react/prefer-stateless-function */
import React from "react";

class Banner extends React.Component {
  render() {
    console.log(this.props.hero_banner);
    return (
      <div
        className={`hero ${this.props.short ? "short" : " "}`}
        style={{
          background: `url(${
            this.props.hero_banner.banner_image
              ? this.props.hero_banner.banner_image.url
              : ""
          })`,
        }}
      >
        <div className="max-width">
          <div className="content">
            {this.props.title ? <h1>{this.props.title}</h1> : ""}
            {this.props.hero_banner.banner_description ? (
              <p dangerouslySetInnerHTML={{ __html: `${this.props.hero_banner.banner_description}` }} />
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    );
  }
}
export default Banner;
