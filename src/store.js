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
  transitionName: '',
  search_history: JSON.parse(localStorage.getItem('search_history')) ? JSON.parse(localStorage.getItem('search_history')) : (Cookies.get('user') ? Cookies.get('user') : null)
}

const mutations = {
  ADD_USER (state, user) {
    if (user) {
      return
    }
    setStorage(state, 'user', user, () => {
      Vue.$vux.toast.text('登录成功', 'top')
    })
  },
  REMOVE_USER (state) {
    Cookies.remove('Token')
    localStorage.removeItem('user')
  },
  REFLESH_AVATAR (state, user) {
    setStorage(state, 'user', user)
  },
  TRANSITION_NAME (state, transitionName) {
    state.transitionName = transitionName
  },
  ADD_SEARCH_HISTORY (state, data) {
    setStorage(state, 'search_history', data)
  }
}

const actions = {
  // socket_login (context, message) {
  //   if (message.login_time) {
  //     context.commit('REMOVE_USER')
  //   } else {
  //     context.commit('ADD_USER', message)
  //   }
  // },
  // socket_logout (context, message) {
  //   context.commit('REMOVE_USER')
  // }
}

const getters = {
  getUser (state) {
    return state.user
  }
}

export default new Vuex.Store({
  state,
  mutations,
  getters,
  actions
})
