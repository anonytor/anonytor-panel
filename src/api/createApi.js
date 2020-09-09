import axios from 'axios'
import store from '../store'

export function createApi (path, method, data, query) {
  const { serverUrl, token } = store.state
  let url = `${serverUrl}${path}`
  if (typeof query !== 'undefined') {
    url += '?' + new URLSearchParams(query).toString()
  }
  return axios.request({
    method,
    url,
    data,
    headers: {
      Authorization: token
    }
  })
}
