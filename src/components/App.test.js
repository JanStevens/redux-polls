import React from 'react'
import { render } from '@testing-library/react'
import App from './App'

test('renders redux polls', () => {
  const { getByText } = render(<App />)
  const element = getByText(/Redux Polls/i)
  expect(element).toBeInTheDocument()
})
