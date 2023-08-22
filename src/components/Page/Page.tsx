import type { PageFields } from '../../types'
import { Map } from '../map'

export interface PageProps {
  page: PageFields
}

export default function Page({ page }: PageProps): JSX.Element {
  return (
    <>
      {page.components?.map((component, index) => {
        if (component._content_type_uid) {
          const Component = Map[component._content_type_uid]
          // @ts-expect-error Can't type what you don't see.
          return <Component {...component} key={index} />
        }
      })}
    </>
  )
}
