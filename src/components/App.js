import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Leaderboard from './Leaderboard'
import Dashboard from './Dashboard'
import AddPoll from './AddPoll'
import Nav from './NavBar'
import Poll from './Poll'

function App() {
  const dispatch = useDispatch()
  const loading = useSelector((state) => state.authedUser === null)

  useEffect(() => {
    dispatch(handleInitialData())
  }, [dispatch])

  return (
    <Router>
      <div className="container">
        <Nav />
        {loading === true ? null : (
          <div>
            <Route path="/" exact component={Dashboard} />
            <Route path="/leaderboard" component={Leaderboard} />
            <Route path="/polls/:id" component={Poll} />
            <Route path="/add" component={AddPoll} />
          </div>
        )}
      </div>
    </Router>
  )
}

export default App
