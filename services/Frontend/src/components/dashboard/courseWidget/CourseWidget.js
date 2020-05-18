import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as courseActions from '../../../redux/actions/courseActions'
import * as teacherActions from '../../../redux/actions/teacherActions'

import CourseCard from '../courseCard/CourseCard'
import Spinner from '../../common/spinner/Spinner'

import './CourseWidget.css'

const CourseWidget = (props) => {
  const canCreate = props.user.role == 'Teacher' ? true : false
  const [loading, setLoading] = useState(true)

  const loadingComplete = () => {
    // setTimeout(() => {
    setLoading(false)
    // }, 500)
  }

  useEffect(() => {
    let course_uids = props.user.course.map((item) => item.uid)
    if (props.course.length !== 0) {
      let remove_course_uids = props.course.map((item) => item.uid)
      course_uids = course_uids.filter((x) => !remove_course_uids.includes(x))
    }
    if (course_uids.length > 0) {
      props.actions.fetchCourseAction(course_uids).catch((error) => {
        alert('Loading Courses Failed' + error)
      })
    } else {
      loadingComplete()
    }
  }, [])

  useEffect(() => {
    if (props.course.length > 0) {
      let teacher_uids = props.course.map((item) => item.teacher)
      if (props.teacher.length !== 0) {
        let remove_teacher_uids = props.teacher.map((item) => item.uid)
        teacher_uids = teacher_uids.filter(
          (x) => !remove_teacher_uids.includes(x)
        )
      }
      if (teacher_uids.length > 0) {
        props.actions
          .fetchTeacherAction(teacher_uids)
          .then(() => loadingComplete())
          .catch((error) => {
            alert('Loading Teacher Failed' + error)
          })
      } else {
        loadingComplete()
      }
    }
  }, [props.course.length])

  return (
    <div className="dashboard-widget course-widget">
      <div className="widget-header">Courses</div>
      <div className="widget-body">
        {loading ? (
          <div className="course-card empty-course-card">
            <Spinner />
          </div>
        ) : (
          <>
            {props.course.length == 0 ? (
              <div className="course-card empty-course-card">
                <div className="">
                  Currently you do not have courses assigned to you.
                </div>
                {canCreate ? (
                  <a href="/dashboard/courses/create">
                    <div className="zero-line-height">
                      <img src="/images/dashboard/icon-insert.png" />
                    </div>
                    <div>Create</div>
                  </a>
                ) : (
                  <div className="zero-line-height">
                    <img src="/images/dashboard/icon-warning.png" />
                  </div>
                )}
              </div>
            ) : (
              <>
                {props.course.slice(0, 3).map((course) => {
                  return (
                    <CourseCard
                      course={course}
                      teacher={props.teacher.find(
                        (x) => x.uid == course.teacher
                      )}
                      role={props.user.role}
                      compact={true}
                      cardView={false}
                      key={course.uid}
                    />
                  )
                })}
                {props.course.length < 3 && canCreate ? (
                  <div
                    className="course-card empty-course-card"
                    style={{ height: 40 + (3 - props.course.length) * 65 }}
                  >
                    <a href="/dashboard/courses/create">
                      <div className="zero-line-height">
                        <img src="/images/dashboard/icon-insert.png" />
                      </div>
                      <div>Create</div>
                    </a>
                  </div>
                ) : (
                  <div
                    className="course-card extra-course-card"
                    style={{ height: 40 + (3 - props.course.length) * 65 }}
                  >
                    <a href="/dashboard/courses">More</a>
                  </div>
                )}
              </>
            )}
          </>
        )}
      </div>
    </div>
  )
}

CourseWidget.propTypes = {
  user: PropTypes.object.isRequired,
  course: PropTypes.array.isRequired,
  teacher: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    teacher: state.teacher,
    course: state.course.map((item) => {
      return {
        ...item,
        completed: state.user.course.find((x) => x.uid === item.uid).completed,
      }
    }),
    loading: state.apiCallsInProgress > 0,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: {
      fetchCourseAction: bindActionCreators(
        courseActions.fetchCourseAction,
        dispatch
      ),
      fetchTeacherAction: bindActionCreators(
        teacherActions.fetchTeacherAction,
        dispatch
      ),
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CourseWidget)
