import { createSlice } from '@reduxjs/toolkit'

import { handleAddPoll } from './polls'
import { handleAddAnswer } from './answers'
import { handleInitialData } from './initialData'

const userSlice = createSlice({
  name: 'users',
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(handleInitialData.fulfilled, (state, action) => ({
      ...state,
      ...action.payload.users,
    }))

    builder.addCase(handleAddPoll.fulfilled, (state, action) => {
      const { author, id } = action.payload.poll
      state[author].polls.push(id)
    })

    builder.addCase(handleAddAnswer.fulfilled, (state, action) => {
      const { authedUser, id } = action.payload.answer
      state[authedUser].answers.push(id)
    })
  },
})

export const { reducer, ...actions } = userSlice
