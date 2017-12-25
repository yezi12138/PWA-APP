import request from './index.js'

export const config = {
  // 获取主页信息
  getHomeData: {
    url: '/home/data',
    method: 'get'
  },
  // 获取今日精选
  getHotData: {
    url: '/hot',
    method: 'get'
  },
  // 获取新书速递
  getNewBookData: {
    url: '/new_book',
    method: 'get'
  },
  // 获取最受关注图书榜
  getPopularBookData: {
    url: '/popular_book',
    method: 'get'
  },
  // 获取电子图书
  getEBookData: {
    url: '/e_book',
    method: 'get'
  }
}

export default function req (funcName, data, isToken) {
  return request(config, funcName, data, isToken, false)
}
