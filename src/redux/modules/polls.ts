import { PollsType } from './../../types/index'
import { createSlice } from '@reduxjs/toolkit'
import { requestInitialData } from '../sagas/initialData'
import { addAnswer } from '../sagas/answers'
import { addPoll } from '../sagas/polls'

const pollSlice = createSlice({
  name: 'polls',
  initialState: {} as PollsType,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(requestInitialData.fulfilled, (state, action) => ({
      ...state,
      ...action.payload.polls,
    }))

    builder.addCase(addPoll.fulfilled, (state, action) => {
      state[action.payload.poll.id] = action.payload.poll
    })

    builder.addCase(addAnswer.fulfilled, (state, action) => {
      const { answer, id, authedUser } = action.payload.answer
      state[id].options[answer].votes.push(authedUser)
    })
  },
})

export const { reducer, ...actions } = pollSlice
