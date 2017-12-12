import Cookies from 'js-cookie'

/**
 * 获取token
 */
export function getToken () {
  console.log('Token', Cookies.get('Token'))
  return Cookies.get('Token')
}

/**
 * 设置token
 */
export function setToken (token) {
  return Cookies.set('Token', token)
}

/**
 * 移除token
 */
export function removeToken () {
  return Cookies.remove('Token')
}

/**
 * 检查是否存在token
 */
export function checkAuth (to, from, next) {
  if (to.name) document.title = to.name
  console.log(to.path, to.path === '/register')
  if (to.path !== '/login') {
    if (to.path === '/register') {
      next()
    } else if (getToken()) {
      next()
    } else {
      next({path: `/login?url=${to.path}`})
    }
  } else {
    next()
  }
}
