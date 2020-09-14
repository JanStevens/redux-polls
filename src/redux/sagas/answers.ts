import { savePollAnswer } from '../../utils/api'
import { showLoading, hideLoading } from 'react-redux-loading'
import { PollAnswerType } from '../../types'

import { createSagaAction } from '../../utils/helpers'
import { put, call, takeLatest } from 'redux-saga/effects'
import { PayloadAction } from '@reduxjs/toolkit'

export const addAnswer = createSagaAction<
  PollAnswerType,
  { answer: PollAnswerType },
  { message: string }
>('add_answer')

function* handleAddAnswer({
  payload: answerData,
}: PayloadAction<PollAnswerType>) {
  console.log(answerData)
  try {
    yield put(showLoading())
    yield call(savePollAnswer, answerData)
    yield put(addAnswer.fulfilled({ answer: answerData }))
    yield put(hideLoading())
  } catch (error) {
    yield put(addAnswer.rejected({ message: error.message }))
  }
}

export default function* watchAddAnswer() {
  yield takeLatest(addAnswer.trigger, handleAddAnswer)
}
