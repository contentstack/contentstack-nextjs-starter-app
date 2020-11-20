/* eslint-disable react/no-danger */
/* eslint-disable no-prototype-builtins */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/prop-types */
/* eslint-disable react/prefer-stateless-function */
import React from "react";

class Footer extends React.Component {
  render() {
    console.log(this.props.footer);
    return (
      <footer>
        <div className="max-width flex">
          <div className="col-quarter">
            <a href="/">
              <img
                src="https://images.contentstack.io/v3/assets/blt22a18837cca1a3b0/blt529c91fbcabe8c5c/5f8096a93bf9954172cf5dfb/cslogo.png"
                alt=""
                width="40px"
                height="40px"
                title="contentstack"
              />
            </a>
          </div>
          <div className="col-half">
            <nav>
              <ul>
                {this.props.footer.hasOwnProperty("nav_links")
                  ? this.props.footer.nav_links.link.map(link => (
                    <li key={link.title}>
                      <a href={link.href}>{link.title}</a>
                    </li>
                  ))
                  : ""}
              </ul>
            </nav>
          </div>
          <div className="col-quarter">
            <div className="social-nav">
              {this.props.footer.social_share.map(social => (
                <a
                  href={social.link.href}
                  title={social.link.title}
                  key={social.link.title}
                >
                  <span className="fa-1x fa-stack">
                    <i className="fa fa-circle fa-stack-2x">
                      <span style={{ background: `url(${social.icon.url})` }} />
                    </i>
                  </span>
                </a>
              ))}
            </div>
            <div className="copyright" dangerouslySetInnerHTML={{ __html: `${this.props.footer.copyright}` }} />
          </div>
        </div>
      </footer>
    );
  }
}
export default Footer;
