import Vue from 'vue'
import Router from 'vue-router'
import Home from 'pages/home'
import Book from 'pages/book'
import Movies from 'pages/movies'
import Reading from 'pages/reading'
import Login from 'pages/login'
import Register from 'pages/register'
import ArticleDetail from 'pages/article-detail'
import MovieDetail from 'pages/movie-detail'
// import { checkAuth } from '../utils/auth'

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
      path: '/book',
      name: 'book',
      component: Book,
      redirect: '/book/movies',
      children: [
        {
          path: '/book/movies',
          name: 'movies',
          component: Movies
        },
        {
          path: '/book/reading',
          name: 'reading',
          component: Reading
        }
      ]
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
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    }
  ]
})

// router.beforeEach(checkAuth)

export default router
