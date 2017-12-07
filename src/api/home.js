import request from './index.js'

export const config = {
  // 获取主页信息
  getHomeData: {
    url: '/home/data',
    method: 'get'
  }
}

export default function req (funcName, data, isToken) {
  return request(config, funcName, data, isToken)
}
