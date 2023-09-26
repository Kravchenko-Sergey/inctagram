import { createAction, createSlice } from '@reduxjs/toolkit'

type AppInitialStateType = {
  serverError: {
    name: string
    error: string
  }
}

const initialState: AppInitialStateType = {
  serverError: { name: '', error: '' },
}

export const addErrorAC = createAction<{
  name: string
  error: string
}>('app/addErrorAC')

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(addErrorAC, (state, action) => {
      state.serverError = action.payload
    })
  },
})

export const { reducer: appReducer, actions: appActions } = appSlice
