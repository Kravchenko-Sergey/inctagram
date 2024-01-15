import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type CroppedArea = {
  height: number
  width: number
  x: number
  y: number
}

export type ImageType = {
  id: number
  img: string
  zoom: number
  filter: string
  aspect: number
  crop: CroppedArea
}

export const createPostSlice = createSlice({
  name: 'createPost',
  initialState: {
    page: 0,
    images: [] as ImageType[],
    croppedImages: [] as ImageType[],
  },
  reducers: {
    setImage: (state, action: PayloadAction<{ img: string }>) => {
      const newImage: ImageType = {
        id: state.images.length,
        aspect: 1,
        zoom: 1,
        filter: 'none',
        img: action.payload.img,
        crop: { x: 0, y: 0, width: 0, height: 0 },
      }

      state.images.push(newImage)
      state.croppedImages.push(newImage)
    },
    setCroppedImage: (state, action: PayloadAction<{ id: number; img: string }>) => {
      const { id, img } = action.payload
      const index = state.croppedImages.findIndex(item => item.id === id)

      if (index !== -1) {
        state.croppedImages[index].img = img
      }
    },
    setZoom: (state, action: PayloadAction<{ id: number; zoom: number }>) => {
      const { id, zoom } = action.payload
      const index = state.croppedImages.findIndex(item => item.id === id)

      if (index !== -1) {
        state.croppedImages[index].zoom = zoom
      }
    },
    setFilter: (state, action: PayloadAction<{ id: number; filter: string }>) => {
      const { id, filter } = action.payload
      const index = state.croppedImages.findIndex(el => el.id === id)

      if (index !== -1) {
        state.croppedImages[index].filter = filter
      }
    },
    setAspect: (state, action: PayloadAction<{ id: number; aspect: number }>) => {
      const { id, aspect } = action.payload
      const index = state.croppedImages.findIndex(item => item.id === id)

      if (index !== -1) {
        state.croppedImages[index].aspect = aspect
      }
    },
    setCrop: (state, action: PayloadAction<{ id: number; crop: CroppedArea }>) => {
      const { crop, id } = action.payload
      const index = state.croppedImages.findIndex(item => item.id === id)

      if (index !== -1) {
        state.croppedImages[index].crop = crop
      }
    },
    setPage: (state, action: PayloadAction<{ page: number }>) => {
      state.page = action.payload.page
    },
    setDraft: (state, action: PayloadAction<ImageType[]>) => {
      state.croppedImages = action.payload
    },
    deleteImg: (state, action: PayloadAction<{ id: number }>) => {
      state.croppedImages = state.croppedImages.filter(el => el.id !== action.payload.id)
    },
    nextPage: state => {
      state.page = state.page + 1
    },
    prevPage: state => {
      state.page = state.page - 1
    },
    resetState: state => {
      state.croppedImages = []
      state.croppedImages = []
      state.page = 0
    },
  },
})

export const createPostReducer = createPostSlice.reducer
export const {
  setImage,
  prevPage,
  nextPage,
  resetState,
  deleteImg,
  setAspect,
  setZoom,
  setFilter,
  setCroppedImage,
  setCrop,
  setDraft,
  setPage,
} = createPostSlice.actions
