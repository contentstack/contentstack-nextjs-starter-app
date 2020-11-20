/* eslint-disable react/no-danger */
/* eslint-disable no-prototype-builtins */
/* eslint-disable react/prop-types */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable max-len */
import React from "react";
import RelatedLinks from "./relatedLinks";

class Section extends React.Component {
  render() {
    return (
      <div className="max-width">
        {this.props.section.hasOwnProperty("title_h1") ? (
          <div className="top-section padding-top">
            <h2>{this.props.section.title_h1}</h2>
            <p>{this.props.section.description}</p>
          </div>
        ) : (
          ""
        )}
        <div className="buckets padding-both">
          {this.props.section.hasOwnProperty("heading")
            ? this.props.section.heading.map(bucket => (
              <div className="bucket" key={bucket.title_h2}>
                <div className="inner">
                  <h3>{bucket.title_h2}</h3>
                  <div
                    dangerouslySetInnerHTML={{ __html: bucket.description }}
                  />
                </div>
              </div>
            ))
            : ""}
          {this.props.relatedPages ? (
            <RelatedLinks relatedPages={this.props.relatedPages} />
          ) : (
            ""
          )}
        </div>
      </div>
    );
  }
}
export default Section;
