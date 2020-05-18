import { handleResponse, handleError } from './apiUtils'
const baseUrl = process.env.API_URL + '/user/'

export const signinUser = (email, password) => {
  return fetch(baseUrl + 'signin/', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ email: email, password: password }),
  })
    .then(handleResponse)
    .catch(handleError)
}

export const signoutUser = (user) => {
  return fetch(baseUrl + 'signout/', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ user: user }),
  })
    .then(handleResponse)
    .catch(handleError)
}

export const fetchStudent = (uids) => {
  return fetch(baseUrl + 'student/', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ uids: uids }),
  })
    .then(handleResponse)
    .catch(handleError)
}

export const fetchTeacher = (uids) => {
  return fetch(baseUrl + 'teacher/', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ uids: uids }),
  })
    .then(handleResponse)
    .catch(handleError)
}
