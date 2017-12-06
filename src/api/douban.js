import request from './index.js'

export const config = {
  // 图书信息
  getBooks: {
    url: '/v2/book/search',
    method: 'get'
  },
  getMovies: {
    url: '/v2/movie/search',
    method: 'get'
  },
  getMusics: {
    url: '/v2/music/search',
    method: 'get'
  }
}

export default function req (funcName, data, isToken) {
  return request(config, funcName, data, isToken)
}
