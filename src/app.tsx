import React from 'react'
import { Router } from 'react-router'
import './app.scss'
import { createBrowserHistory } from 'history'
import { CoreRouter } from './routes'
import { Header } from './components/header'

export const history = createBrowserHistory()

function App() {
  return (
    <Router history={history}>
      <Header />
      <CoreRouter />
    </Router>
  )
}

export default App
