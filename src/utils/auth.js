import Cookies from 'js-cookie'

/**
 * 获取token
 */
export function getToken () {
  return Cookies.get('Token')
}

/**
 * 设置token
 */
export function setToken (token, option) {
  return Cookies.set('Token', token, option)
}

/**
 * 移除token
 */
export function removeToken () {
  return Cookies.remove('Token')
}
