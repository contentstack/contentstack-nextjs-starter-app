/* eslint-disable react/prop-types */
/* eslint-disable react/prefer-stateless-function */
import React from "react";
import Link from "next/link";

class RelatedLinks extends React.Component {
  render() {
    return (
      <div className="related-links">
        <h3>Related Pages</h3>
        {
           this.props.relatedPages.map(link => (
             <p key={link.title}>
               <Link href={link.url}>
                 {link.title}
               </Link>
             </p>
           ))}
      </div>
    );
  }
}
export default RelatedLinks;
