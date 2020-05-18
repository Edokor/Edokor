import * as types from './actionTypes'
import * as userApi from '../../api/userApi'
import { beginApiCall, apiCallError } from './apiStatusActions'

export const signupUserSuccess = (user) => {
  return { type: types.SIGNUP_USER_SUCCESS, user }
}

export const signupUserError = (error) => {
  return { type: types.SIGNUP_USER_ERROR, error }
}

export const signinUserSuccess = (user) => {
  return { type: types.SIGNIN_USER_SUCCESS, user }
}

export const signinUserError = (error) => {
  return { type: types.SIGNIN_USER_ERROR, error }
}

export const signoutUserSuccess = () => {
  return { type: types.SIGNOUT_USER_SUCCESS }
}

export const signoutUserError = (error) => {
  return { type: types.SIGNOUT_USER_ERROR, error }
}

export const signinUserAction = (email, password) => {
  return (dispatch) => {
    dispatch(beginApiCall())
    return userApi
      .signinUser(email, password)
      .then((response) => {
        if (response.status == 'Success') {
          dispatch(signinUserSuccess(response.user))
        } else {
          dispatch(signinUserError(response.error))
          throw response.error
        }
      })
      .catch((error) => {
        dispatch(apiCallError(error))
        throw error
      })
  }
}

export const signoutUserAction = (user) => {
  return (dispatch) => {
    localStorage.removeItem(user)
    dispatch(beginApiCall())
    return userApi
      .signoutUser(user)
      .then((response) => {
        if (response.status == 'Success') {
          dispatch(signoutUserSuccess())
        } else {
          dispatch(signoutUserError(response.error))
          throw response.error
        }
      })
      .catch((error) => {
        dispatch(apiCallError(error))
        throw error
      })
  }
}
