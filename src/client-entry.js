// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'src/sass/index.scss'
import store from './store.js'
import { ToastPlugin, AlertPlugin } from 'vux'
import VueSocketio from 'vue-socket.io'
import socketio from 'socket.io-client'
import './mock.js'

Vue.use(VueSocketio, socketio('http://localhost:9000/'), store)
Vue.use(ToastPlugin)
Vue.use(AlertPlugin)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
