import { getInitialData } from '../../utils/api'
import { showLoading, hideLoading } from 'react-redux-loading'
import { createAsyncThunk } from '@reduxjs/toolkit'

const AUTHED_ID = 'tylermcginnis'

export const handleInitialData = createAsyncThunk(
  'shared/handleInitialData',
  async (_, { dispatch }) => {
    dispatch(showLoading())
    const { users, polls } = await getInitialData()
    dispatch(hideLoading())
    return { users, polls, authedUser: AUTHED_ID }
  }
)
