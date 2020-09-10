import React from 'react'
import { NavLink } from 'react-router-dom'

const Nav = () => {
  return (
    <nav className="nav">
      <NavLink to="/" exact activeClassName="active">
        Home
      </NavLink>
      <NavLink to="/leaderboard" exact activeClassName="active">
        Leaderboard
      </NavLink>
      <NavLink to="/add" exact activeClassName="active">
        Add Poll
      </NavLink>
    </nav>
  )
}

export default Nav
