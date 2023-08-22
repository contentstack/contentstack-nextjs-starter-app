import contentstack from 'contentstack'

import type { PageFields } from '../types'

const region = process.env.CONTENTSTACK_REGION

const config = {
  api_key: process.env.CONTENTSTACK_STACK_API_KEY as string,
  delivery_token: process.env.CONTENTSTACK_DELIVERY_TOKEN as string,
  environment: process.env.CONTENTSTACK_ENVIRONMENT as string,
  region: region === 'EU' ? contentstack.Region.EU : contentstack.Region.US,
}

export const client = contentstack.Stack(config)

export const getPageBySlug = async (slug: string): Promise<PageFields> => {
  const query = client
    .ContentType('page')
    .Query()
    .includeCount()
    .includeContentType()
    .includeReference(['components'])
    .addParam('include_dimension', 'true')
    .toJSON()
  console.log(1111111111111, query)
  const result = await query.where('slug', slug).findOne()

  return result
}

export const getPages = async (): Promise<PageFields[]> => {
  const query = client
    .ContentType('page')
    .Query()
    .includeCount()
    .includeContentType()
    .includeReference(['components'])
    .addParam('include_dimension', 'true')
    .toJSON()
  const result = await query.find()

  return result[0]
}
