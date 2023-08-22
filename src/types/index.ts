import type { Entry } from 'contentstack'

import { Map } from '../components/map'

export interface EntryContentType extends Entry {
  _content_type_uid?: keyof typeof Map
}

export interface PageFields extends EntryContentType {
  title: string
  slug: string
  components?: EntryContentType[]
}
