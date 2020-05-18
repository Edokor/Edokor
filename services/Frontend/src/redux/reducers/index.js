import { combineReducers } from 'redux'
import user from './userReducer'
import course from './courseReducer'
import teacher from './teacherReducer'
import apiCallsInProgress from './apiStatusReducer'

const rootReducer = combineReducers({
  user,
  course,
  teacher,
  apiCallsInProgress,
})

export default rootReducer
