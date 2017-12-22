<template>
	<transition name='slideDown'>
   <div class="nav-bottom border-top border-scaleY">
    <router-link to="/home">
      <i class="iconfont icon-home" :class="{'active':currentRouter==='home'}" /><span :class="{'active':currentRouter==='home'}">首页</span>
    </router-link>
    <router-link to="/book">
      <i class="iconfont icon-book1" :class="{'active':currentRouter==='book'}" /><span :class="{'active':currentRouter==='book'}">书影音</span>
    </router-link>
    <router-link to="/broadcast">
      <i class="iconfont icon-commet" :class="{'active':currentRouter==='broadcast'}" /><span :class="{'active':currentRouter==='broadcast'}">评论</span>
    </router-link>
    <router-link to="/mine">
      <i class="iconfont icon-setting" :class="{'active':currentRouter==='mine'}" /><span :class="{'active':currentRouter==='mine'}">我的</span>
    </router-link>
  </div> 
</transition>
</template>

<script>
  export default{
    computed: {
      currentRouter () {
        var path = this.$route.path.split('/')[1]
        if (path === '') {
          path = 'home'
        }
        return path
      }
    }
  }
</script>


<style lang="scss" scoped>
  .nav-bottom{
    position:fixed;
    display:flex;
    flex-direction:row;
    bottom:0;
    left:0;
    right:0;
    padding:3px 0 5px 0;
    z-index:999;
    background-color:#fff;
    transform:translate(0, 0);
    a{
     display:flex;
     flex-direction:column;
     flex:1;
     color:#999;
     font-size:12px;
     text-align:center;
     align-items: center;
     text-decoration: none;
     i{
      font-size:24px;
      color:#ccc;
    }
    .base-color{
      font-size:32px;
      color:#ccc;
    }
    .active{
      color:green;
    }
  }
}
.slideDown-enter-active, .slideDown-leave-active {
  transition: all 0.5s;
}
.slideDown-enter, .slideDown-leave-active {
  transform:translate(0, 100%);
}
</style>
