import React, { useState, ChangeEvent, SyntheticEvent } from 'react'
import { addPoll } from '../redux/sagas/polls'
import { useHistory } from 'react-router-dom'
import { useAppDispatch } from '../redux'

const AddPoll = () => {
  const history = useHistory()
  const dispatch = useAppDispatch()

  const [options, setOptions] = useState({
    a: '',
    b: '',
    c: '',
    d: '',
  })

  const [question, setQuestion] = useState('')

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault()
    history.push('/')
    dispatch(
      addPoll.trigger({
        question,
        ...options,
      })
    )
  }

  const handleInputChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = target
    setOptions({
      ...options,
      [name]: value,
    })
  }

  const isDisabled =
    question === '' ||
    options.a === '' ||
    options.b === '' ||
    options.c === '' ||
    options.d === ''

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3 style={{ marginBottom: 5 }}>What is your question?</h3>
      <input
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        name="question"
        className={'input'}
        type="text"
      />

      <h3>What are the options?</h3>
      {Object.entries(options).map(([key, value]) => (
        <div key={key}>
          <label className="label" htmlFor={key}>
            {key.toUpperCase()}.
          </label>
          <input
            value={value}
            onChange={handleInputChange}
            name={key}
            className="input"
            type="text"
            id={key}
          />
        </div>
      ))}

      <button className="btn" disabled={isDisabled}>
        Submit
      </button>
    </form>
  )
}

export default AddPoll
