import { authRouter, router } from '../router/index'
import req from 'api/common'
import { getToken } from './auth'

/**
 * 检查是否存在token
 * todo: 分组路由，指定路由才需要验证
 */
export function checkAuth (to, from, next) {
  let token = getToken()
  if (to.name) document.title = to.name
  // 判断当前是前进还是后退，添加不同的动画效果
  if (router.app.$store) {
    let pageTransitionName = isForward(to, from) ? 'slide-left' : 'slide-right'
    console.log('pageTransitionName', pageTransitionName)
    router.app.$store.commit('TRANSITION_NAME', pageTransitionName)
  }
  // 当跳转到空页面时候，刷新会回到之前的页面
  if (to.matched.length === 0) {
    from.path ? next({ path: from.path }) : next({ path: '/' })
  }
  if (to.fullPath === '/login' || to.fullPath === '/register') {
    next({path: `${to.fullPath}?url=${from.path}`})
  }
  if (to.fullPath.match(/\/login.{1,}/)) {
    next()
  }
  if (to.fullPath === '/register') {
    let path = from.query.url
    path ? next({path: `/register?url=${path}`}) : next()
  }
  // 需要登录的路由先进行用户验证
  authRouter.forEach(path => {
    if (to.path === path) {
      if (token) {
        // 验证token
        req('authToken')
        .then(res => {
          res.status ? next() : next({path: `/login?url=${to.path}`})
        })
      } else {
        if (router.app) {
          router.app.$vux.toast.text('请先登录', 'top')
        }
        next({path: `/login?url=${to.path}`})
      }
    }
  })
  next()
}

/**
 * to 如果在这个列表中，始终采用从左到右的滑动效果，首页比较适合用这种方式
 *
 * @type {Array.<string>}
 * @const
 */
const ALWAYS_BACK_PAGE = ['home']

/**
 * 历史记录，记录访问过的页面的 fullPath
 *
 * @type {Array.<string>}
 * @const
 */
const HISTORY_STACK = []

/**
 * 判断当前是否是前进，true 表示是前进，否则是回退
 *
 * @param {Object} to 目标 route
 * @param {Object} from 源 route
 * @return {boolean} 是否表示返回
 */
function isForward (to, from) {
  // to 如果在这个列表中，始终认为是后退
  if (to.name && ALWAYS_BACK_PAGE.indexOf(to.name) !== -1) {
    // 清空历史
    HISTORY_STACK.length = 0
    return false
  }

  if (from.name && ALWAYS_BACK_PAGE.indexOf(from.name) !== -1) {
    // 如果是从 ALWAYS_BACK_PAGE 过来的，那么永远都是前进
    HISTORY_STACK.push(to.fullPath)
    return true
  }

  // 根据 fullPath 判断当前页面是否访问过，如果访问过，则属于返回
  let index = HISTORY_STACK.indexOf(to.fullPath)
  if (index !== -1) {
    HISTORY_STACK.length = index + 1
    return false
  }

  // 将 to.fullPath 加到栈顶
  HISTORY_STACK.push(to.fullPath)
  return true
}
