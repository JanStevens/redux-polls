import React from 'react'
import { addAnswer } from '../redux/sagas/answers'
import { getPercentage } from '../utils/helpers'
import { useParams } from 'react-router-dom'
import { createSelector } from '@reduxjs/toolkit'
import { RootState, useAppDispatch, useAppSelector } from '../redux'

const selectPoll = (state: RootState, id: string) => state.polls[id]
const selectTotalVotes = createSelector([selectPoll], (poll) =>
  Object.values(poll.options).reduce(
    (total, { votes }) => total + votes.length,
    0
  )
)

const selectAuthorAvatar = createSelector(
  [selectPoll, (state: RootState) => state.users],
  (poll, users) => users[poll.author].avatarURL
)

const selectVote = createSelector(
  [selectPoll, (state) => state.authedUser],
  (poll, authedUser) =>
    Object.entries(poll.options).reduce((result, [key, option]) => {
      if (option.votes.includes(authedUser)) {
        return key
      }
      return result
    }, null as null | string)
)

interface RouterParams {
  id: string
}

const Poll = () => {
  const { id } = useParams<RouterParams>()
  const dispatch = useAppDispatch()
  const authedUser = useAppSelector((state) => state.authedUser)

  const poll = useAppSelector((state) => selectPoll(state, id))
  const totalVotes = useAppSelector((state) => selectTotalVotes(state, id))
  const authorAvatar = useAppSelector((state) => selectAuthorAvatar(state, id))
  const vote = useAppSelector((state) => selectVote(state, id))

  if (!poll) {
    return <p>This poll doesn't exist</p>
  }

  const handleAnswer = (answer: string) => {
    if (vote === null) {
      dispatch(
        addAnswer.trigger({
          authedUser,
          answer,
          id,
        })
      )
    }
  }

  return (
    <div className="poll-container">
      <h1 className="question">{poll.question}</h1>
      <div className="poll-author">
        By <img src={authorAvatar} alt={`Authors Avatar`} />
      </div>
      <ul>
        {Object.entries(poll.options).map(([key, option]) => (
          <li
            key={key}
            className={`option ${vote === key ? 'chosen' : null}`}
            onClick={() => handleAnswer(key)}
          >
            {vote === null ? (
              option.text
            ) : (
              <div className="result">
                <span>{option.text}</span>
                <span>
                  {getPercentage(option.votes.length, totalVotes)}% (
                  {option.votes.length})
                </span>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default React.memo(Poll)
