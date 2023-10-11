import LoadingGif from '@/assets/image/loading.gif'
import Image from 'next/image'
import s from './loader.module.scss'

export const Loader = () => {
  return (
    <div className={s.loader}>
      <Image width={24} height={24} src={LoadingGif} alt="Loading..." />
    </div>
  )
}
