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
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: hidden;
  }
</style>
