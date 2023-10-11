import { FC } from 'react'
import { clsx } from 'clsx'

import Image from 'next/image'
import LoadingGif from '@/assets/image/loading.gif'
import s from './loader.module.scss'

type LoaderProps = {
  className?: string
}

export const Loader: FC<LoaderProps> = ({ className }) => {
  const classNames = {
    loader: clsx(s.loader, className),
  }

  return (
    <div className={classNames.loader}>
      <Image width={24} height={24} src={LoadingGif} alt="Loading..." />
    </div>
  )
}
