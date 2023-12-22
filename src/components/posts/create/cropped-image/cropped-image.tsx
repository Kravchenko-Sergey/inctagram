import Slider from 'react-slick'
import { getSliderSettings } from '@/helpers'
import {EasyCrop } from './easy-crop'

import { Add, Crop, Zoom } from '@/components/posts/create/edit-photo'
import s from './croped-image.module.scss'
import {useAppDispatch, useAppSelector} from "@/services";
import {changeAspect, changeZoom} from "@/components/posts/create/create-post-slice";




export const CroppedImage = () => {

  const dispatch = useAppDispatch()
  //refactor
  const addedImages = useAppSelector(state => state.createPostInfo.images)
  const onChangeZoom = (zoom:number,imgId:string )=>dispatch(changeZoom({zoom,imgId}))
  const onChangeAspect = (aspect:number,id:string | undefined)=> id &&  dispatch(changeAspect({aspect,id}))

  const settings = getSliderSettings(s.dots)

  return (

      <div className={s.container}>
        <div className={s.cropContainer}>
          <Slider {...settings} className={s.sliderContainer}>
            {addedImages.map((el, idx) => {
              return (
                <div key={el.id} className={s.carousel}>
                  <EasyCrop
                    image={el.image}
                    id={el.id}
                    zoom={el.zoom}
                    aspectRatio={el.aspect}
                    setZoom={onChangeZoom}
                  />
                  <div className={s.editAndAdd}>
                    <div className={s.edit}>
                      <Crop className={s.expand}
                          onChangeAspect={onChangeAspect}
                          imageId={el.id}
                      />
                      <Zoom className={s.maximize}
                            zoom={el.zoom}
                            onChangeZoom={onChangeZoom}
                            imgId={el.id}
                      />
                    </div>
                    <div>
                      <Add
                        addedImages={addedImages}
                      />
                    </div>
                  </div>
                </div>
              )
            })}
          </Slider>
         </div>
       </div>

  )
}
