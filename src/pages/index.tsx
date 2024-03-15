import { getMainLayout, HeadMeta, Loader, PostItem } from '@/components'
import React from 'react'
import { useMeQuery } from '@/services/auth'
import {
  useGetUsersBySearchQuery,
  useGetUsersFollowersDataQuery,
} from '@/services/followers/followers-api'

const Home = () => {
  const { data: me, isLoading } = useMeQuery()
  // const { data } = useGetUsersBySearchQuery()

  if (isLoading) {
    return <Loader />
  }
  // console.log('data', data)

  return (
    <>
      <HeadMeta title="Home" />
      <main
        style={{
          width: '100%',
          maxWidth: '1000px',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        {/*{!!data && <PostItem post={data.items[2]} />}*/}
      </main>
    </>
  )
}

Home.getLayout = getMainLayout
export default Home
