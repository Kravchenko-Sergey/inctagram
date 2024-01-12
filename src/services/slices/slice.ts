import { createAction, createSlice } from '@reduxjs/toolkit'

type InitialState = {
  isLoadingState: boolean
  isInitialized: boolean
}

export const isLoading = createAction<{ value: boolean }>('app/isLoading')
export const isInitialized = createAction<{ value: boolean }>('app/isInitialized')

const initialState: InitialState = {
  isLoadingState: false,
  isInitialized: true,
}

const slice = createSlice({
  name: 'app',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(isLoading, (state, action) => {
      state.isLoadingState = action.payload.value
    })
    builder.addCase(isInitialized, (state, action) => {
      state.isInitialized = action.payload.value
    })
  },
})

export const appReducer = slice.reducer
