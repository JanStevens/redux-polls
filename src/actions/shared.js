import { getInitialData } from '../utils/api'
import { setAuthedUser } from './authed'
import { receiveUsers } from './users'
import { receivePolls } from './polls'
import { showLoading, hideLoading } from 'react-redux-loading'

const AUTHED_ID = 'tylermcginnis'

export const handleInitialData = () => (dispatch) => {
  dispatch(showLoading())
  return getInitialData().then(({ users, polls }) => {
    dispatch(receiveUsers(users))
    dispatch(receivePolls(polls))
    dispatch(setAuthedUser(AUTHED_ID))
    dispatch(hideLoading())
  })
}
