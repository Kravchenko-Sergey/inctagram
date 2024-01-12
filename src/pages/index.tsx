import { getMainLayout, HeadMeta } from '@/components'
import React from 'react'

const Home = () => {
  return (
    <>
      <HeadMeta title="Home" />
      <main>Home</main>
    </>
  )
}

Home.getLayout = getMainLayout
export default Home
