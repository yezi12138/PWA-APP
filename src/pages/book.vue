<template>
  <layout :bottom="true">
    <div class="book-header" slot="header">
      <xheader :backIcon="false" :title="'书影音'">
        <i class="iconfont icon-search"></i>
        <i class="iconfont icon-ios-notifications-ou"></i>
      </xheader>
      <ul class="header-nav border-bottom border-scaleY">
        <router-link to='/book/movies' class="nav-item" :class="{'active':currentRouter === '/book/movies'}">电影</router-link>
        <router-link to='/book/reading' class="nav-item" :class="{'active':currentRouter === '/book/reading'}">读书</router-link>
        <router-link to='/book/tv' class="nav-item" :class="{'active':currentRouter === '/book/tv'}">电视</router-link>
        <router-link to='/book/city' class="nav-item" :class="{'active':currentRouter === '/book/city'}">同城</router-link>
        <router-link to='/book/music' class="nav-item" :class="{'active':currentRouter === '/book/music'}">音乐</router-link>
      </ul>
    </div>
    <div class="book" slot="body">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
  </layout>
</template>

<script>
  import Layout from 'components/public/layout'
  import xheader from 'components/public/header'
  export default{
    components: {
      xheader,
      Layout
    },
    computed: {
      currentRouter () {
        var path = this.$route.path
        if (path === '/book') {
          path = '/book/movies'
        }
        return path
      }
    }
  }
</script>

<style lang="scss" scoped>
  .book-header{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 85px;
    z-index: 999;
    .header-nav{
      display:flex;
      justify-content:space-between;
      align-items:center;
      position: fixed;
      z-index:999;
      top:50px;
      width:100%;
      height:35px;
      background-color:#fff;
      .nav-item{
        height:100%;
        line-height:35px;
        flex:1;
        text-align:center;
        color:#999;
        font-size:14px;
      }
      .active{
        border-bottom:2px solid #67c777;
        color:#67c777;
      }
    }
  }
  @supports (-webkit-backdrop-filter: none) {
    .book>.header>.header-info{
      background: rgba(255,255,255,.8);
      -webkit-backdrop-filter: brightness(1.5) blur(4px);
    }
  }
</style>
