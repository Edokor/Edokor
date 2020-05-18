import * as types from '../actions/actionTypes'
import initialState from './initialState'

const userReducer = (state = initialState.user, action) => {
  switch (action.type) {
    case types.SIGNOUT_USER_SUCCESS:
      return initialState.user
    case types.SIGNUP_USER_SUCCESS:
      return action.user
    case types.SIGNIN_USER_SUCCESS:
      return action.user
    default:
      return state
  }
}

export default userReducer
