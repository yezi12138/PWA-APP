import Cookies from 'js-cookie'
import axios from 'axios'

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
  if (to.path !== '/login') {
    if (to.path === '/register') {
      next()
    } else if (token) {
      // 验证token
      axios.get('/auth/token', {
        params: {
          token
        }
      })
      .then(res => {
        res.data ? next() : next({path: `/login?url=${to.path}`})
      })
    } else {
      next({path: `/login?url=${to.path}`})
    }
  } else {
    next()
  }
}
