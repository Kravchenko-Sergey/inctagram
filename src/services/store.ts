import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

import { authAPI } from '@/services/auth'
import { profileAPI } from '@/services/profile'
import { baseApi } from '@/services/base.api'

export const store = configureStore({
  reducer: {
    [authAPI.reducerPath]: authAPI.reducer,
    [profileAPI.reducerPath]: profileAPI.reducer,
  },
  devTools: true,
  // preloadedState: initialState,
  // middleware: gDM => gDM().concat(auth-api.middleware).concat(profileAPI.middleware),
  middleware: gDM => {
    return gDM().concat(baseApi.middleware)
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

setupListeners(store.dispatch)
