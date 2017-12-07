<template>
  <div class="navTop border-scaleY">
    <div class="back-icon" v-show="backIcon" @click='goback'><i class="iconfont icon-xiangzuojiantou"></i></div>
    <div class="title">{{title}}</div>
    <div class="icon-group">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default{
    props: {
      title: {
        type: String,
        default: '标题'
      },
      backIcon: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      goback () {
        this.$emit('back')
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
</style>
