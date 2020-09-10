import { configureStore } from '@reduxjs/toolkit'
import { useDispatch, TypedUseSelectorHook, useSelector } from 'react-redux'
import { loadingBarReducer } from 'react-redux-loading'
import middleware from './middleware'

import { reducer as authedUser } from './modules/authedUser'
import { reducer as usersReducer } from './modules/users'
import { reducer as pollsReducer } from './modules/polls'

const store = configureStore({
  reducer: {
    authedUser,
    users: usersReducer,
    polls: pollsReducer,
    loadingBar: loadingBarReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export default store
