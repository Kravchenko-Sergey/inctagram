import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

import { instagramAPI } from '@/api/api'
import { authAPI } from '@/api/auth-api/auth.api'

// import { auth-api } from '@/features/auth/api/auth.api'
// import { instagramAPI } from '@/store/api'

export const store = configureStore({
  reducer: {
    [authAPI.reducerPath]: authAPI.reducer,
  },
  devTools: true,
  // preloadedState: initialState,
  // middleware: gDM => gDM().concat(auth-api.middleware).concat(profileAPI.middleware),
  middleware: gDM => {
    return gDM().concat(instagramAPI.middleware)
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

setupListeners(store.dispatch)
