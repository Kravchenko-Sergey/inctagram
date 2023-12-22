import { createSlice, current, PayloadAction } from '@reduxjs/toolkit'

type ImageType = {
  image: string
  id?: string
  filter: string
  zoom: number
  aspect: number
  changed?: string
}

type CropArgType = {
  height: number
  width: number
  x: number
  y: number
}

type CroppedImg = {
  id: string
  image: string
  cropArgs: CropArgType
}

const createPostSlice = createSlice({
  name: 'createPost',
  initialState: {
    images: [] as ImageType[],
    croppedImg: [] as CroppedImg[],
    page: 0,
  },
  reducers: {
    setNextPage: state => {
      state.page += 1
    },
    setPrevPage: state => {
      state.page -= 1
    },
    setImage: (state, action: PayloadAction<{ image: string }>) => {
      state.images.push({
        image: action.payload.image,
        filter: 'none',
        zoom: 1,
        id: state.images.length.toString(),
        aspect: 1,
      })
    },
    deleteImage: (state, action: PayloadAction<{ id: string }>) => {
      const filteredImages = state.images.filter(el => el.id !== action.payload.id)

      state.images = filteredImages
    },
    changeFilter: (state, action: PayloadAction<{ filter: string; id: string }>) => {
      const changedFilterArr = state.images.map(el =>
        el.id === action.payload.id ? { ...el, filter: action.payload.filter } : { ...el }
      )

      state.images = changedFilterArr
    },
    setCroppedImg: (state, action: PayloadAction<{ image: string; id: string }>) => {
      const newArr = state.images.map(el =>
        el.id === action.payload.id ? { ...el, image: action.payload.image } : { ...el }
      )

      state.images = newArr
    },
    changeZoom: (state, action: PayloadAction<{ imgId: string; zoom: number }>) => {
      const { imgId, zoom } = action.payload
      const newArrImg = state.images.map(el => (el.id === imgId ? { ...el, zoom } : { ...el }))

      state.images = newArrImg
    },
    setCropValue: (state, action: PayloadAction<CroppedImg>) => {
      const index = state.croppedImg.findIndex(item => item.id === action.payload.id)

      if (index === -1) {
        state.croppedImg = [
          ...state.croppedImg.slice(0, index),
          { ...action.payload },
          ...state.croppedImg.slice(index + 1),
        ]
      } else {
        state.croppedImg[index].cropArgs = action.payload.cropArgs
      }
    },
    revalidateImage: (state, action: PayloadAction<{ id: string; img: string }>) => {
      const updatedPhoto = state.images.map(el =>
        el.id === action.payload.id
          ? { ...el, image: action.payload.img, changed: 'true' }
          : { ...el }
      )

      state.images = updatedPhoto
    },
    changeAspect: (state, action: PayloadAction<{ id: string; aspect: number }>) => {
      const changedAspect = state.images.map(el =>
        el.id === action.payload.id ? { ...el, aspect: action.payload.aspect } : { ...el }
      )

      state.images = changedAspect
    },
  },
})

export const createPostReducer = createPostSlice.reducer
export const {
  setNextPage,
  setPrevPage,
  setImage,
  deleteImage,
  changeZoom,
  setCropValue,
  revalidateImage,
  changeFilter,
  changeAspect,
} = createPostSlice.actions
