import Vue from 'vue'
import Vuex from 'vuex'
import Cookies from 'js-cookie'

Vue.use(Vuex)

const state = {
  user: JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')) : (Cookies.get('user') ? Cookies.get('user') : null),
  login: sessionStorage.getItem('login') || false,
  transitionName: ''
}

const mutations = {
  ADD_USER (state, user) {
    // 兼容微信页面不支持localstorage
    if (localStorage) {
      localStorage.setItem('user', JSON.stringify(user))
    } else {
      Cookies.set('user', user)
    }
    state.user = user
    sessionStorage.setItem('login', true)
    state.login = true
  },
  REMOVE_USER (state) {
    Cookies.remove('Token')
    localStorage.removeItem('user')
    sessionStorage.removeItem('login')
    state.login = false
  },
  TRANSITION_NAME (state, transitionName) {
    state.transitionName = transitionName
  }
}

const getters = {
}

export default new Vuex.Store({
  state,
  mutations,
  getters
})
