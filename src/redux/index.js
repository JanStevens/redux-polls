import { configureStore } from '@reduxjs/toolkit'
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

export default store
