import { ImageType, setCroppedImage } from '@/components/posts/create/create-post-slice'
import { AppDispatch } from '@/services'
import getCroppedImg from '@/components/posts/create/cropped-image/Crop'

export const saveCropping = async (addedImages: ImageType[], dispatch: AppDispatch) => {
  let result: ImageType[] = []

  try {
    {
      const croppedImg = addedImages.map(async el => {
        const res = await getCroppedImg(el.img, el.crop)

        if (res) {
          dispatch(setCroppedImage({ img: res, id: el.id }))
          result.push({ ...el, img: res })
        }
      })

      await Promise.all(croppedImg)

      // result добавлен для корректной отработки сохранение черновика
      return result
    }
  } catch (e) {
    console.log(e)
  }
}
