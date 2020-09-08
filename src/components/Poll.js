import React from 'react'
import { handleAddAnswer } from '../redux/modules/answers'
import { getPercentage, getTextKeys, getVoteKeys } from '../utils/helpers'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { createSelector } from '@reduxjs/toolkit'

const voteKeys = getVoteKeys()

const selectPoll = (state, id) => state.polls[id]
const selectTotalVotes = createSelector([selectPoll], (poll) =>
  poll ? voteKeys.reduce((total, key) => total + poll[key].length, 0) : 0
)

const selectAuthorAvatar = createSelector(
  [selectPoll, (state) => state.users],
  (poll, users) => users[poll.author].avatarURL
)

const selectVote = createSelector(
  [selectPoll, (state) => state.authedUser],
  (poll, authedUser) =>
    voteKeys.reduce((vote, key) => {
      if (poll[key].includes(authedUser)) {
        return key[0]
      }
      return vote === null ? null : vote
    }, null)
)

const Poll = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const authedUser = useSelector((state) => state.authedUser)

  const poll = useSelector((state) => selectPoll(state, id))
  const totalVotes = useSelector((state) => selectTotalVotes(state, id))
  const authorAvatar = useSelector((state) => selectAuthorAvatar(state, id))
  const vote = useSelector((state) => selectVote(state, id))

  if (!poll) {
    return <p>This poll doesn't exist</p>
  }

  const handleAnswer = (answer) => {
    if (vote === null) {
      dispatch(
        handleAddAnswer({
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
        {getTextKeys().map((key) => {
          const count = poll[key[0] + 'Votes'].length

          return (
            <li
              key={key}
              className={`option ${vote === key[0] ? 'chosen' : null}`}
              onClick={() => handleAnswer(key[0])}
            >
              {vote === null ? (
                poll[key]
              ) : (
                <div className="result">
                  <span>{poll[key]}</span>
                  <span>
                    {getPercentage(count, totalVotes)}% ({count})
                  </span>
                </div>
              )}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default Poll
