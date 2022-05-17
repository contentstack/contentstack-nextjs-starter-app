import React from 'react';
import Link from 'next/link';
import { SectionProps } from "../typescript/section";

export default function Section({ section }: {section : SectionProps}) {
  function contentSection(key: any) {
    return (
      <div className='home-content' key={key}>
        {section.title_h2 && (
          <h2 {...section.$?.title_h2}>{section.title_h2}</h2>
        )}
        {section.description && (
          <p {...section.$?.description}>{section.description}</p>
        )}
        {section.call_to_action.title && section.call_to_action.href ? (
          <Link href={section.call_to_action.href}>
            <a
              className='btn secondary-btn'
              {...section.call_to_action.$?.title}
            >
              {section.call_to_action.title}
            </a>
          </Link>
        ) : (
          ''
        )}
      </div>
    );
  }

  function imageContent(key: any) {
    return (
      <img
        {...section.image.$?.url}
        src={section.image.url}
        alt={section.image.filename}
        key={key}
      />
    );
  }
  return (
    <div className='home-advisor-section'>
      {section.image_alignment === 'Left'
        ? [imageContent('key-image'), contentSection('key-contentstection')]
        : [contentSection('key-contentstection'), imageContent('key-image')]}
    </div>
  );
}
