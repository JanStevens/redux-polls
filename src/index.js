import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import './index.css'

const ColorfulBorder = () => {
  return (
    <>
      <ul className="border-container">
        <li className="border-item" style={{ background: 'var(--red)' }} />
        <li className="border-item" style={{ background: 'var(--blue)' }} />
        <li className="border-item" style={{ background: 'var(--pink)' }} />
        <li className="border-item" style={{ background: 'var(--yellow)' }} />
        <li className="border-item" style={{ background: 'var(--aqua)' }} />
      </ul>
    </>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <ColorfulBorder />
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
