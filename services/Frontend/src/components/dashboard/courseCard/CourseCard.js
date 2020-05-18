import React from 'react'
import PropTypes from 'prop-types'

import './CourseCard.css'

const CourseCard = ({ course, teacher, role, compact, cardView }) => {
  const lesson = course.section.length
  const student = course.student.length
  const weight = course.section
    .map((item) => item.weight)
    .reduce((a, b) => a + b, 0)
  const completed = (course.completed.length / lesson) * 100
  const status =
    completed == 0 ? 'pending' : completed == 100 ? 'complete' : 'ongoing'
  const action =
    role == 'Student'
      ? completed == 0
        ? 'Start'
        : completed == 100
        ? 'View'
        : 'Resume'
      : 'View'

  return (
    <div
      className={
        'course-card' +
        (cardView ? ' card-view' : compact ? ' compact-view' : '') +
        (role == 'Student' ? ' student-view' : '')
      }
    >
      <div className="course-thumbnail zero-line-height">
        <img src={course.thumbnail} />
      </div>
      <div className="course-title shadow-text">
        <div className="major-text">{course.name}</div>
        <div className={cardView || compact ? 'minor-text' : 'major-text'}>
          {teacher.name}
        </div>
      </div>
      <div className="course-info">
        <div className="course-duration shadow-text">
          <div className="major-text">
            {lesson + ' lesson' + (lesson > 1 ? 's' : '')}
          </div>
          <div className={compact ? 'minor-text' : 'major-text'}>
            {weight + ' hour' + (weight > 1 ? 's' : '')}
          </div>
        </div>
        {role == 'Student' && (
          <>
            <div className={'course-status status-' + status}>{status}</div>
            <div className="course-progress-bar">
              <div style={{ width: completed }}></div>
            </div>
          </>
        )}
        {(role == 'Teacher' || role == 'School') && (
          <>
            <div className="major-text">
              {student + ' student' + (student > 1 ? 's' : '')}
            </div>
          </>
        )}
      </div>

      <div className="course-action">
        <a href="/dashboard/courses/abc">{action}</a>
      </div>
    </div>
  )
}

CourseCard.propTypes = {
  course: PropTypes.object.isRequired,
  teacher: PropTypes.object.isRequired,
  role: PropTypes.string.isRequired,
  compact: PropTypes.bool.isRequired,
  cardView: PropTypes.bool.isRequired,
}

export default CourseCard
