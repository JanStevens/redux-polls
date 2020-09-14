import { PollsType, UsersType } from '../../types/index'
import { getInitialData } from '../../utils/api'
import { showLoading, hideLoading } from 'react-redux-loading'
import { put, takeLatest, call } from 'redux-saga/effects'

import { createSagaAction } from '../../utils/helpers'

const AUTHED_ID = 'tylermcginnis'

export const requestInitialData = createSagaAction<
  void,
  {
    users: UsersType
    polls: PollsType
    authedUser: string
  }
>('request_initial_data')

function* handleInitialData() {
  try {
    yield put(showLoading())
    const { users, polls }: { users: UsersType; polls: PollsType } = yield call(
      getInitialData
    )
    yield put(
      requestInitialData.fulfilled({ users, polls, authedUser: AUTHED_ID })
    )
    yield put(hideLoading())
  } catch (e) {
    yield put(requestInitialData.rejected({ message: e.message }))
  }
}

export default function* watchInitialData() {
  yield takeLatest(requestInitialData.trigger, handleInitialData)
}
