import * as types from '../actions/actionTypes'
import initialState from './initialState'

const courseReducer = (state = initialState.course, action) => {
  switch (action.type) {
    case types.SIGNOUT_USER_SUCCESS:
      return initialState.course
    case types.FETCH_COURSE_SUCCESS:
      return action.courses
    case types.FETCH_STUDENT_SUCCESS:
      return state.map((course) => {
        return {
          ...course,
          student: action.students.filter((x) =>
            course.student.includes(x.uid)
          ),
        }
      })
    default:
      return state
  }
}

export default courseReducer
