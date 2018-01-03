import Cookies from 'js-cookie'
import req from 'api/common'

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

/**
 * 检查是否存在token
 * todo: 分组路由，指定路由才需要验证
 */
export function checkAuth (to, from, next) {
  let token = getToken()
  if (to.name) document.title = to.name
  if (to.path === '/login') {
    if (to.query.url) {
      next()
    } else {
      next({path: `/login?url=${from.path}`})
    }
  } else if (to.path.match(/\/login.{1,}/)) {
    next()
  } else if (to.path === '/register') {
    next()
  } else if (to.path === '/shopcart') {
    if (token) {
      // 验证token
      req('authToken')
      .then(res => {
        res.status ? next() : next({path: `/login?url=${to.path}`})
      })
    } else {
      next()
    }
  } else {
    next()
  }
}
