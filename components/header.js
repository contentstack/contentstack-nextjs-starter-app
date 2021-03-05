/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import ReactHtmlParser from "react-html-parser";

export default function Header(props) {
  const { header } = props;
  const router = useRouter();
  return (
    <header className="header">
      {header.notification_bar.show_announcement ? (
        <div className="note-div">
          {ReactHtmlParser(header.notification_bar.announcement_text)}
        </div>
      ) : (
        ""
      )}
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
            {header.navigation_menu?.map(list => (
              <li key={list.label} className="nav-li">
                <Link href={list.page_reference[0].url}>
                  <a className={router.pathname === list.page_reference[0].url ? "active" : ""}>{list.label}</a>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
