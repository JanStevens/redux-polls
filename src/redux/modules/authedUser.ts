import { createSlice } from '@reduxjs/toolkit'
import { handleInitialData } from './initialData'

const authedUserSlice = createSlice({
  name: 'authedUser',
  initialState: '' as string,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      handleInitialData.fulfilled,
      (_state, action) => action.payload.authedUser
    )
  },
})

export const { reducer, actions } = authedUserSlice
