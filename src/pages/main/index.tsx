import { getHeaderUnauthorizedLayout } from '@/components/layout'
import { HeadMeta } from '@/components'
import { NextPageWithLayout } from '@/pages/_app'
import { InferGetStaticPropsType } from 'next'
import s from './main-page.module.scss'
import { GetLastCreatedPostsResponse } from '@/services/public-posts/types'
import { MainPosts } from '@/components/unauthorized/posts'

export const getStaticProps = async () => {
  const params = {
    pageSize: '4',
    sortDirection: 'desc',
    sortBy: 'createdAt',
  }
  const queryParams = new URLSearchParams(params).toString()
  const response = await fetch(`https://inctagram.work/api/v1/public-posts/all/?${queryParams}`)
  const posts: GetLastCreatedPostsResponse = await response.json()

  if (!posts.items.length) {
    return {
      notFound: true,
    }
  }

  return {
    props: { data: posts },
    revalidate: 60,
  }
}

export const MainPage: NextPageWithLayout<InferGetStaticPropsType<typeof getStaticProps>> = ({
  data,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <HeadMeta title="Main Page" />
      <div className={s.root}>{<MainPosts posts={data} />}</div>
    </>
  )
}

MainPage.getLayout = getHeaderUnauthorizedLayout
export default MainPage
