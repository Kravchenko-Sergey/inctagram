import { useRef, useState } from 'react'
import { useTranslation } from '@/hooks'
import { Button, Loader, Typography } from '@/components'
import { ImageOutline } from '@/assets/icons'
import s from './create-post-modal.module.scss'
import { useRouter } from 'next/router'
import { PATH } from '@/consts/route-paths'
import {FixModal, HeaderContent} from "@/components/ui/modal/fix-modal";
import {useAppDispatch, useAppSelector} from "@/services";
import {nextPage, prevPage, setImage} from "@/components/posts/create/create-post-slice";
import {SelectedImages} from "@/components/posts/create/edit-photo";
import {CroppedImage} from "@/components/posts/create/cropped-image";

// export type ImageType = {
//   image: string
//   id?: string
//   croppedImage?: string
// }

export const CreatePostModal = () => {

  const inputRef = useRef<HTMLInputElement>(null)
  const [isBaseModalOpen, setIsBaseModalOpen] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [image, setImage] = useState<string | null>(null)
  // const [addedImages, setAddedImages] = useState<ImageType[]>([])
  const [isLoadingPost, setIsLoadingPost] = useState(false)
  const { push } = useRouter()

  const handleButtonClick = () => {
    push(PATH.PROFILE)

    //setIsBaseModalOpen(false)
    setImage(null)
    setIsModalOpen(false)
  }
  const cancelButtonClick = () => {
    push(PATH.PROFILE)
    //setIsBaseModalOpen(false)
    setIsModalOpen(false)
  }

  const handleImageUpload = async (e: any) => {
    // setAddedImages([
    //   {
    //     id: (addedImages.length + 1).toString(),
    //     image: URL.createObjectURL(e.target.files[0]),
    //   },
    // ])
    // setIsBaseModalOpen(false)
    // setIsModalOpen(true)
  }

  const dispatch = useAppDispatch()

  const onNextPage = ()=> dispatch(nextPage())
  const onPrevPage = () => dispatch(prevPage())

  const selectFileHandler = () => {
    inputRef && inputRef.current?.click()
  }

  if (isLoadingPost) {
    return <Loader className={s.loader} />
  }
  const [ open,setOpen] = useState<boolean>(false)
  const page = useAppSelector(state => state.createPost.page)
  const addPhotoHeader : HeaderContent = {type:'title',title:'Add Photo'}
  const croppedPhotoHeader:HeaderContent = {type:'node',node:
        <>
          <button onClick={onPrevPage}>{"<"}</button>
          <p>Cropped</p>
          <button onClick={onNextPage}>{">"}</button>
        </>
  }


  const modalContent = [
    {header:addPhotoHeader,children:<AddPhotoPage/>},
    {header: croppedPhotoHeader,children:<CroppedPage/>}

  ]
  const { t } = useTranslation()
  return (
    <div className={s.container}>
      {/*{!addedImages.length && isBaseModalOpen ? (*/}
      {/*  <BaseModal*/}
      {/*    modalWidth="md"*/}
      {/*    open={isBaseModalOpen}*/}
      {/*    onClose={handleButtonClick}*/}
      {/*    title={t.post.addNewPost.addPhoto}*/}
      {/*  >*/}
        {/*</BaseModal>*/}
      {/*) : (*/}
      {/*  <CropModal*/}
      {/*    isPostCreateLoadingHandler={setIsLoadingPost}*/}
      {/*    image={image}*/}
      {/*    open={isModalOpen}*/}
      {/*    onClose={handleButtonClick}*/}
      {/*    onCancel={cancelButtonClick}*/}
      {/*    title={t.post.addNewPost.cropping}*/}
      {/*    addedImages={addedImages}*/}
      {/*    setAddedImages={setAddedImages}*/}
      {/*    isBaseModalOpen={isBaseModalOpen}*/}
      {/*    setIsBaseModalOpen={setIsBaseModalOpen}*/}
      {/*    setImage={setImage}*/}
      {/*  >*/}
      {/*    <CroppedImage*/}
      {/*      image={image}*/}
      {/*      setImage={setImage}*/}
      {/*      addedImages={addedImages}*/}
      {/*      setAddedImages={setAddedImages}*/}
      {/*    />*/}
      {/*  </CropModal>*/}
      {/*)}*/}
      {/*<div className={`${s.photoContainer} ${image === null ? s.emptyPhotoContainer : ''}`}>*/}
      {/*  <ImageOutline />*/}
      {/*</div>*/}
      {/*<div>*/}
      {/*  <Button variant="primary" onClick={selectFileHandler} className={s.btn}>*/}
      {/*    <Typography variant="h3">{t.profile.selectImage}</Typography>*/}
      {/*  </Button>*/}
      {/*  <input*/}
      {/*      type="file"*/}
      {/*      ref={inputRef}*/}
      {/*      name="cover"*/}
      {/*      onChange={handleImageUpload}*/}
      {/*      accept="image/png, image/jpeg, image/jpg"*/}
      {/*      style={{ display: 'none' }}*/}
      {/*  />*/}
      {/*</div>*/}
      <button onClick={()=>setOpen(true)}>
        open
      </button>
      <FixModal
          open={open}
          onOpenChange={setOpen}
          headerContent={modalContent[page].header}
      >
        <div>
          {modalContent[page].children}
        </div>
      </FixModal>
    </div>
  )
}

const CroppedPage = () => {

  const images = useAppSelector(state => state.createPost.croppedImages)

   return (
     <CroppedImage
         addedImages={images}
     />
   )
}

const AddPhotoPage = () =>{

  const { t } = useTranslation()
  const dispatch = useAppDispatch()

  const inputRef = useRef<HTMLInputElement>(null)
  const selectFileHandler = () => {
    inputRef && inputRef.current?.click()
  }

  const images = useAppSelector(state => state.createPost.images)

  const handleImageUpload =  (e: any) => {
      dispatch(setImage({img:
            URL.createObjectURL(e.target.files[0])
      }))
    dispatch(nextPage())
  }

  return (
      <>
        <div className={`${s.photoContainer} ${images === null ? s.emptyPhotoContainer : ''}`}>
          <ImageOutline />
        </div>
        <div>
          <Button variant="primary" onClick={selectFileHandler} className={s.btn}>
            <Typography variant="h3">{t.profile.selectImage}</Typography>
          </Button>
          <input
              type="file"
              ref={inputRef}
              name="cover"
              onChange={handleImageUpload}
              accept="image/png, image/jpeg, image/jpg"
              style={{ display: 'none' }}
          />
        </div>
      </>
  )
}
