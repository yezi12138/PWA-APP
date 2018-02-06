<template>
  <div class="navTop border-bottom border-scaleY">
    <div class="back-icon" v-show="backIcon" @click='goback'><i class="iconfont icon-xiangzuojiantou"></i></div>
    <div class="title">{{title || '标题'}}</div>
    <div class="icon-group">
      <slot></slot>
    </div>
  </div>
</template>

<script>
/**
 * @prop  [Boolean]  backIcon  是否显示后退图标
 * @prop  [Function]  beforeGoBack  后退前的操作
 * @prop  [Boolean]  showHeader  是否显示头部导航
 */
  export default{
    props: {
      backIcon: {
        type: Boolean,
        default: true
      },
      beforeGoBack: {
        type: Function
      },
      showHeader: {
        type: Boolean,
        default: true
      },
      title: {
        type: String,
        default: '标题'
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
      .iconfont{
        vertical-align: middle;
      }
      &:after{
        content: '';
        height: 100%;
        vertical-align: middle;
      }
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
      color:green;
      i{
        font-size:24px;
      }
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
</style>
