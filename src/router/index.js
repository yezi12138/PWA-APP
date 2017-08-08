import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home'
import book from '@/components/book'
import broadcast from '@/components/broadcast'
import mine from '@/components/mine'
import movies from '@/components/movies'
import tv from '@/components/tv'
import city from '@/components/city'
import music from '@/components/music'
import reading from '@/components/reading'
import movieDetail from '@/components/movie-detail/movie-detail'
import comment from '@/components/movie-detail/comment'
import discuss from '@/components/movie-detail/discuss'
import register from '@/components/register'
import article from '@/components/home-detail/article'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'main',
      component: home
    },
    {
      path: '/book',
      name: 'book',
      component: book,
      children: [
        {
          path: '/book/',
          component: movies
        },
        {
          path: '/book/movies',
          name: 'movies',
          component: movies
        },
        {
          path: '/book/reading',
          name: 'reading',
          component: reading
        },
        {
          path: '/book/tv',
          name: 'tv',
          component: tv
        },
        {
          path: '/book/music',
          name: 'music',
          component: music
        },
        {
          path: '/book/city',
          name: 'city',
          component: city
        }
      ]
    },
    {
      path: '/broadcast',
      name: 'broadcast',
      component: broadcast
    },
    {
      path: '/mine',
      name: 'mine',
      component: mine
    },
    {
      path: '/home',
      name: 'home',
      component: home
    },
    {
      path: '/movie-detail',
      name: 'movieDetail',
      component: movieDetail,
      children: [
        {
          path: '/movie-detail/',
          component: comment
        },
        {
          path: '/movie-detail/comment',
          name: 'detailComment',
          component: comment
        },
        {
          path: '/movie-detail/discuss',
          name: 'detailDiscuss',
          component: discuss
        }
      ]
    },
    {
      path: '/register',
      name: 'register',
      component: register
    },
    {
      path: '/article',
      name: 'article',
      component: article
    }
  ]})
