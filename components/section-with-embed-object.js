/* eslint-disable react/react-in-jsx-scope */
import ReactHtmlParser from "react-html-parser";

export default function SectionWithEmbedObject(props) {
  const { embedObject } = props;
  if (embedObject.embed_object_alignment === "Left") {
    return (
      <div className="contact-page-section max-width">
        <div className="contact-page-content">
          {embedObject.title && <h1>{embedObject.title}</h1>}
          {embedObject.description && ReactHtmlParser(embedObject.description)}
        </div>
        <div className="contact-page-form">
          {embedObject.embed_object
            && ReactHtmlParser(embedObject.embed_object)}
        </div>
      </div>
    );
  }
  return (
    <div className="contact-maps-section max-width">
      <div className="maps-details">
        {ReactHtmlParser(embedObject.embed_object)}
      </div>
      <div className="contact-maps-content">
        {embedObject.title ? (
          <h2>{embedObject.title}</h2>
        ) : (
          ""
        )}
        {embedObject.description && ReactHtmlParser(embedObject.description)}
      </div>
    </div>
  );
}
