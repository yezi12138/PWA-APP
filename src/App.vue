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
import { requestPermission } from 'utils/sw'
export default {
  name: 'app',
  computed: {
    transitionName () {
      return this.$store.state.transitionName
    }
  },
  mounted () {
    requestPermission()
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
