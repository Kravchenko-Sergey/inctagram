import { getMainLayout, HeadMeta } from '@/components'

const Search = () => {
  return (
    <>
      <HeadMeta title="Search" />
      <main>Search</main>
    </>
  )
}

Search.getLayout = getMainLayout
export default Search
