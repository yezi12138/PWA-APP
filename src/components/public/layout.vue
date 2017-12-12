<template>
  <div class="wrap">

    <!-- 头部导航 -->
    <div class="navTop border-bottom border-scaleY">
      <div class="back-icon" v-show="backIcon" @click='goback'><i class="iconfont icon-xiangzuojiantou"></i></div>
      <div class="title">{{title}}</div>
      <div class="icon-group">
        <slot name="header"></slot>
      </div>
    </div>

    <!-- 主体内容 -->
    <div class="home" ref="content">
      <scroll-panel :loaded="true">
        <slot name="body"></slot>
      </scroll-panel>
    </div>
  </div>
</template>

<script>
/**
 * @prop  [String]  title  标题
 * @prop  [Boolean]  backIcon  是否显示后退图标
 * @prop  [Function]  beforeGoBack  后退前的操作
 */
  import XHeader from 'components/public/header'
  import ScrollPanel from 'components/public/scroll-panel'
  // import NavBottom from 'components/navBottom'
  export default{
    name: 'Home',
    props: {
      title: {
        type: String,
        default: '标题'
      },
      backIcon: {
        type: Boolean,
        default: true
      },
      beforeGoBack: {
        type: Function
      }
    },
    components: {
      XHeader,
      ScrollPanel
      // NavBottom
    },
    data () {
      return {
      }
    },
    methods: {
      goback () {
        if (this.beforeGoBack) {
          let promise = new Promise((resolve) => {
            this.beforeGoBack(resolve)
          })
          promise.then(res => {
            this.$router.back()
          })
        } else {
          this.$router.go(-1)
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .wrap{
    height: 100%;
  }
  /* 头部导航样式 */
  .navTop{
    position: fixed;
    z-index:999;
    top:0;
    left:0;
    right:0;
    width:100%;
    height:50px;
    font-size:0;
    background-color:#fff;
    .back-icon{
      display:block;
      position: absolute;
      z-index:999;
      top:50%;
      left:20px;
      width:30px;
      transform:translate(0,-50%);
      font-size:24px;
      color:#333;
      text-align:center;
    }
    .title{
      text-align:center;
      font-size:18px;
      color:#333;
      font-weight:600;
      line-height:50px;
    }
    .icon-group{
      position: absolute;
      z-index:999;
      top:50%;
      transform:translate(0, -50%);
      right:20px;
      font-size:24px;
      color:green;
      i+i{
        margin-left:20px;
      }
    }
  }
  @supports (-webkit-backdrop-filter: none) {
    .header{
      background: rgba(255,255,255,.8);
      -webkit-backdrop-filter: brightness(1.5) blur(4px);
    }
  }
  /*  主体样式  */
  .home{
    height: calc(100% - 50px);
    margin-top: 50px;
  }
</style>
