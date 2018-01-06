<template>
  <div id="app">
    <transition name="slide">
      <keep-alive>
        <router-view/>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
import req from 'api/common'
export default {
  name: 'app',
  methods: {
    getUserInfo () {
      if (this.$store.state.login) {
        // 获取用户信息
        req('userInfo').then(res => {
          !res.error && this.$store.commit('ADD_USER', res)
        })
      }
    }
  },
  mounted () {
    this.getUserInfo()
  }
}
</script>

<style lang="scss" scoped>
  #app{
    height: 100vh;
    overflow: hidden;
    background-color: #fff;
  }
</style>
