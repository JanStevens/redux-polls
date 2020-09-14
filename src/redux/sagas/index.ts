import { all, call, spawn } from 'redux-saga/effects'
import watchInitialData from './initialData'
import watchAddAnswer from './answers'
import watchAddPoll from './polls'

export default function* rootSaga() {
  const sagas = [watchInitialData, watchAddAnswer, watchAddPoll]
  yield all(
    sagas.map((saga) =>
      spawn(function* () {
        while (true) {
          try {
            yield call(saga)
            break
          } catch (e) {
            console.error(e)
          }
        }
      })
    )
  )
}
