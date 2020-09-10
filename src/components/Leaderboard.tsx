import React from 'react'
import { useAppSelector, RootState } from '../redux'
import { createSelector } from '@reduxjs/toolkit'

const selectUsers = createSelector(
  (state: RootState) => state.users,
  (users) =>
    Object.values(users).sort(
      (
        { polls: pollsA, answers: answersA },
        { polls: pollsB, answers: answersB }
      ) =>
        pollsB.length +
        Object.keys(answersB).length -
        (pollsA.length + Object.keys(answersA).length)
    )
)

const Leaderboard = () => {
  const users = useAppSelector(selectUsers)

  return (
    <ul>
      {users.map(({ id, avatarURL, name, polls, answers }) => (
        <li className="user" key={id}>
          <img src={avatarURL} alt={`Avatar for ${name}`} />
          <div>
            <h1>{name}</h1>
            <p>{polls.length} Polls</p>
            <p>{Object.keys(answers).length} Answers</p>
          </div>
        </li>
      ))}
    </ul>
  )
}

export default React.memo(Leaderboard)
