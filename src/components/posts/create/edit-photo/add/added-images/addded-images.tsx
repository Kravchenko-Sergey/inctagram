import Image from 'next/image'
import { CloseModal } from '@/assets/icons'
import { ImageType } from '@/components/posts/create'
import s from './added-images.module.scss'
import {useAppDispatch} from "@/services";
import {deleteImage} from "@/components/posts/create/create-post-slice";


type PropsType = {
  addedImages: ImageType[]

}

export const AddedImages = ({ addedImages }: PropsType) => {
  const imagesToShow = addedImages.slice(-2)

  const dispatch = useAppDispatch()
  const onDeleteImage = (id: number) => dispatch(deleteImage({id:id.toString()}))


  return (
    <div className={addedImages.length === 10 ? s.wrapperForImg : s.wrapper}>
      {addedImages.length <= 1
        ? addedImages.map((el, idx) => {
            return (
              <div key={idx} className={s.addedPhoto}>
                <Image className={s.oneImage} src={el.image} alt="photos" height={82} width={80} />
              </div>
            )
          })
        : imagesToShow.map((el, i) => {
            return (
              <div key={i} className={s.addedPhoto}>
                <div className={s.closeIcon} onClick={() => onDeleteImage(i)}>
                  <CloseModal className={s.close} />
                </div>
                <Image className={s.image} src={el.image} alt="photos" height={82} width={80} />
              </div>
            )
          })}
    </div>
  )
}
