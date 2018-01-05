import request from './index.js'

export const config = {
  // 登录接口
  login: {
    url: '/auth/login',
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
  }
}

export default function req (funcName, data, isToken) {
  return request(config, funcName, data, isToken, false)
}
