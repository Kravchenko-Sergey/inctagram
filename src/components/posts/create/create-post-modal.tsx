import { useRef, useState } from 'react'
import { useTranslation } from '@/hooks'
import { Button, Loader, Typography } from '@/components'
import { ImageOutline } from '@/assets/icons'
import { CroppedImage } from './cropped-image'
import { BaseModal } from './base-modal'
import { permittedPostPhotoFileSize, permittedFileTypes } from '@/consts/image'
import { useRouter } from 'next/router'
import { PATH } from '@/consts/route-paths'
import { toast } from 'react-toastify'
import s from './create-post-modal.module.scss'
import { useMeQuery } from '@/services/auth'
import {useAppDispatch, useAppSelector} from "@/services";
import {FixModal, HeaderContent} from "@/components/ui/modal/fix-modal";
import {nextPage, prevPage, setFilter, setImage} from "@/components/posts/create/create-post-slice";
import {FilteredImages, PostDescription} from "@/components/posts/create/add-description";
import {SelectedImages} from "@/components/posts/create/edit-photo";


// export type ImageType = {
//   image: string
//   id?: string
//   croppedImage?: string
// }

export const CreatePostModal = () => {




  const [isLoadingPost, setIsLoadingPost] = useState(false)
  const { push } = useRouter()


  const handleButtonClick = () => {
    // push(PATH.PROFILE)
    // push(`${PATH.PROFILE}/?id=${+me?.userId!}`)

  }
  const cancelButtonClick = () => {

  }
  const handleImageUpload = async (e: any) => {


  }

  const dispatch = useAppDispatch()

  const onNextPage = ()=> dispatch(nextPage())
  const onPrevPage = () => dispatch(prevPage())


  const [ open,setOpen] = useState<boolean>(false)
  const page = useAppSelector(state => state.createPost.page)
  const addPhotoHeader : HeaderContent = {type:'title',title:'Add Photo'}
  const croppedPhotoHeader:HeaderContent = {type:'node',node:
        <>
          <button onClick={onPrevPage}>{"<"}</button>
          <p>Cropped</p>
          <button onClick={onNextPage}>next</button>
        </>
  }

    const changeFilterHeader:HeaderContent = {type:'node',node:
            <>
                <button onClick={onPrevPage}>{"<"}</button>
                <p>Filter</p>
                <button onClick={onNextPage}>next</button>
            </>
    }

    const PublicationHeader:HeaderContent = {type:'node',node:
            <>
                <button onClick={onPrevPage}>{"<"}</button>
                <p>Publication</p>
                <button onClick={onNextPage}>Publish</button>
            </>
    }

  const modalContent = [
    {header:addPhotoHeader,children:<AddPhotoPage/>},
    {header: croppedPhotoHeader,children:<CroppedPage/>},
      {header: changeFilterHeader,children: <FilterPage/>},
      {header:PublicationHeader,children: <PublicationPage/>}

  ]
  const { t } = useTranslation()
  return (
    <div className={s.container}>
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


const PublicationPage = () =>{

    const filteredImages = useAppSelector(state => state.createPost.croppedImages)

    return(
        <div style={{display:'flex'}}>
            <FilteredImages addedImages={filteredImages}/>
            <PostDescription addedImages={filteredImages}/>
        </div>
    )
}

const FilterPage = () =>{
    const dispatch = useAppDispatch()
    const addedImages = useAppSelector(state => state.createPost.croppedImages)
    const onChangeFilter = (filter:string,id:number)=>{

        dispatch(setFilter({id,filter}))
   }


    return (
        <SelectedImages
            addedImages={addedImages}
            onChangeFilter={onChangeFilter}
        />
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
  //
  //   // ToDo сделать инпут контролируемым тут и в добавлении аватара
  //   const uploadInput = e.target
  //
  //   if (
  //     !(uploadInput instanceof HTMLInputElement) ||
  //     !uploadInput.files ||
  //     !uploadInput.files.length
  //   ) {
  //     return
  //   }
  //
  //   const file = uploadInput.files[0]
  //
  //   const fileName = file.name.toLowerCase()
  //   const matches = [...permittedFileTypes].some(it => fileName.endsWith(it))
  //
  //   if (matches && file.size <= permittedPostPhotoFileSize) {
  //     setAddedImages([
  //       {
  //         id: (addedImages.length + 1).toString(),
  //         image: URL.createObjectURL(e.target.files[0]),
  //       },
  //     ])
  //
  //   } else {
  //     toast.error(t.errors.imageUploadError, { icon: false })
  //   }
  // }

  const selectFileHandler = () => {
    inputRef && inputRef.current?.click()
  }

  const images = useAppSelector(state => state.createPost.images)

  const handleImageUpload =  (e: any) => {

      const uploadInput = e.target

      if (
          !(uploadInput instanceof HTMLInputElement) ||
          !uploadInput.files ||
          !uploadInput.files.length
      ) {
          return
      }
      const file = uploadInput.files[0]

      const fileName = file.name.toLowerCase()
      const matches = [...permittedFileTypes].some(it => fileName.endsWith(it))

      if (matches && file.size <= permittedPostPhotoFileSize) {
          dispatch(setImage({img:
                  URL.createObjectURL(e.target.files[0])
          }))
          dispatch(nextPage())


      } else {
          toast.error(t.errors.imageUploadError, { icon: false })
      }

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
