import { savePoll } from '../../utils/api'
import { showLoading, hideLoading } from 'react-redux-loading'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { handleInitialData } from './initialData'
import { handleAddAnswer } from './answers'

export const handleAddPoll = createAsyncThunk(
  'polls/handleAddPoll',
  async (pollData, { dispatch, getState }) => {
    dispatch(showLoading())
    const { authedUser: author } = getState()
    const poll = await savePoll({ ...pollData, author })
    dispatch(hideLoading())
    return { poll }
  }
)

const pollSlice = createSlice({
  name: 'polls',
  initialState: {},
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
      const votesKey = answer + 'Votes'

      state[id][votesKey].push(authedUser)
    })
  },
})

export const { reducer, ...actions } = pollSlice
