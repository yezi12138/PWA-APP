import Vue from 'vue'
import Vuex from 'vuex'
import Cookies from 'js-cookie'

Vue.use(Vuex)

const setStorage = (state, itemName, data, fn) => {
  // 兼容微信页面不支持localstorage
  if (localStorage) {
    localStorage.setItem(itemName, JSON.stringify(data))
  } else {
    Cookies.set(itemName, data)
  }
  if (typeof data === 'object') {
    Vue.set(state, itemName, data)
  } else {
    state.itemName = itemName
  }
  fn && fn()
}

const state = {
  user: JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')) : (Cookies.get('user') ? Cookies.get('user') : null),
  login: sessionStorage.getItem('login') || false,
  transitionName: '',
  search_history: JSON.parse(localStorage.getItem('search_history')) ? JSON.parse(localStorage.getItem('search_history')) : (Cookies.get('user') ? Cookies.get('user') : null)
}

const mutations = {
  ADD_USER (state, user) {
    setStorage(state, 'user', user, () => {
      sessionStorage.setItem('login', true)
      state.login = true
    })
  },
  REMOVE_USER (state) {
    Cookies.remove('Token')
    localStorage.removeItem('user')
    sessionStorage.removeItem('login')
    state.login = false
  },
  TRANSITION_NAME (state, transitionName) {
    state.transitionName = transitionName
  },
  ADD_SEARCH_HISTORY (state, data) {
    setStorage(state, 'search_history', data)
  }
}

const getters = {
  getUser (state) {
    return state.login && state.user
  }
}

export default new Vuex.Store({
  state,
  mutations,
  getters
})
