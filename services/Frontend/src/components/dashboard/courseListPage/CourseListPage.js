import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as courseActions from '../../../redux/actions/courseActions'
import * as teacherActions from '../../../redux/actions/teacherActions'

import CourseCard from '../courseCard/CourseCard'
import Spinner from '../../common/spinner/Spinner'
import PaginationCard from '../../common/paginationCard/PaginationCard'

import './CourseListPage.css'

const CourseListPage = (props) => {
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [cardView, setCardView] = useState(false)
  const history = useHistory()

  const onPageChange = (pageNumber) => {
    setCurrentPage(pageNumber)
    history.push('/dashboard/courses?page=' + pageNumber)
  }

  const loadingComplete = () => {
    setLoading(false)
  }

  useEffect(() => {
    let pageNumber = parseInt(
      new URLSearchParams(history.location.search).get('page')
    )
    if (pageNumber == null || isNaN(pageNumber)) {
      onPageChange(1)
    } else {
      onPageChange(pageNumber)
    }
  }, [history.location.search])

  useEffect(() => {
    setLoading(true)
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

  const dashboardHeader = (
    <div className="dashboard-page-header">
      <div className="header-title">
        <div>Courses</div>
        <button>+ Add Course</button>
      </div>
      <div className="toggle-view">
        <button
          className={cardView ? 'selected' : ''}
          onClick={() => {
            setCardView(true)
          }}
        >
          <img src="/public/images/dashboard/icon-cardview.png" />
        </button>
        <button
          className={!cardView ? 'selected' : ''}
          onClick={() => {
            setCardView(false)
          }}
        >
          <img src="/public/images/dashboard/icon-listview.png" />
        </button>
      </div>
    </div>
  )

  return (
    <div className="dashboard-course-container">
      {loading ? (
        <div className="course-container">
          {dashboardHeader}
          <div className="dashboard-page-body">
            <div className="course-card empty-course-card">
              <Spinner />
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="course-container">
            {dashboardHeader}
            <div
              className={'dashboard-page-body' + (cardView ? ' card-view' : '')}
            >
              {props.course.length == 0 ? (
                <div className="course-card empty-course-card">
                  <div>Currently you do not have courses assigned to you.</div>
                </div>
              ) : (
                <>
                  {props.course
                    .slice(
                      props.maxItemOnPage * (currentPage - 1),
                      props.maxItemOnPage * currentPage
                    )
                    .map((course) => {
                      return (
                        <CourseCard
                          course={course}
                          teacher={props.teacher.find(
                            (x) => x.uid == course.teacher
                          )}
                          role={props.user.role}
                          compact={false}
                          cardView={cardView}
                          key={course.uid}
                        />
                      )
                    })}
                </>
              )}
            </div>
          </div>
          <div className="dashboard-page-footer">
            <PaginationCard
              currentPage={currentPage}
              maxItemOnPage={props.maxItemOnPage}
              totalItem={props.user.course.length}
              // totalItem={60}
              onPageChange={onPageChange}
            />
          </div>
        </>
      )}
    </div>
  )
}

CourseListPage.propTypes = {
  user: PropTypes.object.isRequired,
  canCreate: PropTypes.bool.isRequired,
  course: PropTypes.array.isRequired,
  teacher: PropTypes.array.isRequired,
  maxItemOnPage: PropTypes.number.isRequired,
  actions: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    canCreate: state.user.role == 'Teacher' ? true : false,
    teacher: state.teacher,
    course: state.course.map((item) => {
      return {
        ...item,
        completed: state.user.course.find((x) => x.uid === item.uid).completed,
      }
    }),
    loading: state.apiCallsInProgress > 0,
    maxItemOnPage: 8,
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

export default connect(mapStateToProps, mapDispatchToProps)(CourseListPage)
