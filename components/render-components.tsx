import React from 'react';

import { RenderProps } from "../typescript/component";
import { components } from './components';

export type Feature = { _content_type_uid: string; uid: string };

export default function RenderComponents(props: RenderProps) {
  const { pageComponents, entryUid, contentTypeUid, locale } = props;
  return (
    <div
      data-pageref={entryUid}
      data-contenttype={contentTypeUid}
      data-locale={locale}
    >
      {pageComponents?.map((component: Feature) => {
        const contentType = component._content_type_uid;
        const featureId = `${contentType.charAt(0).toUpperCase()}${contentType.slice(1)}`;

        // @ts-expect-error not today
        const Component = components[featureId];

        if (!Component) {
					console.log(`Unknown feature with ID "${featureId}"`);
					return null;
				}

        return (
          <Component {...component} key={component.uid}/>
        )
      })}
    </div>
  );
}
