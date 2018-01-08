import Vue from 'vue'
import Router from 'vue-router'
import Home from 'pages/home'
import Login from 'pages/login'
import Register from 'pages/register'
import Notification from 'pages/notification'
import { checkAuth } from '../utils/router'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'main',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/notification',
      name: 'notification',
      component: Notification
    }
  ]
})

// 需要验证的路由
export const authRouter = [
  '/notification'
]

router.beforeEach(checkAuth)

export { router }
export default router
