import { getMainLayout } from '@/components'
import { CreatePostModal } from '@/components/posts/create'

import s from './create.module.scss'

const Create = () => {
  return (
    <div className={s.container}>
      <CreatePostModal />
    </div>
  )
}

Create.getLayout = getMainLayout
export default Create
