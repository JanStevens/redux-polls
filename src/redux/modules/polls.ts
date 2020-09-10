import { PollsType } from './../../types/index'
import { RootState } from './../index'
import { savePoll } from '../../utils/api'
import { showLoading, hideLoading } from 'react-redux-loading'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { handleInitialData } from './initialData'
import { handleAddAnswer } from './answers'
import { NewPollSubmitType } from '../../types'

export const handleAddPoll = createAsyncThunk(
  'polls/handleAddPoll',
  async (pollData: NewPollSubmitType, { dispatch, getState }) => {
    dispatch(showLoading())
    const { authedUser: author } = getState() as RootState
    const poll = await savePoll({ ...pollData, author })
    dispatch(hideLoading())
    return { poll }
  }
)

const pollSlice = createSlice({
  name: 'polls',
  initialState: {} as PollsType,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(handleInitialData.fulfilled, (state, action) => ({
      ...state,
      ...action.payload.polls,
    }))

    builder.addCase(handleAddPoll.fulfilled, (state, action) => {
      state[action.payload.poll.id] = action.payload.poll
    })

    builder.addCase(handleAddAnswer.fulfilled, (state, action) => {
      const { answer, id, authedUser } = action.payload.answer
      state[id].options[answer].votes.push(authedUser)
    })
  },
})

export const { reducer, ...actions } = pollSlice
