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
  // 当跳转到空页面时候，刷新会回到之前的页面
  if (to.matched.length === 0) {
    from.path ? next({ path: from.path }) : next('/')
  }
  if (to.fullPath === '/login' || to.fullPath === '/register') {
    next({path: `${to.fullPath}?url=${from.path}`})
  } else if (to.fullPath.match(/\/login.{1,}/)) {
    next()
  } else if (to.fullPath === '/register') {
    let path = from.query.url
    if (path) {
      next({path: `/register?url=${path}`})
    } else {
      next()
    }
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
