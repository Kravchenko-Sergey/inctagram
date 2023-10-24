import React from 'react'
import { getMainLayout } from '@/components'
import s from './create.module.scss'
import { CreatePostModal } from '@/components/posts/create'

const Create = () => {
  return (
    <div className={s.container}>
      <CreatePostModal />
    </div>
  )
}

Create.getLayout = getMainLayout
export default Create
