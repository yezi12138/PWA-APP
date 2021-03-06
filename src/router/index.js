import Vue from 'vue'
import Router from 'vue-router'
import Home from 'pages/home'
import Login from 'pages/login'
import Register from 'pages/register'
import Notification from 'pages/notification'
import GoodDetail from 'pages/good-detail'
import Order from 'pages/order'
import MyGoods from 'pages/my-goods'
import Shopcart from 'pages/shopcart'
import { checkAuth, getInfo } from '../utils/router'

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
    },
    {
      path: '/good_detail',
      name: 'goodDetail',
      component: GoodDetail
    },
    {
      path: '/order',
      name: 'order',
      component: Order
    },
    {
      path: '/my_goods',
      name: 'myGoods',
      component: MyGoods
    },
    {
      path: '/shopcart',
      name: 'shopcart',
      component: Shopcart
    }
  ]
})

// 需要验证的路由
export const authRouter = [
  '/notification',
  '/order',
  '/shopcart',
  '/my_goods'
]

router.beforeEach(checkAuth)
router.afterEach(getInfo)

export { router }
export default router
