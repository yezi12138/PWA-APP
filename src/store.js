import Vue from 'vue'
import Vuex from 'vuex'
import { removeToken } from 'utils/auth'

Vue.use(Vuex)

const state = {
  user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null
}

const mutations = {
  addUser (state, user) {
    localStorage.setItem('user', JSON.stringify(user))
    state.user = user
  },
  removeUser (state) {
    removeToken('Token')
    localStorage.removeItem('user')
  }
}

const getters = {
}

export default new Vuex.Store({
  state,
  mutations,
  getters
})
