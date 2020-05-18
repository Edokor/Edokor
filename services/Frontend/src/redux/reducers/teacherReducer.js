import * as types from '../actions/actionTypes'
import initialState from './initialState'

const teacherReducer = (state = initialState.teacher, action) => {
  switch (action.type) {
    case types.SIGNOUT_USER_SUCCESS:
      return initialState.teacher
    case types.FETCH_TEACHER_SUCCESS:
      return action.teachers
    default:
      return state
  }
}

export default teacherReducer
