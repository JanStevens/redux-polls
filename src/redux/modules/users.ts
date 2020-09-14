import { UsersType } from './../../types/index'
import { createSlice } from '@reduxjs/toolkit'

import { addPoll } from '../sagas/polls'
import { addAnswer } from '../sagas/answers'
import { requestInitialData } from '../sagas/initialData'

const userSlice = createSlice({
  name: 'users',
  initialState: {} as UsersType,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(requestInitialData.fulfilled, (state, action) => ({
      ...state,
      ...action.payload.users,
    }))

    builder.addCase(addPoll.fulfilled, (state, action) => {
      const { author, id } = action.payload.poll
      state[author].polls.push(id)
    })

    builder.addCase(addAnswer.fulfilled, (state, action) => {
      const { authedUser, id, answer } = action.payload.answer
      state[authedUser].answers[id] = answer
    })
  },
})

export const { reducer, ...actions } = userSlice
