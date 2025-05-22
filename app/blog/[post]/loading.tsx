"use client";
import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "./blog-loader.css";

const BlogSkeleton = () => {
  return (
    <div className="blog-container">
      {/* Main content */}
      <div className="blog-main">
        <h1 className="blog-title">
          <Skeleton width={300} />
        </h1>
        <p className="blog-meta">
          <Skeleton width={150} />
        </p>
        <blockquote className="blog-quote">
          <Skeleton count={2} />
        </blockquote>
        <div className="blog-paragraphs">
          <Skeleton count={5} />
        </div>
        <div className="blog-paragraphs">
          <Skeleton count={5} />
        </div>
      </div>

      {/* Sidebar */}
      <aside className="blog-sidebar">
        <h2 className="sidebar-heading">
          <Skeleton width={120} />
        </h2>

        <div className="sidebar-post">
          <h3>
            <Skeleton width={`80%`} />
          </h3>
          <p>
            <Skeleton count={2} />
          </p>
        </div>

        <div className="sidebar-post">
          <h3>
            <Skeleton width={`80%`} />
          </h3>
          <p>
            <Skeleton count={2} />
          </p>
        </div>
      </aside>
    </div>
  );
};

export default BlogSkeleton;