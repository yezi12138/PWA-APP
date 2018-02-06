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
  },
  getRecommendMovies: {
    url: '/v2/movie/search',
    method: 'get'
  },
  getComingMovies: {
    url: '/v2/movie/coming_soon',
    method: 'get'
  },
  getHotMovies: {
    url: '/v2/movie/in_theaters',
    method: 'get'
  }
}

export default function req (funcName, data, isToken) {
  return request(config, funcName, data, isToken, true)
}
