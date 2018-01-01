<template>
  <div class="home-header">
    <div class="nav clearfix">
      <i class="iconfont icon-iconfont303" @click="toggleSide"></i>
      <span class="master">这是一个电商网站</span>
      <i class="iconfont icon-notification"></i>
    </div>
    <search
      @on-submit="submit">
      <!-- <div class="search-results">
        <div>this is results</div>
      </div> -->
    </search>
  </div>
</template>

<script>
/**
 * 主页顶部导航
 */
  import Search from 'components/search'
  export default {
    name: 'HomeHeader',
    components: {
      Search
    },
    data () {
      return {
      }
    },
    methods: {
      toggleSide () {
        this.$emit('toggleSide')
      },
      submit () {
        console.log('submit')
      }
    }
  }
</script>

<style lang="scss" scoped>
  .home-header{
    background-color: #fff;
    .nav{
      display: flex;
      align-items:center;
      justify-content: space-between;
      text-align: center;
      height: 20px;
      padding: 10px 18px;
      .master{
        display: inline-block;
        min-width: 135px;
        height: 100%;
        text-align: left;
      }
      i{
        font-size: 24px;
        color: #696969;
        display: inline-block;
        vertical-align: middle;
      }
      .icon-notification{
        font-size: 20px;
        float: right;
      }
    }
  }
</style>
