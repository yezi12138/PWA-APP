<template>
  <div class="wrap" ref="wrap">
    <keep-alive>
      <x-header v-if="currentView === 'XHeader'"></x-header>
      <Search v-else />
    </keep-alive>
    <div class="content" :style="{height: setContentHeight}">
      <scroll-panel :loaded="true">
        <keep-alive>
          <router-view/>
        </keep-alive>
      </scroll-panel>
    </div>
    <nav-bottom ref="bottom" v-if="isBottom" />
  </div>
</template>

<script>
/**
 * 页面的模板
 */
  import ScrollPanel from 'components/public/scroll-panel'
  import XHeader from 'components/public/header'
  import NavBottom from 'components/nav-bottom'
  import Search from 'components/search'
  import { searchRoutes, bottomRoutes } from 'utils/setting'
  export default{
    name: 'Template',
    components: {
      ScrollPanel,
      Search,
      XHeader,
      NavBottom
    },
    watch: {
      '$route.path' () {
        this.setComponent()
      }
    },
    data () {
      return {
        currentView: 'Search',
        isBottom: false
      }
    },
    computed: {
      setContentHeight () {
        let bottomHeight = this.isBottom ? 44 : 0
        return `calc(100% - 50px - ${bottomHeight}px)`
      }
    },
    methods: {
      setComponent () {
        let currentPath = this.$route.path
        let isSearch = false
        isSearch = searchRoutes.some(path => currentPath === path)
        this.isBottom = bottomRoutes.some(path => currentPath === path)
        isSearch ? (this.currentView = 'Search') : (this.currentView = 'XHeader')
      }
    },
    activated () {
      this.setComponent()
    }
  }
</script>

<style lang="scss" scoped>
  .wrap{
    position: relative;
    height: 100%;
    .content{
      margin-top: 50px;
    }
  }
</style>
