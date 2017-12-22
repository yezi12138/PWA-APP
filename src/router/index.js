import Vue from 'vue'
import Router from 'vue-router'
import Home from 'pages/home'
import Template from 'components/public/template'
import Login from 'pages/login'
import Register from 'pages/register'
import ArticleDetail from 'pages/article-detail'
import MovieDetail from 'components/movie-detail/movie-detail'
import { checkAuth } from '../utils/auth'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'main',
      component: Template,
      redirect: '/home',
      children: [
        {
          path: '/home',
          name: 'home',
          component: Home
        },
        {
          path: '/articleDetail',
          name: 'articleDetail',
          component: ArticleDetail
        },
        {
          path: '/movieDetail',
          name: 'movieDetail',
          component: MovieDetail
        },
        {
          path: '/login',
          name: 'login',
          title: '登录',
          component: Login
        },
        {
          path: '/register',
          name: 'register',
          title: '注册',
          component: Register
        }
      ]
    }
  ]
})

router.beforeEach(checkAuth)

export default router
