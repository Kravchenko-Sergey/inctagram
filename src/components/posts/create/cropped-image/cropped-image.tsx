import Slider from 'react-slick'
import { getSliderSettings } from '@/helpers'
import { CropArgType, EasyCrop } from './easy-crop'
import { Add, Crop, Zoom } from '@/components/posts/create/edit-photo'
import s from './croped-image.module.scss'
import { useAppDispatch } from '@/services'
import { ImageType, setAspect, setCrop, setZoom } from '@/components/posts/create/create-post-slice'

type PropsType = {
  addedImages: ImageType[]
}

export const CroppedImage = ({ addedImages }: PropsType) => {
  const settings = getSliderSettings(s.dots)

  const dispatch = useAppDispatch()
  const onChangeZoom = (id: number, zoom: number) => dispatch(setZoom({ zoom, id }))
  const onCropChange = (id: number, crop: CropArgType) => dispatch(setCrop({ id, crop }))
  const onChangeAspect = (id: number, aspect: number) => dispatch(setAspect({ id, aspect }))

  return (
    <>
      <div className={s.container}>
        <div className={s.cropContainer}>
          <Slider {...settings}>
            {addedImages.map((el, idx) => {
              return (
                <div key={idx} className={s.carousel}>
                  <EasyCrop
                    image={el.img}
                    id={el.id}
                    objectFit={'fill'}
                    zoom={el.zoom}
                    setZoom={onChangeZoom}
                    onCropChange={onCropChange}
                    aspectRatio={el.aspect}
                  />
                  <div className={s.editAndAdd}>
                    <div className={s.edit}>
                      <Crop className={s.expand} setAspectRatio={onChangeAspect} id={el.id} />
                      <Zoom
                        className={s.maximize}
                        zoom={el.zoom}
                        setZoom={onChangeZoom}
                        imgId={el.id}
                      />
                    </div>
                    <div>
                      <Add addedImages={addedImages} />
                    </div>
                  </div>
                </div>
              )
            })}
          </Slider>
        </div>
      </div>
    </>
  )
}
