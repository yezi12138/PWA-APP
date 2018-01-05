/* eslint-disable */
import axios from 'axios'
import qs from 'qs'
import config from '../../config'

var baseURL = '120.79.133.111'
const instance = axios.create({
  baseURL: baseURL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json'
  }
})

instance.interceptors.request.use((config) => {
  if (config.method === 'post' && config.headers['Content-Type'] !== 'application/json') {
    config.data = qs.stringify(config.data)
  }
  return config
})

instance.interceptors.response.use(response => response.data, err => {
  if (err.response) {
    const { status, data } = err.response
    if (status === 401) {
      window.location.href === '/'
    }
    if (status === 403) {
      window.location.href === '/#/login'
    }
    return Promise.reject(data)
  } else {
    return Promise.reject(err)
  }
})

export default instance
