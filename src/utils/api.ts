import { NewPollType } from './../types/index'
import { _getUsers, _getPolls, _savePoll } from './_DATA'
export { _savePollAnswer as savePollAnswer } from './_DATA'

export const getInitialData = () =>
  Promise.all([_getUsers(), _getPolls()]).then(([users, polls]) => ({
    users,
    polls,
  }))

export const savePoll = (poll: NewPollType) => _savePoll(poll).then((p) => p)
