import * as types from './actionTypes'
import * as userApi from '../../api/userApi'
import { beginApiCall, apiCallError } from './apiStatusActions'

export const fetchTeacherSuccess = (teachers) => {
  return { type: types.FETCH_TEACHER_SUCCESS, teachers }
}

export const fetchTeacherError = (error) => {
  return { type: types.FETCH_TEACHER_ERROR, error }
}

export const fetchTeacherAction = (uids) => {
  return (dispatch) => {
    dispatch(beginApiCall())
    return userApi
      .fetchTeacher(uids)
      .then((response) => {
        if (response.status == 'Success') {
          dispatch(fetchTeacherSuccess(response.teacher))
        } else {
          dispatch(fetchTeacherError(response.error))
          throw response.error
        }
      })
      .catch((error) => {
        dispatch(apiCallError(error))
        throw error
      })
  }
}
