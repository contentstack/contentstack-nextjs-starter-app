import { GetServerSideProps } from 'next'

import Page, { PageProps } from '../components/Page/Page'
import { getPageBySlug } from '../libs/contentstack'

export default Page

export const getServerSideProps: GetServerSideProps<PageProps> = async (
  context
) => {
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
