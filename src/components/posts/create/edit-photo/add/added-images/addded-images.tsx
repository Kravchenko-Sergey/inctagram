import Image from 'next/image'
import { CloseModal } from '@/assets/icons'
import s from './added-images.module.scss'
import { deleteImg, ImageType } from '@/components/posts/create/create-post-slice'
import { useAppDispatch } from '@/services'

type PropsType = {
  addedImages: ImageType[]
}

export const AddedImages = ({ addedImages }: PropsType) => {
  const imagesToShow = addedImages.slice(-2)

  const dispatch = useAppDispatch()
  const onDeleteImage = (id: number) => {
    dispatch(deleteImg({ id }))
  }

  return (
    <div className={addedImages.length === 10 ? s.wrapperForImg : s.wrapper}>
      {addedImages.length <= 1
        ? addedImages.map((el, idx) => {
            return (
              <div key={idx} className={s.addedPhoto}>
                <Image className={s.oneImage} src={el.img} alt="photos" height={82} width={80} />
              </div>
            )
          })
        : imagesToShow.map((el, i) => {
            return (
              <div key={i} className={s.addedPhoto}>
                <div className={s.closeIcon} onClick={() => onDeleteImage(el.id)}>
                  <CloseModal className={s.close} />
                </div>
                <Image className={s.image} src={el.img} alt="photos" height={82} width={80} />
              </div>
            )
          })}
    </div>
  )
}
