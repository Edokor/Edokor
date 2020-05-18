import React from 'react'
import PropTypes from 'prop-types'

import OverviewCard from '../overviewCard/OverviewCard'

import './OverviewWidget.css'

const OverviewWidget = ({ user }) => {
  return (
    <div className="dashboard-widget overview-widget">
      <div className="widget-header">Overview</div>
      {user.role == 'School' && (
        <div className="widget-body">
          <OverviewCard
            count={user.classroom.length}
            category="Classes"
            url="/dashboard/classes"
          />
          <OverviewCard
            count={user.teacher.length}
            category="Teachers"
            url="/dashboard/teachers"
          />
          <OverviewCard
            count={user.course.length}
            category="Courses"
            url="/dashboard/courses"
          />
          <OverviewCard
            count={user.student.length}
            category="Students"
            url="/dashboard/students"
          />
        </div>
      )}
      {user.role == 'Teacher' && (
        <div className="widget-body">
          <OverviewCard
            count={user.classroom.length}
            category="Classes"
            url="/dashboard/classes"
          />
          <OverviewCard
            count={user.course.length}
            category="Courses"
            url="/dashboard/courses"
          />
          <OverviewCard
            count={user.student.length}
            category="Assessments"
            url="/dashboard/assessments"
          />
          <OverviewCard
            count={user.student.length}
            category="Students"
            url="/dashboard/students"
          />
        </div>
      )}
      {user.role == 'Student' && (
        <div className="widget-body">
          <OverviewCard
            count={user.course.length}
            category="Courses"
            url="/dashboard/courses"
          />
          <OverviewCard
            count={user.course.length}
            category="Assessments"
            url="/dashboard/assessments"
          />
          <OverviewCard
            count={user.classroom.length}
            category="Discussions"
            url="/dashboard/discussions"
          />
          <OverviewCard
            count={user.classroom.length}
            category="Events"
            url="/dashboard/events"
          />
        </div>
      )}
    </div>
  )
}

OverviewWidget.propTypes = {
  user: PropTypes.object.isRequired,
}

export default OverviewWidget
