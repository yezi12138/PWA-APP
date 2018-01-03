<template>
  <drawer
    :show.sync="showSide"
    show-mode="push">
    <layout
      :fix-header="true"
      :loaded="true">
        <home-header slot="header" @toggleSide="toggleSide" />
        <div slot="body" class="body">
          <swiper :height="'120px'" :indicatorType="2">
            <div class="swiper-item">
              <img src="../../static/images/banner1.jpg" alt="">
            </div>
            <div class="swiper-item">
              <img src="../../static/images/banner2.jpg" alt="">
            </div>
            <div class="swiper-item">
              <img src="../../static/images/banner3.jpg" alt="">
            </div>
            <div class="swiper-item">
              <img src="../../static/images/banner4.jpg" alt="">
            </div>
          </swiper>
          <div class="nav-list">
            <div
              class="nav-item"
              v-for="(item, index) in navList"
              :key="index"
              @click="routerTo">
              <div class="img">
                {{item.text}}
              </div>
              <span class="nav-name">{{item.name}}</span>
            </div>
            <img ref="iconWrap" class="icon-wrap" src="static/images/icon-wrap.png">
          </div>
          <div class="home-recommend">
            <ul class="goods-list">
              <li class="goods-item" v-for="(item, index) in goods" :key="index">
                {{item.name}}
              </li>
            </ul>
          </div>
        </div>
    </layout>
    <div slot="drawer" @click="toggleSide">
      <home-side></home-side>
    </div>
  </drawer>
</template>

<script>
  import { Drawer } from 'vux'
  import HomeHeader from 'components/home-header'
  import Layout from 'components/public/layout'
  import Swiper from 'banner-swiper'
  import HomeSide from 'components/home-side'
  export default{
    name: 'Home',
    components: {
      HomeHeader,
      Layout,
      Swiper,
      Drawer,
      HomeSide
    },
    data () {
      return {
        showSide: false,                        // 是否显示侧标栏
        iconWrap: null,                         // 保存导航栏切换得图标元素
        navList: [                              // 导航栏配置
          {
            name: '生菜',
            text: '秒杀'
          },
          {
            name: '生菜',
            text: '清场'
          },
          {
            name: '生菜',
            text: '抢购'
          },
          {
            name: '生菜',
            text: '特惠'
          }
        ],
        goods: [
          {
            name: 123
          },
          {
            name: 123
          },
          {
            name: 123
          },
          {
            name: 123
          },
          {
            name: 123
          },
          {
            name: 123
          },
          {
            name: 123
          },
          {
            name: 123
          },
          {
            name: 123
          },
          {
            name: 123
          },
          {
            name: 123
          },
          {
            name: 123
          },
          {
            name: 123
          }
        ]
      }
    },
    methods: {
      toggleSide () {
        this.showSide = !this.showSide
      },
      routerTo (e) {
        this.toggleIconWrap(e)
      },
      toggleIconWrap (e) {
        let el = e.currentTarget
        let left = el.offsetLeft
        let iconWrap = this.iconWrap || this.$refs.iconWrap
        iconWrap.style.left = left + 12 + 'px'
      }
    },
    activated () {
    }
  }
</script>

<style lang="scss" scoped>
  .body{
    background-color: #F2F3F7;
  }
  .nav-list{
    position: relative;
    display: flex;
    flex-direction: row;
    background-color: #fff;
    padding: 10px 10px;
    margin-bottom: 15px;
    .nav-item{
      display: flex;
      flex-direction: column;
      justify-content: center;
      width: 25%;
      padding: 5px 10px;
      .img{
        width: 50px;
        height: 50px;
        line-height: 50px;
        text-align: center;
        border-radius: 50%;
        background-color: #ccc;
        margin: 0 auto;
        margin-bottom: 8px;
        font-size: 20px;
        color: #fff;
        font-weight: bold;
      }
      .nav-name{
        text-align: center;
        font-size: 14px;
      }
    }
    .nav-item:nth-child(1) .img{
      background-color: orange;
    }
    .nav-item:nth-child(2) .img{
      background-color: #efe9dc;
    }
    .nav-item:nth-child(3) .img{
      background-color: #7598e3;
    }
    .nav-item:nth-child(4) .img{
      background-color: #2ed9df;
    }
    .icon-wrap{
      position: absolute;
      width: 60px;
      height: 60px;
      left: 22px;
      top: 5px;
      transition: all 0.1s;
    }
  }
  .home-recommend{
    .goods-list{
      background-color: #fff;
      .goods-item{
        display: inline-block;
        box-sizing: border-box;
        width:50%;
        height: 80px;
        font-size: 16px;
        border: 1px solid #ccc;
        &:nth-child(2n){
          border-left: 0;
        }
        &:nth-child(1), &:nth-child(2){
          border-top: 0;
        }
        &:nth-child(n+3){
          // border-bottom: 0;
          border-top: 0;
        }
      }
    }
  }
</style>
