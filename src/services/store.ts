import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { createPostReducer } from '@/components/posts/create/create-post-slice'
import { baseApi } from '@/services/base-api'
import { createWrapper } from 'next-redux-wrapper'
import { appReducer } from '@/services/slices/slice'

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    createPost: createPostReducer,
    appReducer,
  },
  devTools: true,
  // preloadedState: initialState,
  // middleware: gDM => gDM().concat(auth-api.middleware).concat(postsApi.middleware),
  middleware: gDM => gDM().concat(baseApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

// const makeStore = () => store
const makeStore = () =>
  configureStore({
    reducer: {
      [baseApi.reducerPath]: baseApi.reducer,
      appReducer,
    },
    devTools: true,
    // preloadedState: initialState,
    // middleware: gDM => gDM().concat(auth-api.middleware).concat(postsApi.middleware),
    middleware: gDM => gDM().concat(baseApi.middleware),
  })

export type RootAppState = ReturnType<typeof makeStore>

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const wrapper = createWrapper<RootAppState>(makeStore, { debug: false })
setupListeners(store.dispatch)
