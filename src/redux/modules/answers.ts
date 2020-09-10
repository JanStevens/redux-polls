import { savePollAnswer } from '../../utils/api'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { showLoading, hideLoading } from 'react-redux-loading'
import { PollAnswerType } from '../../types'

export const handleAddAnswer = createAsyncThunk(
  'answers/addAnswer',
  async (answerData: PollAnswerType, { dispatch }) => {
    dispatch(showLoading())
    await savePollAnswer(answerData)
    dispatch(hideLoading())
    return { answer: answerData }
  }
)
