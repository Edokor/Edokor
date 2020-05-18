import * as types from './actionTypes'
import * as userApi from '../../api/userApi'
import * as courseApi from '../../api/courseApi'
import { beginApiCall, apiCallError } from './apiStatusActions'

export const fetchCourseSuccess = (courses) => {
  return { type: types.FETCH_COURSE_SUCCESS, courses }
}

export const fetchCourseError = (error) => {
  return { type: types.FETCH_COURSE_ERROR, error }
}

export const fetchStudentSuccess = (students) => {
  return { type: types.FETCH_STUDENT_SUCCESS, students }
}

export const fetchStudentError = (error) => {
  return { type: types.FETCH_STUDENT_ERROR, error }
}

export const fetchCourseAction = (uids) => {
  return (dispatch) => {
    dispatch(beginApiCall())
    return courseApi
      .fetchCourse(uids)
      .then((response) => {
        dispatch(fetchCourseSuccess(response.course))
      })
      .catch((error) => {
        dispatch(apiCallError(error))
        throw error
      })
  }
}

export const fetchStudentAction = (uids) => {
  return (dispatch) => {
    dispatch(beginApiCall())
    return userApi
      .fetchStudent(uids)
      .then((response) => {
        if (response.status == 'Success') {
          dispatch(fetchStudentSuccess(response.student))
        } else {
          dispatch(fetchStudentError(response.error))
          throw response.error
        }
      })
      .catch((error) => {
        dispatch(apiCallError(error))
        throw error
      })
  }
}
