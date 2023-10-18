import { getMainLayout, HeadMeta } from '@/components'

const Messenger = () => {
  return (
    <>
      <HeadMeta title="Messenger" />
      <main>Messenger</main>
    </>
  )
}

Messenger.getLayout = getMainLayout
export default Messenger
