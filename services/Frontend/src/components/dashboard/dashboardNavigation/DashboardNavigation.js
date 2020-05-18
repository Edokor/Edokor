import React from 'react'
import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'

import './DashboardNavigation.css'

const DashboardNavigation = ({ sidenavOpen, sidenavToggle }) => {
  return (
    <div className={'dashboard-navigation' + (sidenavOpen ? ' expand' : '')}>
      <div className="dashboard-links">
        <NavLink to="/dashboard" exact>
          <div className="navbar-icon">
            <img src="/images/dashboard/icon-dashboard.png" />
          </div>
          <span>DASHBOARD</span>
        </NavLink>
        <NavLink to="/dashboard/courses">
          <div className="navbar-icon">
            <img src="/images/dashboard/icon-course.png" />
          </div>
          <span>COURSES</span>
        </NavLink>
        <NavLink to="/dashboard/calendar">
          <div className="navbar-icon">
            <img src="/images/dashboard/icon-calendar.png" />
          </div>
          <span>CALENDAR</span>
        </NavLink>
        <NavLink to="/dashboard/discussions">
          <div className="navbar-icon">
            <img src="/images/dashboard/icon-discussion.png" />
          </div>
          <span>DISCUSSIONS</span>
        </NavLink>
        <NavLink to="/dashboard/events">
          <div className="navbar-icon">
            <img src="/images/dashboard/icon-event.png" />
          </div>
          <span>EVENTS</span>
        </NavLink>
        <NavLink to="/dashboard/announcements">
          <div className="navbar-icon">
            <img src="/images/dashboard/icon-announcement.png" />
          </div>
          <span>ANNOUNCEMENTS</span>
        </NavLink>
        <NavLink to="/dashboard/profile">
          <div className="navbar-icon">
            <img src="/images/dashboard/icon-profile.png" />
          </div>
          <span>PROFILE</span>
        </NavLink>
        <NavLink to="/dashboard/setting">
          <div className="navbar-icon">
            <img src="/images/dashboard/icon-setting.png" />
          </div>
          <span>SETTING</span>
        </NavLink>
      </div>
      <div
        className={'dashboard-toogle' + (sidenavOpen ? ' expand' : '')}
        onClick={() => sidenavToggle()}
      >
        <img src="/images/dashboard/icon-toogle.png" />
      </div>
    </div>
  )
}

DashboardNavigation.propTypes = {
  sidenavOpen: PropTypes.bool.isRequired,
  sidenavToggle: PropTypes.func.isRequired,
}

export default DashboardNavigation
