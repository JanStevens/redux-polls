import { PayloadAction } from '@reduxjs/toolkit'
import { takeEvery, select, call, put } from 'redux-saga/effects'
import { createSagaAction } from '../../utils/helpers'
import { NewPollSubmitType, PollType } from '../../types'
import { RootState } from '..'
import { savePoll } from '../../utils/api'
import { showLoading, hideLoading } from 'react-redux-loading'

export const addPoll = createSagaAction<NewPollSubmitType, { poll: PollType }>(
  'add_poll'
)

const getAuthedUser = (state: RootState) => state.authedUser

function* handleAddPoll({
  payload: pollData,
}: PayloadAction<NewPollSubmitType>) {
  try {
    yield put(showLoading())
    const author: string = yield select(getAuthedUser)
    const poll = yield call(savePoll, { ...pollData, author })
    yield put(hideLoading())
    yield put(addPoll.fulfilled({ poll }))
  } catch (error) {
    yield put(addPoll.rejected({ message: error.message }))
  }
}

export default function* watchAddPoll() {
  yield takeEvery(addPoll.trigger, handleAddPoll)
}
