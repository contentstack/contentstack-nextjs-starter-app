import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import './blog-layout.css';

const BlogCardSkeleton = () => (
  <div className="blog-card">
    <div className="blog-card-image">
      <Skeleton height={120} width={120} />
    </div>
    <div className="blog-card-content">
      <h3><Skeleton width={`80%`} /></h3>
      <p className="blog-date"><Skeleton width={`60%`} /></p>
      <p><Skeleton count={3} /></p>
      <p><Skeleton width={100} /></p>
    </div>
  </div>
);

const SidebarItemSkeleton = () => (
  <div className="sidebar-item">
    <h4><Skeleton width={`90%`} /></h4>
    <p><Skeleton count={2} /></p>
  </div>
);

const BlogLayoutSkeleton = () => {
  return (
    <div className="layout">
      <div className="main-content">
        <BlogCardSkeleton />
        <BlogCardSkeleton />
        <BlogCardSkeleton />
      </div>
      <aside className="sidebar">
        <h2><Skeleton width={`60%`} /></h2>
        <SidebarItemSkeleton />
        <SidebarItemSkeleton />
        <SidebarItemSkeleton />
      </aside>
    </div>
  );
};

export default BlogLayoutSkeleton;