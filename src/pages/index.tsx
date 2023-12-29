import { getMainLayout, HeadMeta } from '@/components'

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
