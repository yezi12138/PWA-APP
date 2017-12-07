import Vue from 'vue'
import Router from 'vue-router'
import Home from 'pages/home'
import ArticleDetail from 'pages/article-detail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/articleDetail',
      name: 'articleDetail',
      component: ArticleDetail
    }
  ]
})
