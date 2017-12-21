<template>
  <div class="wrap">
    <keep-alive>
      <component :is="currentView" />
    </keep-alive>
    <scroll-panel :loaded="true">
      <keep-alive>
        <router-view/>
      </keep-alive>
    </scroll-panel>
  </div>
</template>

<script>
/**
 * 页面的模板
 */
  import ScrollPanel from 'components/public/scroll-panel'
  import XHeader from 'components/public/header'
  import Search from 'components/search'
  export default{
    name: 'Template',
    components: {
      ScrollPanel,
      Search,
      XHeader
    },
    watch: {
      '$route.path' () {
        this.setHeaderComponent()
      }
    },
    data () {
      return {
        currentView: 'Search'
      }
    },
    methods: {
      setHeaderComponent () {
        let path = this.$route.path
        if (path === '/home') {
          this.currentView = 'Search'
        } else {
          this.currentView = 'XHeader'
        }
      }
    },
    activated () {
      this.setHeaderComponent()
    }
  }
</script>

<style lang="scss" scoped>
  .wrap{
    position: relative;
    height: 100%;
  }
</style>
