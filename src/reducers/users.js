import { RECEIVE_USERS } from '../actions/users'
import { ADD_POLL } from '../actions/polls'
import { ADD_ANSWER } from '../actions/answers'

const users = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_USERS:
      return {
        ...state,
        ...action.users,
      }

    case ADD_POLL:
      const { author, id } = action.poll
      console.log(state, action.poll, state[author])

      return {
        ...state,
        [author]: {
          ...state[author],
          polls: state[author].polls.concat([id]),
        },
      }

    case ADD_ANSWER:
      const user = state[action.authedUser]

      return {
        ...state,
        [action.authedUser]: {
          ...user,
          answers: user.answers.concat([action.id]),
        },
      }

    default:
      return state
  }
}

export default users
