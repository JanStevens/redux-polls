import { createSlice } from '@reduxjs/toolkit'
import { requestInitialData } from '../sagas/initialData'

const authedUserSlice = createSlice({
  name: 'authedUser',
  initialState: '' as string,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      requestInitialData.fulfilled,
      (_state, action) => action.payload.authedUser
    )
  },
})

export const { reducer, actions } = authedUserSlice
