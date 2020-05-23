import { handleResponse, handleError } from './apiUtils'
const baseUrl = process.env.API_URL + '/user/'

export const signupUser = (name, email, password, role) => {
  return fetch(baseUrl + 'signup/', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ name, email, password, role }),
  })
    .then(handleResponse)
    .catch(handleError)
}

export const signinUser = (email, password) => {
  return fetch(baseUrl + 'signin/', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ email, password }),
  })
    .then(handleResponse)
    .catch(handleError)
}

export const signoutUser = (user) => {
  return fetch(baseUrl + 'signout/', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ user }),
  })
    .then(handleResponse)
    .catch(handleError)
}

export const fetchStudent = (uids) => {
  return fetch(baseUrl + 'student/', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ uids }),
  })
    .then(handleResponse)
    .catch(handleError)
}

export const fetchTeacher = (uids) => {
  return fetch(baseUrl + 'teacher/', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ uids }),
  })
    .then(handleResponse)
    .catch(handleError)
}
