import request from 'superagent'

import { get } from './localstorage'
import { isAuthenticated } from './auth'

const baseURL = 'http://jumperlead.herokuapp.com/api/' // NOTE: endpoint needs to be to our web-api

export default function consume(method = 'get', endpoint, data = {}) {
  const dataMethod = method.toLowerCase() === 'get' && 'query' || 'send'
  const token = get('token')
  const headers = {
    Accept: 'application/json'
  }
  if(isAuthenticated()) {
    headers['Authorization'] = `Bearer ${token}`
  }

  return request[method](baseURL + endpoint)
    .set(headers)[dataMethod](data)
    .then((res) => {
      return res
    })
    .catch(err => {
      throw err
    })
}