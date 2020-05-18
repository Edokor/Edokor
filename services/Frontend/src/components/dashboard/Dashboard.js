import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Redirect, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as userActions from '../../redux/actions/userActions'

import DashboardHeader from './dashboardHeader/DashboardHeader'
import DashboardNavigation from './dashboardNavigation/DashboardNavigation'
import OverviewPage from './overviewPage/OverviewPage'
import CourseListPage from './courseListPage/CourseListPage'
import NotFoundDashboardPage from './notFoundDashboardPage/NotFoundDashboardPage'

import './Dashboard.css'

const Dashboard = (props) => {
  const loggedIn = Object.keys(props.user).length === 0 ? false : true
  const [sidenavOpen, setSidenavOpen] = useState(false)

  const sidenavToggle = () => {
    if (sidenavOpen === true) {
      setSidenavOpen(false)
    } else {
      setSidenavOpen(true)
    }
  }

  const handleSignout = async () => {
    event.preventDefault()
    try {
      await props.actions.signoutUserAction(props.user)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      {!loggedIn ? (
        <Redirect to="/signin" />
      ) : (
        <>
          <DashboardHeader user={props.user} onSignout={handleSignout} />
          <DashboardNavigation
            sidenavOpen={sidenavOpen}
            sidenavToggle={sidenavToggle}
          />
          <div className={'dashboard-body' + (sidenavOpen ? ' shrink' : '')}>
            <Switch>
              <Route exact path="/dashboard" component={OverviewPage} />
              <Route
                exact
                path="/dashboard/courses"
                component={CourseListPage}
              />
              <Route component={NotFoundDashboardPage} />
            </Switch>
          </div>
        </>
      )}
    </div>
  )
}

Dashboard.propTypes = {
  user: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: {
      signoutUserAction: bindActionCreators(
        userActions.signoutUserAction,
        dispatch
      ),
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
