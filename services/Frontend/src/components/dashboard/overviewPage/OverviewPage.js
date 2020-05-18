import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import OverviewWidget from '../overviewWidget/OverviewWidget'
import CourseWidget from '../courseWidget/CourseWidget'

import './OverviewPage.css'

const OverviewPage = (props) => {
  return (
    <div className="dashboard-container">
      <OverviewWidget user={props.user} />
      <CourseWidget user={props.user} />
      <div className="dashboard-widget event-widget">
        <div className="widget-header">Events</div>
        <div className="widget-body">
          <div className="event-card"></div>
        </div>
      </div>
      <div className="dashboard-widget holiday-widget">
        <div className="widget-header">Holiday</div>
        <div className="widget-body"></div>
      </div>
      <div className="dashboard-widget birthday-widget">
        <div className="widget-header">Birthday</div>
        <div className="widget-body"></div>
      </div>
    </div>
  )
}

OverviewPage.propTypes = {
  user: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  }
}

export default connect(mapStateToProps)(OverviewPage)
