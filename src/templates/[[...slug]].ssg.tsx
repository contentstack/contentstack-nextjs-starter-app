import { GetStaticProps, GetStaticPaths } from 'next'

import Page, { PageProps } from '../components/Page/Page'
import { getPageBySlug, getPages } from '../libs/contentstack'

export default Page

export const getStaticProps: GetStaticProps<PageProps> = async (context) => {
  let slug = context.params?.slug || '/'

  if (slug && typeof slug !== 'string') {
    slug = `${slug.join('/')}`
  }

  const page = await getPageBySlug(slug)

  return {
    props: {
      page,
    },
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const pages = await getPages()

  const slugs = pages.map((page) => {
    if (page.slug.charAt(0) !== '/') {
      return `/${page.slug}`
    }
    return page.slug
  })

  return {
    paths: slugs,
    fallback: false,
  }
}
