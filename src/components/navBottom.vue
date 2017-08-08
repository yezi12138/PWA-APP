<template>
	<transition name='slideDown'>
   <div class="nav-bottom border-scaleY" v-show='isNavBottomShow'>
    <router-link to="/home">
      <Icon type="ios-home" v-if="currentRouter==='home'" /><Icon class="base-color" type="ios-home-outline"v-else /><span :class="{'active':currentRouter==='home'}">首页</span>
    </router-link>
    <router-link to="/book">
      <Icon type="ios-book" v-if="currentRouter==='book'" /><Icon class="base-color" type="ios-book-outline" v-else /><span :class="{'active':currentRouter==='book'}">书影音</span>
    </router-link>
    <router-link to="/broadcast">
      <Icon type="ios-chatboxes" v-if="currentRouter==='broadcast'" /><Icon class="base-color" type="ios-chatboxes-outline" v-else /><span :class="{'active':currentRouter==='broadcast'}">评论</span>
    </router-link>
    <router-link to="/mine">
      <Icon type="ios-person" v-if="currentRouter==='mine'" /><Icon class="base-color" type="ios-person-outline" v-else /><span :class="{'active':currentRouter==='mine'}">我的</span>
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
      },
      isNavBottomShow () {
        return this.$store.state.isNavBottomShow
      }
    }
  }
</script>


<style lang="scss" scoped>
  @import '../sass/util.scss';
  .nav-bottom{
    position:fixed;
    display:flex;
    flex-direction:row;
    bottom:0;
    left:0;
    right:0;
    padding:6px 0 0 0;
    z-index:300;
    @include border-1px(#999,top);
    background-color:#fff;
    transform:translate(0, 0);
    a{
     display:flex;
     flex-direction:column;
     flex:1;
     color:#999;
     font-size:14px;
     text-align:center;
     i{
      font-size:32px;
      color:green;
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
