import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { createSelector } from '@reduxjs/toolkit'

const selectAuthedUser = (state) => state.authedUser
const selectPolls = (state) => state.polls

const selectAnswers = createSelector(
  [selectAuthedUser, (state) => state.users],
  (authedUser, users) => users[authedUser].answers
)

const selectAnswered = createSelector(
  [selectAnswers, selectPolls],
  (answers, polls) =>
    answers.map((id) => polls[id]).sort((a, b) => b.timestamp - a.timestamp)
)

const selectUnAnswered = createSelector(
  [selectAnswers, selectPolls],
  (answers, polls) =>
    Object.keys(polls)
      .filter((id) => !answers.includes(id))
      .map((id) => polls[id])
      .sort((a, b) => b.timestamp - a.timestamp)
)

const Dashboard = () => {
  const [list, setList] = useState('unanswered')
  const answered = useSelector(selectAnswered)
  const unanswered = useSelector(selectUnAnswered)
  const questions = { answered, unanswered }

  return (
    <>
      <div className="dashboard-toggle">
        <button
          style={{ textDecoration: list === 'unanswered' ? 'underline' : null }}
          onClick={() => setList('unanswered')}
        >
          Unanswered
        </button>
        <span>|</span>

        <button
          style={{ textDecoration: list === 'answered' ? 'underline' : null }}
          onClick={() => setList('answered')}
        >
          Answered
        </button>
      </div>
      <ul className="dashboard-list">
        {questions[list].map((poll) => (
          <li key={poll.id}>
            <Link to={`polls/${poll.id}`}>{poll.question}</Link>
          </li>
        ))}
      </ul>
    </>
  )
}

export default Dashboard
