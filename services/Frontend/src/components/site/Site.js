import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import SiteHeader from './siteHeader/SiteHeader'
import SiteFooter from './siteFooter/SiteFooter'
import HomePage from './homePage/HomePage'
import AboutPage from './aboutPage/AboutPage'
import SigninPage from './signinPage/SigninPage'
import SignupPage from './signupPage/SignupPage'
import NotFoundPage from './notFoundPage/NotFoundPage'

import './Site.css'

const Site = (props) => {
  const isLoggedIn = Object.keys(props.user).length === 0 ? false : true
  return (
    <div className="site-container">
      <SiteHeader isLoggedIn={isLoggedIn} />
      <div className="site-body">
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/about" component={AboutPage} />
          <Route exact path="/signin" component={SigninPage} />
          <Route exact path="/signup" component={SignupPage} />
          <Route component={NotFoundPage} />
        </Switch>
      </div>
      <SiteFooter />
    </div>
  )
}

Site.propTypes = {
  user: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  }
}

export default connect(mapStateToProps)(Site)
