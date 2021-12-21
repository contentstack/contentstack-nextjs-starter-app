import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import parse from "html-react-parser";

export default function Header(props) {
  const { header } = props;
  const router = useRouter();
  return (
    <header className="header">
      <div className="note-div">
        {header.notification_bar.show_announcement ? typeof header.notification_bar.announcement_text === "string"
          && (
            parse(header.notification_bar.announcement_text)
          ) : (
          <div style={{ visibility: "hidden" }}>Devtools section</div>
        )}
        <span
          className="devtools"
          data-bs-toggle="modal"
          data-bs-target="#staticBackdrop"
        >
          <img src="/devtools.gif" alt="dev tools icon" title="json preview" />
        </span>
      </div>
      <div className="max-width header-div">
        <div className="wrapper-logo">
          <Link href="/" className="logo-tag" title="Contentstack">
            <img
              className="logo"
              src={header.logo.url}
              alt={header.title}
              title={header.title}
            />
          </Link>
        </div>
        <input className="menu-btn" type="checkbox" id="menu-btn" />
        <label className="menu-icon" htmlFor="menu-btn">
          <span className="navicon" />
        </label>
        <nav className="menu">
          <ul className="nav-ul header-ul">
            {header.navigation_menu?.map((list) => (
              <li key={list.label} className="nav-li">
                <Link href={list.page_reference[0].url}>
                  <a
                    className={
                      router.pathname === list.page_reference[0].url
                        ? "active"
                        : ""
                    }
                  >
                    {list.label}
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
