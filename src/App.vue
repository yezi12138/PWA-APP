<template>
  <div id="app">
    <transition :name="transitionName">
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
  computed: {
    transitionName () {
      return this.$store.state.transitionName
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

<style lang="scss">
  .slide-left-leave-active{
    .vux-header{
      position: relative !important;
    }
    .layout-home{
      margin-top: 0 !important;
    }
    opacity: 0;
    transition: all 0.5s cubic-bezier(.55,0,.1,1);
  }
  .slide-left-leave-to {
    transform: translateX(-80px);
  }

  .slide-right-leave-active{
    .vux-header{
      position: relative !important;
    }
    .layout-home{
      margin-top: 0 !important;
    }
    opacity: 0;
    transition: all 0.5s cubic-bezier(.55,0,.1,1);
  }
  .slide-right-leave-to {
    transform: translateX(80px);
  }
</style>
