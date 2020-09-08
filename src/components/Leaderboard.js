import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'

const Leaderboard = () => {
  const users = useSelector((state) => state.users)

  const sorted = useMemo(
    () =>
      Object.values(users).sort(
        (
          { polls: pollsA, answers: answersA },
          { polls: pollsB, answers: answersB }
        ) => pollsB.length + answersB.length - (pollsA.length + answersA.length)
      ),
    [users]
  )

  return (
    <ul>
      {sorted.map(({ id, avatarURL, name, polls, answers }) => (
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
