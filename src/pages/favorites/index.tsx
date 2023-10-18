import { getMainLayout, HeadMeta } from '@/components'

const Favorites = () => {
  return (
    <>
      <HeadMeta title="Favorites" />
      <main>Favorites</main>
    </>
  )
}

Favorites.getLayout = getMainLayout
export default Favorites
