/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import Link from "next/link";
import ReactHtmlParser from "react-html-parser";

export default function ArchiveRelative(props) {
  const { blogs } = props;
  return (
    <>
      {blogs?.map((blog, idx) => (
        <Link href={blog.url} key={idx}>
          <a>
            <div>
              <h4>{blog.title}</h4>
              {ReactHtmlParser(blog.body.slice(0, 80))}
            </div>
          </a>
        </Link>
      ))}
    </>
  );
}
