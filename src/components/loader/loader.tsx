import LoadingGif from '@/assets/image/loading.gif'
import Image from 'next/image'
import s from './loader.module.scss'
import { clsx } from 'clsx'

type LoaderProps = {
  className?: string
}

export const Loader = ({ className }: LoaderProps) => {
  const classNames = {
    loader: clsx(s.loader, className),
  }

  return (
    <div className={classNames.loader}>
      <Image width={24} height={24} src={LoadingGif} alt="Loading..." />
    </div>
  )
}
