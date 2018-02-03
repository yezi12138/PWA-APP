import request from './index.js'

export const config = {
  // 登录接口
  login: {
    url: '/auth/login',
    method: 'post'
  },
  register: {
    url: '/auth/register',
    method: 'post'
  },
  // 验证token
  authToken: {
    url: '/auth/token',
    method: 'get'
  },
  // 获取用户信息
  userInfo: {
    url: '/userInfo',
    method: 'get'
  },
  // 获取用户信息
  uploadAvatar: {
    url: '/upLoadAvatar',
    method: 'post'
  },
  // 获取商品详细信息
  getGoodInfo: {
    url: '/goodInfo',
    method: 'get'
  },
  // 获取商品信息
  getTopSell: {
    url: '/topSell',
    method: 'get'
  },
  // 获取商品订单
  getOrder: {
    url: '/order',
    method: 'get'
  },
  // 下订单
  postOrder: {
    url: '/order',
    method: 'post'
  }
}

export default function req (funcName, data, isToken) {
  return request(config, funcName, data, isToken, false)
}
