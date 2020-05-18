import React from 'react'
import PropTypes from 'prop-types'

import './DashboardHeader.css'

const DashboardHeader = ({ user, onSignout }) => {
  return (
    <div className="dashboard-header">
      <div className="site-logo">
        <a href="/">
          <div className="header-edokor-logo">
            <img src="/images/edokor-logo.png" alt="Edokor" />
          </div>
        </a>
      </div>
      <div className="site-info">
        <div className="header-school-logo">
          <img src="/images/profile/dps-logo.png" alt="Edokor" />
        </div>
        <div className="user-info">
          <div className="notification-icon">
            <div className="notification-count">5</div>
            <img src="/images/dashboard/icon-notification.png" />
          </div>
          <div className="user-profile" onClick={onSignout}>
            <div className="profile-info">
              <span>
                <strong>{user.name}</strong>
              </span>
              <span>{user.role}</span>
            </div>
            <img src={user.profileImage} alt="Profile" />
          </div>
        </div>
      </div>
    </div>
  )
}

DashboardHeader.propTypes = {
  user: PropTypes.object.isRequired,
  onSignout: PropTypes.func.isRequired,
}

export default DashboardHeader
