import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import Dashboard from './dashboard/Dashboard'
import Site from './site/Site'

const App = () => {
  return (
    <div>
      <Switch>
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/" component={Site} />
      </Switch>
      <ToastContainer autoClose={3000} hideProgressBar />
    </div>
  )
}

export default App
