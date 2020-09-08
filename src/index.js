import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import './index.css'

import store from './redux'
import { Provider } from 'react-redux'
import LoadingBar from 'react-redux-loading'

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
      <LoadingBar />
    </>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ColorfulBorder />
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
