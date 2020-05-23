import React from 'react'
import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'

import './SiteHeader.css'

const SiteHeader = (props) => {
  return (
    <div className="site-header">
      <div className="site-logo zero-line-height">
        <img src="/public/images/edokor-logo.png" alt="Edokor" />
      </div>
      <div className="site-navigation">
        <NavLink to="/" exact>
          <span>Home</span>
        </NavLink>
        <NavLink to="/about" exact>
          <span>About</span>
        </NavLink>
        <NavLink to="/contact" exact>
          <span>Contact</span>
        </NavLink>
      </div>
      {props.isLoggedIn && (
        <div className="site-login">
          <NavLink to="/dashboard" exact>
            <span>Dashboard</span>
          </NavLink>
        </div>
      )}
      {!props.isLoggedIn && (
        <div className="site-login">
          <NavLink to="/signin" exact>
            <span>Signin</span>
          </NavLink>
          <NavLink to="/signup" exact>
            <span>Signup</span>
          </NavLink>
        </div>
      )}
    </div>
  )
}

SiteHeader.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
}

export default SiteHeader
