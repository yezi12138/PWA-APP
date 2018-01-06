import Vue from 'vue'
import Vuex from 'vuex'
import Cookies from 'js-cookie'

Vue.use(Vuex)

const state = {
  user: JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')) : (Cookies.get('user') ? Cookies.get('user') : null),
  login: sessionStorage.getItem('login') || false
}

const mutations = {
  ADD_USER (state, user) {
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
  }
}

const getters = {
}

export default new Vuex.Store({
  state,
  mutations,
  getters
})
