import { handleResponse, handleError } from './apiUtils'
const baseUrl = process.env.API_URL + '/course/'

export const fetchCourse = (uids) => {
  // return fetch(baseUrl + '?uid=' + uids.join('&uid='), {
  //   method: 'GET',
  // })
  //   .then(handleResponse)
  //   .catch(handleError)
  return fetch(baseUrl, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ uids: uids }),
  })
    .then(handleResponse)
    .catch(handleError)
}
