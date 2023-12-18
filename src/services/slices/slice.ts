import { createAction, createSlice } from '@reduxjs/toolkit'

type InitialState = {
  isLoadingState: boolean
}

export const isLoading = createAction<{ value: boolean }>('app/isLoading')

const initialState: InitialState = {
  isLoadingState: false,
}

const slice = createSlice({
  name: 'app',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(isLoading, (state, action) => {
      state.isLoadingState = action.payload.value
    })
  },
})

export const appReducer = slice.reducer
