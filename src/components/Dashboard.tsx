import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { createSelector } from '@reduxjs/toolkit'
import { RootState, useAppSelector } from '../redux'
import { PollType } from '../types'

const selectAuthedUser = (state: RootState) => state.authedUser
const selectPolls = (state: RootState) => state.polls

const selectAnswers = createSelector(
  [selectAuthedUser, (state: RootState) => state.users],
  (authedUser, users) => Object.keys(users[authedUser].answers)
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

type ListTypes = 'answered' | 'unanswered'

type IQuestions = {
  [key in ListTypes]: Array<PollType>
}

const Dashboard = () => {
  const [list, setList] = useState<ListTypes>('unanswered')
  const answered = useAppSelector(selectAnswered)
  const unanswered = useAppSelector(selectUnAnswered)
  const questions: IQuestions = { answered, unanswered }

  return (
    <>
      <div className="dashboard-toggle">
        <button
          style={{
            textDecoration: list === 'unanswered' ? 'underline' : undefined,
          }}
          onClick={() => setList('unanswered')}
        >
          Unanswered
        </button>
        <span>|</span>

        <button
          style={{
            textDecoration: list === 'answered' ? 'underline' : undefined,
          }}
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
