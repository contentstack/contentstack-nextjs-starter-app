import React from 'react';

import Section from './section';
import HeroBanner from './hero-banner';
import BlogBanner from './blog-banner';
import CardSection from './card-section';
import TeamSection from './team-section';
import BlogSection from './blog-section';
import SectionBucket from './section-bucket';
import AboutSectionBucket from './about-section-bucket';
import SectionWithHtmlCode from './section-with-html-code';
import { RenderProps } from "../typescript/component";

// Using React.memo to prevent unnecessary re-renders
const RenderComponents = React.memo(function RenderComponents(props: RenderProps) {
  const { pageComponents, blogPost, entryUid, contentTypeUid, locale } = props;
  
  if (!pageComponents || pageComponents.length === 0) {
    return (
      <div className="no-components">
        <p>No components found to render</p>
      </div>
    );
  }
  
  return (
    <div
      data-pageref={entryUid}
      data-contenttype={contentTypeUid}
      data-locale={locale}
    >
      {pageComponents.map((component, key: number) => {
        try {
          // Hero Banner components
          if (component.hero_banner) {
            return blogPost ? (
              <BlogBanner
                blogBanner={component.hero_banner}
                key={`component-${key}`}
              />
            ) : (
              <HeroBanner
                banner={component.hero_banner}
                key={`component-${key}`}
              />
            );
          }
          
          // Section component
          if (component.section) {
            return (
              <Section section={component.section} key={`component-${key}`} />
            );
          }
          
          // Section with buckets component
          if (component.section_with_buckets) {
            return component.section_with_buckets.bucket_tabular ? (
              <AboutSectionBucket
                sectionWithBuckets={component.section_with_buckets}
                key={`component-${key}`}
              />
            ) : (
              <SectionBucket
                section={component.section_with_buckets}
                key={`component-${key}`}
              />
            );
          }
          
          // Blog section component
          if (component.from_blog) {
            return (
              <BlogSection
                fromBlog={component.from_blog}
                key={`component-${key}`}
              />
            );
          }
          
          // Cards section component
          if (component.section_with_cards?.cards) {
            return (
              <CardSection
                cards={component.section_with_cards.cards}
                key={`component-${key}`}
              />
            );
          }
          
          // HTML section component
          if (component.section_with_html_code) {
            return (
              <SectionWithHtmlCode
                embedCode={component.section_with_html_code}
                key={`component-${key}`}
              />
            );
          }
          
          // Team section component
          if (component.our_team) {
            return (
              <TeamSection
                ourTeam={component.our_team}
                key={`component-${key}`}
              />
            );
          }
          
          // Component type not recognized
          console.warn(`Unknown component type at index ${key}`, component);
          return null;
        } catch (error) {
          console.error(`Error rendering component at index ${key}:`, error);
          return (
            <div className="component-error" key={`component-error-${key}`}>
              <p>Error rendering component</p>
            </div>
          );
        }
      })}
    </div>
  );
});

export default RenderComponents;
