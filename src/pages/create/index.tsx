import React from 'react'
import { AddPost } from '@/components/posts'
import { getMainLayout } from '@/components'
import s from './create.module.scss'

const Create = () => {
  return (
    <div className={s.container}>
      <AddPost />
    </div>
  )
}

Create.getLayout = getMainLayout
export default Create
