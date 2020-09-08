import React from 'react'
import { useSelector } from 'react-redux'
import { createSelector } from '@reduxjs/toolkit'

const selectUsers = createSelector(
  (state) => state.users,
  (users) =>
    Object.values(users).sort(
      (
        { polls: pollsA, answers: answersA },
        { polls: pollsB, answers: answersB }
      ) => pollsB.length + answersB.length - (pollsA.length + answersA.length)
    )
)

const Leaderboard = () => {
  const users = useSelector(selectUsers)

  return (
    <ul>
      {users.map(({ id, avatarURL, name, polls, answers }) => (
        <li className="user" key={id}>
          <img src={avatarURL} alt={`Avatar for ${name}`} />
          <div>
            <h1>{name}</h1>
            <p>{polls.length} Polls</p>
            <p>{answers.length} Answers</p>
          </div>
        </li>
      ))}
    </ul>
  )
}

export default Leaderboard
