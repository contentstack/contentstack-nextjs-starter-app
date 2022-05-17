import React from 'react';
import parse from 'html-react-parser';
import { BucketProps, Bucket } from "../typescript/about-section-bucket";

export default function AboutSectionBucket({ sectionWithBuckets }: {sectionWithBuckets:BucketProps}) {
  function bucketContent(bucket: Bucket, index: number) {
    return (
      <div className='mission-content-section' key={index}>
        {bucket.icon && (
          <img
            className='mission-icon'
            {...bucket.icon.$?.url}
            src={bucket.icon.url}
            alt='art work'
          />
        )}

        <div className='mission-section-content'>
          {bucket.title_h3 && (
            <h3 {...bucket.$?.title_h3}>{bucket.title_h3}</h3>
          )}
          {typeof bucket.description === 'string' && (
            <div {...bucket.$?.description}> {parse(bucket.description)}</div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className='member-main-section'>
      <div className='member-head'>
        {sectionWithBuckets.title_h2 && (
          <h2 {...sectionWithBuckets.$?.title_h2}>
            {sectionWithBuckets.title_h2}
          </h2>
        )}
      </div>
      <div className='mission-section'>
        <div className='mission-content-top'>
          {sectionWithBuckets?.buckets.map(
            (bucket, index) => index < 2 && bucketContent(bucket, index)
          )}
        </div>
        <div className='mission-content-bottom'>
          {sectionWithBuckets.buckets.map(
            (bucket, index) => index >= 2 && bucketContent(bucket, index)
          )}
        </div>
      </div>
    </div>
  );
}
