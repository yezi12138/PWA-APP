<template>
  <div id="app">
    <keep-alive>
      <router-view/>
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="scss" scoped>
  #app{
    height: 100vh;
    overflow: hidden;
    background-color: #fff;
  }
</style>
