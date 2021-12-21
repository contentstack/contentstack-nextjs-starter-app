import React from "react";
import Link from "next/link";
import parse from "html-react-parser";

export default function Footer(props) {
  const { footer } = props;
  return (
    <footer>
      <div className="max-width footer-div">
        <div className="col-quarter">
          <Link href="/" className="logo-tag">
            <img
              src={footer.logo.url}
              alt={footer.title}
              title={footer.title}
              className="logo footer-logo"
            />
          </Link>
        </div>
        <div className="col-half">
          <nav>
            <ul className="nav-ul">
              {footer.navigation.link?.map((menu) => (
                <li className="footer-nav-li" key={menu.title}>
                  <Link href={menu.href}>{menu.title}</Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="col-quarter social-link">
          <div className="social-nav">
            {footer.social.social_share?.map((social) => (
              <a
                href={social.link.href}
                title={social.link.title}
                key={social.link.title}
              >
                {social.icon && <img src={social.icon.url} alt={social.link.title} />}
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="copyright">
        {typeof footer.copyright === "string" && parse(footer.copyright)}
      </div>
    </footer>
  );
}
